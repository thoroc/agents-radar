import type { Locale } from "../utils";
import { LANGUAGE_NAMES } from "../utils";

export const buildMonthlyPrompt = (
  sourceDigests: Record<string, string>,
  monthStr: string,
  lang: Locale = "zh",
): string => {
  const digestEntries = Object.entries(sourceDigests)
    .map(([key, content]) => `## ${key}\n\n${content}`)
    .join("\n\n---\n\n");

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

Style: in-depth analysis, data-driven, suited for monthly retrospectives and strategic decision-making.
Write the response in ${LANGUAGE_NAMES[lang] ?? lang}.
`;
};
