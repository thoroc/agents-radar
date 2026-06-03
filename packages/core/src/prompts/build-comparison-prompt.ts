import type { Locale } from "../types/locale";
import { getPrimaryLang, LANGUAGE_NAMES } from "../utils";
import type { RepoDigest } from "./repo-digest";

export const buildComparisonPrompt = (
  digests: RepoDigest[],
  dateStr: string,
  lang: Locale = getPrimaryLang() as Locale,
): string => {
  const sections = digests
    .map((d) => {
      const hasData = d.issues.length || d.prs.length || d.releases.length;
      if (!hasData)
        return `## ${d.config.name} (github.com/${d.config.repo})\nNo activity in the last 24 hours.`;
      return `## ${d.config.name} (github.com/${d.config.repo})\n${d.summary}`;
    })
    .join("\n\n---\n\n");

  return `You are a senior technical analyst of the AI developer tools ecosystem. The following are ${dateStr} community digest summaries for each major AI CLI tool:

${sections}

---

Generate a cross-tool comparison report with these sections:

1. **Ecosystem Overview** - 3-5 sentences on the overall AI CLI tools development landscape
2. **Activity Comparison** - Table comparing Issues count, PR count, Release status for each tool today
3. **Shared Feature Directions** - Requirements appearing across multiple tool communities (note which tools, specific needs)
4. **Differentiation Analysis** - Differences in feature focus, target users, and technical approach
5. **Community Momentum & Maturity** - Which tools have more active communities, which are rapidly iterating
6. **Trend Signals** - Industry trends from community feedback, reference value for developers

Style: concise and professional, data-backed, suited for technical decision-makers and developers.

Write the response in ${LANGUAGE_NAMES[lang] ?? lang}.`;
};
