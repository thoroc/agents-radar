/**
 * Report saver functions — LLM call + file save + optional GitHub issue.
 * All savers delegate to the generic saveReport function.
 */

import type { ArxivData } from "./fetchers/arxiv";
import type { DevtoData } from "./fetchers/devto";
import type { HfData } from "./fetchers/hf";
import type { HnData } from "./fetchers/hn";
import type { LobstersData } from "./fetchers/lobsters";
import type { PhData } from "./fetchers/ph";
import type { TrendingData } from "./fetchers/trending";
import { saveWebState, type WebFetchResult, type WebState } from "./fetchers/web";
import { createGitHubIssue } from "./github";
import {
  buildArxivPrompt,
  buildCommunityPrompt,
  buildHfPrompt,
  buildHnPrompt,
  buildPhPrompt,
  buildWebReportPrompt,
} from "./prompts-data";
import { callLlm, LLM_TOKENS_WEB, saveFile } from "./report";
import { type Locale, t } from "./utils/i18n";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SaveReportConfig = {
  data: unknown;
  promptBuilder: (data: unknown, dateStr: string, suffix: string) => string;
  headerBuilder: (dateStr: string, utcStr: string, suffix: string) => string;
  fileName: string;
  issueTitle?: string;
  issueLabel?: string;
  maxTokens?: number;
};

export type SaveReportDeps = {
  callLlm?: typeof callLlm;
  saveFile?: typeof saveFile;
  createGitHubIssue?: typeof createGitHubIssue;
};

// ---------------------------------------------------------------------------
// Default deps — used when callers don't inject mocks
// ---------------------------------------------------------------------------

const defaultDeps: SaveReportDeps = {
  callLlm,
  saveFile,
  createGitHubIssue,
};

// ---------------------------------------------------------------------------
// Generic save function
// ---------------------------------------------------------------------------

export const saveReport = async (
  config: SaveReportConfig,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: string,
  deps: SaveReportDeps = {},
): Promise<void> => {
  const fullDeps = { ...defaultDeps, ...deps };
  const suffix = lang === "zh" ? "" : `.${lang}`;
  const content = await fullDeps.callLlm?.(
    config.promptBuilder(config.data, dateStr, suffix),
    config.maxTokens,
  );
  if (!content) return;

  const header = config.headerBuilder(dateStr, utcStr, suffix);
  const full = `${header}\n\n---\n\n${content}${footer}`;
  const path = fullDeps.saveFile?.(full, dateStr, `${config.fileName}${suffix}.md`);
  if (path) console.error(`  Saved ${path}`);

  if (digestRepo && config.issueTitle && config.issueLabel) {
    const url = await fullDeps.createGitHubIssue?.(
      `${config.issueTitle} ${dateStr}`,
      full,
      config.issueLabel,
    );
    if (url) console.error(`  Created issue: ${url}`);
  }
};

// ---------------------------------------------------------------------------
// Web report — special case: complex header, state management
// ---------------------------------------------------------------------------

