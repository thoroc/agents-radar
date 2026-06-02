import type { WebFetchResult } from "../fetchers";
import type { Locale } from "../types";
import { LANGUAGE_NAMES, t } from "../utils";

export const buildWebReportPrompt = (
  results: WebFetchResult[],
  dateStr: string,
  lang: Locale = "en-US",
): string => {
  const isAnyFirstRun = results.some((r) => r.isFirstRun);

  const siteSections = results
    .map(({ siteName, isFirstRun, newItems, totalDiscovered }) => {
      const mode = isFirstRun
        ? `First full crawl (sitemap total ${totalDiscovered} URLs, showing latest ${newItems.length} articles)`
        : `Incremental update, ${newItems.length} new articles today`;

      if (newItems.length === 0) {
        return `## ${siteName}\n\n(${mode}, no content to analyze.)`;
      }

      const itemsText = newItems
        .map((item) => {
          const lines = [
            `### [${item.title || item.url}](${item.url})`,
            `- Category: ${item.category} | Published/Updated: ${item.lastmod.slice(0, 10) || "unknown"}`,
          ];
          if (item.content) {
            lines.push(`- Excerpt: ${item.content}`);
          } else {
            lines.push(
              "- (metadata-only: title derived from URL slug, may be inaccurate; no article text available)",
            );
          }
          return lines.join("\n");
        })
        .join("\n\n");

      return `## ${siteName}(${mode})\n\n${itemsText}`;
    })
    .join("\n\n---\n\n");

  const firstRunNote = isAnyFirstRun ? t(lang).webFirstCrawlNote : t(lang).webIncrementalNote;

  return `You are a deep content analyst focused on AI, skilled at extracting strategic signals from official announcements, technical blogs, research papers, and product documentation.

The following content was crawled on ${dateStr} from Anthropic (claude.com / anthropic.com) and OpenAI (openai.com). ${firstRunNote}

${siteSections}

---

Generate a detailed AI Official Content Tracking Report with these sections:

1. **Today's Highlights** — 3-5 sentences on the most important new releases or developments, calling out key highlights

2. **Anthropic / Claude Content Highlights** — Organize important content by category (news / research / engineering / learn, etc.):
   - For each piece, 2-4 sentences extracting core insights, technical details, or business significance
   - Note publication date and original link
   - If first full crawl, trace important milestones chronologically

3. **OpenAI Content Highlights** — Same structure, organized by research / release / company / safety categories
   - ⚠️ Note: OpenAI data is metadata-only (titles derived from URL slugs, no article text). Only list URLs and categories objectively. Do NOT speculate on title meanings or fabricate content summaries. If information is insufficient for analysis, state the data limitation clearly.

4. **Strategic Signal Analysis** — Based on both companies' release cadence and content focus, analyze:
   - Each company's recent technical priorities (model capabilities / safety / productization / ecosystem)
   - Competitive dynamics: who is setting the agenda, who is following
   - Potential impact on developers and enterprise users

5. **Notable Details** — Extract hidden signals from titles, phrasing, and timing, e.g.:
   - New terms or topics appearing for the first time
   - Dense releases in a category (may signal a product milestone)
   - Policy, compliance, and safety developments

${isAnyFirstRun ? "6. **Content Landscape Overview** — First full crawl only: summarize the content category distribution for both companies and describe their content strategy style (academic-oriented vs product-oriented vs user stories, etc.)\n\n" : ""}Style: professional and detailed, suited for AI researchers, product managers, and technical decision-makers. Every item must include official links.

Write the response in ${LANGUAGE_NAMES[lang] ?? lang}.`;
};
