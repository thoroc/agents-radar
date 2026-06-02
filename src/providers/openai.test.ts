import { describe, expect, it } from "vitest";
import { createOpenAIProvider } from "./openai";

describe("createOpenAIProvider", () => {
  it("creates a provider with the correct name", () => {
    const provider = createOpenAIProvider({ apiKey: "test-key" });
    expect(provider.name).toBe("openai");
  });

  it("has a call method", () => {
    const provider = createOpenAIProvider({ apiKey: "test-key" });
    expect(typeof provider.call).toBe("function");
  });

  it("creates a provider without options", () => {
    const provider = createOpenAIProvider({ apiKey: "test-key" });
    expect(provider.name).toBe("openai");
  });
});
