import { describe, expect, it } from "vitest";
import type { RepoConfig } from "../github/types";
import { buildComparisonPrompt } from "./build-comparison-prompt";
import type { RepoDigest } from "./repo-digest";

const cfg: RepoConfig = { id: "test", repo: "org/test", name: "TestTool" };

const makeDigest = (overrides: Partial<RepoDigest> = {}): RepoDigest => ({
  config: cfg,
  issues: [],
  prs: [],
  releases: [],
  summary: "Summary",
  ...overrides,
});

describe("buildComparisonPrompt", () => {
  it("includes all digest summaries when they have data", () => {
    const digests = [
      makeDigest({ config: { ...cfg, name: "Tool A" }, summary: "Summary A", issues: [{} as never] }),
      makeDigest({ config: { ...cfg, name: "Tool B" }, summary: "Summary B", prs: [{} as never] }),
    ];
    const result = buildComparisonPrompt(digests, "2026-03-09");
    expect(result).toContain("Tool A");
    expect(result).toContain("Summary A");
    expect(result).toContain("Tool B");
    expect(result).toContain("Summary B");
  });

  it("shows no-activity for empty digests", () => {
    const digests = [makeDigest({ summary: "Summary" })];
    const result = buildComparisonPrompt(digests, "2026-03-09");
    expect(result).toContain("No activity in the last 24 hours.");
  });

  it("appends language suffix", () => {
    const digests = [makeDigest({ summary: "Summary", issues: [{} as never] })];
    const enResult = buildComparisonPrompt(digests, "2026-03-09", "en");
    expect(enResult).toContain("Write the response in English.");

    const zhResult = buildComparisonPrompt(digests, "2026-03-09", "zh");
    expect(zhResult).toContain("Write the response in Chinese.");
  });
});
