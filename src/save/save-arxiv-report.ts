import type { ArxivData } from "../fetchers/arxiv";
import { buildArxivPrompt } from "../prompts";
import { toPromptLang } from "../types";
import { type Locale, t } from "../utils";
import { buildSourceHeader, saveDataSourceReport } from "./save-data-source-report";
import type { SaveReportDeps } from "./saver-types";

export const saveArxivReport = async (
  arxivData: ArxivData,
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
      hasData: arxivData.fetchSuccess,
      logPrefix: "arxiv",
      logAction: "ArXiv",
      data: arxivData,
      promptBuilder: (d, ds, _suffix) => buildArxivPrompt(d as ArxivData, ds, toPromptLang(lang)),
      headerBuilder: (suffix, ds, us) =>
        buildSourceHeader(
          suffix,
          ds,
          us,
          s.arxivTitle,
          "ArXiv",
          "https://arxiv.org/",
          `${arxivData.papers.length} papers`,
          `共 ${arxivData.papers.length} 篇论文`,
          "cs.AI, cs.CL, cs.LG",
        ),
      fileName: "ai-arxiv",
      issueTitle: s.issueTitleArxiv,
      issueLabel: s.issueLabelArxiv,
    },
    utcStr,
    dateStr,
    digestRepo,
    footer,
    lang,
    deps,
  );
};
