/**
 * Report saver functions — LLM call + file save + optional GitHub issue.
 * Extracted from index.ts for separation of concerns.
 */

import type { ArxivData } from "./arxiv";
import type { DevtoData } from "./devto";
import { createGitHubIssue } from "./github";
import type { HfData } from "./hf";
import type { HnData } from "./hn";
import { type Locale, t } from "./i18n";
import type { LobstersData } from "./lobsters";
import type { PhData } from "./ph";
import {
  buildArxivPrompt,
  buildCommunityPrompt,
  buildHfPrompt,
  buildHnPrompt,
  buildPhPrompt,
  buildWebReportPrompt,
} from "./prompts-data";
import { callLlm, LLM_TOKENS_WEB, saveFile } from "./report";
import type { TrendingData } from "./trending";
import { saveWebState, type WebFetchResult, type WebState } from "./web";

// ---------------------------------------------------------------------------
// Web report
// ---------------------------------------------------------------------------

export const saveWebReport = async (
  webResults: WebFetchResult[],
  webState: WebState,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale = "zh",
): Promise<void> => {
  const hasNewContent = webResults.some((r) => r.newItems.length > 0);

  if (hasNewContent) {
    console.error(`  [web/${lang}] Calling LLM for web content report...`);
    try {
      const webSummary = await callLlm(buildWebReportPrompt(webResults, dateStr, lang), LLM_TOKENS_WEB);
      const isFirstRun = webResults.some((r) => r.isFirstRun);
      const totalNew = webResults.reduce((sum, r) => sum + r.newItems.length, 0);

      const anthropicNew = webResults.find((r) => r.site === "anthropic")?.newItems.length ?? 0;
      const anthropicTotal = webResults.find((r) => r.site === "anthropic")?.totalDiscovered ?? 0;
      const openaiNew = webResults.find((r) => r.site === "openai")?.newItems.length ?? 0;
      const openaiTotal = webResults.find((r) => r.site === "openai")?.totalDiscovered ?? 0;

      const s = t(lang);
      const fileName = lang === "zh" ? "ai-web.md" : `ai-web.${lang}.md`;
      const mode = isFirstRun ? s.webFirstCrawl : s.webTodayUpdate;

      const webTitle = `# ${s.webTitle} ${dateStr}\n\n`;
      const webMeta = `> ${mode} | ${lang === "en" ? `New content: ${totalNew} articles` : `新增内容: ${totalNew} 篇`} | ${lang === "en" ? `Generated: ${utcStr} UTC` : `生成时间: ${utcStr} UTC`}\n\n`;
      const webSources =
        lang === "en"
          ? `${s.webSourcesHeader}\n` +
            `- Anthropic: [anthropic.com](https://www.anthropic.com) — ${anthropicNew} new articles (sitemap total: ${anthropicTotal})\n` +
            `- OpenAI: [openai.com](https://openai.com) — ${openaiNew} new articles (sitemap total: ${openaiTotal})\n\n`
          : `${s.webSourcesHeader}\n` +
            `- Anthropic: [anthropic.com](https://www.anthropic.com) — 新增 ${anthropicNew} 篇（sitemap 共 ${anthropicTotal} 条）\n` +
            `- OpenAI: [openai.com](https://openai.com) — 新增 ${openaiNew} 篇（sitemap 共 ${openaiTotal} 条）\n\n`;

      const webContent = `${webTitle + webMeta + webSources}---\n\n${webSummary}${footer}`;

      console.error(`  Saved ${saveFile(webContent, dateStr, fileName)}`);

      if (digestRepo) {
        const issueTitle =
          lang === "en"
            ? `🌐 Official AI Content Report ${dateStr}${isFirstRun ? " (First Crawl)" : ""}`
            : `🌐 AI 官方内容追踪报告 ${dateStr}${isFirstRun ? "（首次全量）" : ""}`;
        const webLabel = s.issueLabelWeb;
        const webUrl = await createGitHubIssue(issueTitle, webContent, webLabel);
        console.error(`  Created web issue (${lang}): ${webUrl}`);
      }
    } catch (err) {
      console.error(`  [web/${lang}] Report generation failed: ${err}`);
    }
  } else {
    console.error(`  [web/${lang}] No new content detected, skipping report.`);
  }

  if (lang === "zh") {
    saveWebState(webState);
    console.error("  [web] State saved.");
  }
};

// ---------------------------------------------------------------------------
// Trending report
// ---------------------------------------------------------------------------

