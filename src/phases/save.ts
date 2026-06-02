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
import { DEFAULT_PRIMARY_LANGUAGE, type Locale, t } from "../utils";

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
    const suffix = lang === DEFAULT_PRIMARY_LANGUAGE ? "" : `.${lang}`;

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

  await Promise.all(
    enabledLangs.flatMap((lang) => [
      saveTrendingReport(
        trendingData,
        summariesByLang[lang]!.trendingSummary,
        utcStr,
        dateStr,
        digestRepo,
        autoGenFooter(lang as Locale),
        lang as Locale,
      ),
      saveHackerNewsReport(
        hnData,
        utcStr,
        dateStr,
        digestRepo,
        autoGenFooter(lang as Locale),
        lang as Locale,
      ),
      saveProductHuntReport(
        phData,
        utcStr,
        dateStr,
        digestRepo,
        autoGenFooter(lang as Locale),
        lang as Locale,
      ),
      saveArxivReport(arxivData, utcStr, dateStr, digestRepo, autoGenFooter(lang as Locale), lang as Locale),
      saveHuggingFaceReport(
        hfData,
        utcStr,
        dateStr,
        digestRepo,
        autoGenFooter(lang as Locale),
        lang as Locale,
      ),
      saveCommunityReport(
        devtoData,
        lobstersData,
        utcStr,
        dateStr,
        digestRepo,
        autoGenFooter(lang as Locale),
        lang as Locale,
      ),
    ]),
  );

  const reportsByLang: Record<string, Record<string, string>> = {};
  for (const lang of enabledLangs) {
    const suffix = lang === DEFAULT_PRIMARY_LANGUAGE ? "" : `.${lang}`;
    const reports: Record<string, string> = {
      "ai-cli": cliContent[lang]!,
      "ai-agents": openclawContent[lang]!,
    };
    for (const id of ["ai-trending", "ai-web", "ai-hn", "ai-ph", "ai-arxiv", "ai-hf", "ai-community"]) {
      const content = readReport(dateStr, `ai-${id}${suffix}.md`);
      if (content) reports[id] = content;
    }
    reportsByLang[lang] = reports;
  }

  console.error("  Generating highlights for Telegram...");
  const highlights: Record<string, ReportHighlights> = {};
  for (const lang of enabledLangs) {
    highlights[lang] = {};
  }
  try {
    const rawResults = await Promise.all(
      enabledLangs.map((lang) =>
        callLlm(buildHighlightsPrompt(reportsByLang[lang]!, lang as Locale), 2048).then((raw) => ({
          lang,
          raw,
        })),
      ),
    );
    for (const { lang, raw } of rawResults) {
      highlights[lang] = JSON.parse(
        raw
          .replace(/```json?\n?/g, "")
          .replace(/```/g, "")
          .trim(),
      );
    }
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
