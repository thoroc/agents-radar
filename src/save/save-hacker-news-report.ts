import type { HackerNewsData } from "../fetchers/hacker-news";
import { buildHackerNewsPrompt } from "../prompts";
import { toPromptLang } from "../types";
import { type Locale, t } from "../utils";
import { buildSourceHeader, saveDataSourceReport } from "./save-data-source-report";
import type { SaveReportDeps } from "./saver-types";

export const saveHackerNewsReport = async (
  hnData: HackerNewsData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale = "zh",
  deps: SaveReportDeps = {},
): Promise<void> => {
  const s = t(lang);
  await saveDataSourceReport(
    {
      hasData: hnData.fetchSuccess,
      logPrefix: "hn",
      logAction: "HN",
      data: hnData,
      promptBuilder: (d, ds, _suffix) => buildHackerNewsPrompt(d as HackerNewsData, ds, toPromptLang(lang)),
      headerBuilder: (suffix, ds, us) =>
        buildSourceHeader(
          suffix,
          ds,
          us,
          s.hnTitle,
          "Hacker News",
          "https://news.ycombinator.com/",
          `${hnData.stories.length} stories`,
          `共 ${hnData.stories.length} 条`,
        ),
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
