import type { ProductHuntData } from "../fetchers/product-hunt";
import type { PromptLang } from "../types";

const formatItemList = <T>(
  items: T[],
  lang: PromptLang,
  enFormat: (item: T, i: number) => string,
  zhFormat: (item: T, i: number) => string,
): string => items.map((item, i) => (lang === "en" ? enFormat(item, i) : zhFormat(item, i))).join("\n\n");

export const buildProductHuntPrompt = (
  data: ProductHuntData,
  dateStr: string,
  lang: PromptLang = "zh",
): string => {
  const productsText = formatItemList(
    data.products,
    lang,
    (p, i) =>
      `${i + 1}. **${p.name}** — ${p.tagline}\n   Product Hunt: ${p.url}\n   Website: ${p.website}\n   Votes: ${p.votesCount} | Comments: ${p.commentsCount} | Topics: ${p.topics.join(", ")}`,
    (p, i) =>
      `${i + 1}. **${p.name}** — ${p.tagline}\n   Product Hunt: ${p.url}\n   官网: ${p.website}\n   投票: ${p.votesCount} | 评论: ${p.commentsCount} | 话题: ${p.topics.join(", ")}`,
  );

  if (lang === "en") {
    return `You are an AI product analyst. The following are AI-related products launched on Product Hunt in the past 24 hours as of ${dateStr} (sorted by votes, ${data.products.length} total):

---

${productsText}

---

Generate a structured Product Hunt AI Products Digest in English:

1. **Today's Highlights** — 3-5 sentences on the most notable AI product launches and trends on Product Hunt today

2. **Top Products** — Organized by category, select the most representative products per category, each with:
   - Product name + tagline (with Product Hunt link and website link)
   - Vote count and comment count
   - One sentence: what problem it solves, what makes it stand out

   Categories:
   - 🤖 AI Agents & Assistants (chatbots, copilots, autonomous agents)
   - 🛠️ Developer Tools (APIs, SDKs, coding tools, dev infrastructure)
   - 📊 AI Applications (vertical products, SaaS tools powered by AI)
   - 🎨 Creative & Content (image/video/text generation, design tools)
   - 🔧 Infrastructure & Models (model serving, fine-tuning, MLOps)

3. **Market Signal** — 100-200 words analyzing today's Product Hunt AI launch patterns:
   - Which categories are most crowded?
   - Any innovative approaches or novel use cases?
   - Open-source vs closed-source trend among launches

4. **Worth Trying** — List 2-3 products most worth developers trying out, with brief reasoning

Style: English, concise and professional, preserve all original links.
`;
  }

  return `你是 AI 产品分析师。以下是 ${dateStr} 从 Product Hunt 抓取的过去 24 小时内 AI 相关产品发布（按投票数降序，共 ${data.products.length} 个）：

---

${productsText}

---

请生成一份结构清晰的《Product Hunt AI 产品日报》，要求：

1. **今日速览** — 3~5 句话，概括今日 Product Hunt 上 AI 产品发布的整体趋势和亮点

2. **热门产品** — 按以下分类整理，每类选取最具代表性的产品，每个产品包含：
   - 产品名 + 简介（附 Product Hunt 链接和官网链接）
   - 投票数和评论数
   - 一句话说明：解决什么问题，有何独特之处

   分类：
   - 🤖 AI 智能体与助手（聊天机器人、Copilot、自主 Agent）
   - 🛠️ 开发者工具（API、SDK、编程工具、开发基础设施）
   - 📊 AI 应用（垂直场景产品、AI 驱动的 SaaS 工具）
   - 🎨 创意与内容（图像/视频/文本生成、设计工具）
   - 🔧 基础设施与模型（模型服务、微调、MLOps）

3. **市场信号** — 100~200 字，分析今日 Product Hunt AI 产品的发布规律：
   - 哪些类别最密集？
   - 有无创新性的思路或新颖的应用场景？
   - 开源 vs 闭源的趋势

4. **值得试用** — 列出 2~3 个最值得开发者试用的产品，简述理由

语言要求：中文，简洁专业，保留所有原文链接。
`;
};
