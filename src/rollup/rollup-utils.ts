import fs from "node:fs";
import path from "node:path";
import { buildHighlightsPrompt, type ReportHighlights } from "../prompts";
import { callLlm } from "../report/call-llm";
import { saveFile } from "../report/save-file";

export const DIGESTS_DIR = "digests";
export const ROLLUP_SOURCES = ["ai-cli", "ai-agents", "ai-trending", "ai-hn", "ai-web"];
export const MAX_CHARS_PER_REPORT = 2500;

export const getDateDirs = (): string[] => {
  if (!fs.existsSync(DIGESTS_DIR)) return [];
  return fs
    .readdirSync(DIGESTS_DIR)
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && fs.statSync(path.join(DIGESTS_DIR, d)).isDirectory())
    .sort()
    .reverse();
};

export const readDailyDigest = (date: string): string | null => {
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

export const readWeeklyDigest = (date: string): string | null => {
  const p = path.join(DIGESTS_DIR, date, "ai-weekly.md");
  if (!fs.existsSync(p)) return null;
  const content = fs.readFileSync(p, "utf-8");
  return content.slice(0, 3000) + (content.length > 3000 ? "\n...[截断]" : "");
};

export const generateRollupHighlights = async (
  zhContent: string,
  enContent: string,
  reportId: string,
  dateStr: string,
  itemsPerReport: number,
): Promise<void> => {
  console.error(`  [${reportId}] Generating highlights for Telegram...`);

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
