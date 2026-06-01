import fs from "node:fs";
import path from "node:path";
import { buildMessage, type Highlights } from "./build-message";

export interface NotifyActionArgs {
  verbosity: number;
}

export type NotifyDeps = {
  write?: (s: string) => void;
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

  let highlights: Highlights | null = null;
  const highlightsPath = path.join("digests", date, "highlights.json");
  if (fs.existsSync(highlightsPath)) {
    try {
      highlights = JSON.parse(fs.readFileSync(highlightsPath, "utf-8")) as Highlights;
    } catch (error) {
      console.error("[notify] Failed to parse highlights.json — sending without highlights.", error);
    }
  }

  const text = buildMessage(date, reports, undefined, highlights, env);

  console.error(`[notify] Sending Telegram message for ${date} (${reports.length} reports)…`);
  await sendTelegram(text);
  console.error("[notify] Done!");
};
