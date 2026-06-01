import type { PromptLang } from "../types";
import type { RepoDigest } from "./repo-digest";

export const buildComparisonPrompt = (
  digests: RepoDigest[],
  dateStr: string,
  lang: PromptLang = "zh",
): string => {
  const noActivityStr = lang === "en" ? "No activity in the last 24 hours." : "过去24小时无活动。";

  const sections = digests
    .map((d) => {
      const hasData = d.issues.length || d.prs.length || d.releases.length;
      if (!hasData) return `## ${d.config.name} (github.com/${d.config.repo})\n${noActivityStr}`;
      return `## ${d.config.name} (github.com/${d.config.repo})\n${d.summary}`;
    })
    .join("\n\n---\n\n");

  if (lang === "en") {
    return `You are a senior technical analyst of the AI developer tools ecosystem. The following are ${dateStr} community digest summaries for each major AI CLI tool:

${sections}

---

Generate a cross-tool comparison report in English with these sections:

1. **Ecosystem Overview** - 3-5 sentences on the overall AI CLI tools development landscape
2. **Activity Comparison** - Table comparing Issues count, PR count, Release status for each tool today
3. **Shared Feature Directions** - Requirements appearing across multiple tool communities (note which tools, specific needs)
4. **Differentiation Analysis** - Differences in feature focus, target users, and technical approach
5. **Community Momentum & Maturity** - Which tools have more active communities, which are rapidly iterating
6. **Trend Signals** - Industry trends from community feedback, reference value for developers

Style: concise and professional, data-backed, suited for technical decision-makers and developers.
`;
  }

  return `你是一位专注于 AI 开发工具生态的资深技术分析师。以下是 ${dateStr} 各主流 AI CLI 工具的社区动态摘要：

${sections}

---

请基于上述各工具的动态，生成一份横向对比分析报告，包含以下部分：

1. **生态全景** - 用3-5句话概括当前 AI CLI 工具整体发展态势
2. **各工具活跃度对比** - 以表格形式汇总各工具今日的 Issues 数、PR 数、Release 情况
3. **共同关注的功能方向** - 多个工具社区都在关注的需求（说明哪些工具、具体诉求）
4. **差异化定位分析** - 各工具在功能侧重、目标用户、技术路线上的差异
5. **社区热度与成熟度** - 哪些工具社区更活跃，哪些处于快速迭代阶段
6. **值得关注的趋势信号** - 从社区反馈中提炼出的行业趋势，对开发者有何参考价值

语言要求：简洁专业，有数据支撑，适合技术决策者和开发者阅读。
`;
};
