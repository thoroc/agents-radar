/**
 * Weekly and monthly rollup report generator.
 * Reads existing daily digest files — no GitHub API calls needed.
 */

import fs from "node:fs";
import path from "node:path";
import { DateTime } from "luxon";
import { createGitHubIssue } from "./github";
import {
  buildHighlightsPrompt,
  buildMonthlyPrompt,
  buildWeeklyPrompt,
  type ReportHighlights,
} from "./prompts/prompts-data";
import { autoGenFooter, callLlm, LLM_TOKENS_ROLLUP, saveFile } from "./report";
import { toCstDateStr, toUtcStr } from "./utils/date";
import { t } from "./utils/i18n";

const DIGESTS_DIR = "digests";
const MAX_CHARS_PER_REPORT = 2500;

// Source report types to read for rollups (in priority order)
const ROLLUP_SOURCES = ["ai-cli", "ai-agents", "ai-trending", "ai-hn", "ai-web"];

const getDateDirs = (): string[] => {
  if (!fs.existsSync(DIGESTS_DIR)) return [];
  return fs
    .readdirSync(DIGESTS_DIR)
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && fs.statSync(path.join(DIGESTS_DIR, d)).isDirectory())
    .sort()
    .reverse();
};

/** Read and truncate all daily digest files for a date. Returns null if none found. */
const readDailyDigest = (date: string): string | null => {
  const parts: string[] = [];
  for (const type of ROLLUP_SOURCES) {
    const p = path.join(DIGESTS_DIR, date, `${type}.md`);
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, "utf-8");
      const truncated = content.slice(0, MAX_CHARS_PER_REPORT);
      parts.push(truncated.length < content.length ? `${truncated}\n...[摘要截断]` : truncated);
    }
  }
  return parts.length > 0 ? parts.join("\n\n") : null;
};

/** Read a weekly report file. Returns null if not found. */
const readWeeklyDigest = (date: string): string | null => {
  const p = path.join(DIGESTS_DIR, date, "ai-weekly.md");
  if (!fs.existsSync(p)) return null;
  const content = fs.readFileSync(p, "utf-8");
  return content.slice(0, 3000) + (content.length > 3000 ? "\n...[截断]" : "");
};

/** Format a date as ISO week string, e.g. "2026-W10". */
export const toWeekStr = (dt: DateTime = DateTime.now()): string => {
  return `${dt.weekYear}-W${String(dt.weekNumber).padStart(2, "0")}`;
};

const generateRollupHighlights = async (
  zhContent: string,
  enContent: string,
  reportId: string,
  dateStr: string,
  itemsPerReport: number,
): Promise<void> => {
  console.error(`  [${reportId}] Generating highlights for Telegram...`);

  // Read existing highlights (e.g. from daily digest) so we merge instead of overwrite
  const existingPath = path.join(DIGESTS_DIR, dateStr, "highlights.json");
  let existing: Record<string, ReportHighlights> = { zh: {}, en: {} };
  if (fs.existsSync(existingPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(existingPath, "utf-8"));
    } catch {
      // ignore parse errors — start fresh
    }
  }

  const highlights: Record<string, ReportHighlights> = {
    zh: { ...existing.zh },
    en: { ...existing.en },
  };

  try {
    const [zhRaw, enRaw] = await Promise.all([
      callLlm(buildHighlightsPrompt({ [reportId]: zhContent }, "zh", itemsPerReport), 1024),
      callLlm(buildHighlightsPrompt({ [reportId]: enContent }, "en", itemsPerReport), 1024),
    ]);
    const zhNew = JSON.parse(
      zhRaw
        .replace(/```json?\n?/g, "")
        .replace(/```/g, "")
        .trim(),
    ) as ReportHighlights;
    const enNew = JSON.parse(
      enRaw
        .replace(/```json?\n?/g, "")
        .replace(/```/g, "")
        .trim(),
    ) as ReportHighlights;
    Object.assign(highlights.zh ?? {}, zhNew);
    Object.assign(highlights.en ?? {}, enNew);
  } catch (err) {
    console.error(`  [${reportId}] Highlights generation failed: ${err}`);
  }
  const p = saveFile(JSON.stringify(highlights, null, 2), dateStr, "highlights.json");
  console.error(`  Saved ${p}`);
};

