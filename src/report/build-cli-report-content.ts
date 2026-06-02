import type { RepoDigest } from "../prompts";
import { getPrimaryLang, type Locale, t } from "../utils";

export const buildCliReportContent = (
  cliDigests: RepoDigest[],
  skillsSummary: string,
  comparison: string,
  utcStr: string,
  dateStr: string,
  footer: string,
  skillsRepo: string,
  lang: Locale = getPrimaryLang() as Locale,
): string => {
  const repoLinks =
    cliDigests.map((d) => `- [${d.config.name}](https://github.com/${d.config.repo})`).join("\n") +
    `\n- [Claude Code Skills](https://github.com/${skillsRepo})`;

  const s = t(lang);
  const title = `# ${s.cliTitle} ${dateStr}\n\n`;
  const meta =
    lang === getPrimaryLang()
      ? `> Generated: ${utcStr} UTC | Tools covered: ${cliDigests.length}\n\n`
      : `> 生成时间: ${utcStr} UTC | 覆盖工具: ${cliDigests.length} 个\n\n`;

  const skillsSection =
    `## ${s.cliSkillsHeading}\n\n` +
    `> ${s.cliSkillsSource}: [anthropics/skills](https://github.com/${skillsRepo})\n\n` +
    `${skillsSummary}\n\n---\n\n`;

  const toolSections = cliDigests
    .map((d) => {
      const skills = d.config.id === "claude-code" ? skillsSection : "";
      return [
        `<details>`,
        `<summary><strong>${d.config.name}</strong> — <a href="https://github.com/${d.config.repo}">${d.config.repo}</a></summary>`,
        ``,
        skills + d.summary,
        ``,
        `</details>`,
      ].join("\n");
    })
    .join("\n\n");

  return (
    title +
    meta +
    `${repoLinks}\n\n` +
    `---\n\n` +
    `## ${s.cliComparison}\n\n` +
    comparison +
    `\n\n---\n\n` +
    `## ${s.cliDetail}\n\n` +
    toolSections +
    footer
  );
};
