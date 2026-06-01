import { DateTime } from "luxon";
import { createGitHubIssue } from "../github";
import { buildWeeklyPrompt } from "../prompts";
import { autoGenFooter } from "../report/auto-gen-footer";
import { callLlm } from "../report/call-llm";
import { LLM_TOKENS_ROLLUP } from "../report/report-constants";
import { saveFile } from "../report/save-file";
import { t, toCstDateStr, toUtcStr } from "../utils";
import { generateRollupHighlights, getDateDirs, readDailyDigest } from "./rollup-utils";
import { toWeekStr } from "./week-str";

export const runWeeklyRollup = async (
  digestRepo?: string,
  env: NodeJS.ProcessEnv = process.env,
): Promise<void> => {
  const resolvedDigestRepo = digestRepo ?? env.DIGEST_REPO ?? "";
  const now = DateTime.now();
  const dateStr = toCstDateStr(now);
  const utcStr = toUtcStr(now);
  const weekStr = toWeekStr(now.plus({ hours: 8 }));

  console.error(`[weekly] Generating rollup for ${weekStr} (date: ${dateStr})`);

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

  if (resolvedDigestRepo) {
    const url = await createGitHubIssue(`${t("zh").weeklyTitle} ${weekStr}`, zhContent, "weekly");
    console.error(`  Created weekly issue: ${url}`);
  }

  console.error("[weekly] Done!");
};
