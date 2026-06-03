import type { Locale } from "../types";
import { saveReport } from "./report";
import type { SaveReportDeps } from "./saver-types";

type DataSourceReportOpts = {
  hasData: boolean;
  logPrefix: string;
  logAction: string;
  data: unknown;
  promptBuilder: (data: unknown, dateStr: string) => string;
  headerBuilder: (dateStr: string, utcStr: string, lang: string) => string;
  fileName: string;
  issueTitle: string;
  issueLabel: string;
};

export const saveDataSource = async (
  opts: DataSourceReportOpts,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Locale,
  deps: SaveReportDeps = {},
): Promise<void> => {
  if (!opts.hasData) {
    console.error(`  [${opts.logPrefix}/${lang}] No data available, skipping report.`);
    return;
  }

  console.error(`  [${opts.logPrefix}/${lang}] Calling LLM for ${opts.logAction} report...`);
  try {
    await saveReport(
      {
        data: opts.data,
        promptBuilder: opts.promptBuilder,
        headerBuilder: opts.headerBuilder,
        fileName: opts.fileName,
        issueTitle: opts.issueTitle,
        issueLabel: opts.issueLabel,
      },
      utcStr,
      dateStr,
      digestRepo,
      footer,
      lang,
      deps,
    );
  } catch (err) {
    console.error(`  [${opts.logPrefix}/${lang}] Report generation failed: ${err}`);
  }
};
