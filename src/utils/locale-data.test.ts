import { describe, expect, it } from "vitest";
import { DEFAULT_LANGUAGES, LANGUAGE_NAMES, SUPPORTED_LOCALES } from "./locale-data";

describe("SUPPORTED_LOCALES", () => {
  it("includes zh and en", () => {
    expect(SUPPORTED_LOCALES).toContain("en");
    expect(SUPPORTED_LOCALES).toContain("zh");
  });

  it("includes all 21 locales", () => {
    expect(SUPPORTED_LOCALES.length).toBeGreaterThanOrEqual(21);
  });
});

describe("LANGUAGE_NAMES", () => {
  it("maps locale codes to names", () => {
    expect(LANGUAGE_NAMES.en).toBe("English");
    expect(LANGUAGE_NAMES.zh).toBe("Chinese");
  });
});

describe("DEFAULT_LANGUAGES", () => {
  it("returns en and zh", () => {
    expect(DEFAULT_LANGUAGES).toEqual(["en", "zh"]);
  });
});
