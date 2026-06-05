import { describe, expect, it } from "vitest";
import { validateLocale } from "./validate-locale";

describe("validateLocale", () => {
  it("returns the locale if supported", () => {
    expect(validateLocale("en-US")).toBe("en-US");
    expect(validateLocale("zh-CN")).toBe("zh-CN");
  });

  it("falls back to en-US for unsupported locale", () => {
    expect(validateLocale("xx-XX")).toBe("en-US");
  });
});
