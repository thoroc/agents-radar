import { getPrimaryLang, type Locale, t } from "../../locales";
import { PAGES_URL_DEFAULT } from "../../utils/constants";
import type { Highlights } from "../notify/build-message";
import { label } from "../notify/label";

interface BuildFeishuMessageOptions {
  date: string;
  reports: string[];
  pagesUrl?: string;
  highlights?: Highlights | null;
  enabledLangs?: string[];
  primaryLang?: Locale;
  env?: NodeJS.ProcessEnv;
}

export const buildMessage = (args: BuildFeishuMessageOptions): string => {
  const date = args.date;
  const reports = args.reports;
  const pagesUrl = args.pagesUrl;
  const highlights = args.highlights;
  const enabledLangs = args.enabledLangs ?? [getPrimaryLang()];
  const primaryLang = args.primaryLang ?? getPrimaryLang();
  const env = args.env ?? process.env;
  const PAGES_URL = (pagesUrl ?? env.PAGES_URL ?? PAGES_URL_DEFAULT).replace(/\/$/, "");
  const baseReports = reports.filter((r) => !r.endsWith(".en-US"));
  const isWeekly = baseReports.includes("ai-weekly");
  const isMonthly = baseReports.includes("ai-monthly");

  const icon = isMonthly ? "📆" : isWeekly ? "📅" : "📡";
  const suffix = isMonthly
    ? t(primaryLang).notifySuffixMonthly
    : isWeekly
      ? t(primaryLang).notifySuffixWeekly
      : "";
  const lines: string[] = [`${icon} **agents-radar${suffix} · ${date}**`];

  const ordered = [
    ...baseReports.filter((r) => !r.includes("weekly") && !r.includes("monthly")),
    ...baseReports.filter((r) => r.includes("weekly") || r.includes("monthly")),
  ];

  const multiLang = enabledLangs.length > 1;

  for (const r of ordered) {
    lines.push("");

    const reportLinks = enabledLangs.map((lang) => {
      const reportLabel = label(r, lang as Locale);
      const suffix = lang === getPrimaryLang() ? "" : `.${lang}`;
      const url = `${PAGES_URL}/#${date}/${r}${suffix}`;
      if (multiLang) {
        return `[${reportLabel} (${lang.toUpperCase()})](${url})`;
      }
      return `[${reportLabel}](${url})`;
    });

    lines.push(`• ${reportLinks.join("  ·  ")}`);

    const hls = highlights?.[primaryLang]?.[r];
    if (hls?.length) {
      for (const h of hls) {
        lines.push(`  ◦ ${h}`);
      }
    }
  }

  lines.push(`\n${t(primaryLang).feishuFooterLinks}`);
  return lines.join("\n");
};
