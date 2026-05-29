/**
 * Telegram notification — reads manifest.json and sends a message
 * with links to the latest reports. Skips silently if secrets are not set.
 *
 * Required env vars:
 *   TELEGRAM_BOT_TOKEN  — bot token from @BotFather
 *   TELEGRAM_CHAT_ID    — channel/group/user chat ID
 * Optional:
 *   PAGES_URL           — GitHub Pages base URL (defaults to the public deployment)
 */

import fs from "node:fs";
import path from "node:path";
import { t, interpolate, DEFAULT_PRIMARY_LANGUAGE } from "./i18n.ts";
import type { ReportHighlights } from "./prompts-data.ts";

export type Highlights = Record<string, ReportHighlights>;

const PAGES_URL_DEFAULT = "https://duanyytop.github.io/agents-radar";

const NOTIFY_LABEL_MAP: Record<string, keyof ReturnType<typeof t>> = {
  "ai-cli": "notifyCli",
  "ai-agents": "notifyAgents",
  "ai-web": "notifyWeb",
  "ai-trending": "notifyTrending",
  "ai-hn": "notifyHn",
  "ai-ph": "notifyPh",
  "ai-arxiv": "notifyArxiv",
  "ai-hf": "notifyHf",
  "ai-community": "notifyCommunity",
  "ai-weekly": "notifyWeekly",
  "ai-monthly": "notifyMonthly",
};

function notifyLabel(id: string, lang: string = DEFAULT_PRIMARY_LANGUAGE): string {
  const key = NOTIFY_LABEL_MAP[id];
  return key ? t(lang)[key] : id;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function sendTelegram(text: string): Promise<void> {
  const BOT_TOKEN = process.env["TELEGRAM_BOT_TOKEN"] ?? "";
  const CHAT_ID = process.env["TELEGRAM_CHAT_ID"] || "@agents_radar";
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram API ${res.status}: ${body}`);
  }
}

export function getReportLangs(reports: string[], base: string): string[] {
  const result: string[] = [];
  for (const r of reports) {
    if (r === base) result.push(DEFAULT_PRIMARY_LANGUAGE);
    else if (r.startsWith(base + ".")) result.push(r.slice(base.length + 1));
  }
  return result;
}

export function buildMessage(
  date: string,
  reports: string[],
  pagesUrl?: string,
  highlights?: Highlights | null,
  enabledLangs?: string[],
): string {
  const PAGES_URL = (pagesUrl ?? process.env["PAGES_URL"] ?? PAGES_URL_DEFAULT).replace(/\/$/, "");
  const baseReports = reports.filter((r) => !r.includes("."));
  const isWeekly = baseReports.includes("ai-weekly");
  const isMonthly = baseReports.includes("ai-monthly");

  const primaryLang = enabledLangs?.[0] ?? DEFAULT_PRIMARY_LANGUAGE;
  const icon = isMonthly ? "📆" : isWeekly ? "📅" : "📡";
  const suffix = isMonthly
    ? t(primaryLang).notifySuffixMonthly
    : isWeekly
      ? t(primaryLang).notifySuffixWeekly
      : "";
  const lines: string[] = [`${icon} <b>agents-radar${suffix} · ${date}</b>`];

  // Daily reports first, then rollups
  const ordered = [
    ...baseReports.filter((r) => !r.includes("weekly") && !r.includes("monthly")),
    ...baseReports.filter((r) => r.includes("weekly") || r.includes("monthly")),
  ];

  for (const r of ordered) {
    const reportLangs = getReportLangs(reports, r);
    const langs = enabledLangs?.filter((l) => reportLangs.includes(l)) ?? reportLangs;

    lines.push(""); // blank line before each report section

    // Build links for all available language variants
    const linkParts: string[] = [];
    for (const lang of langs) {
      const label = notifyLabel(r, lang);
      const reportKey = lang === DEFAULT_PRIMARY_LANGUAGE ? r : `${r}.${lang}`;
      const url = `${PAGES_URL}/#${date}/${reportKey}`;
      linkParts.push(`<a href="${url}">${label}</a>`);
    }
    lines.push(`• ${linkParts.join("  ·  ")}`);

    const langsWithHighlights = langs.filter((l) => highlights?.[l]?.[r]?.length);
    const showLangPrefix = langsWithHighlights.length > 1;
    for (const lang of langs) {
      const items = highlights?.[lang]?.[r];
      if (items?.length) {
        const prefix = showLangPrefix ? `[${lang}] ` : "";
        for (const h of items) {
          lines.push(`  ◦ ${prefix}${escapeHtml(h)}`);
        }
      }
    }
  }

  lines.push(`\n${interpolate(t(primaryLang).notifyFooterLinks, { pagesUrl: PAGES_URL })}`);
  return lines.join("\n");
}

async function main(): Promise<void> {
  const BOT_TOKEN = process.env["TELEGRAM_BOT_TOKEN"] ?? "";
  if (!BOT_TOKEN) {
    console.log("[notify] TELEGRAM_BOT_TOKEN not set — skipping.");
    return;
  }

  if (!fs.existsSync("manifest.json")) {
    console.log("[notify] manifest.json not found — skipping.");
    return;
  }

  const { dates } = JSON.parse(fs.readFileSync("manifest.json", "utf-8")) as {
    dates: { date: string; reports: string[] }[];
  };

  const latest = dates?.[0];
  if (!latest) {
    console.log("[notify] manifest is empty — skipping.");
    return;
  }
  const { date, reports } = latest;

  // Load highlights if available
  let highlights: Highlights | null = null;
  const highlightsPath = path.join("digests", date, "highlights.json");
  if (fs.existsSync(highlightsPath)) {
    try {
      highlights = JSON.parse(fs.readFileSync(highlightsPath, "utf-8")) as Highlights;
    } catch {
      console.log("[notify] Failed to parse highlights.json — sending without highlights.");
    }
  }

  const text = buildMessage(date, reports, undefined, highlights);

  console.log(`[notify] Sending Telegram message for ${date} (${reports.length} reports)…`);
  await sendTelegram(text);
  console.log("[notify] Done!");
}

main().catch((e: unknown) => {
  console.error("[notify]", e instanceof Error ? e.message : e);
  process.exit(1);
});
