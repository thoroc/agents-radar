import { beforeEach, describe, expect, it, vi } from "vitest";
import type { RepoConfig, RepoFetch } from "../github";
import type { RepoDigest } from "../prompts";

const mockCallLlm = vi.fn<(prompt: string) => Promise<string>>();

vi.mock("../report", () => ({
  callLlm: mockCallLlm,
}));

vi.mock("../prompts", () => ({
  buildComparisonPrompt: vi.fn((_digests, _ds, lang) => `comparison-prompt-${lang}`),
  buildPeersComparisonPrompt: vi.fn((_digest, _peers, _ds, lang) => `peers-comparison-prompt-${lang}`),
}));

import { generateComparisons } from "./compare";

const mockConfig: RepoConfig = { id: "openclaw", repo: "org/openclaw", name: "OpenClaw" };
const mockRepoFetch: RepoFetch = { cfg: mockConfig, issues: [], prs: [], releases: [] };
const mockDigest: RepoDigest = { config: mockConfig, issues: [], prs: [], releases: [], summary: "test" };
const mockSummariesByLang = {
  zh: { cliDigests: [mockDigest], openclawSummary: "zh summary", peerDigests: [mockDigest] } as const,
  en: { cliDigests: [mockDigest], openclawSummary: "en summary", peerDigests: [mockDigest] } as const,
};

describe("generateComparisons", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCallLlm.mockResolvedValue("mock comparison");
  });

  it("calls callLlm 4 times (zh/en × CLI/peers)", async () => {
    await generateComparisons({
      summariesByLang: mockSummariesByLang as never,
      fetchedOpenclaw: mockRepoFetch,
      openclaw: mockConfig,
      dateStr: "2026-01-01",
    });
    expect(mockCallLlm).toHaveBeenCalledTimes(4);
  });

  it("returns comparisonByLang with zh and en entries", async () => {
    const result = await generateComparisons({
      summariesByLang: mockSummariesByLang as never,
      fetchedOpenclaw: mockRepoFetch,
      openclaw: mockConfig,
      dateStr: "2026-01-01",
    });
    expect(result.comparisonByLang.zh).toBe("mock comparison");
    expect(result.comparisonByLang.en).toBe("mock comparison");
    expect(result.peersComparisonByLang.zh).toBe("mock comparison");
    expect(result.peersComparisonByLang.en).toBe("mock comparison");
  });
});
