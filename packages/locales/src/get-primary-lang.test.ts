import { describe, expect, it } from "vitest";
import { getPrimaryLang } from "./get-primary-lang";

describe("getPrimaryLang", () => {
  it("returns the provided primaryLang if already set", () => {
    expect(getPrimaryLang({ primaryLang: "zh-CN", fallbackLang: null })).toBe("zh-CN");
  });

  it("returns a non-empty string when primaryLang is null (falls back to config defaults)", () => {
    const args = { primaryLang: null, fallbackLang: null };
    const result = getPrimaryLang(args);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });
});
