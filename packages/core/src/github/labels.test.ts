import { describe, expect, it } from "vitest";
import { LABEL_COLORS } from "./labels";

describe("LABEL_COLORS", () => {
  it("contains all expected keys", () => {
    const expected = [
      "openclaw",
      "trending",
      "hn",
      "ph",
      "weekly",
      "monthly",
      "digest-en",
      "openclaw-en",
      "web-en",
      "trending-en",
      "hn-en",
      "ph-en",
      "arxiv",
      "arxiv-en",
      "hf",
      "hf-en",
      "community",
      "community-en",
    ];
    for (const key of expected) {
      expect(LABEL_COLORS).toHaveProperty(key);
    }
  });

  it("all values are valid 6-character hex colors", () => {
    for (const color of Object.values(LABEL_COLORS)) {
      expect(color).toMatch(/^[0-9a-f]{6}$/);
    }
  });

  it("has 18 entries", () => {
    expect(Object.keys(LABEL_COLORS)).toHaveLength(18);
  });
});
