import type { GitHubItem } from "../github/types";
import type { Locale } from "../types/locale";
import { getPrimaryLang, LANGUAGE_NAMES } from "../utils";
import { formatItem } from "./format-item";
import { topN } from "./top-n";

export const buildSkillsPrompt = (
  prs: GitHubItem[],
  issues: GitHubItem[],
  dateStr: string,
  lang: Locale = getPrimaryLang() as Locale,
): string => {
  const topPrs = topN(prs, 20);
  const topIssues = topN(issues, 15);

  const prsText = topPrs.map((p) => formatItem(p, lang)).join("\n") || "None";
  const issuesText = topIssues.map((i) => formatItem(i, lang)).join("\n") || "None";

  return `You are a technical analyst focused on the Claude Code ecosystem. The following data is from github.com/anthropics/skills (official Claude Code Skills repository). Analyze the community's most-watched Skills activity (data as of ${dateStr}).

## Repository Context
anthropics/skills is the official Claude Code Skills collection. Each PR typically represents a new or improved Skill. The community proposes new Skills and reports issues via Issues; PRs represent actual Skill submissions.

## Popular Pull Requests (sorted by comments, ${prs.length} total, showing top ${topPrs.length})
${prsText}

## Community Issues (sorted by comments, ${issues.length} total, showing top ${topIssues.length})
${issuesText}

---

Generate a Claude Code Skills community highlights report with these sections:

1. **Top Skills Ranking** - List the 5-8 most-discussed Skills (PRs) by comments/attention, describe each Skill's functionality, discussion highlights, and current status (open/merged/draft)
2. **Community Demand Trends** - From Issues, distill the most-anticipated new Skill directions (e.g. workflow automation, code review, test generation, documentation)
3. **High-Potential Pending Skills** - Active-comment PRs not yet merged; these Skills may land soon
4. **Skills Ecosystem Insight** - One-sentence summary: what is the community's most concentrated demand at the Skills level?

Style: concise and professional, include GitHub links for each item.

Write the response in ${LANGUAGE_NAMES[lang] ?? lang}.`;
};