export const saveTrendingReport = async (
  trendingData: TrendingData,
  trendingSummary: string,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale = "zh",
): Promise<void> => {
  const hasData = trendingData.trendingRepos.length > 0 || trendingData.searchRepos.length > 0;
  if (!hasData) {
    console.error(`  [trending/${lang}] No data available, skipping report.`);
    return;
  }

  const s = t(lang);
  const fileName = lang === "zh" ? "ai-trending.md" : `ai-trending.${lang}.md`;
  const header =
    `# ${s.trendingTitle} ${dateStr}\n\n` +
    `> ${s.trendingSources} | ${lang === "en" ? "Generated" : "生成时间"}: ${utcStr} UTC\n\n---\n\n`;

  const trendingContent = header + trendingSummary + footer;

  console.error(`  Saved ${saveFile(trendingContent, dateStr, fileName)}`);

  if (digestRepo) {
    const trendingTitle = `${s.issueTitleTrending} ${dateStr}`;
    const trendingLabel = s.issueLabelTrending;
    const trendingUrl = await createGitHubIssue(trendingTitle, trendingContent, trendingLabel);
    console.error(`  Created trending issue (${lang}): ${trendingUrl}`);
  }
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
): Promise<void> => {
  if (!hnData.fetchSuccess) {
    console.error(`  [hn/${lang}] No data available, skipping report.`);
    return;
  }

  console.error(`  [hn/${lang}] Calling LLM for HN report...`);
  try {
    const s = t(lang);
    const hnSummary = await callLlm(buildHnPrompt(hnData, dateStr, lang));
    const fileName = lang === "zh" ? "ai-hn.md" : `ai-hn.${lang}.md`;
    const header =
      lang === "en"
        ? `# ${s.hnTitle} ${dateStr}\n\n` +
          `> Source: [Hacker News](https://news.ycombinator.com/) | ` +
          `${hnData.stories.length} stories | Generated: ${utcStr} UTC\n\n` +
          `---\n\n`
        : `# ${s.hnTitle} ${dateStr}\n\n` +
          `> 数据来源: [Hacker News](https://news.ycombinator.com/) | ` +
          `共 ${hnData.stories.length} 条 | 生成时间: ${utcStr} UTC\n\n` +
          `---\n\n`;

    const hnContent = header + hnSummary + footer;

    console.error(`  Saved ${saveFile(hnContent, dateStr, fileName)}`);

    if (digestRepo) {
      const hnTitle = `${s.issueTitleHn} ${dateStr}`;
      const hnLabel = s.issueLabelHn;
      const hnUrl = await createGitHubIssue(hnTitle, hnContent, hnLabel);
      console.error(`  Created HN issue (${lang}): ${hnUrl}`);
    }
  } catch (err) {
    console.error(`  [hn/${lang}] Report generation failed: ${err}`);
  }
};

// ---------------------------------------------------------------------------
// Product Hunt
// ---------------------------------------------------------------------------

