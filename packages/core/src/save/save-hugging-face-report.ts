import type { HuggingFaceData } from "../fetchers/hugging-face";
import { buildHuggingFacePrompt } from "../prompts";
import { getPrimaryLang, type Locale, t } from "../utils";
import { buildSourceHeader } from "./build-source-header";
import { saveDataSourceReport } from "./save-data-source-report";
import type { SaveReportDeps } from "./saver-types";

export const saveHuggingFaceReport = async (
  hfData: HuggingFaceData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale = getPrimaryLang() as Locale,
  deps: SaveReportDeps = {},
): Promise<void> => {
  const s = t(lang);
  const count = s.hfCount.replace("{n}", String(hfData.models.length));
  await saveDataSourceReport(
    {
      hasData: hfData.fetchSuccess,
      logPrefix: "hf",
      logAction: "Hugging Face",
      data: hfData,
      promptBuilder: (d) => buildHuggingFacePrompt(d as HuggingFaceData, lang),
      headerBuilder: (_ds, us) =>
        buildSourceHeader(
          lang,
          _ds,
          us,
          s.huggingFaceTitle,
          "Hugging Face Hub",
          "https://huggingface.co/",
          count,
        ),
      fileName: "ai-hf",
      issueTitle: s.issueTitleHf,
      issueLabel: s.issueLabelHf,
    },
    utcStr,
    dateStr,
    digestRepo,
    footer,
    lang,
    deps,
  );
};
