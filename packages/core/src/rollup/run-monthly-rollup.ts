import fs from "node:fs";
import path from "node:path";
import { DateTime } from "luxon";
import { createGitHubIssue } from "../github";
import { buildMonthlyPrompt } from "../prompts";
import { autoGenFooter } from "../report/auto-gen-footer";
import { callLlm } from "../report/call-llm";
import { LLM_TOKENS_ROLLUP } from "../report/report-constants";
import { saveFile } from "../report/save-file";
import {
  getEnabledLangs,
  getPrimaryLang,
  type Locale,
  loadConfig,
  t,
  toCstDateStr,
  toUtcStr,
} from "../utils";
import { DIGESTS_DIR } from "./constants";
import { generateRollupHighlights } from "./generate-rollup-highlights";
import { getDateDirs } from "./get-date-dirs";
import { readDailyDigest } from "./read-daily-digest";
import { readWeeklyDigest } from "./read-weekly-digest";

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

  const { languages: configLangs } = loadConfig();
  const enabledLangs = getEnabledLangs(configLangs, env);

  console.error(`[monthly] Generating rollup for ${monthStr} (date: ${dateStr})`);

  const allDates = getDateDirs();

  const monthDates = allDates.filter((d) => d.startsWith(monthStr));
  const weeklyDates = monthDates.filter((d) => fs.existsSync(path.join(DIGESTS_DIR, d, "ai-weekly.md")));

  let sourceDigests: Record<string, string>;
  let sourceCount: number;

  if (weeklyDates.length >= 2) {
    sourceCount = weeklyDates.length;
    sourceDigests = {};
    for (const date of weeklyDates) {
      const content = readWeeklyDigest(date);
      if (content) sourceDigests[date] = content;
    }
  } else {
    const sampled = monthDates.filter((_, i) => i % 4 === 0).slice(0, 10);
    sourceCount = sampled.length;
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

  console.error(`[monthly] Source count: ${sourceCount}`);

  console.error(`[monthly] Calling LLM for ${enabledLangs.length} languages...`);
  const summaryPromises = enabledLangs.map(async (lang) => {
    const summary = await callLlm(
      buildMonthlyPrompt(sourceDigests, monthStr, lang as Locale),
      LLM_TOKENS_ROLLUP,
    );
    return [lang, summary] as const;
  });
  const summaryResults = await Promise.all(summaryPromises);
  const summariesByLang = Object.fromEntries(summaryResults);

  const allContent: Record<string, string> = {};
  for (const lang of enabledLangs) {
    const l = lang as Locale;
    const footer = autoGenFooter(l);
    const s = t(l);
    const sourceLabel =
      weeklyDates.length >= 2
        ? s.sourceLabelWeekly.replace("{n}", String(sourceCount))
        : s.sourceLabelDailySampled.replace("{n}", String(sourceCount));
    const metaLine = s.monthlyMeta.replace("{sources}", sourceLabel).replace("{utcStr}", utcStr);
    allContent[lang] =
      `# ${s.monthlyTitle} ${monthStr}\n\n` + metaLine + `---\n\n` + (summariesByLang[lang] ?? "") + footer;

    const suffix = lang === getPrimaryLang() ? "" : `.${lang}`;
    console.error(`  Saved ${saveFile(allContent[lang]!, dateStr, `ai-monthly${suffix}.md`)}`);
  }

  await generateRollupHighlights(allContent, "ai-monthly", dateStr, 6);

  if (resolvedDigestRepo && enabledLangs.length > 0) {
    const primaryLang = enabledLangs[0]!;
    const primaryContent = allContent[primaryLang] ?? "";
    const url = await createGitHubIssue(
      `${t(primaryLang).monthlyTitle} ${monthStr}`,
      primaryContent,
      "monthly",
    );
    console.error(`  Created monthly issue: ${url}`);
  }

  console.error("[monthly] Done!");
};
