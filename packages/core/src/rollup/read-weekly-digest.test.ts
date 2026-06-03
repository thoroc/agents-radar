import fs from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { readWeeklyDigest } from "./read-weekly-digest";

describe("readWeeklyDigest", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns null when weekly digest file does not exist", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    expect(readWeeklyDigest("2026-03-09")).toBeNull();
  });

  it("reads and truncates weekly digest content", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue("weekly content");

    const result = readWeeklyDigest("2026-03-09");
    expect(result).toContain("weekly content");
  });

  it("truncates content exceeding 3000 chars", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue("x".repeat(4000));

    const result = readWeeklyDigest("2026-03-09");
    expect(result).toContain("...[截断]");
  });
});
