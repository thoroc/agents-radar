import type { ArxivData } from "../fetchers/arxiv";
import { buildArxivPrompt } from "../prompts";
import { getPrimaryLang, type Locale, t } from "../utils";
import { buildSourceHeader } from "./build-source-header";
import { saveDataSource } from "./data-source-report";
import type { SaveReportDeps } from "./saver-types";

export const saveArxiv = async (
  arxivData: ArxivData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale = getPrimaryLang() as Locale,
  deps: SaveReportDeps = {},
): Promise<void> => {
  const s = t(lang);
  const count = s.arxivCount.replace("{n}", String(arxivData.papers.length));
  await saveDataSource(
    {
      hasData: arxivData.fetchSuccess,
      logPrefix: "arxiv",
      logAction: "ArXiv",
      data: arxivData,
      promptBuilder: (d) => buildArxivPrompt(d as ArxivData, lang),
      headerBuilder: (_ds, us) =>
        buildSourceHeader(
          lang,
          _ds,
          us,
          s.arxivTitle,
          "ArXiv",
          "https://arxiv.org/",
          count,
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
