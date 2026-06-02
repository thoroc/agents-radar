import type { ProductHuntData } from "../fetchers/product-hunt";
import type { Locale } from "../utils";
import { LANGUAGE_NAMES } from "../utils";

export const buildProductHuntPrompt = (
  data: ProductHuntData,
  dateStr: string,
  lang: Locale = "zh-CN",
): string => {
  const productsText = data.products
    .map(
      (p, i) =>
        `${i + 1}. **${p.name}** — ${p.tagline}\n   Product Hunt: ${p.url}\n   Website: ${p.website}\n   Votes: ${p.votesCount} | Comments: ${p.commentsCount} | Topics: ${p.topics.join(", ")}`,
    )
    .join("\n\n");

  return `You are an AI product analyst. The following are AI-related products launched on Product Hunt in the past 24 hours as of ${dateStr} (sorted by votes, ${data.products.length} total):

---

${productsText}

---

Generate a structured Product Hunt AI Products Digest:

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

Write the response in ${LANGUAGE_NAMES[lang] ?? lang}.`;
};
