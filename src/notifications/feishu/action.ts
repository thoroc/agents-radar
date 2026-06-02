import fs from "node:fs";
import path from "node:path";
import type { Highlights } from "../notify/build-message";
import { buildFeishuMessage } from "./build-feishu-message";
import { getWebhookUrls } from "./get-webhook-urls";
import { sendFeishu } from "./send-feishu";

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

  const content = buildFeishuMessage(date, reports, undefined, highlights, ["zh", "en"], env);

  console.error(`[feishu] Sending to ${urls.length} webhook(s) for ${date} (${reports.length} reports)…`);
  await sendFeishu(title, content);
  console.error("[feishu] Done!");
};
