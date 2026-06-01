import fs from "node:fs";
import path from "node:path";
import dotenvx from "@dotenvx/dotenvx";
import { callLlm } from "../../report/call-llm";
import { buildXiaohongshuPrompt } from "./build-xiaohongshu-prompt";
import { buildWechatPrompt } from "./build-wechat-prompt";
import { buildWechatMonthlyPrompt } from "./build-wechat-monthly-prompt";

dotenvx.config({ quiet: true });

export interface SocialActionArgs {
  platform: "xiaohongshu" | "wechat" | "wechat:monthly";
  verbosity: number;
}

export type SocialDeps = {
  write?: (s: string) => void;
};

const DIGESTS_DIR = "digests";
const SOCIAL_DIR = "social";

const saveSocialFile = (content: string, filename: string): string => {
  fs.mkdirSync(SOCIAL_DIR, { recursive: true });
  const filepath = path.join(SOCIAL_DIR, filename);
  fs.writeFileSync(filepath, content, "utf-8");
  return filepath;
};

const SOURCE_REPORTS = ["ai-cli", "ai-agents", "ai-web", "ai-trending", "ai-hn"];

const getRecentDates = (n: number): string[] => {
  const dateRe = /^\d{4}-\d{2}-\d{2}$/;
  return fs
    .readdirSync(DIGESTS_DIR)
    .filter((d) => dateRe.test(d) && fs.statSync(path.join(DIGESTS_DIR, d)).isDirectory())
    .sort()
    .reverse()
    .slice(0, n);
};

const loadReports = (date: string, truncate = 3000): string => {
  const sections: string[] = [];
  for (const report of SOURCE_REPORTS) {
    const filePath = path.join(DIGESTS_DIR, date, `${report}.md`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      sections.push(`## [${report}]\n\n${content.slice(0, truncate)}`);
    }
  }
  return sections.join("\n\n---\n\n");
};

const loadMultiDayReports = (days: number, truncate: number): { dateRange: string; content: string } => {
  const dates = getRecentDates(days);
  if (dates.length === 0) throw new Error("No digest directories found");

  const sections: string[] = [];
  for (const date of dates) {
    const dayContent = loadReports(date, truncate);
    if (dayContent) {
      sections.push(`# ${date}\n\n${dayContent}`);
    }
  }
  if (sections.length === 0) throw new Error(`No reports found in the last ${days} days`);

  const dateRange = `${dates[dates.length - 1]} ~ ${dates[0]}`;
  return { dateRange, content: sections.join("\n\n===\n\n") };
};

export const socialAction = async (args: SocialActionArgs, _deps: SocialDeps = {}): Promise<void> => {
  const { platform, verbosity } = args;

  if (verbosity >= 1) {
    console.error(`[social] Platform: ${platform}`);
  }

  if (platform === "xiaohongshu") {
    const dates = getRecentDates(1);
    if (dates.length === 0) throw new Error("No digest directories found");
    const date = dates[0]!;
    const reports = loadReports(date);
    if (!reports) throw new Error(`No reports found for ${date}`);

    console.error(`[social] Generating xiaohongshu article for ${date}…`);
    const content = await callLlm(buildXiaohongshuPrompt(reports, date), 4096);
    const filepath = saveSocialFile(content, `${date}-xiaohongshu.md`);
    console.error(`[social] Saved to ${filepath}`);
  } else if (platform === "wechat") {
    const { dateRange, content: reports } = loadMultiDayReports(7, 2000);
    const latestDate = getRecentDates(1)[0]!;

    console.error(`[social] Generating wechat weekly article for ${dateRange}…`);
    const content = await callLlm(buildWechatPrompt(dateRange, reports), 16384);
    const filepath = saveSocialFile(content, `${latestDate}-wechat.md`);
    console.error(`[social] Saved to ${filepath}`);
  } else {
    const { dateRange, content: reports } = loadMultiDayReports(30, 1000);
    const latestDate = getRecentDates(1)[0]!;

    console.error(`[social] Generating wechat monthly article for ${dateRange}…`);
    const content = await callLlm(buildWechatMonthlyPrompt(dateRange, reports), 16384);
    const filepath = saveSocialFile(content, `${latestDate}-wechat-monthly.md`);
    console.error(`[social] Saved to ${filepath}`);
  }
};
