import { afterEach, describe, expect, it, vi } from "vitest";
import { getFallbackLang } from "./get-fallback-lang";
import * as getPrimaryLangModule from "./get-primary-lang";

describe("getFallbackLang", () => {
  afterEach(() => vi.restoreAllMocks());

  it("returns the provided fallbackLang when set", () => {
    expect(getFallbackLang({ fallbackLang: "fr-FR", primaryLang: "en-US" })).toBe("fr-FR");
  });

  it("falls back to en-US when fallbackLang is null and config has none", () => {
    vi.spyOn(getPrimaryLangModule, "getPrimaryLang").mockImplementation((args) => {
      if (args) args.primaryLang = "en-US";
      return "en-US";
    });
    expect(getFallbackLang({ fallbackLang: null, primaryLang: null })).toBe("en-US");
  });

  it("returns config fallback when getPrimaryLang populates it", () => {
    vi.spyOn(getPrimaryLangModule, "getPrimaryLang").mockImplementation((args) => {
      if (args) {
        args.primaryLang = "zh-CN";
        args.fallbackLang = "ja-JP";
      }
      return "zh-CN";
    });
    expect(getFallbackLang({ fallbackLang: null, primaryLang: null })).toBe("ja-JP");
  });
});
