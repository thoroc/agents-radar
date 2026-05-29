import { t, interpolate, type Lang, DEFAULT_PRIMARY_LANGUAGE } from "./i18n.ts";
import {
  buildWebReportPrompt,
  buildHnPrompt,
  buildPhPrompt,
  buildArxivPrompt,
  buildHfPrompt,
  buildCommunityPrompt,
} from "./prompts-data.ts";
import { callLlm, saveFile, LLM_TOKENS_WEB } from "./report.ts";
import { createGitHubIssue } from "./github.ts";
import { saveWebState, type WebFetchResult, type WebState } from "./web.ts";
import type { HnData } from "./hn.ts";
import type { PhData } from "./ph.ts";
import type { TrendingData } from "./trending.ts";
import type { ArxivData } from "./arxiv.ts";
import type { HfData } from "./hf.ts";
import type { DevtoData } from "./devto.ts";
import type { LobstersData } from "./lobsters.ts";

export async function saveWebReport(
  webResults: WebFetchResult[],
  webState: WebState,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Lang = DEFAULT_PRIMARY_LANGUAGE,
): Promise<void> {
  const hasNewContent = webResults.some((r) => r.newItems.length > 0);

  if (hasNewContent) {
    console.log(`  [web/${lang}] Calling LLM for web content report...`);
    try {
      const webSummary = await callLlm(buildWebReportPrompt(webResults, dateStr, lang), LLM_TOKENS_WEB);
      const isFirstRun = webResults.some((r) => r.isFirstRun);
      const totalNew = webResults.reduce((sum, r) => sum + r.newItems.length, 0);

      const anthropicNew = webResults.find((r) => r.site === "anthropic")?.newItems.length ?? 0;
      const anthropicTotal = webResults.find((r) => r.site === "anthropic")?.totalDiscovered ?? 0;
      const openaiNew = webResults.find((r) => r.site === "openai")?.newItems.length ?? 0;
      const openaiTotal = webResults.find((r) => r.site === "openai")?.totalDiscovered ?? 0;

      const s = t(lang);
      const fileName = lang === DEFAULT_PRIMARY_LANGUAGE ? "ai-web.md" : `ai-web.${lang}.md`;
      const mode = isFirstRun ? s.webFirstCrawl : s.webTodayUpdate;

      const webTitle = `# ${s.webTitle} ${dateStr}\n\n`;
      const webMeta = `> ${mode} | ${interpolate(s.webNewContent, { count: totalNew })} | ${interpolate(s.webGenerated, { utcStr })}\n\n`;
      const webSources =
        `${s.webSourcesHeader}\n` +
        `${interpolate(s.webSourcesAnthropic, { new: anthropicNew, total: anthropicTotal })}\n` +
        `${interpolate(s.webSourcesOpenai, { new: openaiNew, total: openaiTotal })}\n\n`;

      const webContent = webTitle + webMeta + webSources + `---\n\n` + webSummary + footer;

      console.log(`  Saved ${saveFile(webContent, dateStr, fileName)}`);

      if (digestRepo) {
        const issueTitle = isFirstRun
          ? interpolate(s.webIssueTitleFirstCrawl, { dateStr })
          : interpolate(s.webIssueTitle, { dateStr });
        const webLabel = s.issueLabelWeb;
        const webUrl = await createGitHubIssue(issueTitle, webContent, webLabel, lang);
        console.log(`  Created web issue (${lang}): ${webUrl}`);
      }
    } catch (err) {
      console.error(`  [web/${lang}] Report generation failed: ${err}`);
    }
  } else {
    console.log(`  [web/${lang}] No new content detected, skipping report.`);
  }

  if (lang === DEFAULT_PRIMARY_LANGUAGE) {
    saveWebState(webState);
    console.log("  [web] State saved.");
  }
}

