import type { PhData } from "../fetchers/ph";
import { buildPhPrompt } from "../prompts";
import { toPromptLang } from "../types";
import { type Locale, t } from "../utils";
import { buildSourceHeader, saveDataSourceReport } from "./save-data-source-report";
import type { SaveReportDeps } from "./saver-types";

export const savePhReport = async (
  phData: PhData,
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
      hasData: phData.fetchSuccess,
      logPrefix: "ph",
      logAction: "Product Hunt",
      data: phData,
      promptBuilder: (d, ds, _suffix) => buildPhPrompt(d as PhData, ds, toPromptLang(lang)),
      headerBuilder: (suffix, ds, us) =>
        buildSourceHeader(
          suffix,
          ds,
          us,
          s.phTitle,
          "Product Hunt",
          "https://www.producthunt.com/",
          `${phData.products.length} products`,
          `共 ${phData.products.length} 个产品`,
        ),
      fileName: "ai-ph",
      issueTitle: s.issueTitlePh,
      issueLabel: s.issueLabelPh,
    },
    utcStr,
    dateStr,
    digestRepo,
    footer,
    lang,
    deps,
  );
};
