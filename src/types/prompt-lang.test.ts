import { describe, expect, it } from "vitest";
import { toPromptLang } from "./prompt-lang";

describe("toPromptLang", () => {
  it('returns "en-US" for "en-US" locale', () => {
    expect(toPromptLang("en-US")).toBe("en-US");
  });

  it('returns "zh-CN" for "zh-CN" locale', () => {
    expect(toPromptLang("zh-CN")).toBe("zh-CN");
  });

  it("returns the same locale for all non-English locales (identity pass-through)", () => {
    const locales: Array<Parameters<typeof toPromptLang>[0]> = [
      "ar-SA",
      "bn-BD",
      "de-DE",
      "es-ES",
      "fr-FR",
      "hi-IN",
      "id-ID",
      "it-IT",
      "ja-JP",
      "ko-KR",
      "nl-NL",
      "pl-PL",
      "pt-BR",
      "ro-RO",
      "ru-RU",
      "th-TH",
      "tr-TR",
      "uk-UA",
      "vi-VN",
    ];
    for (const locale of locales) {
      expect(toPromptLang(locale)).toBe(locale);
    }
  });
});
