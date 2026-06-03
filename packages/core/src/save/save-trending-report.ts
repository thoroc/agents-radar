import type { TrendingData } from "../fetchers/trending";
import { getPrimaryLang, type Locale, t } from "../utils";
import { saveReport } from "./save-report";
import type { SaveReportDeps } from "./saver-types";

export const saveTrendingReport = async (
  trendingData: TrendingData,
  trendingSummary: string,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale = getPrimaryLang() as Locale,
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
      promptBuilder: (d) => d as string,
      headerBuilder: (_ds, us) => {
        const generated = s.headerGeneratedLabel.replace("{utcStr}", us);
        return `# ${s.trendingTitle} ${_ds}\n\n> ${s.trendingSources} | ${generated} UTC`;
      },
      fileName: "ai-trending",
      issueTitle: s.issueTitleTrending,
      issueLabel: s.issueLabelTrending,
    },
    utcStr,
    dateStr,
    digestRepo,
    footer,
    lang,
    deps,
  );
};
