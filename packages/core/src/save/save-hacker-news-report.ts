import type { HackerNewsData } from "../fetchers/hacker-news";
import { buildHackerNewsPrompt } from "../prompts";
import { getPrimaryLang, type Locale, t } from "../utils";
import { buildSourceHeader } from "./build-source-header";
import { saveDataSourceReport } from "./save-data-source-report";
import type { SaveReportDeps } from "./saver-types";

export const saveHackerNewsReport = async (
  hnData: HackerNewsData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale = getPrimaryLang() as Locale,
  deps: SaveReportDeps = {},
): Promise<void> => {
  const s = t(lang);
  const count = s.hnCount.replace("{n}", String(hnData.stories.length));
  await saveDataSourceReport(
    {
      hasData: hnData.fetchSuccess,
      logPrefix: "hn",
      logAction: "HN",
      data: hnData,
      promptBuilder: (d) => buildHackerNewsPrompt(d as HackerNewsData, lang),
      headerBuilder: (_ds, us) =>
        buildSourceHeader(lang, _ds, us, s.hnTitle, "Hacker News", "https://news.ycombinator.com/", count),
      fileName: "ai-hn",
      issueTitle: s.issueTitleHn,
      issueLabel: s.issueLabelHn,
    },
    utcStr,
    dateStr,
    digestRepo,
    footer,
    lang,
    deps,
  );
};
