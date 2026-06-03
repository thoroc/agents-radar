import type { DevToData } from "../fetchers/dev-to";
import type { LobstersData } from "../fetchers/lobste-rs";
import { buildCommunityPrompt } from "../prompts";
import { getPrimaryLang, type Locale, t } from "../utils";
import { saveDataSource } from "./data-source-report";
import type { SaveReportDeps } from "./saver-types";

export const saveCommunity = async (
  devtoData: DevToData,
  lobstersData: LobstersData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale = getPrimaryLang() as Locale,
  deps: SaveReportDeps = {},
): Promise<void> => {
  const s = t(lang);
  const devtoCount = devtoData.articles.length;
  const lobstersCount = lobstersData.stories.length;
  await saveDataSource(
    {
      hasData: devtoData.fetchSuccess || lobstersData.fetchSuccess,
      logPrefix: "community",
      logAction: "community",
      data: { devto: devtoData, lobsters: lobstersData },
      promptBuilder: (d) => {
        const { devto, lobsters } = d as { devto: DevToData; lobsters: LobstersData };
        return buildCommunityPrompt(devto, lobsters, lang);
      },
      headerBuilder: (_ds, us) => {
        const generated = s.headerGeneratedLabel.replace("{utcStr}", us);
        const sourceLabel = s.headerSourceLabel;
        return `# ${s.communityTitle} ${_ds}\n\n> ${sourceLabel}: [Dev.to](https://dev.to/) (${devtoCount} ${s.devtoArticles}) + [Lobste.rs](https://lobste.rs/) (${lobstersCount} ${s.lobstersStories}) | ${generated} UTC`;
      },
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
