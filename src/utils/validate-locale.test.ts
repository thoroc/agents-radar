import { describe, expect, it } from "vitest";
import { validateLocale } from "./validate-locale";

describe("validateLocale", () => {
  it("returns the locale if supported", () => {
    expect(validateLocale("en")).toBe("en");
    expect(validateLocale("zh")).toBe("zh");
  });

  it("falls back to en for unsupported locale", () => {
    expect(validateLocale("xx")).toBe("en");
    expect(validateLocale("")).toBe("en");
  });
});
