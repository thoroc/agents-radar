import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrendingData } from "../fetchers/trending";
import type { GitHubItem, RepoFetch } from "../github";

const mockCallLlm = vi.fn<(prompt: string, maxTokens?: number) => Promise<string>>();

vi.mock("../call-llm", () => ({
  callLlm: mockCallLlm,
}));

vi.mock("../prompts", () => ({
  buildCliPrompt: vi.fn(() => "cli-prompt"),
  buildPeerPrompt: vi.fn(() => "peer-prompt"),
  buildSkillsPrompt: vi.fn(() => "skills-prompt"),
  buildTrendingPrompt: vi.fn(() => "trending-prompt"),
}));

import { generateSummaries } from "./summarize";

const mockConfig = { id: "test", repo: "org/cli", name: "Test CLI" };
const mockRepoFetch: RepoFetch = { cfg: mockConfig, issues: [], prs: [], releases: [] };
const mockSkillsData = { prs: [], issues: [] };
const mockTrendingData: TrendingData = { trendingRepos: [], searchRepos: [], trendingFetchSuccess: false };
const mockDateStr = "2026-01-01";

const mockIssue: GitHubItem = {
  number: 1,
  title: "Bug",
  body: "desc",
  labels: [],
  pull_request: null,
  html_url: "",
  created_at: "",
  updated_at: "",
  state: "open",
  user: { login: "user" },
  comments: 0,
};

describe("generateSummaries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCallLlm.mockResolvedValue("mock summary");
  });

  it("returns no-activity messages for repos with no data", async () => {
    const result = await generateSummaries(
      [mockRepoFetch],
      mockRepoFetch,
      mockSkillsData,
      [],
      mockTrendingData,
      mockDateStr,
      "en",
    );
    expect(result.cliDigests).toHaveLength(1);
    expect(result.cliDigests[0]!.summary).toBeTruthy();
    expect(result.openclawSummary).toBeTruthy();
  });

  it("calls callLlm for repos with activity", async () => {
    const activeFetch: RepoFetch = { cfg: mockConfig, issues: [mockIssue], prs: [], releases: [] };
    const result = await generateSummaries(
      [activeFetch],
      mockRepoFetch,
      mockSkillsData,
      [],
      mockTrendingData,
      mockDateStr,
      "en",
    );
    expect(result.cliDigests[0]!.summary).toBe("mock summary");
    expect(mockCallLlm).toHaveBeenCalled();
  });

  it("handles trending data with trendingNoData when empty", async () => {
    const result = await generateSummaries(
      [],
      mockRepoFetch,
      mockSkillsData,
      [],
      mockTrendingData,
      mockDateStr,
      "zh",
    );
    expect(result.trendingSummary).toBeTruthy();
  });

  it("returns correct shape", async () => {
    const result = await generateSummaries(
      [mockRepoFetch],
      mockRepoFetch,
      mockSkillsData,
      [],
      mockTrendingData,
      mockDateStr,
      "en",
    );
    expect(result).toHaveProperty("cliDigests");
    expect(result).toHaveProperty("openclawSummary");
    expect(result).toHaveProperty("skillsSummary");
    expect(result).toHaveProperty("peerDigests");
    expect(result).toHaveProperty("trendingSummary");
  });
});
