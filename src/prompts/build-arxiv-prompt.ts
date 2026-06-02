import type { ArxivData } from "../fetchers/arxiv";
import type { Locale } from "../types/locale";
import { LANGUAGE_NAMES } from "../utils";

export const buildArxivPrompt = (data: ArxivData, dateStr: string, lang: Locale = "zh-CN"): string => {
  const papersText = data.papers
    .map((p, i) => {
      const authors =
        p.authors.length > 3 ? `${p.authors.slice(0, 3).join(", ")} et al.` : p.authors.join(", ");
      const cats = p.categories.slice(0, 3).join(", ");
      return (
        `${i + 1}. **${p.title}**\n` +
        `   Link: ${p.url}\n` +
        `   Authors: ${authors} | Categories: ${cats}\n` +
        `   Published: ${p.published.slice(0, 10)}\n` +
        `   Abstract: ${p.summary.slice(0, 300)}${p.summary.length > 300 ? "..." : ""}`
      );
    })
    .join("\n\n");

  return `You are an AI research analyst. The following are recent AI-related papers from ArXiv as of ${dateStr} (${data.papers.length} papers from cs.AI, cs.CL, cs.LG):

---

${papersText}

---

Generate a structured ArXiv AI Research Digest:

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

Style: concise and professional, preserve all ArXiv links.

Write the response in ${LANGUAGE_NAMES[lang] ?? lang}.`;
};
