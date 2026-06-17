import fs from "node:fs";
import path from "node:path";
import { getEnabledLangs, loadConfig } from "@agents-radar/config";
import { buildMessage, type Highlights, sendTelegram } from "@agents-radar/core/notifications/notify";
import type { Locale } from "@agents-radar/core/utils";

export interface NotifyActionArgs {
  verbosity: number;
}

export type NotifyDeps = {
  write?: (s: string) => void;
};

export const notifyAction = async (
  args: NotifyActionArgs,
  _deps: NotifyDeps = {},
  env: NodeJS.ProcessEnv = process.env,
): Promise<void> => {
  const { verbosity } = args;
  const BOT_TOKEN = env.TELEGRAM_BOT_TOKEN ?? "";
  if (!BOT_TOKEN) {
    console.error("[notify] TELEGRAM_BOT_TOKEN not set — skipping.");
    return;
  }

  if (!fs.existsSync("assets/manifest.json")) {
    console.error("[notify] assets/manifest.json not found — skipping.");
    return;
  }

  const { languages: configLangs, defaultPrimaryLanguage } = loadConfig();
  const enabledLangs = getEnabledLangs(configLangs, env);
  const primaryLang: Locale = (defaultPrimaryLanguage ?? "en-US") as Locale;

  const { dates } = JSON.parse(fs.readFileSync("assets/manifest.json", "utf-8")) as {
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

  let highlights: Highlights | null = null;
  const highlightsPath = path.join("assets", "digests", date, "highlights.json");
  if (fs.existsSync(highlightsPath)) {
    try {
      highlights = JSON.parse(fs.readFileSync(highlightsPath, "utf-8")) as Highlights;
    } catch (error) {
      console.error("[notify] Failed to parse highlights.json — sending without highlights.", error);
    }
  }

  const text = buildMessage(date, reports, undefined, highlights, enabledLangs, primaryLang, env);

  console.error(`[notify] Sending Telegram message for ${date} (${reports.length} reports)…`);
  await sendTelegram(text, env);
  console.error("[notify] Done!");
};
