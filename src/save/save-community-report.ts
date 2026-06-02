import type { DevToData } from "../fetchers/dev-to";
import type { LobstersData } from "../fetchers/lobste-rs";
import { buildCommunityPrompt } from "../prompts";
import { type Locale, t } from "../utils";
import { saveDataSourceReport } from "./save-data-source-report";
import type { SaveReportDeps } from "./saver-types";

export const saveCommunityReport = async (
  devtoData: DevToData,
  lobstersData: LobstersData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale = "zh",
  deps: SaveReportDeps = {},
): Promise<void> => {
  const s = t(lang);
  const devtoCount = devtoData.articles.length;
  const lobstersCount = lobstersData.stories.length;
  await saveDataSourceReport(
    {
      hasData: devtoData.fetchSuccess || lobstersData.fetchSuccess,
      logPrefix: "community",
      logAction: "community",
      data: { devto: devtoData, lobsters: lobstersData },
      promptBuilder: (d, ds, _suffix) => {
        const { devto, lobsters } = d as { devto: DevToData; lobsters: LobstersData };
        return buildCommunityPrompt(devto, lobsters, ds, lang);
      },
      headerBuilder: (suffix, ds, us) =>
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
    deps,
  );
};
