import type { DevtoData } from "./fetchers/devto";
import type { LobstersData } from "./fetchers/lobsters";
import { buildCommunityPrompt } from "./prompts";
import { saveDataSourceReport } from "./save-data-source-report";
import type { SaveReportDeps } from "./saver-types";
import { toPromptLang } from "./types";
import { type Locale, t } from "./utils";

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
        const { devto, lobsters } = d as { devto: DevtoData; lobsters: LobstersData };
        return buildCommunityPrompt(devto, lobsters, ds, toPromptLang(lang));
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
