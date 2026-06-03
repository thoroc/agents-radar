import { describe, expect, it } from "vitest";
import { createOpenRouterProvider } from "./openrouter";

describe("createOpenRouterProvider", () => {
  it("creates a provider with the correct name", () => {
    const provider = createOpenRouterProvider({ apiKey: "test-key" });
    expect(provider.name).toBe("openrouter");
  });

  it("has a call method", () => {
    const provider = createOpenRouterProvider({ apiKey: "test-key" });
    expect(typeof provider.call).toBe("function");
  });

  it("reads OPENROUTER_API_KEY from env when apiKey not provided", () => {
    const prev = process.env.OPENROUTER_API_KEY;
    process.env.OPENROUTER_API_KEY = "or-env-key";
    try {
      const provider = createOpenRouterProvider();
      expect(provider.name).toBe("openrouter");
    } finally {
      process.env.OPENROUTER_API_KEY = prev;
    }
  });
});
