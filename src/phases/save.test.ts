import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { WebState } from "../fetchers";
import * as githubModule from "../github";
import * as autoGenFooterModule from "../report/auto-gen-footer";
import * as buildCliReportContentModule from "../report/build-cli-report-content";
import * as buildOpenclawReportContentModule from "../report/build-openclaw-report-content";
import * as callLlmModule from "../report/call-llm";
import * as saveFileModule from "../report/save-file";
import * as saveCommunityReportModule from "../save/save-community-report";
import * as saveHackerNewsReportModule from "../save/save-hacker-news-report";
import * as saveHuggingFaceReportModule from "../save/save-hugging-face-report";
import * as saveProductHuntReportModule from "../save/save-product-hunt-report";
import * as saveTrendingReportModule from "../save/save-trending-report";
import * as saveWebReportModule from "../save/save-web-report";

import { type SavePhaseArgs, savePhase } from "./save";

const mockWebState: WebState = {
  anthropic: { seenUrls: {}, lastChecked: "" },
  openai: { seenUrls: {}, lastChecked: "" },
};

const baseArgs: SavePhaseArgs = {
  summariesByLang: {
    "zh-CN": { cliDigests: [], openclawSummary: "", skillsSummary: "", peerDigests: [], trendingSummary: "" },
    "en-US": { cliDigests: [], openclawSummary: "", skillsSummary: "", peerDigests: [], trendingSummary: "" },
  },
  comparisonsByLang: { "zh-CN": "", "en-US": "" },
  peersComparisonsByLang: { "zh-CN": "", "en-US": "" },
  claudeSkillsRepo: "org/skills",
  utcStr: "2026-01-01T00:00:00Z",
  dateStr: "2026-01-01",
  digestRepo: "owner/repo",
  enabledLangs: ["zh-CN", "en-US"],
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
    vi.spyOn(autoGenFooterModule, "autoGenFooter").mockReturnValue("\n\n---\nfooter");
    vi.spyOn(callLlmModule, "callLlm").mockResolvedValue("{}");
    vi.spyOn(saveFileModule, "saveFile").mockReturnValue("digests/2026-01-01/test.md");
    vi.spyOn(buildCliReportContentModule, "buildCliReportContent").mockReturnValue("# CLI Report");
    vi.spyOn(buildOpenclawReportContentModule, "buildOpenclawReportContent").mockReturnValue(
      "# OpenClaw Report",
    );
    vi.spyOn(saveWebReportModule, "saveWebReport").mockResolvedValue(undefined);
    vi.spyOn(saveTrendingReportModule, "saveTrendingReport").mockResolvedValue(undefined);
    vi.spyOn(saveHackerNewsReportModule, "saveHackerNewsReport").mockResolvedValue(undefined);
    vi.spyOn(saveProductHuntReportModule, "saveProductHuntReport").mockResolvedValue(undefined);
    vi.spyOn(saveHuggingFaceReportModule, "saveHuggingFaceReport").mockResolvedValue(undefined);
    vi.spyOn(saveCommunityReportModule, "saveCommunityReport").mockResolvedValue(undefined);
    vi.spyOn(githubModule, "createGitHubIssue").mockResolvedValue("https://github.com/owner/repo/issues/1");
    vi.spyOn(saveFileModule, "saveFile").mockReturnValue("digests/2026-01-01/test.md");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("saves CLI and OpenClaw reports for each enabled lang", async () => {
    await savePhase(baseArgs);
    expect(saveFileModule.saveFile).toHaveBeenCalledWith(expect.any(String), "2026-01-01", "ai-cli.zh-CN.md");
    expect(saveFileModule.saveFile).toHaveBeenCalledWith(expect.any(String), "2026-01-01", "ai-cli.md");
    expect(saveFileModule.saveFile).toHaveBeenCalledWith(
      expect.any(String),
      "2026-01-01",
      "ai-agents.zh-CN.md",
    );
    expect(saveFileModule.saveFile).toHaveBeenCalledWith(expect.any(String), "2026-01-01", "ai-agents.md");
  });

  it("calls saveWebReport for each enabled lang", async () => {
    await savePhase(baseArgs);
    expect(saveWebReportModule.saveWebReport).toHaveBeenCalledTimes(2);
  });

  it("creates GitHub issues when digestRepo is set", async () => {
    await savePhase(baseArgs);
    expect(githubModule.createGitHubIssue).toHaveBeenCalled();
  });

  it("handles single language (zh only)", async () => {
    await savePhase({ ...baseArgs, enabledLangs: ["zh-CN"] });
    expect(saveFileModule.saveFile).toHaveBeenCalledTimes(3); // cli + agents + highlights
    expect(saveWebReportModule.saveWebReport).toHaveBeenCalledTimes(1);
  });
});
