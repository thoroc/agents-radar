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
import { generateRollupHighlights } from "./generate-rollup-highlights";
import { getDateDirs } from "./get-date-dirs";
import { readDailyDigest } from "./read-daily-digest";
import { readWeeklyDigest } from "./read-weekly-digest";
import { DIGESTS_DIR } from "./rollup-constants";

export const runMonthlyRollup = async (
  digestRepo?: string,
  env: NodeJS.ProcessEnv = process.env,
): Promise<void> => {
  const resolvedDigestRepo = digestRepo ?? env.DIGEST_REPO ?? "";
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
  let sourceLabel: { "zh-CN": string; "en-US": string };

  if (weeklyDates.length >= 2) {
    sourceLabel = {
      "zh-CN": `${weeklyDates.length} 份周报`,
      "en-US": `${weeklyDates.length} weekly reports`,
    };
    sourceDigests = {};
    for (const date of weeklyDates) {
      const content = readWeeklyDigest(date);
      if (content) sourceDigests[date] = content;
    }
  } else {
    const sampled = monthDates.filter((_, i) => i % 4 === 0).slice(0, 10);
    sourceLabel = {
      "zh-CN": `${sampled.length} 份日报（每4日采样）`,
      "en-US": `${sampled.length} daily reports (sampled every 4 days)`,
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

  console.error(`[monthly] Source: ${sourceLabel["zh-CN"]}`);

  console.error("[monthly] Calling LLM for ZH and EN monthly reports in parallel...");
  const [zhSummary, enSummary] = await Promise.all([
    callLlm(buildMonthlyPrompt(sourceDigests, monthStr, "zh-CN"), LLM_TOKENS_ROLLUP),
    callLlm(buildMonthlyPrompt(sourceDigests, monthStr, "en-US"), LLM_TOKENS_ROLLUP),
  ]);

  const footer = autoGenFooter("zh-CN");
  const enFooter = autoGenFooter("en-US");

  const zhContent =
    `# ${t("zh-CN").monthlyTitle} ${monthStr}\n\n` +
    `> 数据来源: ${sourceLabel["zh-CN"]} | 生成时间: ${utcStr} UTC\n\n` +
    `---\n\n` +
    zhSummary +
    footer;

  const enContent =
    `# ${t("en-US").monthlyTitle} ${monthStr}\n\n` +
    `> Sources: ${sourceLabel["en-US"]} | Generated: ${utcStr} UTC\n\n` +
    `---\n\n` +
    enSummary +
    enFooter;

  console.error(`  Saved ${saveFile(zhContent, dateStr, "ai-monthly.md")}`);
  console.error(`  Saved ${saveFile(enContent, dateStr, "ai-monthly.en-US.md")}`);

  await generateRollupHighlights(zhContent, enContent, "ai-monthly", dateStr, 6);

  if (resolvedDigestRepo) {
    const url = await createGitHubIssue(`${t("zh-CN").monthlyTitle} ${monthStr}`, zhContent, "monthly");
    console.error(`  Created monthly issue: ${url}`);
  }

  console.error("[monthly] Done!");
};
