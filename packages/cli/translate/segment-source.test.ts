import { describe, expect, it } from "vitest";
import { segmentSource } from "./segment-source";

describe("segmentSource", () => {
  it("treats each blank-line-delimited paragraph as one segment", () => {
    const content = "First paragraph.\n\nSecond paragraph.\n";
    const segments = segmentSource(content);
    const prose = segments.filter((s) => !s.isCode && s.text.trim());
    expect(prose).toHaveLength(2);
    expect(prose.at(0)?.text).toBe("First paragraph.\n");
    expect(prose.at(1)?.text).toBe("Second paragraph.\n");
  });

  it("groups consecutive non-blank lines into one paragraph segment", () => {
    const content = "Line A\nLine B\nLine C\n\nNext paragraph.\n";
    const segments = segmentSource(content);
    const prose = segments.filter((s) => !s.isCode && s.text.trim());
    expect(prose.at(0)?.text).toBe("Line A\nLine B\nLine C\n");
    expect(prose.at(1)?.text).toBe("Next paragraph.\n");
  });

  it("marks code blocks as isCode=true with exact text preserved", () => {
    const content = "Intro.\n\n```bash\nnpm install\n```\n\nOutro.\n";
    const segments = segmentSource(content);
    const code = segments.find((s) => s.isCode);
    expect(code?.text).toBe("```bash\nnpm install\n```\n");
  });

  it("assigns a non-empty hash to translatable prose segments", () => {
    const segments = segmentSource("A paragraph.\n\nAnother.\n");
    const prose = segments.filter((s) => !s.isCode && s.text.trim());
    for (const seg of prose) {
      expect(seg.hash).toMatch(/^[0-9a-f]{16}$/);
    }
  });

  it("assigns empty hash to blank-line passthrough segments", () => {
    const segments = segmentSource("Para one.\n\nPara two.\n");
    const blanks = segments.filter((s) => !s.isCode && !s.text.trim());
    for (const seg of blanks) {
      expect(seg.hash).toBe("");
    }
  });

  it("reconstruction matches the original content", () => {
    const content = "Intro.\n\n```bash\ncode\n```\n\nOutro.\n";
    const segments = segmentSource(content);
    expect(segments.map((s) => s.text).join("")).toBe(content);
  });

  it("reconstruction matches for prose-only content", () => {
    const content = "Para one.\n\nPara two.\n\nPara three.\n";
    const segments = segmentSource(content);
    expect(segments.map((s) => s.text).join("")).toBe(content);
  });
});
