import { describe, expect, it } from "vitest";
import { sampleNote } from "./sample-note";

describe("sampleNote", () => {
  it("shows sampled note in Chinese when total > sampled", () => {
    const result = sampleNote(100, 30);
    expect(result).toBe("（共 100 条，以下展示评论数最多的 30 条）");
  });

  it("shows total-only note in Chinese when total <= sampled", () => {
    expect(sampleNote(10, 10)).toBe("（共 10 条）");
    expect(sampleNote(5, 10)).toBe("（共 5 条）");
  });

  it("shows sampled note in English when total > sampled", () => {
    const result = sampleNote(50, 20, "en");
    expect(result).toBe("(Total: 50 items; showing top 20 by comment count)");
  });

  it("shows total-only note in English when total <= sampled", () => {
    expect(sampleNote(8, 8, "en")).toBe("(Total: 8 items)");
  });
});
