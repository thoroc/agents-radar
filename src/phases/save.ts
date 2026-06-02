import fs from "node:fs";
import path from "node:path";
import type { WebFetchResult, WebState } from "../fetchers";
import type { ArxivData } from "../fetchers/arxiv";
import type { DevToData } from "../fetchers/dev-to";
import type { HackerNewsData } from "../fetchers/hacker-news";
import type { HuggingFaceData } from "../fetchers/hugging-face";
import type { LobstersData } from "../fetchers/lobste-rs";
import type { ProductHuntData } from "../fetchers/product-hunt";
import type { TrendingData } from "../fetchers/trending";
import { createGitHubIssue, type RepoConfig, type RepoFetch } from "../github";
import type { RepoDigest } from "../prompts";
import { buildHighlightsPrompt, type ReportHighlights } from "../prompts";
import { autoGenFooter } from "../report/auto-gen-footer";
import { buildCliReportContent } from "../report/build-cli-report-content";
import { buildOpenclawReportContent } from "../report/build-openclaw-report-content";
import { callLlm } from "../report/call-llm";
import { saveFile } from "../report/save-file";
import { saveArxivReport } from "../save/save-arxiv-report";
import { saveCommunityReport } from "../save/save-community-report";
import { saveHackerNewsReport } from "../save/save-hacker-news-report";
import { saveHuggingFaceReport } from "../save/save-hugging-face-report";
import { saveProductHuntReport } from "../save/save-product-hunt-report";
import { saveTrendingReport } from "../save/save-trending-report";
import { saveWebReport } from "../save/save-web-report";
import { type Locale, t } from "../utils";

const readReport = (dateStr: string, name: string): string | undefined => {
  const p = path.join("digests", dateStr, name);
  return fs.existsSync(p) ? fs.readFileSync(p, "utf-8") : undefined;
};

type Summaries = {
  cliDigests: RepoDigest[];
  openclawSummary: string;
  skillsSummary: string;
  peerDigests: RepoDigest[];
  trendingSummary: string;
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
  hnData: HackerNewsData;
  phData: ProductHuntData;
  arxivData: ArxivData;
  hfData: HuggingFaceData;
  devtoData: DevToData;
  lobstersData: LobstersData;
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
    const suffix = lang === "zh-CN" ? "" : `.${lang}`;

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
      summariesByLang["zh-CN"]!.trendingSummary,
      utcStr,
      dateStr,
      digestRepo,
      autoGenFooter("zh-CN"),
      "zh-CN",
    ),
    saveTrendingReport(
      trendingData,
      summariesByLang["en-US"]!.trendingSummary,
      utcStr,
      dateStr,
      digestRepo,
      autoGenFooter("en-US"),
      "en-US",
    ),
    saveHackerNewsReport(hnData, utcStr, dateStr, digestRepo, autoGenFooter("zh-CN"), "zh-CN"),
    saveHackerNewsReport(hnData, utcStr, dateStr, digestRepo, autoGenFooter("en-US"), "en-US"),
    saveProductHuntReport(phData, utcStr, dateStr, digestRepo, autoGenFooter("zh-CN"), "zh-CN"),
    saveProductHuntReport(phData, utcStr, dateStr, digestRepo, autoGenFooter("en-US"), "en-US"),
    saveArxivReport(arxivData, utcStr, dateStr, digestRepo, autoGenFooter("zh-CN"), "zh-CN"),
    saveArxivReport(arxivData, utcStr, dateStr, digestRepo, autoGenFooter("en-US"), "en-US"),
    saveHuggingFaceReport(hfData, utcStr, dateStr, digestRepo, autoGenFooter("zh-CN"), "zh-CN"),
    saveHuggingFaceReport(hfData, utcStr, dateStr, digestRepo, autoGenFooter("en-US"), "en-US"),
    saveCommunityReport(
      devtoData,
      lobstersData,
      utcStr,
      dateStr,
      digestRepo,
      autoGenFooter("zh-CN"),
      "zh-CN",
    ),
    saveCommunityReport(
      devtoData,
      lobstersData,
      utcStr,
      dateStr,
      digestRepo,
      autoGenFooter("en-US"),
      "en-US",
    ),
  ]);

  const zhReports: Record<string, string> = {
    "ai-cli": cliContent["zh-CN"]!,
    "ai-agents": openclawContent["zh-CN"]!,
  };
  const enReports: Record<string, string> = {
    "ai-cli": cliContent["en-US"]!,
    "ai-agents": openclawContent["en-US"]!,
  };
  for (const [id, zhFile, enFile] of [
    ["ai-trending", "ai-trending.md", "ai-trending.en-US.md"],
    ["ai-web", "ai-web.md", "ai-web.en-US.md"],
    ["ai-hn", "ai-hn.md", "ai-hn.en-US.md"],
    ["ai-ph", "ai-ph.md", "ai-ph.en-US.md"],
    ["ai-arxiv", "ai-arxiv.md", "ai-arxiv.en-US.md"],
    ["ai-hf", "ai-hf.md", "ai-hf.en-US.md"],
    ["ai-community", "ai-community.md", "ai-community.en-US.md"],
  ] as const) {
    const zh = readReport(dateStr, zhFile);
    const en = readReport(dateStr, enFile);
    if (zh) zhReports[id] = zh;
    if (en) enReports[id] = en;
  }

  console.error("  Generating highlights for Telegram...");
  const highlights: Record<string, ReportHighlights> = { "zh-CN": {}, "en-US": {} };
  try {
    const [zhRaw, enRaw] = await Promise.all([
      callLlm(buildHighlightsPrompt(zhReports, "zh-CN"), 2048),
      callLlm(buildHighlightsPrompt(enReports, "en-US"), 2048),
    ]);
    highlights["zh-CN"] = JSON.parse(
      zhRaw
        .replace(/```json?\n?/g, "")
        .replace(/```/g, "")
        .trim(),
    );
    highlights["en-US"] = JSON.parse(
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
