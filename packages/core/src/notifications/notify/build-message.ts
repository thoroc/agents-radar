import type { ReportHighlights } from "../../prompts/prompts-data-types";
import { getPrimaryLang, type Locale, t } from "../../utils";
import { PAGES_URL_DEFAULT } from "../../utils/constants";
import { notifyLabel } from "./notify-label";

export interface Highlights {
  [key: string]: ReportHighlights | undefined;
}

const escapeHtml = (s: string): string => {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

export const buildMessage = (
  date: string,
  reports: string[],
  pagesUrl?: string,
  highlights?: Highlights | null,
  enabledLangs: string[] = ["zh-CN"],
  primaryLang: Locale = getPrimaryLang() as Locale,
  env: NodeJS.ProcessEnv = process.env,
): string => {
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
  const lines: string[] = [`${icon} <b>agents-radar${suffix} · ${date}</b>`];

  const ordered = [
    ...baseReports.filter((r) => !r.includes("weekly") && !r.includes("monthly")),
    ...baseReports.filter((r) => r.includes("weekly") || r.includes("monthly")),
  ];

  const multiLang = enabledLangs.length > 1;

  for (const r of ordered) {
    lines.push("");

    const reportLinks = enabledLangs.map((lang) => {
      const label = notifyLabel(r, lang as Locale);
      const suffix = lang === getPrimaryLang() ? "" : `.${lang}`;
      const url = `${PAGES_URL}/#${date}/${r}${suffix}`;
      if (multiLang) {
        return `<a href="${url}">${label} (${lang.toUpperCase()})</a>`;
      }
      return `<a href="${url}">${label}</a>`;
    });

    lines.push(`• ${reportLinks.join("  ·  ")}`);

    const hls = highlights?.[primaryLang]?.[r];
    if (hls?.length) {
      for (const h of hls) {
        lines.push(`  ◦ ${escapeHtml(h)}`);
      }
    }
  }

  lines.push(`\n${t(primaryLang).notifyFooterLinks}`);
  return lines.join("\n");
};
