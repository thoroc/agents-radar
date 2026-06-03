import { saveWebState, type WebFetchResult, type WebState } from "../fetchers";
import { buildWebReportPrompt } from "../prompts";
import { LLM_TOKENS_WEB } from "../report/constants";
import { getPrimaryLang, type Locale, t } from "../utils";
import { saveReport } from "./report";
import type { SaveReportDeps } from "./saver-types";

export const saveWeb = async (
  webResults: WebFetchResult[],
  webState: WebState,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale = getPrimaryLang() as Locale,
  deps: SaveReportDeps = {},
): Promise<void> => {
  const hasNewContent = webResults.some((r) => r.newItems.length > 0);

  if (!hasNewContent) {
    console.error(`  [web/${lang}] No new content detected, skipping report.`);
    if (lang === getPrimaryLang()) {
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

  const issueTitle = isFirstRun ? s.webIssueTitleFirstCrawl : s.webIssueTitle;

  console.error(`  [web/${lang}] Calling LLM for web content report...`);
  try {
    await saveReport(
      {
        data: webResults,
        promptBuilder: (d) => buildWebReportPrompt(d as WebFetchResult[], lang),
        headerBuilder: (_ds, us) => {
          const mode = isFirstRun
            ? s.webModeFirstCrawl.replace("{n}", String(totalNew))
            : s.webModeIncremental.replace("{n}", String(totalNew));
          const generated = s.headerGeneratedLabel.replace("{utcStr}", us);
          const sourcesHeading = s.webSourcesHeader;
          const anthropicLine = s.webSourcesAnthropic
            .replace("{n}", String(anthropicNew))
            .replace("{total}", String(anthropicTotal));
          const openaiLine = s.webSourcesOpenai
            .replace("{n}", String(openaiNew))
            .replace("{total}", String(openaiTotal));
          const meta = `> ${mode} | ${generated} UTC`;
          const sources = `\n\n## ${sourcesHeading}\n- Anthropic: [anthropic.com](https://www.anthropic.com) — ${anthropicLine}\n- OpenAI: [openai.com](https://openai.com) — ${openaiLine}`;
          return `# ${s.webTitle} ${_ds}\n\n${meta}${sources}`;
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
      deps,
    );
  } catch (err) {
    console.error(`  [web/${lang}] Report generation failed: ${err}`);
  }

  if (lang === getPrimaryLang()) {
    saveWebState(webState);
    console.error("  [web] State saved.");
  }
};
