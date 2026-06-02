import fs from "node:fs";
import path from "node:path";
import { buildHighlightsPrompt, type ReportHighlights } from "../prompts";
import { callLlm } from "../report/call-llm";
import { saveFile } from "../report/save-file";
import { DIGESTS_DIR } from "./rollup-constants";

export const generateRollupHighlights = async (
  zhContent: string,
  enContent: string,
  reportId: string,
  dateStr: string,
  itemsPerReport: number,
): Promise<void> => {
  console.error(`  [${reportId}] Generating highlights for Telegram...`);

  const existingPath = path.join(DIGESTS_DIR, dateStr, "highlights.json");
  let existing: Record<string, ReportHighlights> = { "zh-CN": {}, "en-US": {} };
  if (fs.existsSync(existingPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(existingPath, "utf-8"));
    } catch {
      // ignore parse errors — start fresh
    }
  }

  const highlights: Record<string, ReportHighlights> = {
    "zh-CN": { ...existing["zh-CN"] },
    "en-US": { ...existing["en-US"] },
  };

  try {
    const [zhRaw, enRaw] = await Promise.all([
      callLlm(buildHighlightsPrompt({ [reportId]: zhContent }, "zh-CN", itemsPerReport), 1024),
      callLlm(buildHighlightsPrompt({ [reportId]: enContent }, "en-US", itemsPerReport), 1024),
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
    Object.assign(highlights["zh-CN"] ?? {}, zhNew);
    Object.assign(highlights["en-US"] ?? {}, enNew);
  } catch (err) {
    console.error(`  [${reportId}] Highlights generation failed: ${err}`);
  }
  const p = saveFile(JSON.stringify(highlights, null, 2), dateStr, "highlights.json");
  console.error(`  Saved ${p}`);
};
