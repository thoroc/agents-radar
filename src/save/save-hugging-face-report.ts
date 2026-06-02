import type { HuggingFaceData } from "../fetchers/hugging-face";
import { buildHuggingFacePrompt } from "../prompts";
import { type Locale, t } from "../utils";
import { buildSourceHeader } from "./build-source-header";
import { saveDataSourceReport } from "./save-data-source-report";
import type { SaveReportDeps } from "./saver-types";

export const saveHuggingFaceReport = async (
  hfData: HuggingFaceData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale = "zh-CN",
  deps: SaveReportDeps = {},
): Promise<void> => {
  const s = t(lang);
  await saveDataSourceReport(
    {
      hasData: hfData.fetchSuccess,
      logPrefix: "hf",
      logAction: "Hugging Face",
      data: hfData,
      promptBuilder: (d, ds, _suffix) => buildHuggingFacePrompt(d as HuggingFaceData, ds, lang),
      headerBuilder: (suffix, ds, us) =>
        buildSourceHeader(
          suffix,
          ds,
          us,
          s.hfTitle,
          "Hugging Face Hub",
          "https://huggingface.co/",
          `${hfData.models.length} models`,
          `共 ${hfData.models.length} 个模型`,
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
