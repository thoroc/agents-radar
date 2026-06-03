import type { GitHubItem, GitHubRelease, RepoConfig } from "../github/types";
import type { Locale } from "../types/locale";
import { getPrimaryLang, LANGUAGE_NAMES } from "../utils";
import { formatItem } from "./format-item";
import { sampleNote } from "./sample-note";
import { topN } from "./top-n";

const CLI_ISSUE_LIMIT = 30;
const CLI_PR_LIMIT = 20;

export const buildCliPrompt = (
  cfg: RepoConfig,
  issues: GitHubItem[],
  prs: GitHubItem[],
  releases: GitHubRelease[],
  dateStr: string,
  lang: Locale = getPrimaryLang() as Locale,
): string => {
  const sampledIssues = topN(issues, CLI_ISSUE_LIMIT);
  const sampledPrs = topN(prs, CLI_PR_LIMIT);

  const issuesText = sampledIssues.map((i) => formatItem(i, lang)).join("\n") || "None";
  const prsText = sampledPrs.map((p) => formatItem(p, lang)).join("\n") || "None";
  const releasesText = releases.length
    ? releases.map((r) => `- ${r.tag_name}: ${r.name}\n  ${(r.body ?? "").slice(0, 300)}`).join("\n")
    : "None";

  const issueNote = sampleNote(issues.length, sampledIssues.length, lang);
  const prNote = sampleNote(prs.length, sampledPrs.length, lang);

  return `You are a technical analyst focused on AI developer tools. Based on the following GitHub data, generate the ${cfg.name} community digest for ${dateStr}.

# Data source: github.com/${cfg.repo}

## Latest Releases (last 24h)
${releasesText}

## Latest Issues (updated in last 24h)${issueNote}
${issuesText}

## Latest Pull Requests (updated in last 24h)${prNote}
${prsText}

---

Generate a structured digest with the following sections:

1. **Today's Highlights** - 2-3 sentences summarizing the most important updates
2. **Releases** - If new versions exist, summarize changes; omit if none
3. **Hot Issues** - Pick 10 noteworthy Issues, explain why they matter and community reaction
4. **Key PR Progress** - Pick 10 important PRs, describe features or fixes
5. **Feature Request Trends** - Distill the most-requested feature directions from all Issues
6. **Developer Pain Points** - Summarize recurring developer frustrations or high-frequency requests

Style: concise and professional, suited for technical developers. Include GitHub links for each item.

Write the response in ${LANGUAGE_NAMES[lang] ?? lang}.`;
};
