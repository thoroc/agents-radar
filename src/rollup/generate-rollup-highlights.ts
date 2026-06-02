import fs from "node:fs";
import path from "node:path";
import { buildHighlightsPrompt, type ReportHighlights } from "../prompts";
import { callLlm } from "../report/call-llm";
import { saveFile } from "../report/save-file";
import { DEFAULT_LANGUAGES, type Locale } from "../utils";
import { DIGESTS_DIR } from "./rollup-constants";

export const generateRollupHighlights = async (
  contentsByLang: Record<string, string>,
  reportId: string,
  dateStr: string,
  itemsPerReport: number,
  languages: string[] = DEFAULT_LANGUAGES,
): Promise<void> => {
  console.error(`  [${reportId}] Generating highlights for Telegram...`);

  const existingPath = path.join(DIGESTS_DIR, dateStr, "highlights.json");
  let existing: Record<string, ReportHighlights> = {};
  for (const lang of languages) {
    existing[lang] = {};
  }
  if (fs.existsSync(existingPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(existingPath, "utf-8"));
    } catch {
      // ignore parse errors — start fresh
    }
  }

  const highlights: Record<string, ReportHighlights> = {};
  for (const lang of languages) {
    highlights[lang] = { ...existing[lang] };
  }

  try {
    const rawResults = await Promise.all(
      languages.map((lang) =>
        callLlm(
          buildHighlightsPrompt({ [reportId]: contentsByLang[lang]! }, lang as Locale, itemsPerReport),
          1024,
        ).then((raw) => ({ lang, raw })),
      ),
    );
    for (const { lang, raw } of rawResults) {
      const parsed = JSON.parse(
        raw
          .replace(/```json?\n?/g, "")
          .replace(/```/g, "")
          .trim(),
      ) as ReportHighlights;
      Object.assign(highlights[lang] ?? {}, parsed);
    }
  } catch (err) {
    console.error(`  [${reportId}] Highlights generation failed: ${err}`);
  }
  const p = saveFile(JSON.stringify(highlights, null, 2), dateStr, "highlights.json");
  console.error(`  Saved ${p}`);
};
