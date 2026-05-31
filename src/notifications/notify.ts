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
import { Command } from "@cliffy/command";
import type { ReportHighlights } from "../prompts/prompts-data";
import { type Locale, t } from "../utils/i18n";

export interface Highlights {
  zh: ReportHighlights;
  en: ReportHighlights;
}

const PAGES_URL_DEFAULT = "https://duanyytop.github.io/agents-radar";

export const notifyLabel = (id: string, lang: Locale = "zh"): string => {
  const s = t(lang);
  switch (id) {
    case "ai-cli":
      return s.notifyCli;
    case "ai-agents":
      return s.notifyAgents;
    case "ai-web":
      return s.notifyWeb;
    case "ai-trending":
      return s.notifyTrending;
    case "ai-hn":
      return s.notifyHn;
    case "ai-ph":
      return s.notifyPh;
    case "ai-arxiv":
      return s.notifyArxiv;
    case "ai-hf":
      return s.notifyHf;
    case "ai-community":
      return s.notifyCommunity;
    case "ai-weekly":
      return s.notifyWeekly;
    case "ai-monthly":
      return s.notifyMonthly;
    default:
      return id;
  }
};

const escapeHtml = (s: string): string => {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

const sendTelegram = async (text: string): Promise<void> => {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "";
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID || "@agents_radar";
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
};

export const buildMessage = (
  date: string,
  reports: string[],
  pagesUrl?: string,
  highlights?: Highlights | null,
): string => {
  const PAGES_URL = (pagesUrl ?? process.env.PAGES_URL ?? PAGES_URL_DEFAULT).replace(/\/$/, "");
  const baseReports = reports.filter((r) => !r.endsWith("-en"));
  const isWeekly = baseReports.includes("ai-weekly");
  const isMonthly = baseReports.includes("ai-monthly");

  const icon = isMonthly ? "📆" : isWeekly ? "📅" : "📡";
  const suffix = isMonthly ? " 月报" : isWeekly ? " 周报" : "";
  const lines: string[] = [`${icon} <b>agents-radar${suffix} · ${date}</b>`];

  // Daily reports first, then rollups
  const ordered = [
    ...baseReports.filter((r) => !r.includes("weekly") && !r.includes("monthly")),
    ...baseReports.filter((r) => r.includes("weekly") || r.includes("monthly")),
  ];

  const zhHighlights = highlights?.zh ?? {};

  for (const r of ordered) {
    const zhLabel = notifyLabel(r, "zh");
    const zhUrl = `${PAGES_URL}/#${date}/${r}`;
    const enKey = `${r}-en`;

    lines.push(""); // blank line before each report section
    if (reports.includes(enKey)) {
      const enLabel = notifyLabel(r, "en");
      const enUrl = `${PAGES_URL}/#${date}/${enKey}`;
      lines.push(`• <a href="${zhUrl}">${zhLabel}</a>  ·  <a href="${enUrl}">${enLabel}</a>`);
    } else {
      lines.push(`• <a href="${zhUrl}">${zhLabel}</a>`);
    }

    // Add highlights as indented sub-items
    const items = zhHighlights[r];
    if (items?.length) {
      for (const h of items) {
        lines.push(`  ◦ ${escapeHtml(h)}`);
      }
    }
  }

  lines.push(`\n<a href="${PAGES_URL}">🌐 Web UI</a>  ·  <a href="${PAGES_URL}/feed.xml">⊕ RSS</a>`);
  return lines.join("\n");
};

const main = async (opts: { verbose?: boolean[] }): Promise<void> => {
  const verbosity = opts.verbose?.length ?? 0;
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "";
  if (!BOT_TOKEN) {
    console.error("[notify] TELEGRAM_BOT_TOKEN not set — skipping.");
    return;
  }

  if (!fs.existsSync("manifest.json")) {
    console.error("[notify] manifest.json not found — skipping.");
    return;
  }

  const { dates } = JSON.parse(fs.readFileSync("manifest.json", "utf-8")) as {
    dates: { date: string; reports: string[] }[];
  };

  const latest = dates?.[0];
  if (!latest) {
    console.error("[notify] manifest is empty — skipping.");
    return;
  }
  const { date, reports } = latest;

  if (verbosity >= 1) {
    console.error(`[notify] Latest date: ${date}, reports: ${reports.length}`);
  }

  // Load highlights if available
  let highlights: Highlights | null = null;
  const highlightsPath = path.join("digests", date, "highlights.json");
  if (fs.existsSync(highlightsPath)) {
    try {
      highlights = JSON.parse(fs.readFileSync(highlightsPath, "utf-8")) as Highlights;
    } catch (error) {
      console.error("[notify] Failed to parse highlights.json — sending without highlights.", error);
    }
  }

  const text = buildMessage(date, reports, undefined, highlights);

  console.error(`[notify] Sending Telegram message for ${date} (${reports.length} reports)…`);
  await sendTelegram(text);
  console.error("[notify] Done!");
};

const command = new Command()
  .name("notify")
  .description("Send Telegram notification with latest report links")
  .option("-V, --verbose", "Enable verbose output", { collect: true })
  .action(async (opts) => {
    await main(opts);
  });

if (import.meta.main) {
  await command.parse(process.argv.slice(2));
}
