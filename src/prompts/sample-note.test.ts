import { describe, expect, it } from "vitest";
import { sampleNote } from "./sample-note";

describe("sampleNote", () => {
  it("shows sampled note in Chinese when total > sampled", () => {
    const result = sampleNote(100, 30);
    expect(result).toContain("100");
    expect(result).toContain("30");
  });

  it("shows total-only note in Chinese when total <= sampled", () => {
    expect(sampleNote(10, 10)).toContain("10");
  });

  it("shows sampled note in English when total > sampled", () => {
    const sampledResult = sampleNote(50, 20, "en-US");

    const exactResult = sampleNote(8, 8, "en-US");
    expect(sampledResult).toContain("50");
    expect(sampledResult).toContain("20");
    expect(exactResult).toContain("8");
    expect(exactResult).toContain("Total");
  });
});
