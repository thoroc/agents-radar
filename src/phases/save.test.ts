import { beforeEach, describe, expect, it, vi } from "vitest";
import type { WebState } from "../fetchers/web";

const mockAutoGenFooter = vi.fn(() => "\n\n---\nfooter");
const mockCallLlm = vi.fn<(prompt: string) => Promise<string>>();
const mockSaveFile = vi.fn<(content: string, ...segments: string[]) => string>();
const mockBuildCliReportContent = vi.fn(() => "# CLI Report");
const mockBuildOpenclawReportContent = vi.fn(() => "# OpenClaw Report");

vi.mock("../report", () => ({
  autoGenFooter: mockAutoGenFooter,
  callLlm: mockCallLlm,
  saveFile: mockSaveFile,
}));

vi.mock("../report-builders", () => ({
  buildCliReportContent: mockBuildCliReportContent,
  buildOpenclawReportContent: mockBuildOpenclawReportContent,
}));

const mockSaveWebReport = vi.fn();
const mockSaveTrendingReport = vi.fn();
const mockSaveHnReport = vi.fn();
const mockSavePhReport = vi.fn();
const mockSaveArxivReport = vi.fn();
const mockSaveHfReport = vi.fn();
const mockSaveCommunityReport = vi.fn();

vi.mock("../report-savers", () => ({
  saveWebReport: mockSaveWebReport,
  saveTrendingReport: mockSaveTrendingReport,
  saveHnReport: mockSaveHnReport,
  savePhReport: mockSavePhReport,
  saveArxivReport: mockSaveArxivReport,
  saveHfReport: mockSaveHfReport,
  saveCommunityReport: mockSaveCommunityReport,
}));

const mockCreateGitHubIssue = vi.fn(() => Promise.resolve("https://github.com/owner/repo/issues/1"));

vi.mock("../github", () => ({
  createGitHubIssue: mockCreateGitHubIssue,
}));

import { type SavePhaseArgs, savePhase } from "./save";

const mockWebState: WebState = {
  anthropic: { seenUrls: {}, lastChecked: "" },
  openai: { seenUrls: {}, lastChecked: "" },
};

const baseArgs: SavePhaseArgs = {
  summariesByLang: {
    zh: { cliDigests: [], openclawSummary: "", skillsSummary: "", peerDigests: [], trendingSummary: "" },
    en: { cliDigests: [], openclawSummary: "", skillsSummary: "", peerDigests: [], trendingSummary: "" },
  },
  comparisonsByLang: { zh: "", en: "" },
  peersComparisonsByLang: { zh: "", en: "" },
  claudeSkillsRepo: "org/skills",
  utcStr: "2026-01-01T00:00:00Z",
  dateStr: "2026-01-01",
  digestRepo: "owner/repo",
  enabledLangs: ["zh", "en"],
  fetchedOpenclaw: {
    cfg: { id: "openclaw", repo: "org/openclaw", name: "OpenClaw" },
    issues: [],
    prs: [],
    releases: [],
  },
  openclaw: { id: "openclaw", repo: "org/openclaw", name: "OpenClaw" },
  openclawPeers: [],
  webResults: [],
  webState: mockWebState,
  trendingData: { trendingRepos: [], searchRepos: [], trendingFetchSuccess: false },
  hnData: { stories: [], fetchSuccess: false },
  phData: { products: [], fetchSuccess: false },
  arxivData: { papers: [], fetchSuccess: false },
  hfData: { models: [], fetchSuccess: false },
  devtoData: { articles: [], fetchSuccess: false },
  lobstersData: { stories: [], fetchSuccess: false },
};

describe("savePhase", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSaveFile.mockReturnValue("digests/2026-01-01/test.md");
    mockCallLlm.mockResolvedValue("{}");
  });

  it("saves CLI and OpenClaw reports for each enabled lang", async () => {
    await savePhase(baseArgs);
    expect(mockSaveFile).toHaveBeenCalledWith(expect.any(String), "2026-01-01", "ai-cli.md");
    expect(mockSaveFile).toHaveBeenCalledWith(expect.any(String), "2026-01-01", "ai-cli.en.md");
    expect(mockSaveFile).toHaveBeenCalledWith(expect.any(String), "2026-01-01", "ai-agents.md");
    expect(mockSaveFile).toHaveBeenCalledWith(expect.any(String), "2026-01-01", "ai-agents.en.md");
  });

  it("calls saveWebReport for each enabled lang", async () => {
    await savePhase(baseArgs);
    expect(mockSaveWebReport).toHaveBeenCalledTimes(2);
  });

  it("creates GitHub issues when digestRepo is set", async () => {
    await savePhase(baseArgs);
    expect(mockCreateGitHubIssue).toHaveBeenCalled();
  });

  it("handles single language (zh only)", async () => {
    await savePhase({ ...baseArgs, enabledLangs: ["zh"] });
    expect(mockSaveFile).toHaveBeenCalledTimes(3); // cli + agents + highlights
    expect(mockSaveWebReport).toHaveBeenCalledTimes(1);
  });
});