export const runWeeklyRollup = async (): Promise<void> => {
  const now = DateTime.now();
  const dateStr = toCstDateStr(now);
  const utcStr = toUtcStr(now);
  const weekStr = toWeekStr(now.plus({ hours: 8 }));
  const digestRepo = process.env.DIGEST_REPO ?? "";

  console.error(`[weekly] Generating rollup for ${weekStr} (date: ${dateStr})`);

  // Collect last 7 days of daily digests
  const allDates = getDateDirs();
  const last7 = allDates.slice(0, 7);

  const dailyDigests: Record<string, string> = {};
  for (const date of last7) {
    const content = readDailyDigest(date);
    if (content) dailyDigests[date] = content;
  }

  if (Object.keys(dailyDigests).length === 0) {
    console.error("[weekly] No daily digests found, skipping.");
    return;
  }

  console.error(
    `[weekly] Found ${Object.keys(dailyDigests).length} daily digests: ${Object.keys(dailyDigests).join(", ")}`,
  );

  // Generate ZH and EN in parallel
  console.error("[weekly] Calling LLM for ZH and EN weekly reports in parallel...");
  const [zhSummary, enSummary] = await Promise.all([
    callLlm(buildWeeklyPrompt(dailyDigests, weekStr, "zh"), LLM_TOKENS_ROLLUP),
    callLlm(buildWeeklyPrompt(dailyDigests, weekStr, "en"), LLM_TOKENS_ROLLUP),
  ]);

  const footer = autoGenFooter("zh");
  const enFooter = autoGenFooter("en");

  const zhContent =
    `# ${t("zh").weeklyTitle} ${weekStr}\n\n` +
    `> ${t("zh").weeklyCoverage}: ${last7[last7.length - 1]} ~ ${last7[0]} | 生成时间: ${utcStr} UTC\n\n` +
    `---\n\n` +
    zhSummary +
    footer;

  const enContent =
    `# ${t("en").weeklyTitle} ${weekStr}\n\n` +
    `> ${t("en").weeklyCoverage}: ${last7[last7.length - 1]} ~ ${last7[0]} | Generated: ${utcStr} UTC\n\n` +
    `---\n\n` +
    enSummary +
    enFooter;

  console.error(`  Saved ${saveFile(zhContent, dateStr, "ai-weekly.md")}`);
  console.error(`  Saved ${saveFile(enContent, dateStr, "ai-weekly.md")}`);

  await generateRollupHighlights(zhContent, enContent, "ai-weekly", dateStr, 6);

  if (digestRepo) {
    const url = await createGitHubIssue(`${t("zh").weeklyTitle} ${weekStr}`, zhContent, "weekly");
    console.error(`  Created weekly issue: ${url}`);
  }

  console.error("[weekly] Done!");
};

export const runMonthlyRollup = async (): Promise<void> => {
  const now = DateTime.now();
  const cstDate = now.plus({ hours: 8 });
  // Monthly report covers the PREVIOUS month
  const prevMonth = DateTime.utc(cstDate.year, cstDate.month - 1, 1);
  const monthStr = prevMonth.toFormat("yyyy-MM"); // "2026-02"
  const dateStr = toCstDateStr(now);
  const utcStr = toUtcStr(now);
  const digestRepo = process.env.DIGEST_REPO ?? "";

  console.error(`[monthly] Generating rollup for ${monthStr} (date: ${dateStr})`);

  const allDates = getDateDirs();

  // Prefer weekly reports from the target month
  const monthDates = allDates.filter((d) => d.startsWith(monthStr));
  const weeklyDates = monthDates.filter((d) => fs.existsSync(path.join(DIGESTS_DIR, d, "ai-weekly.md")));

  let sourceDigests: Record<string, string>;
  let sourceLabel: { zh: string; en: string };

  if (weeklyDates.length >= 2) {
    // Use weekly reports
    sourceLabel = {
      zh: `${weeklyDates.length} 份周报`,
      en: `${weeklyDates.length} weekly reports`,
    };
    sourceDigests = {};
    for (const date of weeklyDates) {
      const content = readWeeklyDigest(date);
      if (content) sourceDigests[date] = content;
    }
  } else {
    // Sample daily reports: every 4th day, max 10
    const sampled = monthDates.filter((_, i) => i % 4 === 0).slice(0, 10);
    sourceLabel = {
      zh: `${sampled.length} 份日报（每4日采样）`,
      en: `${sampled.length} daily reports (sampled every 4 days)`,
    };
    sourceDigests = {};
    for (const date of sampled) {
      const content = readDailyDigest(date);
      if (content) sourceDigests[date] = content;
    }
  }

  if (Object.keys(sourceDigests).length === 0) {
    console.error(`[monthly] No source digests found for ${monthStr}, skipping.`);
    return;
  }

  console.error(`[monthly] Source: ${sourceLabel.zh}`);

  // Generate ZH and EN in parallel
  console.error("[monthly] Calling LLM for ZH and EN monthly reports in parallel...");
  const [zhSummary, enSummary] = await Promise.all([
    callLlm(buildMonthlyPrompt(sourceDigests, monthStr, "zh"), LLM_TOKENS_ROLLUP),
    callLlm(buildMonthlyPrompt(sourceDigests, monthStr, "en"), LLM_TOKENS_ROLLUP),
  ]);

  const footer = autoGenFooter("zh");
  const enFooter = autoGenFooter("en");

  const zhContent =
    `# ${t("zh").monthlyTitle} ${monthStr}\n\n` +
    `> 数据来源: ${sourceLabel.zh} | 生成时间: ${utcStr} UTC\n\n` +
    `---\n\n` +
    zhSummary +
    footer;

  const enContent =
    `# ${t("en").monthlyTitle} ${monthStr}\n\n` +
    `> Sources: ${sourceLabel.en} | Generated: ${utcStr} UTC\n\n` +
    `---\n\n` +
    enSummary +
    enFooter;

  console.error(`  Saved ${saveFile(zhContent, dateStr, "ai-monthly.md")}`);
  console.error(`  Saved ${saveFile(enContent, dateStr, "ai-monthly.md")}`);

  await generateRollupHighlights(zhContent, enContent, "ai-monthly", dateStr, 6);

  if (digestRepo) {
    const url = await createGitHubIssue(`${t("zh").monthlyTitle} ${monthStr}`, zhContent, "monthly");
    console.error(`  Created monthly issue: ${url}`);
  }

  console.error("[monthly] Done!");
};
