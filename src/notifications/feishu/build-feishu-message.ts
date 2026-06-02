import type { Locale } from "../../utils";
import { PAGES_URL_DEFAULT } from "../../utils/constants";
import { t } from "../../utils/t";
import type { Highlights } from "../notify/build-message";
import { notifyLabel } from "../notify/notify-label";

export const buildFeishuMessage = (
  date: string,
  reports: string[],
  pagesUrl?: string,
  highlights?: Highlights | null,
  enabledLangs: string[] = ["zh-CN", "en-US"],
  env: NodeJS.ProcessEnv = process.env,
): string => {
  const PAGES_URL = (pagesUrl ?? env.PAGES_URL ?? PAGES_URL_DEFAULT).replace(/\/$/, "");
  const baseReports = reports.filter((r) => !r.endsWith(".en-US"));
  const isWeekly = baseReports.includes("ai-weekly");
  const isMonthly = baseReports.includes("ai-monthly");

  const primaryLang = enabledLangs[0] ?? "zh-CN";
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

  for (const r of ordered) {
    lines.push("");
    for (const lang of enabledLangs) {
      const label = notifyLabel(r, lang as Locale);
      const langSuffix = lang === "zh-CN" ? "" : ".en-US";
      const fileKey = `${r}${langSuffix}`;
      if (!reports.includes(fileKey)) continue;
      const url = `${PAGES_URL}/#${date}/${fileKey}`;
      const prefix = enabledLangs.length > 1 ? `[${lang}] ` : "";
      lines.push(`•${prefix}[${label}](${url})`);
    }

    const langsWithHighlights = enabledLangs.filter((l) => highlights?.[l]?.[r]?.length);
    const showLangPrefix = langsWithHighlights.length > 1;
    for (const lang of enabledLangs) {
      const items = highlights?.[lang]?.[r];
      if (items?.length) {
        const pfx = showLangPrefix ? `[${lang}] ` : "";
        for (const h of items) {
          lines.push(`  ◦ ${pfx}${h}`);
        }
      }
    }
  }

  lines.push(`\n${t(primaryLang).feishuFooterLinks.replace(/\{pagesUrl\}/g, PAGES_URL)}`);
  return lines.join("\n");
};
