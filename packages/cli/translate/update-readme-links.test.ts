import { describe, expect, it } from "vitest";
import { updateReadmeLinks } from "./update-readme-links";

const SAMPLE = `# agents-radar\n\nEnglish | [中文](./README.zh.md)\n\nSome content.\n`;

describe("updateReadmeLinks", () => {
  it("replaces the link line with flag+name links for all non-primary locales", () => {
    const result = updateReadmeLinks({
      content: SAMPLE,
      locales: ["en-US", "zh-CN", "de-DE"],
      primaryLang: "en-US",
    });
    expect(result).toContain("🇬🇧 English | ");
    expect(result).toContain("[🇨🇳 中文](./README.zh-CN.md)");
    expect(result).toContain("[🇩🇪 Deutsch](./README.de-DE.md)");
  });

  it("does not include the primary language as a link", () => {
    const result = updateReadmeLinks({
      content: SAMPLE,
      locales: ["en-US", "zh-CN"],
      primaryLang: "en-US",
    });
    expect(result).not.toMatch(/\[.*English.*\]/);
  });

  it("replaces the old link regardless of its current targets", () => {
    const result = updateReadmeLinks({
      content: SAMPLE,
      locales: ["en-US", "zh-CN"],
      primaryLang: "en-US",
    });
    expect(result).not.toContain("README.zh.md");
    expect(result).toContain("README.zh-CN.md");
  });

  it("throws when the link line is not found", () => {
    expect(() =>
      updateReadmeLinks({ content: "# No links here\n", locales: ["en-US"], primaryLang: "en-US" }),
    ).toThrow('Language link line not found (expected line containing "English |")');
  });
});
