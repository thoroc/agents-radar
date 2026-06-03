import fs from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getLocaleFiles } from "./get-files";

describe("getLocaleFiles", () => {
  afterEach(() => vi.restoreAllMocks());

  it("returns sorted json files from locales dir", () => {
    vi.spyOn(fs, "readdirSync").mockReturnValue(["zh-CN.json", "en-US.json", "fr-FR.json"] as never);
    expect(getLocaleFiles("/repo")).toEqual(["en-US.json", "fr-FR.json", "zh-CN.json"]);
  });

  it("excludes non-json files", () => {
    vi.spyOn(fs, "readdirSync").mockReturnValue(["en-US.json", "README.md", ".gitkeep"] as never);
    expect(getLocaleFiles("/repo")).toEqual(["en-US.json"]);
  });

  it("returns empty array when locales dir is empty", () => {
    vi.spyOn(fs, "readdirSync").mockReturnValue([] as never);
    expect(getLocaleFiles("/repo")).toEqual([]);
  });
});
