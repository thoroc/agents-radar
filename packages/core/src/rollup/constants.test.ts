import { describe, expect, it } from "vitest";
import { DIGESTS_DIR, MAX_CHARS_PER_REPORT, ROLLUP_SOURCES } from "./constants";

describe("rollupConstants", () => {
  it("has expected DIGESTS_DIR", () => {
    expect(DIGESTS_DIR).toBe("assets/digests");
  });

  it("has expected ROLLUP_SOURCES", () => {
    expect(ROLLUP_SOURCES).toEqual(["ai-cli", "ai-agents", "ai-trending", "ai-hn", "ai-web"]);
  });

  it("has expected MAX_CHARS_PER_REPORT", () => {
    expect(MAX_CHARS_PER_REPORT).toBe(2500);
  });
});