export const saveWebReport = async (
  webResults: WebFetchResult[],
  webState: WebState,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale = "zh",
  deps: SaveReportDeps = {},
): Promise<void> => {
  const hasNewContent = webResults.some((r) => r.newItems.length > 0);

  if (!hasNewContent) {
    console.error(`  [web/${lang}] No new content detected, skipping report.`);
    if (lang === "zh") {
      saveWebState(webState);
      console.error("  [web] State saved.");
    }
    return;
  }

  const s = t(lang);
  const isFirstRun = webResults.some((r) => r.isFirstRun);
  const totalNew = webResults.reduce((sum, r) => sum + r.newItems.length, 0);
  const anthropicNew = webResults.find((r) => r.site === "anthropic")?.newItems.length ?? 0;
  const anthropicTotal = webResults.find((r) => r.site === "anthropic")?.totalDiscovered ?? 0;
  const openaiNew = webResults.find((r) => r.site === "openai")?.newItems.length ?? 0;
  const openaiTotal = webResults.find((r) => r.site === "openai")?.totalDiscovered ?? 0;

  const issueTitle = isFirstRun
    ? lang === "en"
      ? `🌐 Official AI Content Report ${dateStr} (First Crawl)`
      : `🌐 AI 官方内容追踪报告 ${dateStr}（首次全量）`
    : lang === "en"
      ? `🌐 Official AI Content Report ${dateStr}`
      : `🌐 AI 官方内容追踪报告 ${dateStr}`;

  console.error(`  [web/${lang}] Calling LLM for web content report...`);
  try {
    await saveReport(
      {
        data: webResults,
        promptBuilder: (d, ds, _suffix) => buildWebReportPrompt(d as WebFetchResult[], ds, lang),
        headerBuilder: (ds, us, suffix) => {
          const mode = suffix
            ? isFirstRun
              ? `First full crawl (${totalNew} new articles today)`
              : `Incremental update — ${totalNew} new articles today`
            : isFirstRun
              ? `首次全量抓取（今日新增 ${totalNew} 篇）`
              : `今日增量更新 — 共 ${totalNew} 篇新内容`;
          const meta = suffix ? `> ${mode} | Generated: ${us} UTC` : `> ${mode} | 生成时间: ${us} UTC`;
          const sources = suffix
            ? `\n\n## Sources\n- Anthropic: [anthropic.com](https://www.anthropic.com) — ${anthropicNew} new articles (sitemap total: ${anthropicTotal})\n- OpenAI: [openai.com](https://openai.com) — ${openaiNew} new articles (sitemap total: ${openaiTotal})`
            : `\n\n## 数据来源\n- Anthropic: [anthropic.com](https://www.anthropic.com) — 新增 ${anthropicNew} 篇（sitemap 共 ${anthropicTotal} 条）\n- OpenAI: [openai.com](https://openai.com) — 新增 ${openaiNew} 篇（sitemap 共 ${openaiTotal} 条）`;
          return `# ${s.webTitle} ${ds}\n\n${meta}${sources}`;
        },
        fileName: "ai-web",
        issueTitle,
        issueLabel: s.issueLabelWeb,
        maxTokens: LLM_TOKENS_WEB,
      },
      utcStr,
      dateStr,
      digestRepo,
      footer,
      lang,
      { ...defaultDeps, ...deps },
    );
  } catch (err) {
    console.error(`  [web/${lang}] Report generation failed: ${err}`);
  }

  if (lang === "zh") {
    saveWebState(webState);
    console.error("  [web] State saved.");
  }
};

// ---------------------------------------------------------------------------
// Trending report — summary is pre-built in generateSummaries
// ---------------------------------------------------------------------------

export const saveTrendingReport = async (
  trendingData: TrendingData,
  trendingSummary: string,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale = "zh",
  deps: SaveReportDeps = {},
): Promise<void> => {
  const hasData = trendingData.trendingRepos.length > 0 || trendingData.searchRepos.length > 0;
  if (!hasData) {
    console.error(`  [trending/${lang}] No data available, skipping report.`);
    return;
  }

  const s = t(lang);
  console.error(`  [trending/${lang}] Saving trending report...`);

  await saveReport(
    {
      data: trendingSummary,
      promptBuilder: (d, _ds, _suffix) => d as string,
      headerBuilder: (ds, us, suffix) =>
        `# ${s.trendingTitle} ${ds}\n\n> ${s.trendingSources} | ${suffix ? "Generated" : "生成时间"}: ${us} UTC`,
      fileName: "ai-trending",
      issueTitle: s.issueTitleTrending,
      issueLabel: s.issueLabelTrending,
    },
    utcStr,
    dateStr,
    digestRepo,
    footer,
    lang,
    { ...defaultDeps, ...deps },
  );
};

// ---------------------------------------------------------------------------
// Hacker News report
// ---------------------------------------------------------------------------

