import fs from "node:fs";
import path from "node:path";
import { DateTime } from "luxon";
import { createGitHubIssue } from "../github";
import { buildMonthlyPrompt } from "../prompts";
import { autoGenFooter } from "../report/auto-gen-footer";
import { callLlm } from "../report/call-llm";
import { LLM_TOKENS_ROLLUP } from "../report/report-constants";
import { saveFile } from "../report/save-file";
import { t, toCstDateStr, toUtcStr } from "../utils";
import {
  DIGESTS_DIR,
  generateRollupHighlights,
  getDateDirs,
  readDailyDigest,
  readWeeklyDigest,
} from "./rollup-utils";

export const runMonthlyRollup = async (digestRepo: string = process.env.DIGEST_REPO ?? ""): Promise<void> => {
  const now = DateTime.now();
  const cstDate = now.plus({ hours: 8 });
  const prevMonth = DateTime.utc(cstDate.year, cstDate.month - 1, 1);
  const monthStr = prevMonth.toFormat("yyyy-MM");
  const dateStr = toCstDateStr(now);
  const utcStr = toUtcStr(now);

  console.error(`[monthly] Generating rollup for ${monthStr} (date: ${dateStr})`);

  const allDates = getDateDirs();

  const monthDates = allDates.filter((d) => d.startsWith(monthStr));
  const weeklyDates = monthDates.filter((d) => fs.existsSync(path.join(DIGESTS_DIR, d, "ai-weekly.md")));

  let sourceDigests: Record<string, string>;
  let sourceLabel: { zh: string; en: string };

  if (weeklyDates.length >= 2) {
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
