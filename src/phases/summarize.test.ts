import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { TrendingData } from "../fetchers/trending";
import type { GitHubItem, RepoFetch } from "../github";
import * as promptsModule from "../prompts";
import * as callLlmModule from "../report/call-llm";

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
    vi.spyOn(callLlmModule, "callLlm").mockResolvedValue("mock summary");
    vi.spyOn(promptsModule, "buildCliPrompt").mockReturnValue("cli-prompt");
    vi.spyOn(promptsModule, "buildPeerPrompt").mockReturnValue("peer-prompt");
    vi.spyOn(promptsModule, "buildSkillsPrompt").mockReturnValue("skills-prompt");
    vi.spyOn(promptsModule, "buildTrendingPrompt").mockReturnValue("trending-prompt");
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
    expect(callLlmModule.callLlm).toHaveBeenCalled();
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
