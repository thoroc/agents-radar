import { describe, expect, it, vi } from "vitest";

vi.mock("../fetchers", () => ({ loadWebState: () => ({}) }));
vi.mock("../require-env", () => ({
  requireEnv: (key: string, env: NodeJS.ProcessEnv) => {
    if (!env[key]) throw new Error(`Missing required env var: ${key}`);
  },
}));
vi.mock("../utils", () => ({
  loadConfig: () => ({
    cliRepos: [{ id: "cli1" }, { id: "cli2" }],
    skillsRepo: { id: "skills" },
    openclaw: { id: "openclaw" },
    openclawPeers: [{ id: "peer1" }],
    languages: ["en-US"],
  }),
  getEnabledLangs: () => ["en-US"],
  toCstDateStr: () => "2026-06-03",
  toUtcStr: () => "2026-06-03T00:00:00Z",
}));

import { bootstrapContext } from "./bootstrap-context";

describe("bootstrapContext", () => {
  it("throws when GITHUB_TOKEN is missing", () => {
    expect(() => bootstrapContext({})).toThrow("Missing required env var: GITHUB_TOKEN");
  });

  it("builds allConfigs from cliRepos + openclaw + openclawPeers", () => {
    const ctx = bootstrapContext({ GITHUB_TOKEN: "token" });
    expect(ctx.allConfigs.map((c) => c.id)).toEqual(["cli1", "cli2", "openclaw", "peer1"]);
  });

  it("sets digestRepo from DIGEST_REPO env var", () => {
    const ctx = bootstrapContext({ GITHUB_TOKEN: "token", DIGEST_REPO: "owner/repo" });
    expect(ctx.digestRepo).toBe("owner/repo");
  });

  it("defaults digestRepo to empty string when DIGEST_REPO is not set", () => {
    const ctx = bootstrapContext({ GITHUB_TOKEN: "token" });
    expect(ctx.digestRepo).toBe("");
  });

  it("sets enabledLangs from getEnabledLangs", () => {
    const ctx = bootstrapContext({ GITHUB_TOKEN: "token" });
    expect(ctx.enabledLangs).toEqual(["en-US"]);
  });
});
