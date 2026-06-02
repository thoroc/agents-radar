import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { RepoConfig, RepoFetch } from "../github";
import type { RepoDigest } from "../prompts";
import * as promptsModule from "../prompts";
import * as callLlmModule from "../report/call-llm";

import { generateComparisons } from "./compare";

const mockConfig: RepoConfig = { id: "openclaw", repo: "org/openclaw", name: "OpenClaw" };
const mockRepoFetch: RepoFetch = { cfg: mockConfig, issues: [], prs: [], releases: [] };
const mockDigest: RepoDigest = { config: mockConfig, issues: [], prs: [], releases: [], summary: "test" };
const mockSummariesByLang = {
  "zh-CN": { cliDigests: [mockDigest], openclawSummary: "zh-CN summary", peerDigests: [mockDigest] } as const,
  "en-US": { cliDigests: [mockDigest], openclawSummary: "en-US summary", peerDigests: [mockDigest] } as const,
};

describe("generateComparisons", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(callLlmModule, "callLlm").mockResolvedValue("mock comparison");
    vi.spyOn(promptsModule, "buildComparisonPrompt").mockReturnValue("comparison-prompt" as never);
    vi.spyOn(promptsModule, "buildPeersComparisonPrompt").mockReturnValue("peers-comparison-prompt" as never);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls callLlm 4 times (zh/en × CLI/peers)", async () => {
    await generateComparisons({
      summariesByLang: mockSummariesByLang as never,
      fetchedOpenclaw: mockRepoFetch,
      openclaw: mockConfig,
      dateStr: "2026-01-01",
    });
    expect(callLlmModule.callLlm).toHaveBeenCalledTimes(4);
  });

  it("returns comparisonByLang with zh and en entries", async () => {
    const result = await generateComparisons({
      summariesByLang: mockSummariesByLang as never,
      fetchedOpenclaw: mockRepoFetch,
      openclaw: mockConfig,
      dateStr: "2026-01-01",
    });
    expect(result.comparisonByLang["zh-CN"]).toBe("mock comparison");
    expect(result.comparisonByLang["en-US"]).toBe("mock comparison");
    expect(result.peersComparisonByLang["zh-CN"]).toBe("mock comparison");
    expect(result.peersComparisonByLang["en-US"]).toBe("mock comparison");
  });
});
