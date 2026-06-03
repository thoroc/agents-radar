import fs from "node:fs";
import {
  buildWechatMonthlyPrompt,
  buildWechatPrompt,
  buildXiaohongshuPrompt,
  type FsDeps,
  loadMultiDayReports,
  loadReports,
  type Platform,
  saveFile,
} from "@agents-radar/core/notifications/social";
import { callLlm } from "@agents-radar/core/report";
import { getRecentDates } from "../../core/src/notifications/social/get-recent-dates";

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

export const socialAction = async (args: SocialActionArgs, deps: ActionDeps = {}): Promise<void> => {
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
    const filepath = saveFile(content, `${date}-xiaohongshu.md`, fsDeps);
    write(`[social] Saved to ${filepath}`);
  } else if (platform === "wechat") {
    const { dateRange, content: reports } = loadMultiDayReports(7, fsDeps, 2000);
    const latestDate = getRecentDates(1, fsDeps);
    if (latestDate.length === 0) throw new Error("No digest directories found");

    write(`[social] Generating wechat weekly article for ${dateRange}…`);
    const content = await callLlmFn(buildWechatPrompt(dateRange, reports), 16384);
    const filepath = saveFile(content, `${latestDate[0]}-wechat.md`, fsDeps);
    write(`[social] Saved to ${filepath}`);
  } else {
    const { dateRange, content: reports } = loadMultiDayReports(30, fsDeps, 1000);
    const latestDate = getRecentDates(1, fsDeps);
    if (latestDate.length === 0) throw new Error("No digest directories found");

    write(`[social] Generating wechat monthly article for ${dateRange}…`);
    const content = await callLlmFn(buildWechatMonthlyPrompt(dateRange, reports), 16384);
    const filepath = saveFile(content, `${latestDate[0]}-wechat-monthly.md`, fsDeps);
    write(`[social] Saved to ${filepath}`);
  }
};
