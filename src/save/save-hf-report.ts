import type { HfData } from "../fetchers/hf";
import { buildHfPrompt } from "../prompts";
import { toPromptLang } from "../types";
import { type Locale, t } from "../utils";
import { buildSourceHeader, saveDataSourceReport } from "./save-data-source-report";
import type { SaveReportDeps } from "./saver-types";

export const saveHfReport = async (
  hfData: HfData,
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
      hasData: hfData.fetchSuccess,
      logPrefix: "hf",
      logAction: "Hugging Face",
      data: hfData,
      promptBuilder: (d, ds, _suffix) => buildHfPrompt(d as HfData, ds, toPromptLang(lang)),
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
