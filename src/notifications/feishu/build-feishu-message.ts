import { PAGES_URL_DEFAULT } from "../../utils/constants";
import type { Highlights } from "../notify/build-message";
import { notifyLabel } from "../notify/notify-label";

export const buildFeishuMessage = (
  date: string,
  reports: string[],
  pagesUrl?: string,
  highlights?: Highlights | null,
  env: NodeJS.ProcessEnv = process.env,
): string => {
  const PAGES_URL = (pagesUrl ?? env.PAGES_URL ?? PAGES_URL_DEFAULT).replace(/\/$/, "");
  const baseReports = reports.filter((r) => !r.endsWith("-en"));
  const isWeekly = baseReports.includes("ai-weekly");
  const isMonthly = baseReports.includes("ai-monthly");

  const icon = isMonthly ? "📆" : isWeekly ? "📅" : "📡";
  const suffix = isMonthly ? " 月报" : isWeekly ? " 周报" : "";
  const lines: string[] = [`${icon} **agents-radar${suffix} · ${date}**`];

  const ordered = [
    ...baseReports.filter((r) => !r.includes("weekly") && !r.includes("monthly")),
    ...baseReports.filter((r) => r.includes("weekly") || r.includes("monthly")),
  ];

  const zhHighlights = highlights?.zh ?? {};

  for (const r of ordered) {
    const zhLabel = notifyLabel(r, "zh");
    const zhUrl = `${PAGES_URL}/#${date}/${r}`;
    const enKey = `${r}-en`;

    lines.push("");
    if (reports.includes(enKey)) {
      const enLabel = notifyLabel(r, "en");
      const enUrl = `${PAGES_URL}/#${date}/${enKey}`;
      lines.push(`• [${zhLabel}](${zhUrl})  ·  [${enLabel}](${enUrl})`);
    } else {
      lines.push(`• [${zhLabel}](${zhUrl})`);
    }

    const items = zhHighlights[r];
    if (items?.length) {
      for (const h of items) {
        lines.push(`  ◦ ${h}`);
      }
    }
  }

  lines.push(`\n[🌐 Web UI](${PAGES_URL})  ·  [⊕ RSS](${PAGES_URL}/feed.xml)`);
  return lines.join("\n");
};
