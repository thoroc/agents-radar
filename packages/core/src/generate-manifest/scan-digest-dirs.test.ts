import fs from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { scanDigestDirs } from "./scan-digest-dirs";

describe("scanDigestDirs", () => {
  afterEach(() => vi.restoreAllMocks());

  it("returns date dirs in reverse chronological order", () => {
    vi.spyOn(fs, "readdirSync").mockReturnValue(["2026-01-01", "2026-01-03", "2026-01-02"] as never);
    vi.spyOn(fs, "statSync").mockReturnValue({ isDirectory: () => true } as never);
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const result = scanDigestDirs();
    expect(result.map((e) => e.date)).toEqual(["2026-01-03", "2026-01-02", "2026-01-01"]);
  });

  it("filters out non-date entries", () => {
    vi.spyOn(fs, "readdirSync").mockReturnValue(["2026-01-01", "web-state.json", "latest"] as never);
    vi.spyOn(fs, "statSync").mockReturnValue({ isDirectory: () => true } as never);
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const result = scanDigestDirs();
    expect(result).toHaveLength(1);
    expect(result[0]!.date).toBe("2026-01-01");
  });

  it("filters out dates with no matching report files", () => {
    vi.spyOn(fs, "readdirSync").mockReturnValue(["2026-01-01"] as never);
    vi.spyOn(fs, "statSync").mockReturnValue({ isDirectory: () => true } as never);
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    expect(scanDigestDirs()).toHaveLength(0);
  });
});
