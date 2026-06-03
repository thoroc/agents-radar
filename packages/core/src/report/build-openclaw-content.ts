import type { RepoConfig, RepoFetch } from "../github";
import type { RepoDigest } from "../prompts";
import { type Locale, t } from "../utils";

export interface BuildOpenclawReportOptions {
  fetchedOpenclaw: RepoFetch;
  peerDigests: RepoDigest[];
  openclawSummary: string;
  peersComparison: string;
  utcStr: string;
  dateStr: string;
  footer: string;
  openclaw: RepoConfig;
  openclawPeers: RepoConfig[];
  lang: Locale;
}

export const buildOpenclawContent = ({
  fetchedOpenclaw,
  peerDigests,
  openclawSummary,
  peersComparison,
  utcStr,
  dateStr,
  footer,
  openclaw,
  openclawPeers,
  lang,
}: BuildOpenclawReportOptions): string => {
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
  const meta = s.openclawMeta
    .replace("{issues}", String(issues.length))
    .replace("{prs}", String(prs.length))
    .replace("{projects}", String(1 + openclawPeers.length))
    .replace("{utcStr}", utcStr);

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
};
