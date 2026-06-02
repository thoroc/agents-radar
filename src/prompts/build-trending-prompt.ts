import type { TrendingData } from "../fetchers/trending";
import type { Locale } from "../types/locale";
import { LANGUAGE_NAMES } from "../utils";

export const buildTrendingPrompt = (data: TrendingData, dateStr: string, lang: Locale = "zh"): string => {
  const trendingSection =
    data.trendingFetchSuccess && data.trendingRepos.length > 0
      ? data.trendingRepos
          .map(
            (r) =>
              `- [${r.fullName}](${r.url})` +
              (r.language ? ` [${r.language}]` : "") +
              ` ⭐${r.totalStars.toLocaleString()}` +
              (r.todayStars > 0 ? ` (+${r.todayStars} today)` : "") +
              (r.forks > 0 ? ` 🍴${r.forks.toLocaleString()}` : "") +
              (r.description ? `\n  ${r.description}` : ""),
          )
          .join("\n")
      : "(Unable to fetch today's GitHub Trending list)";

  const searchSuccess = data.trendingFetchSuccess || false;
  const searchSection =
    searchSuccess && data.searchRepos.length > 0
      ? data.searchRepos
          .map(
            (r) =>
              `- [${r.fullName}](${r.url})` +
              (r.language ? ` [${r.language}]` : "") +
              ` ⭐${r.stargazersCount.toLocaleString()}` +
              (r.description ? `\n  ${r.description}` : ""),
          )
          .join("\n")
      : null;

  const sections = ["## GitHub Trending (today's ranking)", trendingSection];
  if (searchSection && data.trendingFetchSuccess) {
    sections.push(
      "",
      "## AI Topic Repos (past 7 days, sorted by stars)",
      `The following repos are from GitHub Search API for AI-related topics (data as of ${dateStr}).`,
      searchSection,
    );
  }

  return `You are a GitHub open-source trends analyst. The following is trending data on ${dateStr}.

${sections.join("\n")}

---

Generate a GitHub AI Open Source Trends Report with these sections:

1. **Today's GitHub Trending Landscape** — Pick the 5-8 most representative projects and analyze why they are trending (new features, industry tailwinds, community events, etc.)
2. **Hot Projects Deep Dive** — Pick 3 most noteworthy projects (not just star count) and do a ~100-word deep analysis per project:
   - What problem does the project solve?
   - Why is it getting attention now?
   - Ecosystem impact and user feedback
3. **AI Topic Trends (past 7 days)** — From the Search Data, identify:
   - Which AI directions are hottest this week (e.g., agents, RAG, LLM inference, multimodal, code generation, etc.)
   - Compare with last cycle — is the focus shifting?
4. **Notable New Projects** — Which projects are relatively new but growing fast, indicating future potential
5. **Developer Community Signals** — From repo descriptions, which technical challenges are getting the most open-source attention

Style: data-driven, identify trends from raw numbers. Include repo links for every item.

Write the response in ${LANGUAGE_NAMES[lang] ?? lang}.`;
};
