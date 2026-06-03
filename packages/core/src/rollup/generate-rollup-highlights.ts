import fs from "node:fs";
import path from "node:path";
import { buildHighlightsPrompt, type ReportHighlights } from "../prompts";
import { callLlm } from "../report/call-llm";
import { saveFile } from "../report/save-file";
import type { Locale } from "../types/locale";
import { DIGESTS_DIR } from "./constants";

export const generateRollupHighlights = async (
  allContent: Record<string, string>,
  reportId: string,
  dateStr: string,
  itemsPerReport: number,
): Promise<void> => {
  console.error(`  [${reportId}] Generating highlights for Telegram...`);

  const existingPath = path.join(DIGESTS_DIR, dateStr, "highlights.json");
  let existing: Record<string, ReportHighlights> = {};
  if (fs.existsSync(existingPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(existingPath, "utf-8"));
    } catch {
      // ignore parse errors — start fresh
    }
  }

  const highlights: Record<string, ReportHighlights> = { ...existing };

  try {
    const results = await Promise.all(
      Object.entries(allContent).map(async ([lang, content]) => {
        const raw = await callLlm(
          buildHighlightsPrompt({ [reportId]: content }, lang as Locale, itemsPerReport),
          1024,
        );
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
      highlights[lang] = { ...highlights[lang], ...parsed };
    }
  } catch (err) {
    console.error(`  [${reportId}] Highlights generation failed: ${err}`);
  }
  const p = saveFile(JSON.stringify(highlights, null, 2), dateStr, "highlights.json");
  console.error(`  Saved ${p}`);
};