export async function saveTrendingReport(
  trendingData: TrendingData,
  trendingSummary: string,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Lang = DEFAULT_PRIMARY_LANGUAGE,
): Promise<void> {
  const hasData = trendingData.trendingRepos.length > 0 || trendingData.searchRepos.length > 0;
  if (!hasData) {
    console.log(`  [trending/${lang}] No data available, skipping report.`);
    return;
  }

  const s = t(lang);
  const fileName = lang === DEFAULT_PRIMARY_LANGUAGE ? "ai-trending.md" : `ai-trending.${lang}.md`;
  const header =
    `# ${s.trendingTitle} ${dateStr}\n\n` +
    interpolate(s.trendingMeta, { sources: s.trendingSources, utcStr });

  const trendingContent = header + trendingSummary + footer;

  console.log(`  Saved ${saveFile(trendingContent, dateStr, fileName)}`);

  if (digestRepo) {
    const trendingTitle = `${s.issueTitleTrending} ${dateStr}`;
    const trendingLabel = s.issueLabelTrending;
    const trendingUrl = await createGitHubIssue(trendingTitle, trendingContent, trendingLabel, lang);
    console.log(`  Created trending issue (${lang}): ${trendingUrl}`);
  }
}

export async function saveHnReport(
  hnData: HnData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Lang = DEFAULT_PRIMARY_LANGUAGE,
): Promise<void> {
  if (!hnData.fetchSuccess) {
    console.log(`  [hn/${lang}] No data available, skipping report.`);
    return;
  }

  console.log(`  [hn/${lang}] Calling LLM for HN report...`);
  try {
    const s = t(lang);
    const hnSummary = await callLlm(buildHnPrompt(hnData, dateStr, lang));
    const fileName = lang === DEFAULT_PRIMARY_LANGUAGE ? "ai-hn.md" : `ai-hn.${lang}.md`;
    const header = `# ${s.hnTitle} ${dateStr}\n\n${interpolate(s.hnMeta, { count: hnData.stories.length, utcStr })}`;

    const hnContent = header + hnSummary + footer;

    console.log(`  Saved ${saveFile(hnContent, dateStr, fileName)}`);

    if (digestRepo) {
      const hnTitle = `${s.issueTitleHn} ${dateStr}`;
      const hnLabel = s.issueLabelHn;
      const hnUrl = await createGitHubIssue(hnTitle, hnContent, hnLabel, lang);
      console.log(`  Created HN issue (${lang}): ${hnUrl}`);
    }
  } catch (err) {
    console.error(`  [hn/${lang}] Report generation failed: ${err}`);
  }
}

export async function savePhReport(
  phData: PhData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Lang = DEFAULT_PRIMARY_LANGUAGE,
): Promise<void> {
  if (!phData.fetchSuccess) {
    console.log(`  [ph/${lang}] No data available, skipping report.`);
    return;
  }

  console.log(`  [ph/${lang}] Calling LLM for Product Hunt report...`);
  try {
    const s = t(lang);
    const phSummary = await callLlm(buildPhPrompt(phData, dateStr, lang));
    const fileName = lang === DEFAULT_PRIMARY_LANGUAGE ? "ai-ph.md" : `ai-ph.${lang}.md`;
    const header = `# ${s.phTitle} ${dateStr}\n\n${interpolate(s.phMeta, { count: phData.products.length, utcStr })}`;

    const phContent = header + phSummary + footer;

    console.log(`  Saved ${saveFile(phContent, dateStr, fileName)}`);

    if (digestRepo) {
      const phTitle = `${s.issueTitlePh} ${dateStr}`;
      const phLabel = s.issueLabelPh;
      const phUrl = await createGitHubIssue(phTitle, phContent, phLabel, lang);
      console.log(`  Created PH issue (${lang}): ${phUrl}`);
    }
  } catch (err) {
    console.error(`  [ph/${lang}] Report generation failed: ${err}`);
  }
}

