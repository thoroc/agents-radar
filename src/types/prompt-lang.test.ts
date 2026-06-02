import { describe, expect, it } from "vitest";
import { toPromptLang } from "./prompt-lang";

describe("toPromptLang", () => {
  it("returns the locale as-is", () => {
    expect(toPromptLang("en-US")).toBe("en-US");
    expect(toPromptLang("zh-CN")).toBe("zh-CN");
    expect(toPromptLang("ja-JP")).toBe("ja-JP");
    expect(toPromptLang("ar-SA")).toBe("ar-SA");
    expect(toPromptLang("de-DE")).toBe("de-DE");
  });
});
