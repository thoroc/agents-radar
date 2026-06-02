import { describe, expect, it } from "vitest";
import type { GitHubItem, GitHubRelease, RepoConfig } from "../github";
import type { RepoDigest } from "../prompts";
import { buildOpenclawReportContent } from "./build-openclaw-report-content";

const makeDigest = (overrides: Partial<RepoDigest> = {}): RepoDigest => ({
  config: { id: "test-tool", repo: "org/test-tool", name: "TestTool" },
  issues: [],
  prs: [],
  releases: [],
  summary: "Test summary content",
  ...overrides,
});

describe("buildOpenclawReportContent", () => {
  it("includes all sections (zh)", () => {
    const openclaw: RepoConfig = { id: "openclaw", repo: "openclaw/openclaw", name: "OpenClaw" };
    const peers: RepoConfig[] = [{ id: "peer1", repo: "org/peer1", name: "Peer1" }];
    const peerDigests: RepoDigest[] = [makeDigest({ config: peers[0] })];
    const fetchedOpenclaw = {
      cfg: openclaw,
      issues: [{ number: 1 }] as unknown as GitHubItem[],
      prs: [] as GitHubItem[],
      releases: [] as GitHubRelease[],
    };
    const result = buildOpenclawReportContent(
      fetchedOpenclaw,
      peerDigests,
      "OpenClaw summary",
      "Peers comparison",
      "2026-03-09 00:00",
      "2026-03-09",
      "\nfooter",
      openclaw,
      peers,
      "zh",
    );
    expect(result).toContain("# OpenClaw 生态日报 2026-03-09");
    expect(result).toContain("Issues: 1");
    expect(result).toContain("覆盖项目: 2 个");
    expect(result).toContain("[OpenClaw](https://github.com/openclaw/openclaw)");
    expect(result).toContain("[Peer1](https://github.com/org/peer1)");
    expect(result).toContain("OpenClaw 项目深度报告");
    expect(result).toContain("横向生态对比");
    expect(result).toContain("同赛道项目详细报告");
    expect(result).toContain("footer");
  });
  it("renders in English", () => {
    const openclaw: RepoConfig = { id: "openclaw", repo: "openclaw/openclaw", name: "OpenClaw" };
    const result = buildOpenclawReportContent(
      { cfg: openclaw, issues: [], prs: [], releases: [] },
      [],
      "summary",
      "comparison",
      "",
      "2026-03-09",
      "",
      openclaw,
      [],
      "en",
    );
    expect(result).toContain("# OpenClaw Ecosystem Digest 2026-03-09");
    expect(result).toContain("OpenClaw Deep Dive");
    expect(result).toContain("Cross-Ecosystem Comparison");
  });
});
