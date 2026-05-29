/**
 * Feishu (Lark) notification — reads manifest.json and sends a card message
 * with links to the latest reports. Skips silently if secrets are not set.
 *
 * Required env vars:
 *   FEISHU_WEBHOOK_URLS — comma-separated list of custom bot webhook URLs
 *                         (also accepts legacy FEISHU_WEBHOOK_URL for one URL)
 * Optional:
 *   PAGES_URL           — GitHub Pages base URL (defaults to the public deployment)
 */

import fs from "node:fs";
import path from "node:path";
import { t, interpolate } from "./i18n.ts";
import { getReportLangs, type Highlights } from "./notify.ts";

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

function notifyLabel(id: string, lang: string = "zh"): string {
  const key = NOTIFY_LABEL_MAP[id];
  return key ? t(lang)[key] : id;
}

function getWebhookUrls(): string[] {
  const raw = process.env["FEISHU_WEBHOOK_URLS"] ?? process.env["FEISHU_WEBHOOK_URL"] ?? "";
  return raw
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean);
}

async function sendToOneWebhook(webhookUrl: string, title: string, content: string): Promise<void> {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      msg_type: "interactive",
      card: {
        header: {
          title: { tag: "plain_text", content: title },
          template: "blue",
        },
        elements: [{ tag: "markdown", content }],
      },
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Feishu API ${res.status}: ${body}`);
  }
}

async function sendFeishu(title: string, content: string): Promise<void> {
  const urls = getWebhookUrls();
  const results = await Promise.allSettled(urls.map((url) => sendToOneWebhook(url, title, content)));
  const failures = results.filter((r) => r.status === "rejected");
  if (failures.length) {
    const msgs = failures.map((r) => (r as PromiseRejectedResult).reason);
    console.error(`[feishu] ${failures.length}/${urls.length} webhook(s) failed:`, msgs);
    if (failures.length === urls.length) throw new Error("All Feishu webhooks failed");
  }
}

export function buildFeishuMessage(
  date: string,
  reports: string[],
  pagesUrl?: string,
  highlights?: Highlights | null,
  enabledLangs?: string[],
): { title: string; content: string } {
  const PAGES_URL = (pagesUrl ?? process.env["PAGES_URL"] ?? PAGES_URL_DEFAULT).replace(/\/$/, "");
  const baseReports = reports.filter((r) => !r.includes("."));
  const isWeekly = baseReports.includes("ai-weekly");
  const isMonthly = baseReports.includes("ai-monthly");

  const icon = isMonthly ? "📆" : isWeekly ? "📅" : "📡";
  const suffix = isMonthly ? t("zh").notifySuffixMonthly : isWeekly ? t("zh").notifySuffixWeekly : "";
  const title = `${icon} agents-radar${suffix} · ${date}`;
  const lines: string[] = [`${icon} **agents-radar${suffix} · ${date}**`];

  const ordered = [
    ...baseReports.filter((r) => !r.includes("weekly") && !r.includes("monthly")),
    ...baseReports.filter((r) => r.includes("weekly") || r.includes("monthly")),
  ];

  for (const r of ordered) {
    const reportLangs = getReportLangs(reports, r);
    const langs = enabledLangs?.filter((l) => reportLangs.includes(l)) ?? reportLangs;

    lines.push("");

    const linkParts: string[] = [];
    for (const lang of langs) {
      const label = notifyLabel(r, lang);
      const reportKey = lang === "zh" ? r : `${r}.${lang}`;
      const url = `${PAGES_URL}/#${date}/${reportKey}`;
      linkParts.push(`[${label}](${url})`);
    }
    lines.push(`• ${linkParts.join("  ·  ")}`);

    // Add highlights as indented sub-items (default language: zh)
    const items = highlights?.zh?.[r];
    if (items?.length) {
      for (const h of items) {
        lines.push(`  ◦ ${h}`);
      }
    }
  }

  lines.push(`\n${interpolate(t("zh").feishuFooterLinks, { pagesUrl: PAGES_URL })}`);
  return { title, content: lines.join("\n") };
}

async function main(): Promise<void> {
  const urls = getWebhookUrls();
  if (!urls.length) {
    console.log("[feishu] FEISHU_WEBHOOK_URLS not set — skipping.");
    return;
  }

  if (!fs.existsSync("manifest.json")) {
    console.log("[feishu] manifest.json not found — skipping.");
    return;
  }

  const { dates } = JSON.parse(fs.readFileSync("manifest.json", "utf-8")) as {
    dates: { date: string; reports: string[] }[];
  };

  const latest = dates?.[0];
  if (!latest) {
    console.log("[feishu] manifest is empty — skipping.");
    return;
  }
  const { date, reports } = latest;

  let highlights: Highlights | null = null;
  const highlightsPath = path.join("digests", date, "highlights.json");
  if (fs.existsSync(highlightsPath)) {
    try {
      highlights = JSON.parse(fs.readFileSync(highlightsPath, "utf-8")) as Highlights;
    } catch {
      console.log("[feishu] Failed to parse highlights.json — sending without highlights.");
    }
  }

  const { title, content } = buildFeishuMessage(date, reports, undefined, highlights);

  console.log(`[feishu] Sending to ${urls.length} webhook(s) for ${date} (${reports.length} reports)…`);
  await sendFeishu(title, content);
  console.log("[feishu] Done!");
}

main().catch((e: unknown) => {
  console.error("[feishu]", e instanceof Error ? e.message : e);
  process.exit(1);
});
