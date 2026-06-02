import { describe, expect, it } from "vitest";
import type { RepoConfig } from "../github/types";
import { buildPeersComparisonPrompt } from "./build-peers-comparison-prompt";
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

describe("buildPeersComparisonPrompt", () => {
  it("includes openclaw and peer sections", () => {
    const openclawDigest = makeDigest({
      config: { id: "openclaw", repo: "openclaw/openclaw", name: "OpenClaw" },
      summary: "OC summary",
    });
    const peerDigests = [
      makeDigest({ config: { ...cfg, name: "Peer" }, summary: "Peer summary", issues: [{} as never] }),
    ];
    const result = buildPeersComparisonPrompt(openclawDigest, peerDigests, "2026-03-09");
    expect(result).toContain("OpenClaw (core reference");
    expect(result).toContain("OC summary");
    expect(result).toContain("Peer summary");
    expect(result).toContain("Write the response in Chinese");
  });
});
