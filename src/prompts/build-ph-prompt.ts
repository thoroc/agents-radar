import type { ProductHuntData } from "../fetchers/product-hunt";
import type { Locale } from "../types/locale";
import { LANGUAGE_NAMES } from "../utils";

export const buildProductHuntPrompt = (
  data: ProductHuntData,
  dateStr: string,
  lang: Locale = "zh",
): string => {
  const productsText = data.products
    .map(
      (p, i) =>
        `${i + 1}. **${p.name}**${p.tagline ? ` — ${p.tagline}` : ""}\n` +
        `   Link: ${p.url}\n` +
        `   Votes: ${p.votesCount.toLocaleString()} | Comments: ${p.commentsCount.toLocaleString()} | Topics: ${p.topics.join(", ")}`,
    )
    .join("\n\n");

  return `You are a product analyst focused on the AI ecosystem. The following are today's featured products on Product Hunt as of ${dateStr} (${data.products.length} products, sorted by votes):

---

${productsText}

---

Generate a structured Product Hunt AI Products Digest:

1. **Today's Highlights** — 3-5 sentences on the most notable AI product launches, market trends, and user reception
2. **Top AI Products** — For the top 5-8 products, each with:
   - Product name (with PH link)
   - Tagline and votes
   - One sentence: what it does and why it's worth attention
3. **Category Trends** — Which AI product categories are most active
4. **Worth Watching** — Products with strong momentum or unique positioning

Style: concise and professional, preserve all Product Hunt links.

Write the response in ${LANGUAGE_NAMES[lang] ?? lang}.`;
};
