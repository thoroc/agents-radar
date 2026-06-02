import type { DateTime } from "luxon";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { WebState } from "../fetchers";
import * as fetchersModule from "../fetchers";
import * as arxivModule from "../fetchers/arxiv";
import * as devToModule from "../fetchers/dev-to";
import * as hackerNewsModule from "../fetchers/hacker-news";
import * as huggingFaceModule from "../fetchers/hugging-face";
import * as lobsteRsModule from "../fetchers/lobste-rs";
import * as productHuntModule from "../fetchers/product-hunt";
import * as trendingModule from "../fetchers/trending";
import type { RepoConfig } from "../github";
import * as githubModule from "../github";

import { fetchAllData } from "./fetch";

const mockSince = { isBefore: () => true } as unknown as DateTime;
const mockWebState = {} as WebState;
const mockConfigs: RepoConfig[] = [{ id: "test-cli", repo: "org/cli", name: "Test CLI" }];

const defaultData = { stories: [], fetchSuccess: false };

describe("fetchAllData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(githubModule, "fetchRecentItems").mockResolvedValue([]);
    vi.spyOn(githubModule, "fetchRecentReleases").mockResolvedValue([]);
    vi.spyOn(githubModule, "fetchSkillsData").mockResolvedValue({ prs: [], issues: [] });
    vi.spyOn(fetchersModule, "fetchSiteContent").mockResolvedValue({
      site: "anthropic",
      siteName: "Anthropic",
      isFirstRun: false,
      newItems: [],
      totalDiscovered: 0,
    });
    vi.spyOn(trendingModule, "fetchTrendingData").mockResolvedValue({
      trendingRepos: [],
      searchRepos: [],
      trendingFetchSuccess: false,
    });
    vi.spyOn(hackerNewsModule, "fetchHackerNewsData").mockResolvedValue(defaultData);
    vi.spyOn(productHuntModule, "fetchProductHuntData").mockResolvedValue({
      products: [],
      fetchSuccess: false,
    });
    vi.spyOn(arxivModule, "fetchArxivData").mockResolvedValue({ papers: [], fetchSuccess: false });
    vi.spyOn(huggingFaceModule, "fetchHuggingFaceData").mockResolvedValue({
      models: [],
      fetchSuccess: false,
    });
    vi.spyOn(devToModule, "fetchDevToData").mockResolvedValue({ articles: [], fetchSuccess: false });
    vi.spyOn(lobsteRsModule, "fetchLobstersData").mockResolvedValue(defaultData);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches GitHub data for all provided configs", async () => {
    const result = await fetchAllData(mockSince, mockWebState, mockConfigs, "org/skills");
    expect(githubModule.fetchRecentItems).toHaveBeenCalledWith(mockConfigs[0], "issues", mockSince);
    expect(githubModule.fetchRecentItems).toHaveBeenCalledWith(mockConfigs[0], "pulls", mockSince);
    expect(githubModule.fetchRecentReleases).toHaveBeenCalledWith(mockConfigs[0]!.repo, mockSince);
    expect(result.fetched).toHaveLength(1);
  });

  it("calls fetchSkillsData with the skills repo", async () => {
    await fetchAllData(mockSince, mockWebState, mockConfigs, "org/skills");
    expect(githubModule.fetchSkillsData).toHaveBeenCalledWith("org/skills");
  });

  it("calls all external data fetchers in parallel", async () => {
    await fetchAllData(mockSince, mockWebState, mockConfigs, "org/skills");
    expect(fetchersModule.fetchSiteContent).toHaveBeenCalledTimes(2);
    expect(trendingModule.fetchTrendingData).toHaveBeenCalledOnce();
    expect(hackerNewsModule.fetchHackerNewsData).toHaveBeenCalledOnce();
    expect(productHuntModule.fetchProductHuntData).toHaveBeenCalledOnce();
    expect(arxivModule.fetchArxivData).toHaveBeenCalledOnce();
    expect(huggingFaceModule.fetchHuggingFaceData).toHaveBeenCalledOnce();
    expect(devToModule.fetchDevToData).toHaveBeenCalledOnce();
    expect(lobsteRsModule.fetchLobstersData).toHaveBeenCalledOnce();
  });

  it("handles GitHub fetch failure gracefully", async () => {
    vi.spyOn(githubModule, "fetchRecentItems").mockRejectedValueOnce(new Error("API error"));
    const result = await fetchAllData(mockSince, mockWebState, mockConfigs, "org/skills");
    expect(result.fetched[0]!).toEqual({ cfg: mockConfigs[0], issues: [], prs: [], releases: [] });
  });

  it("handles skills fetch failure gracefully", async () => {
    vi.spyOn(githubModule, "fetchSkillsData").mockRejectedValueOnce(new Error("API error"));
    const result = await fetchAllData(mockSince, mockWebState, mockConfigs, "org/skills");
    expect(result.skillsData).toEqual({ prs: [], issues: [] });
  });

  it("handles web fetch failure gracefully", async () => {
    vi.spyOn(fetchersModule, "fetchSiteContent").mockRejectedValue(new Error("Network error"));
    const result = await fetchAllData(mockSince, mockWebState, mockConfigs, "org/skills");
    expect(result.webResults).toHaveLength(2);
    expect(result.webResults[0]!.newItems).toEqual([]);
  });

  it("returns the correct shape with default values", async () => {
    const result = await fetchAllData(mockSince, mockWebState, mockConfigs, "org/skills");
    expect(result).toHaveProperty("fetched");
    expect(result).toHaveProperty("skillsData");
    expect(result).toHaveProperty("webResults");
    expect(result).toHaveProperty("trendingData");
    expect(result).toHaveProperty("hnData");
    expect(result).toHaveProperty("phData");
    expect(result).toHaveProperty("arxivData");
    expect(result).toHaveProperty("hfData");
    expect(result).toHaveProperty("devtoData");
    expect(result).toHaveProperty("lobstersData");
  });
});
