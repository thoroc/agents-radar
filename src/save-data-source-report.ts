import { defaultDeps, saveReport } from "./save-report";
import type { SaveReportDeps } from "./saver-types";
import type { Locale } from "./types";

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

export const buildSourceHeader = (
  suffix: string,
  dateStr: string,
  utcStr: string,
  title: string,
  sourceLabel: string,
  sourceUrl: string,
  countEn: string,
  countZh: string,
  extraMeta?: string,
): string => {
  const count = suffix ? countEn : countZh;
  const meta = extraMeta ? ` | ${extraMeta}` : "";
  return suffix
    ? `# ${title} ${dateStr}\n\n> Source: [${sourceLabel}](${sourceUrl}) | ${count} | Generated: ${utcStr} UTC${meta}`
    : `# ${title} ${dateStr}\n\n> 数据来源: [${sourceLabel}](${sourceUrl}) | ${count} | 生成时间: ${utcStr} UTC${meta}`;
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
