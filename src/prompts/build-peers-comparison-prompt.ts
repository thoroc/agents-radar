import type { PromptLang } from "../types";
import type { RepoDigest } from "./repo-digest";

export const buildPeersComparisonPrompt = (
  openclawDigest: RepoDigest,
  peerDigests: RepoDigest[],
  dateStr: string,
  lang: PromptLang = "zh",
): string => {
  const noActivityStr = lang === "en" ? "No activity in the last 24 hours." : "过去24小时无活动。";

  const openclawSection =
    lang === "en"
      ? `## OpenClaw (core reference, github.com/${openclawDigest.config.repo})\n${openclawDigest.summary}`
      : `## OpenClaw（核心参照，github.com/${openclawDigest.config.repo}）\n${openclawDigest.summary}`;

  const peerSections = peerDigests
    .map((d) => {
      const hasData = d.issues.length || d.prs.length || d.releases.length;
      if (!hasData) return `## ${d.config.name} (github.com/${d.config.repo})\n${noActivityStr}`;
      return `## ${d.config.name} (github.com/${d.config.repo})\n${d.summary}`;
    })
    .join("\n\n---\n\n");

  if (lang === "en") {
    return `You are a senior analyst of the AI agent and personal AI assistant open-source ecosystem. The following are ${dateStr} community digest summaries for each project.

${openclawSection}

---

${peerSections}

---

Generate a cross-project comparison report in English with these sections:

1. **Ecosystem Overview** - 3-5 sentences on the overall personal AI assistant / agent open-source landscape
2. **Activity Comparison** - Table comparing Issues count, PR count, Release status, and health score for each project
3. **OpenClaw's Position** - Advantages vs peers, technical approach differences, community size comparison
4. **Shared Technical Focus Areas** - Requirements emerging across multiple projects (note which projects, specific needs)
5. **Differentiation Analysis** - Key differences in feature focus, target users, technical architecture
6. **Community Momentum & Maturity** - Activity tiers, which are rapidly iterating, which are stabilizing
7. **Trend Signals** - Industry trends extracted from community feedback, value for AI agent developers

Style: concise and professional, data-backed, suited for technical decision-makers and developers.
`;
  }

  return `你是一位专注于 AI 智能体与个人 AI 助手开源生态的资深技术分析师。以下是 ${dateStr} 各开源项目的社区动态摘要。

${openclawSection}

---

${peerSections}

---

请基于上述各项目的动态，生成一份横向对比分析报告，包含以下部分：

1. **生态全景** - 用3-5句话概括个人 AI 助手/自主智能体开源生态整体态势
2. **各项目活跃度对比** - 以表格形式汇总各项目今日的 Issues 数、PR 数、Release 情况及健康度评估
3. **OpenClaw 在生态中的定位** - 与同类相比的优势、技术路线差异、社区规模对比
4. **共同关注的技术方向** - 多项目共同涌现的需求（注明涉及哪些项目、具体诉求）
5. **差异化定位分析** - 功能侧重、目标用户、技术架构的关键差异
6. **社区热度与成熟度** - 活跃度分层，哪些处于快速迭代阶段，哪些在质量巩固阶段
7. **值得关注的趋势信号** - 从社区反馈中提炼行业趋势，对 AI 智能体开发者的参考价值

语言要求：简洁专业，有数据支撑，适合技术决策者和开发者阅读。
`;
};
