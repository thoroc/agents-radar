import type { ReportHighlights } from "../../prompts/prompts-data-types";
import type { Locale } from "../../utils";
import { PAGES_URL_DEFAULT } from "../../utils/constants";
import { t } from "../../utils/t";
import { notifyLabel } from "./notify-label";

export interface Highlights {
  [lang: string]: ReportHighlights;
}

const escapeHtml = (s: string): string => {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

export const buildMessage = (
  date: string,
  reports: string[],
  pagesUrl?: string,
  highlights?: Highlights | null,
  enabledLangs: string[] = ["zh", "en"],
  env: NodeJS.ProcessEnv = process.env,
): string => {
  const PAGES_URL = (pagesUrl ?? env.PAGES_URL ?? PAGES_URL_DEFAULT).replace(/\/$/, "");
  const baseReports = reports.filter((r) => !r.endsWith("-en"));
  const isWeekly = baseReports.includes("ai-weekly");
  const isMonthly = baseReports.includes("ai-monthly");

  const primaryLang = enabledLangs[0] ?? "zh";
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

  for (const r of ordered) {
    lines.push("");
    for (const lang of enabledLangs) {
      const langSuffix = lang === "zh" ? "" : "-en";
      const fileKey = `${r}${langSuffix}`;
      if (!reports.includes(fileKey)) continue;
      const label = notifyLabel(r, lang as Locale);
      const url = `${PAGES_URL}/#${date}/${fileKey}`;
      const prefix = enabledLangs.length > 1 ? `[${lang}] ` : "";
      lines.push(`•${prefix}${escapeHtml(label)}: <a href="${url}">${url}</a>`);
    }

    const langsWithHighlights = enabledLangs.filter((l) => highlights?.[l]?.[r]?.length);
    const showLangPrefix = langsWithHighlights.length > 1;
    for (const lang of enabledLangs) {
      const items = highlights?.[lang]?.[r];
      if (items?.length) {
        const prefix = showLangPrefix ? `[${lang}] ` : "";
        for (const h of items) {
          lines.push(`  ◦ ${prefix}${escapeHtml(h)}`);
        }
      }
    }
  }

  lines.push(`\n${t(primaryLang).notifyFooterLinks.replace(/\{pagesUrl\}/g, PAGES_URL)}`);
  return lines.join("\n");
};
