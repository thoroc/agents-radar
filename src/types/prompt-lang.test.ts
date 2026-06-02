import { describe, expect, it } from "vitest";
import { toPromptLang } from "./prompt-lang";

describe("toPromptLang", () => {
  it("returns the locale as-is", () => {
    expect(toPromptLang("en")).toBe("en");
    expect(toPromptLang("zh")).toBe("zh");
    expect(toPromptLang("ja")).toBe("ja");
    expect(toPromptLang("ar")).toBe("ar");
    expect(toPromptLang("de")).toBe("de");
  });
});
