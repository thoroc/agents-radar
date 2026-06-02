import { describe, expect, it } from "vitest";
import { toPromptLang } from "./prompt-lang";

describe("toPromptLang", () => {
  it('returns "en" for "en" locale', () => {
    expect(toPromptLang("en")).toBe("en");
  });

  it('returns "zh" for "zh" locale', () => {
    expect(toPromptLang("zh")).toBe("zh");
  });

  it("returns the same locale for all non-English locales (identity pass-through)", () => {
    const locales: Array<Parameters<typeof toPromptLang>[0]> = [
      "ar",
      "bn",
      "de",
      "es",
      "fr",
      "hi",
      "id",
      "it",
      "ja",
      "ko",
      "nl",
      "pl",
      "pt",
      "ro",
      "ru",
      "th",
      "tr",
      "uk",
      "vi",
    ];
    for (const locale of locales) {
      expect(toPromptLang(locale)).toBe(locale);
    }
  });
});
