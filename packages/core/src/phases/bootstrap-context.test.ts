import { describe, expect, it } from "vitest";
import { bootstrapContext } from "./bootstrap-context";

const mockLoadConfig = () =>
  ({
    cliRepos: [{ id: "cli1" }, { id: "cli2" }],
    skillsRepo: { id: "skills" },
    openclaw: { id: "openclaw" },
    openclawPeers: [{ id: "peer1" }],
    languages: ["en-US"],
    defaultPrimaryLanguage: "en-US",
    schedule: { daily: "", weekly: "", monthly: "" },
  }) as never;

const mockLoadWebState = () => ({}) as never;

const deps = { loadConfig: mockLoadConfig, loadWebState: mockLoadWebState };

describe("bootstrapContext", () => {
  it("throws when GITHUB_TOKEN is missing", () => {
    expect(() => bootstrapContext({})).toThrow();
  });

  it("builds allConfigs from cliRepos + openclaw + openclawPeers", () => {
    const ctx = bootstrapContext({ GITHUB_TOKEN: "token" }, deps);
    expect(ctx.allConfigs.map((c) => c.id)).toEqual(["cli1", "cli2", "openclaw", "peer1"]);
  });

  it("sets digestRepo from DIGEST_REPO env var", () => {
    const ctx = bootstrapContext({ GITHUB_TOKEN: "token", DIGEST_REPO: "owner/repo" }, deps);
    expect(ctx.digestRepo).toBe("owner/repo");
  });

  it("defaults digestRepo to empty string when DIGEST_REPO is not set", () => {
    const ctx = bootstrapContext({ GITHUB_TOKEN: "token" }, deps);
    expect(ctx.digestRepo).toBe("");
  });

  it("sets enabledLangs from configured languages", () => {
    const ctx = bootstrapContext({ GITHUB_TOKEN: "token" }, deps);
    expect(ctx.enabledLangs).toEqual(["en-US"]);
  });
});
