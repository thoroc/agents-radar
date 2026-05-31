import type { DateTime } from "luxon";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { WebState } from "../fetchers/web";
import type { RepoConfig } from "../github";

const mockFetchRecentItems = vi.fn();
const mockFetchRecentReleases = vi.fn();
const mockFetchSkillsData = vi.fn();
const mockFetchSiteContent = vi.fn();
const mockFetchTrendingData = vi.fn();
const mockFetchHnData = vi.fn();
const mockFetchPhData = vi.fn();
const mockFetchArxivData = vi.fn();
const mockFetchHfData = vi.fn();
const mockFetchDevtoData = vi.fn();
const mockFetchLobstersData = vi.fn();

vi.mock("../fetchers/arxiv", () => ({ fetchArxivData: mockFetchArxivData }));
vi.mock("../fetchers/devto", () => ({ fetchDevtoData: mockFetchDevtoData }));
vi.mock("../fetchers/hf", () => ({ fetchHfData: mockFetchHfData }));
vi.mock("../fetchers/hn", () => ({ fetchHnData: mockFetchHnData }));
vi.mock("../fetchers/lobsters", () => ({ fetchLobstersData: mockFetchLobstersData }));
vi.mock("../fetchers/ph", () => ({ fetchPhData: mockFetchPhData }));
vi.mock("../fetchers/trending", () => ({ fetchTrendingData: mockFetchTrendingData }));
vi.mock("../fetchers/web", () => ({ fetchSiteContent: mockFetchSiteContent }));
vi.mock("../github", () => ({
  fetchRecentItems: mockFetchRecentItems,
  fetchRecentReleases: mockFetchRecentReleases,
  fetchSkillsData: mockFetchSkillsData,
}));

import { fetchAllData } from "./fetch";

const mockSince = { isBefore: () => true } as unknown as DateTime;
const mockWebState = {} as WebState;
const mockConfigs: RepoConfig[] = [{ id: "test-cli", repo: "org/cli", name: "Test CLI" }];

const defaultData = { stories: [], fetchSuccess: false };

describe("fetchAllData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetchRecentItems.mockResolvedValue([]);
    mockFetchRecentReleases.mockResolvedValue([]);
    mockFetchSkillsData.mockResolvedValue({ prs: [], issues: [] });
    mockFetchSiteContent.mockResolvedValue({
      site: "anthropic",
      siteName: "Anthropic",
      isFirstRun: false,
      newItems: [],
      totalDiscovered: 0,
    });
    mockFetchTrendingData.mockResolvedValue({
      trendingRepos: [],
      searchRepos: [],
      trendingFetchSuccess: false,
    });
    mockFetchHnData.mockResolvedValue(defaultData);
    mockFetchPhData.mockResolvedValue({ products: [], fetchSuccess: false });
    mockFetchArxivData.mockResolvedValue({ papers: [], fetchSuccess: false });
    mockFetchHfData.mockResolvedValue({ models: [], fetchSuccess: false });
    mockFetchDevtoData.mockResolvedValue({ articles: [], fetchSuccess: false });
    mockFetchLobstersData.mockResolvedValue(defaultData);
  });

  it("fetches GitHub data for all provided configs", async () => {
    const result = await fetchAllData(mockSince, mockWebState, mockConfigs, "org/skills");
    expect(mockFetchRecentItems).toHaveBeenCalledWith(mockConfigs[0], "issues", mockSince);
    expect(mockFetchRecentItems).toHaveBeenCalledWith(mockConfigs[0], "pulls", mockSince);
    expect(mockFetchRecentReleases).toHaveBeenCalledWith(mockConfigs[0]!.repo, mockSince);
    expect(result.fetched).toHaveLength(1);
  });

  it("calls fetchSkillsData with the skills repo", async () => {
    await fetchAllData(mockSince, mockWebState, mockConfigs, "org/skills");
    expect(mockFetchSkillsData).toHaveBeenCalledWith("org/skills");
  });

  it("calls all external data fetchers in parallel", async () => {
    await fetchAllData(mockSince, mockWebState, mockConfigs, "org/skills");
    expect(mockFetchSiteContent).toHaveBeenCalledTimes(2);
    expect(mockFetchTrendingData).toHaveBeenCalledOnce();
    expect(mockFetchHnData).toHaveBeenCalledOnce();
    expect(mockFetchPhData).toHaveBeenCalledOnce();
    expect(mockFetchArxivData).toHaveBeenCalledOnce();
    expect(mockFetchHfData).toHaveBeenCalledOnce();
    expect(mockFetchDevtoData).toHaveBeenCalledOnce();
    expect(mockFetchLobstersData).toHaveBeenCalledOnce();
  });

  it("handles GitHub fetch failure gracefully", async () => {
    mockFetchRecentItems.mockRejectedValueOnce(new Error("API error"));
    const result = await fetchAllData(mockSince, mockWebState, mockConfigs, "org/skills");
    expect(result.fetched[0]!).toEqual({ cfg: mockConfigs[0], issues: [], prs: [], releases: [] });
  });

  it("handles skills fetch failure gracefully", async () => {
    mockFetchSkillsData.mockRejectedValueOnce(new Error("API error"));
    const result = await fetchAllData(mockSince, mockWebState, mockConfigs, "org/skills");
    expect(result.skillsData).toEqual({ prs: [], issues: [] });
  });

  it("handles web fetch failure gracefully", async () => {
    mockFetchSiteContent.mockRejectedValue(new Error("Network error"));
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
