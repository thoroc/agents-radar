import { describe, expect, it } from "vitest";
import { toGoogleLang } from "./to-google-lang";

describe("toGoogleLang", () => {
  it("keeps zh-CN and pt-BR intact as Google-supported regional variants", () => {
    expect(toGoogleLang("zh-CN")).toBe("zh-CN");
    expect(toGoogleLang("pt-BR")).toBe("pt-BR");
  });

  it("strips the region suffix for standard locales", () => {
    expect(toGoogleLang("de-DE")).toBe("de");
    expect(toGoogleLang("fr-FR")).toBe("fr");
    expect(toGoogleLang("ja-JP")).toBe("ja");
    expect(toGoogleLang("ko-KR")).toBe("ko");
    expect(toGoogleLang("ar-SA")).toBe("ar");
    expect(toGoogleLang("uk-UA")).toBe("uk");
  });

  it("throws for a malformed locale with no language tag", () => {
    expect(() => toGoogleLang("")).toThrow("Invalid locale");
  });
});