export const savePhReport = async (
  phData: PhData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale = "zh",
): Promise<void> => {
  if (!phData.fetchSuccess) {
    console.error(`  [ph/${lang}] No data available, skipping report.`);
    return;
  }

  console.error(`  [ph/${lang}] Calling LLM for Product Hunt report...`);
  try {
    const s = t(lang);
    const phSummary = await callLlm(buildPhPrompt(phData, dateStr, lang));
    const fileName = lang === "zh" ? "ai-ph.md" : `ai-ph.${lang}.md`;
    const header =
      lang === "en"
        ? `# ${s.phTitle} ${dateStr}\n\n` +
          `> Source: [Product Hunt](https://www.producthunt.com/) | ` +
          `${phData.products.length} products | Generated: ${utcStr} UTC\n\n` +
          `---\n\n`
        : `# ${s.phTitle} ${dateStr}\n\n` +
          `> 数据来源: [Product Hunt](https://www.producthunt.com/) | ` +
          `共 ${phData.products.length} 个产品 | 生成时间: ${utcStr} UTC\n\n` +
          `---\n\n`;

    const phContent = header + phSummary + footer;

    console.error(`  Saved ${saveFile(phContent, dateStr, fileName)}`);

    if (digestRepo) {
      const phTitle = `${s.issueTitlePh} ${dateStr}`;
      const phLabel = s.issueLabelPh;
      const phUrl = await createGitHubIssue(phTitle, phContent, phLabel);
      console.error(`  Created PH issue (${lang}): ${phUrl}`);
    }
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
): Promise<void> => {
  if (!arxivData.fetchSuccess) {
    console.error(`  [arxiv/${lang}] No data available, skipping report.`);
    return;
  }

  console.error(`  [arxiv/${lang}] Calling LLM for ArXiv report...`);
  try {
    const s = t(lang);
    const summary = await callLlm(buildArxivPrompt(arxivData, dateStr, lang));
    const fileName = lang === "zh" ? "ai-arxiv.md" : `ai-arxiv.${lang}.md`;
    const header =
      lang === "en"
        ? `# ${s.arxivTitle} ${dateStr}\n\n` +
          `> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | ` +
          `${arxivData.papers.length} papers | Generated: ${utcStr} UTC\n\n` +
          `---\n\n`
        : `# ${s.arxivTitle} ${dateStr}\n\n` +
          `> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | ` +
          `共 ${arxivData.papers.length} 篇论文 | 生成时间: ${utcStr} UTC\n\n` +
          `---\n\n`;

    const content = header + summary + footer;

    console.error(`  Saved ${saveFile(content, dateStr, fileName)}`);

    if (digestRepo) {
      const title = `${s.issueTitleArxiv} ${dateStr}`;
      const label = s.issueLabelArxiv;
      const url = await createGitHubIssue(title, content, label);
      console.error(`  Created ArXiv issue (${lang}): ${url}`);
    }
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
): Promise<void> => {
  if (!hfData.fetchSuccess) {
    console.error(`  [hf/${lang}] No data available, skipping report.`);
    return;
  }

  console.error(`  [hf/${lang}] Calling LLM for Hugging Face report...`);
  try {
    const s = t(lang);
    const summary = await callLlm(buildHfPrompt(hfData, dateStr, lang));
    const fileName = lang === "zh" ? "ai-hf.md" : `ai-hf.${lang}.md`;
    const header =
      lang === "en"
        ? `# ${s.hfTitle} ${dateStr}\n\n` +
          `> Source: [Hugging Face Hub](https://huggingface.co/) | ` +
          `${hfData.models.length} models | Generated: ${utcStr} UTC\n\n` +
          `---\n\n`
        : `# ${s.hfTitle} ${dateStr}\n\n` +
          `> 数据来源: [Hugging Face Hub](https://huggingface.co/) | ` +
          `共 ${hfData.models.length} 个模型 | 生成时间: ${utcStr} UTC\n\n` +
          `---\n\n`;

    const content = header + summary + footer;

    console.error(`  Saved ${saveFile(content, dateStr, fileName)}`);

    if (digestRepo) {
      const title = `${s.issueTitleHf} ${dateStr}`;
      const label = s.issueLabelHf;
      const url = await createGitHubIssue(title, content, label);
      console.error(`  Created HF issue (${lang}): ${url}`);
    }
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
): Promise<void> => {
  const hasData = devtoData.fetchSuccess || lobstersData.fetchSuccess;
  if (!hasData) {
    console.error(`  [community/${lang}] No data available, skipping report.`);
    return;
  }

  console.error(`  [community/${lang}] Calling LLM for community report...`);
  try {
    const s = t(lang);
    const summary = await callLlm(buildCommunityPrompt(devtoData, lobstersData, dateStr, lang));
    const fileName = lang === "zh" ? "ai-community.md" : `ai-community.${lang}.md`;
    const devtoCount = devtoData.articles.length;
    const lobstersCount = lobstersData.stories.length;
    const header =
      lang === "en"
        ? `# ${s.communityTitle} ${dateStr}\n\n` +
          `> Sources: [Dev.to](https://dev.to/) (${devtoCount} articles) + [Lobste.rs](https://lobste.rs/) (${lobstersCount} stories) | Generated: ${utcStr} UTC\n\n` +
          `---\n\n`
        : `# ${s.communityTitle} ${dateStr}\n\n` +
          `> 数据来源: [Dev.to](https://dev.to/) (${devtoCount} 篇) + [Lobste.rs](https://lobste.rs/) (${lobstersCount} 条) | 生成时间: ${utcStr} UTC\n\n` +
          `---\n\n`;

    const content = header + summary + footer;

    console.error(`  Saved ${saveFile(content, dateStr, fileName)}`);

    if (digestRepo) {
      const title = `${s.issueTitleCommunity} ${dateStr}`;
      const label = s.issueLabelCommunity;
      const url = await createGitHubIssue(title, content, label);
      console.error(`  Created community issue (${lang}): ${url}`);
    }
  } catch (err) {
    console.error(`  [community/${lang}] Report generation failed: ${err}`);
  }
};
