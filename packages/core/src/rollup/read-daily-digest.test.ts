import fs from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { readDailyDigest } from "./read-daily-digest";

describe("readDailyDigest", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns null when no digest files exist", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    expect(readDailyDigest("2026-03-09")).toBeNull();
  });

  it("reads and concatenates digest files", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue("content");

    const result = readDailyDigest("2026-03-09");
    expect(result).toContain("content");
  });

  it("truncates content that exceeds MAX_CHARS_PER_REPORT", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue("x".repeat(3000));

    const result = readDailyDigest("2026-03-09");
    expect(result).toContain("...[摘要截断]");
  });
});
