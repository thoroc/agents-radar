import fs from "node:fs";
import path from "node:path";
import type { ArxivData } from "../fetchers/arxiv";
import type { DevtoData } from "../fetchers/devto";
import type { HfData } from "../fetchers/hf";
import type { HnData } from "../fetchers/hn";
import type { LobstersData } from "../fetchers/lobsters";
import type { PhData } from "../fetchers/ph";
import type { TrendingData } from "../fetchers/trending";
import type { WebFetchResult, WebState } from "../fetchers/web";
import { createGitHubIssue, type RepoConfig, type RepoFetch } from "../github";
import type { RepoDigest } from "../prompts";
import { buildHighlightsPrompt, type ReportHighlights } from "../prompts/prompts-data";
import { autoGenFooter, callLlm, saveFile } from "../report";
import { buildCliReportContent, buildOpenclawReportContent } from "../report-builders";
import {
  saveArxivReport,
  saveCommunityReport,
  saveHfReport,
  saveHnReport,
  savePhReport,
  saveTrendingReport,
  saveWebReport,
} from "../report-savers";
import { type Locale, t } from "../utils/i18n";

const readReport = (dateStr: string, name: string): string | undefined => {
  const p = path.join("digests", dateStr, name);
  return fs.existsSync(p) ? fs.readFileSync(p, "utf-8") : undefined;
};

export type SavePhaseArgs = {
  summariesByLang: Record<string, Summaries>;
  comparisonsByLang: Record<string, string>;
  peersComparisonsByLang: Record<string, string>;
  claudeSkillsRepo: string;
  utcStr: string;
  dateStr: string;
  digestRepo: string;
  enabledLangs: string[];
  fetchedOpenclaw: RepoFetch;
  openclaw: RepoConfig;
  openclawPeers: RepoConfig[];
  webResults: WebFetchResult[];
  webState: WebState;
  trendingData: TrendingData;
  hnData: HnData;
  phData: PhData;
  arxivData: ArxivData;
  hfData: HfData;
  devtoData: DevtoData;
  lobstersData: LobstersData;
};

type Summaries = {
  cliDigests: RepoDigest[];
  openclawSummary: string;
  skillsSummary: string;
  peerDigests: RepoDigest[];
  trendingSummary: string;
};

