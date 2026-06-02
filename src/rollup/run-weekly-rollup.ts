import { DateTime } from "luxon";
import { createGitHubIssue } from "../github";
import { buildWeeklyPrompt } from "../prompts";
import { autoGenFooter } from "../report/auto-gen-footer";
import { callLlm } from "../report/call-llm";
import { LLM_TOKENS_ROLLUP } from "../report/report-constants";
import { saveFile } from "../report/save-file";
import type { Locale } from "../utils";
import { DEFAULT_LANGUAGES, t, toCstDateStr, toUtcStr } from "../utils";
import { generateRollupHighlights } from "./generate-rollup-highlights";
import { getDateDirs } from "./get-date-dirs";
import { readDailyDigest } from "./read-daily-digest";
import { toWeekStr } from "./week-str";

export const runWeeklyRollup = async (
  digestRepo?: string,
  env: NodeJS.ProcessEnv = process.env,
  languages: string[] = DEFAULT_LANGUAGES,
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

  console.error(`[weekly] Calling LLM for reports in ${languages.join(", ")} in parallel...`);
  const summaries = await Promise.all(
    languages.map((lang) =>
      callLlm(buildWeeklyPrompt(dailyDigests, weekStr, lang as Locale), LLM_TOKENS_ROLLUP).then((s) => ({
        lang,
        summary: s,
      })),
    ),
  );

  const contentsByLang: Record<string, string> = {};
  for (const { lang, summary } of summaries) {
    const suffix = lang === "zh-CN" ? "" : `.${lang}`;
    const footer = autoGenFooter(lang as Locale);
    const content =
      `# ${t(lang as Locale).weeklyTitle} ${weekStr}\n\n` +
      `> ${t(lang as Locale).weeklyCoverage}: ${last7[last7.length - 1]} ~ ${last7[0]} | ${lang === "zh-CN" ? "生成时间" : "Generated"}: ${utcStr} UTC\n\n` +
      `---\n\n` +
      summary +
      footer;

    contentsByLang[lang] = content;
    console.error(`  Saved ${saveFile(content, dateStr, `ai-weekly${suffix}.md`)}`);
  }

  await generateRollupHighlights(contentsByLang, "ai-weekly", dateStr, 6, languages);

  if (resolvedDigestRepo) {
    for (const lang of languages) {
      const url = await createGitHubIssue(
        `${t(lang as Locale).weeklyTitle} ${weekStr}`,
        contentsByLang[lang]!,
        "weekly",
      );
      console.error(`  Created weekly issue (${lang}): ${url}`);
    }
  }

  console.error("[weekly] Done!");
};
