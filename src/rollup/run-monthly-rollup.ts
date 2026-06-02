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
  DEFAULT_LANGUAGES,
  DEFAULT_PRIMARY_LANGUAGE,
  type Locale,
  t,
  toCstDateStr,
  toUtcStr,
} from "../utils";
import { generateRollupHighlights } from "./generate-rollup-highlights";
import { getDateDirs } from "./get-date-dirs";
import { readDailyDigest } from "./read-daily-digest";
import { readWeeklyDigest } from "./read-weekly-digest";
import { DIGESTS_DIR } from "./rollup-constants";

export const runMonthlyRollup = async (
  digestRepo?: string,
  env: NodeJS.ProcessEnv = process.env,
  languages: string[] = DEFAULT_LANGUAGES,
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
  const makeSourceLabel = (lang: string, count: number, isWeekly: boolean): string => {
    if (lang === DEFAULT_PRIMARY_LANGUAGE) {
      return isWeekly ? `${count} 份周报` : `${count} 份日报（每4日采样）`;
    }
    return isWeekly ? `${count} weekly reports` : `${count} daily reports (sampled every 4 days)`;
  };

  if (weeklyDates.length >= 2) {
    sourceDigests = {};
    for (const date of weeklyDates) {
      const content = readWeeklyDigest(date);
      if (content) sourceDigests[date] = content;
    }
  } else {
    const sampled = monthDates.filter((_, i) => i % 4 === 0).slice(0, 10);
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

  console.error(`[monthly] Source: ${Object.keys(sourceDigests).length} digests`);

  console.error(`[monthly] Calling LLM for reports in ${languages.join(", ")} in parallel...`);
  const summaries = await Promise.all(
    languages.map((lang) =>
      callLlm(buildMonthlyPrompt(sourceDigests, monthStr, lang as Locale), LLM_TOKENS_ROLLUP).then((s) => ({
        lang,
        summary: s,
      })),
    ),
  );

  const contentsByLang: Record<string, string> = {};
  for (const { lang, summary } of summaries) {
    const suffix = lang === DEFAULT_PRIMARY_LANGUAGE ? "" : `.${lang}`;
    const footer = autoGenFooter(lang as Locale);
    const isWeekly = weeklyDates.length >= 2;
    const count = isWeekly
      ? weeklyDates.length
      : Math.min(monthDates.filter((_, i) => i % 4 === 0).slice(0, 10).length, 10);
    const sourceLabel = makeSourceLabel(lang, isWeekly ? weeklyDates.length : count, isWeekly);
    const headerSuffix = lang === DEFAULT_PRIMARY_LANGUAGE ? "生成时间" : "Generated";
    const content =
      `# ${t(lang as Locale).monthlyTitle} ${monthStr}\n\n` +
      `> ${lang === DEFAULT_PRIMARY_LANGUAGE ? `数据来源: ${sourceLabel}` : `Sources: ${sourceLabel}`} | ${headerSuffix}: ${utcStr} UTC\n\n` +
      `---\n\n` +
      summary +
      footer;

    contentsByLang[lang] = content;
    console.error(`  Saved ${saveFile(content, dateStr, `ai-monthly${suffix}.md`)}`);
  }

  await generateRollupHighlights(contentsByLang, "ai-monthly", dateStr, 6, languages);

  if (resolvedDigestRepo) {
    for (const lang of languages) {
      const url = await createGitHubIssue(
        `${t(lang as Locale).monthlyTitle} ${monthStr}`,
        contentsByLang[lang]!,
        "monthly",
      );
      console.error(`  Created monthly issue (${lang}): ${url}`);
    }
  }

  console.error("[monthly] Done!");
};
