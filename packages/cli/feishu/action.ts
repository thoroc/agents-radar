import fs from "node:fs";
import path from "node:path";
import { buildFeishuMessage, getWebhookUrls, sendFeishu } from "@agents-radar/core/notifications/feishu";
import type { Highlights } from "@agents-radar/core/notifications/notify";
import { getEnabledLangs, type Locale, loadConfig } from "@agents-radar/core/utils";

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

  const { languages: configLangs, defaultPrimaryLanguage } = loadConfig();
  const enabledLangs = getEnabledLangs(configLangs, env);
  const primaryLang: Locale = (defaultPrimaryLanguage ?? "en-US") as Locale;

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
  const title = `${icon} agents-radar · ${date}`;

  const content = buildFeishuMessage({ date, reports, highlights, enabledLangs, primaryLang, env });

  console.error(`[feishu] Sending to ${urls.length} webhook(s) for ${date} (${reports.length} reports)…`);
  await sendFeishu(title, content);
  console.error("[feishu] Done!");
};
