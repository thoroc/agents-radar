import type { Locale } from "../types";
import { buildSourceHeader } from "./build-source-header";
import { defaultDeps, saveReport } from "./save-report";
import type { SaveReportDeps } from "./saver-types";

type DataSourceReportOpts = {
  hasData: boolean;
  logPrefix: string;
  logAction: string;
  data: unknown;
  promptBuilder: (data: unknown, dateStr: string, suffix: string) => string;
  headerBuilder: (suffix: string, dateStr: string, utcStr: string) => string;
  fileName: string;
  issueTitle: string;
  issueLabel: string;
};

export const saveDataSourceReport = async (
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
        headerBuilder: (_ds, _us, suffix) => opts.headerBuilder(suffix, _ds, _us),
        fileName: opts.fileName,
        issueTitle: opts.issueTitle,
        issueLabel: opts.issueLabel,
      },
      utcStr,
      dateStr,
      digestRepo,
      footer,
      lang,
      { ...defaultDeps, ...deps },
    );
  } catch (err) {
    console.error(`  [${opts.logPrefix}/${lang}] Report generation failed: ${err}`);
  }
};
