import { saveWebState, type WebFetchResult, type WebState } from "../fetchers";
import { buildWebReportPrompt } from "../prompts";
import { LLM_TOKENS_WEB } from "../report/report-constants";
import { type Locale, t } from "../utils";
import { defaultDeps, saveReport } from "./save-report";
import type { SaveReportDeps } from "./saver-types";

export const saveWebReport = async (
  webResults: WebFetchResult[],
  webState: WebState,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale = "zh-CN",
  deps: SaveReportDeps = {},
): Promise<void> => {
  const hasNewContent = webResults.some((r) => r.newItems.length > 0);

  if (!hasNewContent) {
    console.error(`  [web/${lang}] No new content detected, skipping report.`);
    if (lang === "zh-CN") {
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
    ? lang === "en-US"
      ? `🌐 Official AI Content Report ${dateStr} (First Crawl)`
      : `🌐 AI 官方内容追踪报告 ${dateStr}（首次全量）`
    : lang === "en-US"
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

  if (lang === "zh-CN") {
    saveWebState(webState);
    console.error("  [web] State saved.");
  }
};
