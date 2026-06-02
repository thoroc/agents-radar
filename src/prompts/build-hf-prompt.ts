import type { HuggingFaceData } from "../fetchers/hugging-face";
import type { Locale } from "../utils";
import { LANGUAGE_NAMES } from "../utils";

export const buildHuggingFacePrompt = (
  data: HuggingFaceData,
  dateStr: string,
  lang: Locale = "zh-CN",
): string => {
  const modelsText = data.models
    .map(
      (m, i) =>
        `${i + 1}. **${m.id}**\n` +
        `   Link: ${m.url}\n` +
        `   Author: ${m.author} | Pipeline: ${m.pipelineTag || "N/A"}\n` +
        `   Likes: ${m.likes.toLocaleString()} | Downloads: ${m.downloads.toLocaleString()}\n` +
        `   Tags: ${m.tags.slice(0, 5).join(", ")}`,
    )
    .join("\n\n");

  return `You are an AI model ecosystem analyst. The following are trending models on Hugging Face Hub as of ${dateStr} (${data.models.length} models, sorted by weekly likes):

---

${modelsText}

---

Generate a structured Hugging Face Trending Models Digest:

1. **Today's Highlights** — 3-5 sentences on the most notable model releases and trends on Hugging Face

2. **Trending Models** — Organized by category, each with:
   - Model name (with HF link)
   - Author, likes, downloads
   - One sentence: what it is, why it's trending

   Categories:
   - 🧠 Language Models (LLMs, chat models, instruction-tuned)
   - 🎨 Multimodal & Generation (image, video, audio, text-to-X)
   - 🔧 Specialized Models (code, math, medical, embeddings)
   - 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

3. **Ecosystem Signal** — 100-200 words analyzing model ecosystem trends:
   - Which model families are gaining momentum?
   - Open-weight vs proprietary trends
   - Notable quantization or fine-tuning activity

4. **Worth Exploring** — 2-3 models most worth trying or studying, with reasoning

Style: concise and professional, preserve all HuggingFace links.
Write the response in ${LANGUAGE_NAMES[lang] ?? lang}.
`;
};
