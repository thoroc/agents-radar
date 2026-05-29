import fs from "node:fs";
import path from "node:path";
import { callLlm, saveFile, autoGenFooter, LLM_TOKENS_ROLLUP } from "./report.ts";
import {
  buildWeeklyPrompt,
  buildMonthlyPrompt,
  buildHighlightsPrompt,
  type ReportHighlights,
} from "./prompts-data.ts";
import { createGitHubIssue } from "./github.ts";
import { toCstDateStr, toUtcStr } from "./date.ts";
import { t, interpolate, DEFAULT_PRIMARY_LANGUAGE } from "./i18n.ts";
import { loadConfig, getEnabledLangs } from "./config.ts";

const DIGESTS_DIR = "digests";
const MAX_CHARS_PER_REPORT = 2500;

const { languages: CONFIG_LANGS } = loadConfig();
const ENABLED_LANGS = getEnabledLangs(CONFIG_LANGS);

const ROLLUP_SOURCES = ["ai-cli", "ai-agents", "ai-trending", "ai-hn", "ai-web"];

function getDateDirs(): string[] {
  if (!fs.existsSync(DIGESTS_DIR)) return [];
  return fs
    .readdirSync(DIGESTS_DIR)
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && fs.statSync(path.join(DIGESTS_DIR, d)).isDirectory())
    .sort()
    .reverse();
}

/** Read and truncate all daily digest files for a date, per enabled language. Returns null if none found. */
function readDailyDigest(date: string): Record<string, string> | null {
  const result: Record<string, string> = {};
  for (const lang of ENABLED_LANGS) {
    const parts: string[] = [];
    for (const type of ROLLUP_SOURCES) {
      const file = lang === DEFAULT_PRIMARY_LANGUAGE ? `${type}.md` : `${type}.${lang}.md`;
      const p = path.join(DIGESTS_DIR, date, file);
      if (fs.existsSync(p)) {
        const content = fs.readFileSync(p, "utf-8");
        const truncated = content.slice(0, MAX_CHARS_PER_REPORT);
        parts.push(truncated.length < content.length ? truncated + t(lang).digestTruncation : truncated);
      }
    }
    if (parts.length > 0) result[lang] = parts.join("\n\n");
  }
  return Object.keys(result).length > 0 ? result : null;
}

/** Read a weekly report file for a given lang. Returns null if not found. */
function readWeeklyDigest(date: string, lang: string): string | null {
  const file = lang === DEFAULT_PRIMARY_LANGUAGE ? "ai-weekly.md" : `ai-weekly.${lang}.md`;
  const p = path.join(DIGESTS_DIR, date, file);
  if (!fs.existsSync(p)) return null;
  const content = fs.readFileSync(p, "utf-8");
  return content.slice(0, 3000) + (content.length > 3000 ? t(lang).weeklyTruncation : "");
}

export function toWeekStr(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

async function generateRollupHighlights(
  contents: Record<string, string>,
  reportId: string,
  dateStr: string,
  itemsPerReport: number,
): Promise<void> {
  console.log(`  [${reportId}] Generating highlights for Telegram...`);

  const existingPath = path.join(DIGESTS_DIR, dateStr, "highlights.json");
  let existing: Record<string, ReportHighlights> = {};
  if (fs.existsSync(existingPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(existingPath, "utf-8"));
    } catch {
      // ignore parse errors — start fresh
    }
  }

  const highlights: Record<string, ReportHighlights> = {};
  for (const lang of ENABLED_LANGS) {
    highlights[lang] = { ...(existing[lang] ?? {}) };
  }

  try {
    const results = await Promise.all(
      Object.entries(contents).map(async ([lang, content]) => {
        const raw = await callLlm(buildHighlightsPrompt({ [reportId]: content }, lang, itemsPerReport), 1024);
        const parsed = JSON.parse(
          raw
            .replace(/```json?\n?/g, "")
            .replace(/```/g, "")
            .trim(),
        ) as ReportHighlights;
        return [lang, parsed] as const;
      }),
    );
    for (const [lang, parsed] of results) {
      Object.assign(highlights[lang]!, parsed);
    }
  } catch (err) {
    console.error(`  [${reportId}] Highlights generation failed: ${err}`);
  }
  const p = saveFile(JSON.stringify(highlights, null, 2), dateStr, "highlights.json");
  console.log(`  Saved ${p}`);
}