export async function saveArxivReport(
  arxivData: ArxivData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Lang = DEFAULT_PRIMARY_LANGUAGE,
): Promise<void> {
  if (!arxivData.fetchSuccess) {
    console.log(`  [arxiv/${lang}] No data available, skipping report.`);
    return;
  }

  console.log(`  [arxiv/${lang}] Calling LLM for ArXiv report...`);
  try {
    const s = t(lang);
    const summary = await callLlm(buildArxivPrompt(arxivData, dateStr, lang));
    const fileName = lang === DEFAULT_PRIMARY_LANGUAGE ? "ai-arxiv.md" : `ai-arxiv.${lang}.md`;
    const header = `# ${s.arxivTitle} ${dateStr}\n\n${interpolate(s.arxivMeta, { count: arxivData.papers.length, utcStr })}`;

    const content = header + summary + footer;

    console.log(`  Saved ${saveFile(content, dateStr, fileName)}`);

    if (digestRepo) {
      const title = `${s.issueTitleArxiv} ${dateStr}`;
      const label = s.issueLabelArxiv;
      const url = await createGitHubIssue(title, content, label, lang);
      console.log(`  Created ArXiv issue (${lang}): ${url}`);
    }
  } catch (err) {
    console.error(`  [arxiv/${lang}] Report generation failed: ${err}`);
  }
}

export async function saveHfReport(
  hfData: HfData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Lang = DEFAULT_PRIMARY_LANGUAGE,
): Promise<void> {
  if (!hfData.fetchSuccess) {
    console.log(`  [hf/${lang}] No data available, skipping report.`);
    return;
  }

  console.log(`  [hf/${lang}] Calling LLM for Hugging Face report...`);
  try {
    const s = t(lang);
    const summary = await callLlm(buildHfPrompt(hfData, dateStr, lang));
    const fileName = lang === DEFAULT_PRIMARY_LANGUAGE ? "ai-hf.md" : `ai-hf.${lang}.md`;
    const header = `# ${s.hfTitle} ${dateStr}\n\n${interpolate(s.hfMeta, { count: hfData.models.length, utcStr })}`;

    const content = header + summary + footer;

    console.log(`  Saved ${saveFile(content, dateStr, fileName)}`);

    if (digestRepo) {
      const title = `${s.issueTitleHf} ${dateStr}`;
      const label = s.issueLabelHf;
      const url = await createGitHubIssue(title, content, label, lang);
      console.log(`  Created HF issue (${lang}): ${url}`);
    }
  } catch (err) {
    console.error(`  [hf/${lang}] Report generation failed: ${err}`);
  }
}

export async function saveCommunityReport(
  devtoData: DevtoData,
  lobstersData: LobstersData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Lang = DEFAULT_PRIMARY_LANGUAGE,
): Promise<void> {
  const hasData = devtoData.fetchSuccess || lobstersData.fetchSuccess;
  if (!hasData) {
    console.log(`  [community/${lang}] No data available, skipping report.`);
    return;
  }

  console.log(`  [community/${lang}] Calling LLM for community report...`);
  try {
    const s = t(lang);
    const summary = await callLlm(buildCommunityPrompt(devtoData, lobstersData, dateStr, lang));
    const fileName = lang === DEFAULT_PRIMARY_LANGUAGE ? "ai-community.md" : `ai-community.${lang}.md`;
    const devtoCount = devtoData.articles.length;
    const lobstersCount = lobstersData.stories.length;
    const header =
      `# ${s.communityTitle} ${dateStr}\n\n` +
      interpolate(s.communityMeta, { devto: devtoCount, lobsters: lobstersCount, utcStr });

    const content = header + summary + footer;

    console.log(`  Saved ${saveFile(content, dateStr, fileName)}`);

    if (digestRepo) {
      const title = `${s.issueTitleCommunity} ${dateStr}`;
      const label = s.issueLabelCommunity;
      const url = await createGitHubIssue(title, content, label, lang);
      console.log(`  Created community issue (${lang}): ${url}`);
    }
  } catch (err) {
    console.error(`  [community/${lang}] Report generation failed: ${err}`);
  }
}
