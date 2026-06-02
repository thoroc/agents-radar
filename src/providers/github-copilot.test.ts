import { afterEach, describe, expect, it } from "vitest";
import { createGitHubCopilotProvider } from "./github-copilot";

describe("createGitHubCopilotProvider", () => {
  afterEach(() => {
    delete process.env.GITHUB_TOKEN;
    delete process.env.GITHUB_COPILOT_MODEL;
  });

  it("creates a provider with the correct name", () => {
    const provider = createGitHubCopilotProvider({ apiKey: "test-key" });
    expect(provider.name).toBe("github-copilot");
  });

  it("has a call method", () => {
    const provider = createGitHubCopilotProvider({ apiKey: "test-key" });
    expect(typeof provider.call).toBe("function");
  });

  it("reads GITHUB_TOKEN from env when apiKey not provided", () => {
    process.env.GITHUB_TOKEN = "ghp_env-token";
    const provider = createGitHubCopilotProvider();
    expect(provider.name).toBe("github-copilot");
  });
});
