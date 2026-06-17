import { describe, expect, it } from "vitest";
import { segmentContent } from "./segment-content";

describe("segmentContent", () => {
  it("returns a single translatable segment for plain prose", () => {
    const result = segmentContent("Hello world\n");
    expect(result).toEqual([{ text: "Hello world\n", isCode: false }]);
  });

  it("marks fenced code blocks as non-translatable", () => {
    const input = "Prose before.\n\n```bash\nnpm install\n```\n\nProse after.\n";
    const result = segmentContent(input);
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ text: "Prose before.\n\n", isCode: false });
    expect(result[1]).toEqual({ text: "```bash\nnpm install\n```\n", isCode: true });
    expect(result[2]).toEqual({ text: "\nProse after.\n", isCode: false });
  });

  it("handles multiple code blocks", () => {
    const input = "A\n```\ncode1\n```\nB\n```\ncode2\n```\nC\n";
    const result = segmentContent(input);
    const isCodeFlags = result.map((s) => s.isCode);
    expect(isCodeFlags).toEqual([false, true, false, true, false]);
  });

  it("returns empty array for empty string", () => {
    expect(segmentContent("")).toEqual([]);
  });
});
