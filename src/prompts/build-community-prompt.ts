import type { DevToData } from "../fetchers/dev-to";
import type { LobstersData } from "../fetchers/lobste-rs";
import type { Locale } from "../utils";
import { LANGUAGE_NAMES } from "../utils";

export const buildCommunityPrompt = (
  devto: DevToData,
  lobsters: LobstersData,
  dateStr: string,
  lang: Locale = "zh-CN",
): string => {
  const devtoText =
    devto.articles.length > 0
      ? devto.articles
          .map(
            (a, i) =>
              `${i + 1}. **${a.title}**\n` +
              `   Link: ${a.url}\n` +
              `   Author: ${a.user} | Reactions: ${a.positiveReactionsCount} | Comments: ${a.commentsCount} | Reading: ${a.readingTimeMinutes} min\n` +
              `   Tags: ${a.tags.join(", ")}\n` +
              `   ${a.description}`,
          )
          .join("\n\n")
      : "No Dev.to articles available";

  const lobstersText =
    lobsters.stories.length > 0
      ? lobsters.stories
          .map(
            (s, i) =>
              `${i + 1}. **${s.title}**\n   Link: ${s.url}\n   Discussion: ${s.commentsUrl}\n   Score: ${s.score} | Comments: ${s.commentCount} | Author: ${s.author} | Tags: ${s.tags.join(", ")}`,
          )
          .join("\n\n")
      : "No Lobste.rs stories available";

  return `You are a tech community analyst. The following are AI-related content from Dev.to and Lobste.rs as of ${dateStr}:

## Dev.to Articles (${devto.articles.length} articles)

${devtoText}

---

## Lobste.rs Stories (${lobsters.stories.length} stories)

${lobstersText}

---

Generate a structured Tech Community AI Digest:

1. **Today's Highlights** — 3-5 sentences on the most discussed AI topics across these communities today

2. **Dev.to Highlights** — Select 5-10 most valuable articles:
   - Title (with link)
   - Reactions and comments
   - One sentence: key takeaway for developers

3. **Lobste.rs Highlights** — Select 3-8 most notable stories:
   - Title (with link + discussion link)
   - Score and comments
   - One sentence: why it's worth reading

4. **Community Pulse** — 100-200 words on what these communities are talking about:
   - Common themes across both platforms
   - Practical concerns developers have about AI tools
   - Emerging tutorials, patterns, or best practices

5. **Worth Reading** — 2-3 articles/stories most worth reading in depth

Style: concise and developer-friendly, preserve all original links.
Write the response in ${LANGUAGE_NAMES[lang] ?? lang}.
`;
};
