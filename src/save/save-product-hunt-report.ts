import type { ProductHuntData } from "../fetchers/product-hunt";
import { buildProductHuntPrompt } from "../prompts";
import { getPrimaryLang, type Locale, t } from "../utils";
import { buildSourceHeader } from "./build-source-header";
import { saveDataSourceReport } from "./save-data-source-report";
import type { SaveReportDeps } from "./saver-types";

export const saveProductHuntReport = async (
  phData: ProductHuntData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale = getPrimaryLang() as Locale,
  deps: SaveReportDeps = {},
): Promise<void> => {
  const s = t(lang);
  const count = s.phCount.replace("{n}", String(phData.products.length));
  await saveDataSourceReport(
    {
      hasData: phData.fetchSuccess,
      logPrefix: "ph",
      logAction: "Product Hunt",
      data: phData,
      promptBuilder: (d) => buildProductHuntPrompt(d as ProductHuntData, lang),
      headerBuilder: (_ds, us) =>
        buildSourceHeader(lang, _ds, us, s.phTitle, "Product Hunt", "https://www.producthunt.com/", count),
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
