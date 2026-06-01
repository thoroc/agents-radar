import type { TrendingData } from "./fetchers/trending";
import { defaultDeps, saveReport } from "./save-report";
import type { SaveReportDeps } from "./saver-types";
import { type Locale, t } from "./utils";

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