export async function runWeeklyRollup(): Promise<void> {
  const now = new Date();
  const dateStr = toCstDateStr(now);
  const utcStr = toUtcStr(now);
  const weekStr = toWeekStr(new Date(now.getTime() + 8 * 60 * 60 * 1000));
  const digestRepo = process.env["DIGEST_REPO"] ?? "";

  console.log(`[weekly] Generating rollup for ${weekStr} (date: ${dateStr})`);

  const allDates = getDateDirs();
  const last7 = allDates.slice(0, 7);

  const dailyDigestsByLang: Record<string, Record<string, string>> = {};
  for (const date of last7) {
    const contentByLang = readDailyDigest(date);
    if (contentByLang) {
      for (const [lang, content] of Object.entries(contentByLang)) {
        if (!dailyDigestsByLang[lang]) dailyDigestsByLang[lang] = {};
        dailyDigestsByLang[lang]![date] = content;
      }
    }
  }

  if (Object.keys(dailyDigestsByLang).length === 0) {
    console.log("[weekly] No daily digests found, skipping.");
    return;
  }

  console.log(`[weekly] Found daily digests for: ${Object.keys(dailyDigestsByLang).join(", ")}`);

  const summaryPromises = ENABLED_LANGS.map((lang) =>
    callLlm(buildWeeklyPrompt(dailyDigestsByLang[lang] ?? {}, weekStr, lang), LLM_TOKENS_ROLLUP),
  );
  const summaries = await Promise.all(summaryPromises);

  const contentByLang: Record<string, string> = {};
  const coverageStr = `${last7[last7.length - 1]} ~ ${last7[0]}`;

  for (let i = 0; i < ENABLED_LANGS.length; i++) {
    const lang = ENABLED_LANGS[i]!;
    const s = t(lang);
    const suffix = lang === DEFAULT_PRIMARY_LANGUAGE ? "" : `.${lang}`;
    contentByLang[lang] =
      `# ${s.weeklyTitle} ${weekStr}\n\n` +
      interpolate(s.weeklyMeta, { range: coverageStr, utcStr }) +
      `---\n\n` +
      summaries[i]! +
      autoGenFooter(lang);
    console.log(`  Saved ${saveFile(contentByLang[lang]!, dateStr, `ai-weekly${suffix}.md`)}`);
  }

  await generateRollupHighlights(contentByLang, "ai-weekly", dateStr, 6);

  if (digestRepo) {
    for (const lang of ENABLED_LANGS) {
      const url = await createGitHubIssue(
        `${t(lang).weeklyTitle} ${weekStr}`,
        contentByLang[lang]!,
        "weekly",
        lang,
      );
      console.log(`  Created weekly issue: ${url}`);
      break;
    }
  }

  console.log("[weekly] Done!");
}

export async function runMonthlyRollup(): Promise<void> {
  const now = new Date();
  const cstDate = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  const prevMonth = new Date(Date.UTC(cstDate.getUTCFullYear(), cstDate.getUTCMonth() - 1, 1));
  const monthStr = prevMonth.toISOString().slice(0, 7);
  const dateStr = toCstDateStr(now);
  const utcStr = toUtcStr(now);
  const digestRepo = process.env["DIGEST_REPO"] ?? "";

  console.log(`[monthly] Generating rollup for ${monthStr} (date: ${dateStr})`);

  const allDates = getDateDirs();
  const monthDates = allDates.filter((d) => d.startsWith(monthStr));
  const weeklyDates = monthDates.filter((d) => fs.existsSync(path.join(DIGESTS_DIR, d, "ai-weekly.md")));

  const sourceDigests: Record<string, Record<string, string>> = {};
  const sourceLangs: Record<string, string> = {};

  if (weeklyDates.length >= 2) {
    for (const lang of ENABLED_LANGS) {
      for (const date of weeklyDates) {
        const content = readWeeklyDigest(date, lang);
        if (content) {
          if (!sourceDigests[date]) sourceDigests[date] = {};
          sourceDigests[date]![lang] = content;
        }
      }
    }
    for (const lang of ENABLED_LANGS) {
      sourceLangs[lang] = t(lang).sourceLabelWeekly.replace("{n}", String(weeklyDates.length));
    }
  } else {
    const sampled = monthDates.filter((_, i) => i % 4 === 0).slice(0, 10);
    for (const lang of ENABLED_LANGS) {
      for (const date of sampled) {
        const contentByLang = readDailyDigest(date);
        if (contentByLang?.[lang]) {
          if (!sourceDigests[date]) sourceDigests[date] = {};
          sourceDigests[date]![lang] = contentByLang[lang]!;
        }
      }
    }
    for (const lang of ENABLED_LANGS) {
      sourceLangs[lang] = t(lang).sourceLabelDailySampled.replace("{n}", String(sampled.length));
    }
  }

  const hasContent = Object.values(sourceDigests).some((v) => v && Object.keys(v).length > 0);
  if (!hasContent) {
    console.log(`[monthly] No source digests found for ${monthStr}, skipping.`);
    return;
  }

  console.log(`[monthly] Source languages: ${ENABLED_LANGS.join(", ")}`);

  const summaryPromises = ENABLED_LANGS.map((lang) => {
    const langDigests: Record<string, string> = {};
    for (const [date, contentByLang] of Object.entries(sourceDigests)) {
      if (contentByLang?.[lang]) langDigests[date] = contentByLang[lang]!;
    }
    return callLlm(buildMonthlyPrompt(langDigests, monthStr, lang), LLM_TOKENS_ROLLUP);
  });
  const summaries = await Promise.all(summaryPromises);

  const contentByLang: Record<string, string> = {};

  for (let i = 0; i < ENABLED_LANGS.length; i++) {
    const lang = ENABLED_LANGS[i]!;
    const s = t(lang);
    const suffix = lang === DEFAULT_PRIMARY_LANGUAGE ? "" : `.${lang}`;
    contentByLang[lang] =
      `# ${s.monthlyTitle} ${monthStr}\n\n` +
      interpolate(s.monthlyMeta, { sources: sourceLangs[lang] ?? "", utcStr }) +
      `---\n\n` +
      summaries[i]! +
      autoGenFooter(lang);
    console.log(`  Saved ${saveFile(contentByLang[lang]!, dateStr, `ai-monthly${suffix}.md`)}`);
  }

  await generateRollupHighlights(contentByLang, "ai-monthly", dateStr, 6);

  if (digestRepo) {
    for (const lang of ENABLED_LANGS) {
      const url = await createGitHubIssue(
        `${t(lang).monthlyTitle} ${monthStr}`,
        contentByLang[lang]!,
        "monthly",
        lang,
      );
      console.log(`  Created monthly issue: ${url}`);
      break;
    }
  }

  console.log("[monthly] Done!");
}
