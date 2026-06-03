import fs from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getDateDirs } from "./get-date-dirs";

describe("getDateDirs", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns empty array when digests dir does not exist", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    expect(getDateDirs()).toEqual([]);
  });

  it("returns sorted date directories in reverse order", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readdirSync").mockReturnValue(["2026-03-09", "2026-03-08"] as never);
    vi.spyOn(fs, "statSync").mockReturnValue({ isDirectory: () => true } as fs.Stats);
    expect(getDateDirs()).toEqual(["2026-03-09", "2026-03-08"]);
  });

  it("filters out non-date directories", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readdirSync").mockReturnValue(["2026-03-09", "not-a-date"] as never);
    vi.spyOn(fs, "statSync").mockReturnValue({ isDirectory: () => true } as fs.Stats);
    expect(getDateDirs()).toEqual(["2026-03-09"]);
  });
});
