import { describe, expect, it, vi } from "vitest";
import { getPrimaryLang } from "./get-primary-lang";

describe("getPrimaryLang", () => {
  it("returns the provided primaryLang if already set", () => {
    expect(getPrimaryLang({ primaryLang: "zh-CN", fallbackLang: null })).toBe("zh-CN");
  });

  it("loads from config when primaryLang is null", () => {
    vi.mock("@agents-radar/config", () => ({
      loadConfig: () => ({ defaultPrimaryLanguage: "en-US", defaultFallbackLanguage: "en-US" }),
    }));
    const args = { primaryLang: null, fallbackLang: null };
    const result = getPrimaryLang(args);
    expect(result).toBeTruthy();
  });
});