export const saveHnReport = async (
  hnData: HnData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale = "zh",
  deps: SaveReportDeps = {},
): Promise<void> => {
  if (!hnData.fetchSuccess) {
    console.error(`  [hn/${lang}] No data available, skipping report.`);
    return;
  }

  const s = t(lang);
  const storyCount = hnData.stories.length;

  console.error(`  [hn/${lang}] Calling LLM for HN report...`);
  try {
    await saveReport(
      {
        data: hnData,
        promptBuilder: (d, ds, _suffix) => buildHnPrompt(d as HnData, ds, lang),
        headerBuilder: (ds, us, suffix) =>
          suffix
            ? `# ${s.hnTitle} ${ds}\n\n> Source: [Hacker News](https://news.ycombinator.com/) | ${storyCount} stories | Generated: ${us} UTC`
            : `# ${s.hnTitle} ${ds}\n\n> 数据来源: [Hacker News](https://news.ycombinator.com/) | 共 ${storyCount} 条 | 生成时间: ${us} UTC`,
        fileName: "ai-hn",
        issueTitle: s.issueTitleHn,
        issueLabel: s.issueLabelHn,
      },
      utcStr,
      dateStr,
      digestRepo,
      footer,
      lang,
      { ...defaultDeps, ...deps },
    );
  } catch (err) {
    console.error(`  [hn/${lang}] Report generation failed: ${err}`);
  }
};

// ---------------------------------------------------------------------------
// Product Hunt report
// ---------------------------------------------------------------------------

export const savePhReport = async (
  phData: PhData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale = "zh",
  deps: SaveReportDeps = {},
): Promise<void> => {
  if (!phData.fetchSuccess) {
    console.error(`  [ph/${lang}] No data available, skipping report.`);
    return;
  }

  const s = t(lang);
  const productCount = phData.products.length;

  console.error(`  [ph/${lang}] Calling LLM for Product Hunt report...`);
  try {
    await saveReport(
      {
        data: phData,
        promptBuilder: (d, ds, _suffix) => buildPhPrompt(d as PhData, ds, lang),
        headerBuilder: (ds, us, suffix) =>
          suffix
            ? `# ${s.phTitle} ${ds}\n\n> Source: [Product Hunt](https://www.producthunt.com/) | ${productCount} products | Generated: ${us} UTC`
            : `# ${s.phTitle} ${ds}\n\n> 数据来源: [Product Hunt](https://www.producthunt.com/) | 共 ${productCount} 个产品 | 生成时间: ${us} UTC`,
        fileName: "ai-ph",
        issueTitle: s.issueTitlePh,
        issueLabel: s.issueLabelPh,
      },
      utcStr,
      dateStr,
      digestRepo,
      footer,
      lang,
      { ...defaultDeps, ...deps },
    );
  } catch (err) {
    console.error(`  [ph/${lang}] Report generation failed: ${err}`);
  }
};

// ---------------------------------------------------------------------------
// ArXiv report
// ---------------------------------------------------------------------------

export const saveArxivReport = async (
  arxivData: ArxivData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale = "zh",
  deps: SaveReportDeps = {},
): Promise<void> => {
  if (!arxivData.fetchSuccess) {
    console.error(`  [arxiv/${lang}] No data available, skipping report.`);
    return;
  }

  const s = t(lang);
  const paperCount = arxivData.papers.length;

  console.error(`  [arxiv/${lang}] Calling LLM for ArXiv report...`);
  try {
    await saveReport(
      {
        data: arxivData,
        promptBuilder: (d, ds, _suffix) => buildArxivPrompt(d as ArxivData, ds, lang),
        headerBuilder: (ds, us, suffix) =>
          suffix
            ? `# ${s.arxivTitle} ${ds}\n\n> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | ${paperCount} papers | Generated: ${us} UTC`
            : `# ${s.arxivTitle} ${ds}\n\n> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 ${paperCount} 篇论文 | 生成时间: ${us} UTC`,
        fileName: "ai-arxiv",
        issueTitle: s.issueTitleArxiv,
        issueLabel: s.issueLabelArxiv,
      },
      utcStr,
      dateStr,
      digestRepo,
      footer,
      lang,
      { ...defaultDeps, ...deps },
    );
  } catch (err) {
    console.error(`  [arxiv/${lang}] Report generation failed: ${err}`);
  }
};