export const savePhase = async (args: SavePhaseArgs): Promise<void> => {
  const {
    summariesByLang,
    comparisonsByLang,
    peersComparisonsByLang,
    claudeSkillsRepo,
    utcStr,
    dateStr,
    digestRepo,
    enabledLangs,
    fetchedOpenclaw,
    openclaw,
    openclawPeers,
    webResults,
    webState,
    trendingData,
    hnData,
    phData,
    arxivData,
    hfData,
    devtoData,
    lobstersData,
  } = args;

  const cliContent: Record<string, string> = {};
  const openclawContent: Record<string, string> = {};

  for (const lang of enabledLangs) {
    const s = summariesByLang[lang]!;
    const ft = autoGenFooter(lang as Locale);
    const suffix = lang === "zh" ? "" : `.${lang}`;

    cliContent[lang] = buildCliReportContent(
      s.cliDigests,
      s.skillsSummary,
      comparisonsByLang[lang]!,
      utcStr,
      dateStr,
      ft,
      claudeSkillsRepo,
      lang as Locale,
    );
    openclawContent[lang] = buildOpenclawReportContent(
      fetchedOpenclaw,
      s.peerDigests,
      s.openclawSummary,
      peersComparisonsByLang[lang]!,
      utcStr,
      dateStr,
      ft,
      openclaw,
      openclawPeers,
      lang as Locale,
    );

    console.error(`  Saved ${saveFile(cliContent[lang], dateStr, `ai-cli${suffix}.md`)}`);
    console.error(`  Saved ${saveFile(openclawContent[lang], dateStr, `ai-agents${suffix}.md`)}`);
  }

  for (const lang of enabledLangs) {
    await saveWebReport(
      webResults,
      webState,
      utcStr,
      dateStr,
      digestRepo,
      autoGenFooter(lang as Locale),
      lang as Locale,
    );
  }

  await Promise.all([
    saveTrendingReport(
      trendingData,
      summariesByLang.zh!.trendingSummary,
      utcStr,
      dateStr,
      digestRepo,
      autoGenFooter("zh"),
      "zh",
    ),
    saveTrendingReport(
      trendingData,
      summariesByLang.en!.trendingSummary,
      utcStr,
      dateStr,
      digestRepo,
      autoGenFooter("en"),
      "en",
    ),
    saveHnReport(hnData, utcStr, dateStr, digestRepo, autoGenFooter("zh"), "zh"),
    saveHnReport(hnData, utcStr, dateStr, digestRepo, autoGenFooter("en"), "en"),
    savePhReport(phData, utcStr, dateStr, digestRepo, autoGenFooter("zh"), "zh"),
    savePhReport(phData, utcStr, dateStr, digestRepo, autoGenFooter("en"), "en"),
    saveArxivReport(arxivData, utcStr, dateStr, digestRepo, autoGenFooter("zh"), "zh"),
    saveArxivReport(arxivData, utcStr, dateStr, digestRepo, autoGenFooter("en"), "en"),
    saveHfReport(hfData, utcStr, dateStr, digestRepo, autoGenFooter("zh"), "zh"),
    saveHfReport(hfData, utcStr, dateStr, digestRepo, autoGenFooter("en"), "en"),
    saveCommunityReport(devtoData, lobstersData, utcStr, dateStr, digestRepo, autoGenFooter("zh"), "zh"),
    saveCommunityReport(devtoData, lobstersData, utcStr, dateStr, digestRepo, autoGenFooter("en"), "en"),
  ]);

  const zhReports: Record<string, string> = { "ai-cli": cliContent.zh!, "ai-agents": openclawContent.zh! };
  const enReports: Record<string, string> = { "ai-cli": cliContent.en!, "ai-agents": openclawContent.en! };
  for (const [id, zhFile, enFile] of [
    ["ai-trending", "ai-trending.md", "ai-trending.en.md"],
    ["ai-web", "ai-web.md", "ai-web.en.md"],
    ["ai-hn", "ai-hn.md", "ai-hn.en.md"],
    ["ai-ph", "ai-ph.md", "ai-ph.en.md"],
    ["ai-arxiv", "ai-arxiv.md", "ai-arxiv.en.md"],
    ["ai-hf", "ai-hf.md", "ai-hf.en.md"],
    ["ai-community", "ai-community.md", "ai-community.en.md"],
  ] as const) {
    const zh = readReport(dateStr, zhFile);
    const en = readReport(dateStr, enFile);
    if (zh) zhReports[id] = zh;
    if (en) enReports[id] = en;
  }

  console.error("  Generating highlights for Telegram...");
  const highlights: Record<string, ReportHighlights> = { zh: {}, en: {} };
  try {
    const [zhRaw, enRaw] = await Promise.all([
      callLlm(buildHighlightsPrompt(zhReports, "zh"), 2048),
      callLlm(buildHighlightsPrompt(enReports, "en"), 2048),
    ]);
    highlights.zh = JSON.parse(
      zhRaw
        .replace(/```json?\n?/g, "")
        .replace(/```/g, "")
        .trim(),
    );
    highlights.en = JSON.parse(
      enRaw
        .replace(/```json?\n?/g, "")
        .replace(/```/g, "")
        .trim(),
    );
  } catch (err) {
    console.error(`  [highlights] Generation failed: ${err}`);
  }

  const highlightsPath = saveFile(JSON.stringify(highlights, null, 2), dateStr, "highlights.json");
  console.error(`  Saved ${highlightsPath}`);

  if (digestRepo) {
    for (const lang of enabledLangs) {
      const cliUrl = await createGitHubIssue(
        `${t(lang).issueTitleCli} ${dateStr}`,
        cliContent[lang]!,
        t(lang).issueLabelCli,
      );
      console.error(`  Created CLI issue (${lang}): ${cliUrl}`);

      const ocUrl = await createGitHubIssue(
        `${t(lang).issueTitleOpenclaw} ${dateStr}`,
        openclawContent[lang]!,
        t(lang).issueLabelOpenclaw,
      );
      console.error(`  Created OpenClaw issue (${lang}): ${ocUrl}`);
    }
  }
};
