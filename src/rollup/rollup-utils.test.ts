import fs from "node:fs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as callLlmModule from "../report/call-llm";
import * as saveFileModule from "../report/save-file";

import { generateRollupHighlights } from "./generate-rollup-highlights";
import { getDateDirs } from "./get-date-dirs";
import { readDailyDigest } from "./read-daily-digest";
import { readWeeklyDigest } from "./read-weekly-digest";

describe("getDateDirs", () => {
  beforeEach(() => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "statSync").mockReturnValue({ isDirectory: () => true } as fs.Stats);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns sorted date directories in reverse order", () => {
    vi.spyOn(fs, "readdirSync").mockReturnValue(["2026-03-09", "2026-03-08"] as any);
    expect(getDateDirs()).toEqual(["2026-03-09", "2026-03-08"]);
  });

  it("returns empty when DIGESTS_DIR does not exist", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    expect(getDateDirs()).toEqual([]);
  });

  it("filters out non-date directories", () => {
    vi.spyOn(fs, "readdirSync").mockReturnValue(["2026-03-09", "not-a-date"] as any);
    const dirs = getDateDirs();
    expect(dirs).toEqual(["2026-03-09"]);
  });
});

describe("readDailyDigest", () => {
  beforeEach(() => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue("content");
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("concatenates multiple source reports", () => {
    const result = readDailyDigest("2026-03-09");
    expect(result).toContain("content");
    expect(result).toContain("\n\n");
  });

  it("returns null when no reports exist", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    expect(readDailyDigest("2026-03-09")).toBeNull();
  });

  it("truncates long content with suffix", () => {
    vi.spyOn(fs, "readFileSync").mockReturnValue("x".repeat(5000));
    const result = readDailyDigest("2026-03-09");
    expect(result).toContain("[摘要截断]");
  });
});

describe("readWeeklyDigest", () => {
  beforeEach(() => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue("content");
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns content when file exists", () => {
    expect(readWeeklyDigest("2026-03-09")).toBe("content");
  });

  it("returns null when file does not exist", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    expect(readWeeklyDigest("2026-03-09")).toBeNull();
  });

  it("truncates content over 3000 chars", () => {
    vi.spyOn(fs, "readFileSync").mockReturnValue("x".repeat(4000));
    const result = readWeeklyDigest("2026-03-09");
    expect(result).toContain("[截断]");
  });
});

describe("generateRollupHighlights", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(callLlmModule, "callLlm").mockResolvedValue('{"ai-cli":["test highlight"]}');
    vi.spyOn(saveFileModule, "saveFile").mockReturnValue("digests/2026-03-09/highlights.json");
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls callLlm for zh and en", async () => {
    await generateRollupHighlights("ZH CONTENT", "EN CONTENT", "ai-cli", "2026-03-09", 6);
    expect(callLlmModule.callLlm).toHaveBeenCalledTimes(2);
  });

  it("saves highlights.json", async () => {
    await generateRollupHighlights("ZH CONTENT", "EN CONTENT", "ai-cli", "2026-03-09", 6);
    expect(saveFileModule.saveFile).toHaveBeenCalledWith(expect.any(String), "2026-03-09", "highlights.json");
  });

  it("handles LLM parse error gracefully", async () => {
    vi.spyOn(callLlmModule, "callLlm").mockResolvedValue("not valid json");
    await expect(
      generateRollupHighlights("ZH CONTENT", "EN CONTENT", "ai-cli", "2026-03-09", 6),
    ).resolves.toBeUndefined();
  });
});