// ---------------------------------------------------------------------------
// Hugging Face report
// ---------------------------------------------------------------------------

export const saveHfReport = async (
  hfData: HfData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale = "zh",
  deps: SaveReportDeps = {},
): Promise<void> => {
  if (!hfData.fetchSuccess) {
    console.error(`  [hf/${lang}] No data available, skipping report.`);
    return;
  }

  const s = t(lang);
  const modelCount = hfData.models.length;

  console.error(`  [hf/${lang}] Calling LLM for Hugging Face report...`);
  try {
    await saveReport(
      {
        data: hfData,
        promptBuilder: (d, ds, _suffix) => buildHfPrompt(d as HfData, ds, lang),
        headerBuilder: (ds, us, suffix) =>
          suffix
            ? `# ${s.hfTitle} ${ds}\n\n> Source: [Hugging Face Hub](https://huggingface.co/) | ${modelCount} models | Generated: ${us} UTC`
            : `# ${s.hfTitle} ${ds}\n\n> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 ${modelCount} 个模型 | 生成时间: ${us} UTC`,
        fileName: "ai-hf",
        issueTitle: s.issueTitleHf,
        issueLabel: s.issueLabelHf,
      },
      utcStr,
      dateStr,
      digestRepo,
      footer,
      lang,
      { ...defaultDeps, ...deps },
    );
  } catch (err) {
    console.error(`  [hf/${lang}] Report generation failed: ${err}`);
  }
};

// ---------------------------------------------------------------------------
// Community report (Dev.to + Lobste.rs)
// ---------------------------------------------------------------------------

export const saveCommunityReport = async (
  devtoData: DevtoData,
  lobstersData: LobstersData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale = "zh",
  deps: SaveReportDeps = {},
): Promise<void> => {
  const hasData = devtoData.fetchSuccess || lobstersData.fetchSuccess;
  if (!hasData) {
    console.error(`  [community/${lang}] No data available, skipping report.`);
    return;
  }

  const s = t(lang);
  const devtoCount = devtoData.articles.length;
  const lobstersCount = lobstersData.stories.length;

  console.error(`  [community/${lang}] Calling LLM for community report...`);
  try {
    await saveReport(
      {
        data: { devto: devtoData, lobsters: lobstersData },
        promptBuilder: (d, ds, _suffix) => {
          const { devto, lobsters } = d as { devto: DevtoData; lobsters: LobstersData };
          return buildCommunityPrompt(devto, lobsters, ds, lang);
        },
        headerBuilder: (ds, us, suffix) =>
          suffix
            ? `# ${s.communityTitle} ${ds}\n\n> Sources: [Dev.to](https://dev.to/) (${devtoCount} articles) + [Lobste.rs](https://lobste.rs/) (${lobstersCount} stories) | Generated: ${us} UTC`
            : `# ${s.communityTitle} ${ds}\n\n> 数据来源: [Dev.to](https://dev.to/) (${devtoCount} 篇) + [Lobste.rs](https://lobste.rs/) (${lobstersCount} 条) | 生成时间: ${us} UTC`,
        fileName: "ai-community",
        issueTitle: s.issueTitleCommunity,
        issueLabel: s.issueLabelCommunity,
      },
      utcStr,
      dateStr,
      digestRepo,
      footer,
      lang,
      { ...defaultDeps, ...deps },
    );
  } catch (err) {
    console.error(`  [community/${lang}] Report generation failed: ${err}`);
  }
};
