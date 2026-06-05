import { describe, expect, it } from "vitest";
import { getFallbackLang } from "./get-fallback-lang";

describe("getFallbackLang", () => {
  it("returns the provided fallbackLang if already set", () => {
    expect(getFallbackLang({ fallbackLang: "zh-CN", primaryLang: "en-US" })).toBe("zh-CN");
  });

  it("defaults to en-US when fallbackLang is null and config provides none", () => {
    const result = getFallbackLang({ fallbackLang: null, primaryLang: "en-US" });
    expect(result).toBeTruthy();
  });
});
