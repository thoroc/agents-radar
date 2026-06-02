import type { HackerNewsData } from "../fetchers/hacker-news";
import type { Locale } from "../utils";
import { LANGUAGE_NAMES } from "../utils";

export const buildHackerNewsPrompt = (data: HackerNewsData, dateStr: string, lang: Locale = "zh"): string => {
  const storiesText = data.stories
    .map(
      (s, i) =>
        `${i + 1}. **${s.title}**\n   Link: ${s.url}\n   Discussion: ${s.hnUrl}\n   Score: ${s.points} | Comments: ${s.comments} | Author: ${s.author} | Time: ${s.createdAt.slice(0, 16)}`,
    )
    .join("\n\n");

  return `You are an AI industry news analyst. The following are AI-related top posts from Hacker News in the past 24 hours as of ${dateStr} (sorted by score, ${data.stories.length} total):

---

${storiesText}

---

Generate a structured Hacker News AI Community Digest:

1. **Today's Highlights** — 3-5 sentences on the hottest AI discussion topics and community sentiment on HN today

2. **Top News & Discussions** — Organized by category, select the 2-5 most representative items per category, each with:
   - Title (with original link) + HN discussion link
   - Score and comment count
   - One sentence: why this matters, what the community's typical reaction is

   Categories:
   - 🔬 Models & Research (new model releases, papers, benchmarks)
   - 🛠️ Tools & Engineering (open-source projects, frameworks, engineering practices)
   - 🏢 Industry News (company news, funding, product launches)
   - 💬 Opinions & Debates (notable Ask HN, Show HN, or hot discussion threads)

3. **Community Sentiment Signal** — 100-200 words analyzing today's HN AI discussion mood and focus:
   - Which topics are most active (high score + high comments)?
   - Any clear points of controversy or consensus?
   - Compared to last cycle, any notable shift in focus?

4. **Worth Deep Reading** — List 2-3 pieces most worth developers/researchers reading in depth, with brief reasoning

Style: English, concise and professional, preserve all original links.

Write the response in ${LANGUAGE_NAMES[lang] ?? lang}.`;
};
