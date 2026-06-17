import { describe, expect, it } from "vitest";
import { hashSegment } from "./hash-segment";

describe("hashSegment", () => {
  it("returns exactly 16 hex characters", () => {
    expect(hashSegment("hello world")).toMatch(/^[0-9a-f]{16}$/);
  });

  it("trims whitespace before hashing", () => {
    expect(hashSegment("  hello  ")).toBe(hashSegment("hello"));
  });

  it("returns different hashes for different text", () => {
    expect(hashSegment("foo")).not.toBe(hashSegment("bar"));
  });

  it("is stable across calls", () => {
    expect(hashSegment("stable")).toBe(hashSegment("stable"));
  });
});
