import type { PromptLang } from "../types";

export const buildMonthlyPrompt = (
  sourceDigests: Record<string, string>,
  monthStr: string,
  lang: PromptLang = "zh",
): string => {
  const digestEntries = Object.entries(sourceDigests)
    .map(([key, content]) => `## ${key}\n\n${content}`)
    .join("\n\n---\n\n");

  if (lang === "en") {
    return `You are a technical analyst focused on the AI open-source ecosystem. The following are ${monthStr} AI tool community digest summaries (${Object.keys(sourceDigests).length} reports total). Generate a comprehensive monthly review.

${digestEntries}

---

Generate an AI Tools Ecosystem Monthly Report with these sections:

1. **Month's Top Stories** - 5-10 most important events and milestones this month, in chronological order
2. **CLI Tools Monthly Progress** - Overall development trajectory, major releases, and community growth for each key AI CLI tool
3. **AI Agent Ecosystem Monthly Review** - Ecosystem landscape shifts, emerging projects, notable signals this month
4. **Technical Trend Summary** - Most significant technical directions and paradigm shifts in AI open-source this month
5. **Community Health Assessment** - Monthly activity comparison across major projects, developer engagement evaluation
6. **Official Announcements Review** - Strategic analysis of Anthropic and OpenAI content published this month
7. **Next Month's Outlook** - Based on this month's trends, predict key directions and potential events to watch

Style: English, in-depth analysis, data-driven, suited for monthly retrospectives and strategic decision-making.
`;
  }

  return `你是一位专注于 AI 开源生态的技术分析师。以下是 ${monthStr} 月的 AI 工具社区动态汇总（共 ${Object.keys(sourceDigests).length} 份报告），请生成本月综合回顾报告。

${digestEntries}

---

请生成《AI 工具生态月报》，包含以下部分：

1. **月度要闻** - 本月最重要的 5-10 条事件和里程碑，按时间排列
2. **CLI 工具月度进展** - 各主要 AI CLI 工具本月整体发展轨迹、重要版本、社区规模变化
3. **AI Agent 生态月报** - 本月生态格局变化、新兴项目、值得关注的信号
4. **技术趋势总结** - 本月 AI 开源领域最显著的技术方向与范式变化
5. **社区生态健康度** - 各主要项目月度活跃度对比、开发者参与度评估
6. **官方动态回顾** - Anthropic 和 OpenAI 本月发布内容的战略意义分析
7. **下月展望** - 基于本月趋势，预判值得重点关注的方向和潜在事件

语言要求：中文，深度分析，数据驱动，适合月度复盘和战略决策参考。
`;
};
