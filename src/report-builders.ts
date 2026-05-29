import type { RepoConfig, RepoFetch } from "./github.ts";
import type { RepoDigest } from "./prompts.ts";
import { t, interpolate, type Lang, DEFAULT_PRIMARY_LANGUAGE } from "./i18n.ts";

export function buildCliReportContent(
  cliDigests: RepoDigest[],
  skillsSummary: string,
  comparison: string,
  utcStr: string,
  dateStr: string,
  footer: string,
  skillsRepo: string,
  lang: Lang = DEFAULT_PRIMARY_LANGUAGE,
): string {
  const repoLinks =
    cliDigests.map((d) => `- [${d.config.name}](https://github.com/${d.config.repo})`).join("\n") +
    `\n- [Claude Code Skills](https://github.com/${skillsRepo})`;

  const s = t(lang);
  const title = `# ${s.cliTitle} ${dateStr}\n\n`;
  const meta = interpolate(s.cliMeta, { utcStr, count: cliDigests.length });

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
}

export function buildOpenclawReportContent(
  fetchedOpenclaw: RepoFetch,
  peerDigests: RepoDigest[],
  openclawSummary: string,
  peersComparison: string,
  utcStr: string,
  dateStr: string,
  footer: string,
  openclaw: RepoConfig,
  openclawPeers: RepoConfig[],
  lang: Lang = DEFAULT_PRIMARY_LANGUAGE,
): string {
  const { issues, prs } = fetchedOpenclaw;

  const peersRepoLinks =
    `- [OpenClaw](https://github.com/${openclaw.repo})\n` +
    openclawPeers.map((p) => `- [${p.name}](https://github.com/${p.repo})`).join("\n");

  const peerDetailSections = peerDigests
    .map((d) =>
      [
        `<details>`,
        `<summary><strong>${d.config.name}</strong> — <a href="https://github.com/${d.config.repo}">${d.config.repo}</a></summary>`,
        ``,
        d.summary,
        ``,
        `</details>`,
      ].join("\n"),
    )
    .join("\n\n");

  const s = t(lang);
  const title = `# ${s.openclawTitle} ${dateStr}\n\n`;
  const meta = interpolate(s.openclawMeta, {
    issues: issues.length,
    prs: prs.length,
    projects: 1 + openclawPeers.length,
    utcStr,
  });

  return (
    title +
    meta +
    `${peersRepoLinks}\n\n` +
    `---\n\n` +
    `## ${s.openclawDeepDive}\n\n` +
    openclawSummary +
    `\n\n---\n\n` +
    `## ${s.openclawComparison}\n\n` +
    peersComparison +
    `\n\n---\n\n` +
    `## ${s.openclawPeers}\n\n` +
    peerDetailSections +
    footer
  );
}
