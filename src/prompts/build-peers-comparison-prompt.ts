import type { Locale } from "../types/locale";
import { getPrimaryLang, LANGUAGE_NAMES } from "../utils";
import type { RepoDigest } from "./repo-digest";

export const buildPeersComparisonPrompt = (
  openclawDigest: RepoDigest,
  peerDigests: RepoDigest[],
  dateStr: string,
  lang: Locale = getPrimaryLang() as Locale,
): string => {
  const peerSections = peerDigests
    .map((d) => {
      const hasData = d.issues.length || d.prs.length || d.releases.length;
      if (!hasData)
        return `## ${d.config.name} (github.com/${d.config.repo})\nNo activity in the last 24 hours.`;
      return `## ${d.config.name} (github.com/${d.config.repo})\n${d.summary}`;
    })
    .join("\n\n---\n\n");

  return `You are a senior analyst of the AI agent and personal AI assistant open-source ecosystem. The following are ${dateStr} community digest summaries for each project.

## OpenClaw (core reference, github.com/${openclawDigest.config.repo})
${openclawDigest.summary}

---

${peerSections}

---

Generate a cross-project comparison report with these sections:

1. **Ecosystem Overview** - 3-5 sentences on the overall personal AI assistant / agent open-source landscape
2. **Activity Comparison** - Table comparing Issues count, PR count, Release status, and health score for each project
3. **OpenClaw's Position** - Advantages vs peers, technical approach differences, community size comparison
4. **Shared Technical Focus Areas** - Requirements emerging across multiple projects (note which projects, specific needs)
5. **Differentiation Analysis** - Key differences in feature focus, target users, technical architecture
6. **Community Momentum & Maturity** - Activity tiers, which are rapidly iterating, which are stabilizing
7. **Trend Signals** - Industry trends extracted from community feedback, value for AI agent developers

Style: concise and professional, data-backed, suited for technical decision-makers and developers.

Write the response in ${LANGUAGE_NAMES[lang] ?? lang}.`;
};
