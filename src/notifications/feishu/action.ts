import fs from "node:fs";
import path from "node:path";
import type { Highlights } from "../notify/build-message";
import { buildFeishuMessage } from "./build-feishu-message";

const getWebhookUrls = (env: NodeJS.ProcessEnv = process.env): string[] => {
  const raw = env.FEISHU_WEBHOOK_URLS ?? env.FEISHU_WEBHOOK_URL ?? "";
  return raw
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean);
};

const sendToOneWebhook = async (webhookUrl: string, title: string, content: string): Promise<void> => {
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
};

const sendFeishu = async (title: string, content: string): Promise<void> => {
  const urls = getWebhookUrls();
  const results = await Promise.allSettled(urls.map((url) => sendToOneWebhook(url, title, content)));
  const failures = results.filter((r) => r.status === "rejected");
  if (failures.length) {
    const msgs = failures.map((r) => (r as PromiseRejectedResult).reason);
    console.error(`[feishu] ${failures.length}/${urls.length} webhook(s) failed:`, msgs);
    if (failures.length === urls.length) throw new Error("All Feishu webhooks failed");
  }
};

export interface FeishuActionArgs {
  verbosity: number;
}

export type FeishuDeps = {
  write?: (s: string) => void;
};

export const feishuAction = async (
  args: FeishuActionArgs,
  _deps: FeishuDeps = {},
  env: NodeJS.ProcessEnv = process.env,
): Promise<void> => {
  const { verbosity } = args;
  const urls = getWebhookUrls(env);
  if (!urls.length) {
    console.error("[feishu] FEISHU_WEBHOOK_URLS not set — skipping.");
    return;
  }

  if (!fs.existsSync("manifest.json")) {
    console.error("[feishu] manifest.json not found — skipping.");
    return;
  }

  const { dates } = JSON.parse(fs.readFileSync("manifest.json", "utf-8")) as {
    dates: { date: string; reports: string[] }[];
  };

  const latest = dates?.[0];
  if (!latest) {
    console.error("[feishu] manifest is empty — skipping.");
    return;
  }
  const { date, reports } = latest;

  if (verbosity >= 1) {
    console.error(`[feishu] Latest date: ${date}, reports: ${reports.length}, webhooks: ${urls.length}`);
  }

  let highlights: Highlights | null = null;
  const highlightsPath = path.join("digests", date, "highlights.json");
  if (fs.existsSync(highlightsPath)) {
    try {
      highlights = JSON.parse(fs.readFileSync(highlightsPath, "utf-8")) as Highlights;
    } catch (error) {
      console.error("[feishu] Failed to parse highlights.json — sending without highlights.", error);
    }
  }

  const isMonthly = reports.some((r) => r === "ai-monthly");
  const isWeekly = reports.some((r) => r === "ai-weekly");
  const icon = isMonthly ? "📆" : isWeekly ? "📅" : "📡";
  const suffix = isMonthly ? " 月报" : isWeekly ? " 周报" : "";
  const title = `${icon} agents-radar${suffix} · ${date}`;

  const content = buildFeishuMessage(date, reports, undefined, highlights, env);

  console.error(`[feishu] Sending to ${urls.length} webhook(s) for ${date} (${reports.length} reports)…`);
  await sendFeishu(title, content);
  console.error("[feishu] Done!");
};
