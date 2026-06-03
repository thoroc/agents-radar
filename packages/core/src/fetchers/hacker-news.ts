import { DateTime } from "luxon";
import { z } from "zod";

export interface HackerNewsStory {
  id: string;
  title: string;
  url: string; // external URL, or HN discussion link if no external URL
  hnUrl: string; // always the HN discussion link
  points: number;
  comments: number;
  author: string;
  createdAt: string;
}

export interface HackerNewsData {
  stories: HackerNewsStory[];
  fetchSuccess: boolean;
}

const HN_TOP_STORIES = 30;

/** Queries run in parallel; results are deduped by story ID. */
const QUERIES = ["AI", "LLM", "Claude", "OpenAI", "Anthropic", "machine learning"];

const AlgoliaHitSchema = z.object({
  objectID: z.string(),
  title: z.string().default(""),
  url: z.string().optional(),
  points: z.number().nullable().default(0),
  num_comments: z.number().default(0),
  author: z.string().default(""),
  created_at: z.string().default(""),
});

const AlgoliaResponseSchema = z.object({ hits: z.array(AlgoliaHitSchema).default([]) });

const buildHackerNewsQueryUrl = (q: string, since: number): string =>
  `https://hn.algolia.com/api/v1/search_by_date` +
  `?tags=story` +
  `&query=${encodeURIComponent(q)}` +
  `&numericFilters=created_at_i>${since}` +
  `&hitsPerPage=${HN_TOP_STORIES}`;

const dedupeAndRankHits = (seen: Map<string, HackerNewsStory>): HackerNewsStory[] =>
  [...seen.values()].sort((a, b) => b.points - a.points).slice(0, HN_TOP_STORIES);

export const fetchHackerNewsData = async (): Promise<HackerNewsData> => {
  const since = Math.floor(DateTime.now().minus({ days: 1 }).toMillis() / 1000);
  const seen = new Map<string, HackerNewsStory>();

  try {
    await Promise.all(
      QUERIES.map(async (q) => {
        try {
          const resp = await fetch(buildHackerNewsQueryUrl(q, since), {
            headers: { "User-Agent": "agents-radar/1.0" },
          });
          if (!resp.ok) {
            console.error(`  [hn] "${q}": HTTP ${resp.status}`);
            return;
          }
          const { hits } = AlgoliaResponseSchema.parse(await resp.json());
          for (const hit of hits) {
            if (!seen.has(hit.objectID)) {
              const hnUrl = `https://news.ycombinator.com/item?id=${hit.objectID}`;
              seen.set(hit.objectID, {
                id: hit.objectID,
                title: hit.title,
                url: hit.url ?? hnUrl,
                hnUrl,
                points: hit.points ?? 0,
                comments: hit.num_comments,
                author: hit.author,
                createdAt: hit.created_at,
              });
            }
          }
        } catch (err) {
          console.error(`  [hn] "${q}": ${err}`);
        }
      }),
    );

    const stories = dedupeAndRankHits(seen);
    console.error(`  [hn] ${stories.length} stories (from ${seen.size} unique)`);
    return { stories, fetchSuccess: stories.length > 0 };
  } catch (err) {
    console.error(`  [hn] fetch failed: ${err}`);
    return { stories: [], fetchSuccess: false };
  }
};
