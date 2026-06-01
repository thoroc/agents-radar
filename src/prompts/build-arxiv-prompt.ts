import type { ArxivData } from "../fetchers/arxiv";
import type { PromptLang } from "../types";

export const buildArxivPrompt = (data: ArxivData, dateStr: string, lang: PromptLang = "zh"): string => {
  const papersText = data.papers
    .map((p, i) => {
      const authors =
        p.authors.length > 3 ? `${p.authors.slice(0, 3).join(", ")} et al.` : p.authors.join(", ");
      const cats = p.categories.slice(0, 3).join(", ");
      return lang === "en"
        ? `${i + 1}. **${p.title}**\n` +
            `   Link: ${p.url}\n` +
            `   Authors: ${authors} | Categories: ${cats}\n` +
            `   Published: ${p.published.slice(0, 10)}\n` +
            `   Abstract: ${p.summary.slice(0, 300)}${p.summary.length > 300 ? "..." : ""}`
        : `${i + 1}. **${p.title}**\n` +
            `   链接: ${p.url}\n` +
            `   作者: ${authors} | 分类: ${cats}\n` +
            `   发布: ${p.published.slice(0, 10)}\n` +
            `   摘要: ${p.summary.slice(0, 300)}${p.summary.length > 300 ? "..." : ""}`;
    })
    .join("\n\n");

  if (lang === "en") {
    return `You are an AI research analyst. The following are recent AI-related papers from ArXiv as of ${dateStr} (${data.papers.length} papers from cs.AI, cs.CL, cs.LG):

---

${papersText}

---

Generate a structured ArXiv AI Research Digest in English:

1. **Today's Highlights** — 3-5 sentences on the most significant research directions and breakthroughs

2. **Key Papers** — Select 8-15 most important papers, organized by theme:
   - 🧠 Large Language Models (architecture, training, alignment, evaluation)
   - 🤖 Agents & Reasoning (planning, tool use, multi-agent, chain-of-thought)
   - 🔧 Methods & Frameworks (new techniques, benchmarks, efficiency improvements)
   - 📊 Applications (domain-specific, multimodal, code generation)

   For each paper:
   - Title (with ArXiv link)
   - Authors (abbreviated)
   - One sentence: key contribution and why it matters

3. **Research Trend Signal** — 100-200 words on emerging research directions visible from today's submissions

4. **Worth Deep Reading** — 2-3 papers most worth reading in full, with reasoning

Style: English, concise and professional, preserve all ArXiv links.
`;
  }

  return `你是 AI 研究分析师。以下是 ${dateStr} ArXiv 上最新的 AI 相关论文（共 ${data.papers.length} 篇，来自 cs.AI、cs.CL、cs.LG）：

---

${papersText}

---

请生成一份结构清晰的《ArXiv AI 研究日报》，要求：

1. **今日速览** — 3~5 句话，概括今日最值得关注的研究方向和突破

2. **重点论文** — 选出 8~15 篇最重要的论文，按主题分类：
   - 🧠 大语言模型（架构、训练、对齐、评估）
   - 🤖 智能体与推理（规划、工具使用、多智能体、思维链）
   - 🔧 方法与框架（新技术、基准测试、效率优化）
   - 📊 应用（垂直领域、多模态、代码生成）

   每篇论文包含：
   - 标题（附 ArXiv 链接）
   - 作者（缩写）
   - 一句话说明：核心贡献和为什么值得关注

3. **研究趋势信号** — 100~200 字，从今日投稿中观察到的新兴研究方向

4. **值得精读** — 2~3 篇最值得完整阅读的论文，简述理由

语言要求：中文，简洁专业，保留所有 ArXiv 链接。
`;
};
