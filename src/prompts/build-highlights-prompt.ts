import { LANGUAGE_NAMES, type Locale } from "../utils";
import type { ReportHighlights } from "./prompts-data-types";

export const buildHighlightsPrompt = (
  reportContents: Record<string, string>,
  lang: Locale = "zh-CN",
  itemsPerReport: number = 6,
): string => {
  const sections = Object.entries(reportContents)
    .map(([id, content]) => `## [${id}]\n\n${content.slice(0, 2000)}`)
    .join("\n\n---\n\n");

  return `You are a concise news editor. The following are today's AI ecosystem report excerpts, each labeled with a report ID.

${sections}

---

For each report, extract ${itemsPerReport} of the most noteworthy highlights — the kind that would make a reader want to click through. Each highlight should be a single short sentence (under 60 characters).

Return ONLY valid JSON, no markdown fences, no explanation. Format:
{"ai-cli":["highlight 1","highlight 2",...],"ai-agents":["highlight 1","highlight 2",...],...}

Rules:
- Use the exact report IDs from the [brackets] above as keys
- Only include reports that have meaningful content (skip reports with failure messages or no activity)
- ${itemsPerReport} highlights per report, each under 60 characters
- Focus on: new releases, notable features, trending projects, key discussions
- Be specific: include project names, version numbers, star counts where relevant

Write the response in ${LANGUAGE_NAMES[lang] ?? lang}.`;
};

export type { ReportHighlights };
