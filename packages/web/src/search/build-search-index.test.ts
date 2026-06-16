import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buildSearchIndex } from "./build-search-index";

describe("buildSearchIndex", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve("# Report Content Here") }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a Map with one entry per date", async () => {
    const dates = [{ date: "2024-01-01", reports: ["ai-cli"] }];
    const result = await buildSearchIndex(dates);
    expect(result.size).toBe(1);
    expect(result.has("2024-01-01")).toBe(true);
  });

  it("lowercases the indexed content", async () => {
    const dates = [{ date: "2024-01-01", reports: ["ai-cli"] }];
    const result = await buildSearchIndex(dates);
    expect(result.get("2024-01-01")).toBe("# report content here");
  });

  it("handles fetch failure gracefully", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    const dates = [{ date: "2024-01-01", reports: ["ai-cli"] }];
    const result = await buildSearchIndex(dates);
    expect(result.get("2024-01-01")).toBe("");
  });

  it("concatenates multiple report texts for a date", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve("First") })
        .mockResolvedValueOnce({ ok: true, text: () => Promise.resolve("Second") }),
    );
    const dates = [{ date: "2024-01-01", reports: ["ai-cli", "ai-agents"] }];
    const result = await buildSearchIndex(dates);
    expect(result.get("2024-01-01")).toContain("first");
    expect(result.get("2024-01-01")).toContain("second");
  });
});
