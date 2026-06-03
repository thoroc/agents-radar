import { getPrimaryLang, type Locale, t } from "../../utils";
import { PAGES_URL_DEFAULT } from "../../utils/constants";
import type { Highlights } from "../notify/build-message";
import { notifyLabel } from "../notify/notify-label";

export const buildFeishuMessage = (
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
  const lines: string[] = [`${icon} **agents-radar${suffix} · ${date}**`];

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
        return `[${label} (${lang.toUpperCase()})](${url})`;
      }
      return `[${label}](${url})`;
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
