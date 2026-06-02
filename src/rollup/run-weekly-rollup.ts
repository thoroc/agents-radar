import { DateTime } from "luxon";
import { createGitHubIssue } from "../github";
import { buildWeeklyPrompt } from "../prompts";
import { autoGenFooter } from "../report/auto-gen-footer";
import { callLlm } from "../report/call-llm";
import { LLM_TOKENS_ROLLUP } from "../report/report-constants";
import { saveFile } from "../report/save-file";
import { getEnabledLangs, type Locale, loadConfig, t, toCstDateStr, toUtcStr } from "../utils";
import { generateRollupHighlights } from "./generate-rollup-highlights";
import { getDateDirs } from "./get-date-dirs";
import { readDailyDigest } from "./read-daily-digest";
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

  const { languages: configLangs } = loadConfig();
  const enabledLangs = getEnabledLangs(configLangs, env);

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

  console.error(`[weekly] Calling LLM for ${enabledLangs.length} languages...`);
  const summaryPromises = enabledLangs.map(async (lang) => {
    const summary = await callLlm(
      buildWeeklyPrompt(dailyDigests, weekStr, lang as Locale),
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
    const metaLine = `${s.weeklyMeta.replace("{range}", `${last7[last7.length - 1]} ~ ${last7[0]}`).replace("{utcStr}", utcStr)}`;
    allContent[lang] =
      `# ${s.weeklyTitle} ${weekStr}\n\n` + metaLine + `---\n\n` + (summariesByLang[lang] ?? "") + footer;

    const suffix = lang === "zh-CN" ? "" : `.${lang}`;
    console.error(`  Saved ${saveFile(allContent[lang]!, dateStr, `ai-weekly${suffix}.md`)}`);
  }

  await generateRollupHighlights(allContent, "ai-weekly", dateStr, 6);

  if (resolvedDigestRepo && enabledLangs.length > 0) {
    const primaryLang = enabledLangs[0]!;
    const primaryContent = allContent[primaryLang] ?? "";
    const url = await createGitHubIssue(`${t(primaryLang).weeklyTitle} ${weekStr}`, primaryContent, "weekly");
    console.error(`  Created weekly issue: ${url}`);
  }

  console.error("[weekly] Done!");
};
