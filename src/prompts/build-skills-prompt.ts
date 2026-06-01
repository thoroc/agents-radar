import type { GitHubItem } from "../github/types";
import type { PromptLang } from "../types";
import { formatItem } from "./format-item";
import { topN } from "./top-n";

export const buildSkillsPrompt = (
  prs: GitHubItem[],
  issues: GitHubItem[],
  dateStr: string,
  lang: PromptLang = "zh",
): string => {
  const topPrs = topN(prs, 20);
  const topIssues = topN(issues, 15);

  const noneStr = lang === "en" ? "None" : "无";
  const prsText = topPrs.map((p) => formatItem(p, lang)).join("\n") || noneStr;
  const issuesText = topIssues.map((i) => formatItem(i, lang)).join("\n") || noneStr;

  if (lang === "en") {
    return `You are a technical analyst focused on the Claude Code ecosystem. The following data is from github.com/anthropics/skills (official Claude Code Skills repository). Analyze the community's most-watched Skills activity (data as of ${dateStr}).

## Repository Context
anthropics/skills is the official Claude Code Skills collection. Each PR typically represents a new or improved Skill. The community proposes new Skills and reports issues via Issues; PRs represent actual Skill submissions.

## Popular Pull Requests (sorted by comments, ${prs.length} total, showing top ${topPrs.length})
${prsText}

## Community Issues (sorted by comments, ${issues.length} total, showing top ${topIssues.length})
${issuesText}

---

Generate a Claude Code Skills community highlights report in English with these sections:

1. **Top Skills Ranking** - List the 5-8 most-discussed Skills (PRs) by comments/attention, describe each Skill's functionality, discussion highlights, and current status (open/merged/draft)
2. **Community Demand Trends** - From Issues, distill the most-anticipated new Skill directions (e.g. workflow automation, code review, test generation, documentation)
3. **High-Potential Pending Skills** - Active-comment PRs not yet merged; these Skills may land soon
4. **Skills Ecosystem Insight** - One-sentence summary: what is the community's most concentrated demand at the Skills level?

Style: concise and professional, include GitHub links for each item.
`;
  }

  return `你是一位专注于 Claude Code 生态的技术分析师。以下是来自 github.com/anthropics/skills（Claude Code Skills 官方仓库）的数据，请分析社区最关注的 Skills 动态（数据截止 ${dateStr}）。

## 仓库说明
anthropics/skills 是 Claude Code 官方 Skills 集合仓库，每个 PR 通常对应一个新增或改进的 Skill。社区通过 Issues 提出新 Skill 需求或反馈问题，PR 则代表实际提交的 Skill。

## 热门 Pull Requests（按评论数排序，共 ${prs.length} 条，展示前 ${topPrs.length} 条）
${prsText}

## 社区 Issues（按评论数排序，共 ${issues.length} 条，展示前 ${topIssues.length} 条）
${issuesText}

---

请生成一份 Claude Code Skills 社区热点报告，包含以下部分：

1. **热门 Skills 排行** - 列出评论/关注度最高的 5~8 个 Skills（PR），说明每个 Skill 的功能、社区讨论热点及当前状态（open/merged/draft）
2. **社区需求趋势** - 从 Issues 中提炼社区最期待的新 Skill 方向（如工作流自动化、代码审查、测试生成、文档等）
3. **高潜力待合并 Skills** - 评论活跃但尚未合并的 PR，这些 Skills 可能近期落地
4. **Skills 生态洞察** - 一句话总结：当前社区在 Skills 层面最集中的诉求是什么

语言要求：简洁专业，每个条目附上 GitHub 链接。
`;
};
