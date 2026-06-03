import fs from "node:fs";
import path from "node:path";
import { callLlm } from "../../report/call-llm";
import { buildWechatMonthlyPrompt } from "./build-wechat-monthly-prompt";
import { buildWechatPrompt } from "./build-wechat-prompt";
import { buildXiaohongshuPrompt } from "./build-xiaohongshu-prompt";

const DIGESTS_DIR = "digests";
const SOCIAL_DIR = "social";

const SOURCE_REPORTS = ["ai-cli", "ai-agents", "ai-web", "ai-trending", "ai-hn"];

type FsDeps = {
  readdirSync: (path: string) => string[];
  readFileSync: (path: string, encoding: "utf-8") => string;
  writeFileSync: (path: string, content: string, encoding: "utf-8") => void;
  mkdirSync: (path: string, options: { recursive: boolean }) => void;
  existsSync: (path: string) => boolean;
};

const saveSocialFile = (
  content: string,
  filename: string,
  deps: FsDeps,
): string => {
  deps.mkdirSync(SOCIAL_DIR, { recursive: true });
  const filepath = path.join(SOCIAL_DIR, filename);
  deps.writeFileSync(filepath, content, "utf-8");
  return filepath;
};

const getRecentDates = (n: number, deps: Pick<FsDeps, "readdirSync" | "existsSync">): string[] => {
  const dateRe = /^\d{4}-\d{2}-\d{2}$/;
  return deps
    .readdirSync(DIGESTS_DIR)
    .filter(
      (d) =>
        dateRe.test(d) &&
        deps.existsSync(path.join(DIGESTS_DIR, d)) &&
        fs.statSync(path.join(DIGESTS_DIR, d)).isDirectory(),
    )
    .sort()
    .reverse()
    .slice(0, n);
};

const loadReports = (
  date: string,
  deps: Pick<FsDeps, "readFileSync" | "existsSync">,
  truncate = 3000,
): string => {
  const sections: string[] = [];
  for (const report of SOURCE_REPORTS) {
    const filePath = path.join(DIGESTS_DIR, date, `${report}.md`);
    if (deps.existsSync(filePath)) {
      const content = deps.readFileSync(filePath, "utf-8");
      sections.push(`## [${report}]\n\n${content.slice(0, truncate)}`);
    }
  }
  return sections.join("\n\n---\n\n");
};

const loadMultiDayReports = (
  days: number,
  deps: FsDeps,
  truncate: number,
): { dateRange: string; content: string } => {
  const dates = getRecentDates(days, deps);
  if (dates.length === 0) throw new Error("No digest directories found");

  const sections: string[] = [];
  for (const date of dates) {
    const dayContent = loadReports(date, deps, truncate);
    if (dayContent) {
      sections.push(`# ${date}\n\n${dayContent}`);
    }
  }
  if (sections.length === 0) throw new Error(`No reports found in the last ${days} days`);

  const dateRange = `${dates[dates.length - 1]} ~ ${dates[0]}`;
  return { dateRange, content: sections.join("\n\n===\n\n") };
};

/**
 * ⚠️ IMPORTANT: Prompts are in zh-CN (build-xiaohongshu-prompt.ts, build-wechat-prompt.ts,
 * build-wechat-monthly-prompt.ts). xiaohongshu and WeChat audiences are native Chinese readers.
 * Do NOT translate them.
 */

export type Platform = "xiaohongshu" | "wechat" | "wechat:monthly";

export interface SocialActionArgs {
  platform: Platform;
}

export type ActionDeps = {
  callLlm?: (prompt: string, maxTokens: number) => Promise<string>;
  write?: (s: string) => void;
  readdirSync?: (path: string) => string[];
  readFileSync?: (path: string, encoding: "utf-8") => string;
  writeFileSync?: (path: string, content: string, encoding: "utf-8") => void;
  mkdirSync?: (path: string, options: { recursive: boolean }) => void;
  existsSync?: (path: string) => boolean;
};

const defaultFsDeps: FsDeps = {
  readdirSync: fs.readdirSync.bind(fs),
  readFileSync: fs.readFileSync.bind(fs) as (path: string, encoding: "utf-8") => string,
  writeFileSync: fs.writeFileSync.bind(fs) as (path: string, content: string, encoding: "utf-8") => void,
  mkdirSync: fs.mkdirSync.bind(fs) as (path: string, options: { recursive: boolean }) => void,
  existsSync: fs.existsSync.bind(fs),
};

export const socialAction = async (
  args: SocialActionArgs,
  deps: ActionDeps = {},
): Promise<void> => {
  const { platform } = args;
  const {
    callLlm: callLlmFn = callLlm,
    write = console.log,
    readdirSync = defaultFsDeps.readdirSync,
    readFileSync = defaultFsDeps.readFileSync,
    writeFileSync = defaultFsDeps.writeFileSync,
    mkdirSync = defaultFsDeps.mkdirSync,
    existsSync = defaultFsDeps.existsSync,
  } = deps;

  const fsDeps: FsDeps = { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync };

  if (platform === "xiaohongshu") {
    const dates = getRecentDates(1, fsDeps);
    if (dates.length === 0) throw new Error("No digest directories found");
    const date = dates[0]!;
    const reports = loadReports(date, fsDeps);
    if (!reports) throw new Error(`No reports found for ${date}`);

    write(`[social] Generating xiaohongshu article for ${date}…`);
    const content = await callLlmFn(buildXiaohongshuPrompt(reports, date), 4096);
    const filepath = saveSocialFile(content, `${date}-xiaohongshu.md`, fsDeps);
    write(`[social] Saved to ${filepath}`);
  } else if (platform === "wechat") {
    const { dateRange, content: reports } = loadMultiDayReports(7, fsDeps, 2000);
    const latestDate = getRecentDates(1, fsDeps);
    if (latestDate.length === 0) throw new Error("No digest directories found");

    write(`[social] Generating wechat weekly article for ${dateRange}…`);
    const content = await callLlmFn(buildWechatPrompt(dateRange, reports), 16384);
    const filepath = saveSocialFile(content, `${latestDate[0]}-wechat.md`, fsDeps);
    write(`[social] Saved to ${filepath}`);
  } else {
    const { dateRange, content: reports } = loadMultiDayReports(30, fsDeps, 1000);
    const latestDate = getRecentDates(1, fsDeps);
    if (latestDate.length === 0) throw new Error("No digest directories found");

    write(`[social] Generating wechat monthly article for ${dateRange}…`);
    const content = await callLlmFn(buildWechatMonthlyPrompt(dateRange, reports), 16384);
    const filepath = saveSocialFile(content, `${latestDate[0]}-wechat-monthly.md`, fsDeps);
    write(`[social] Saved to ${filepath}`);
  }
};
