import { describe, expect, it } from "vitest";
import { getFallbackProvider } from "./get-fallback-provider";

describe("getFallbackProvider", () => {
  it("returns null when DEEPSEEK_API_KEY is not set", () => {
    expect(getFallbackProvider({})).toBeNull();
  });
  it("returns null when DEEPSEEK_API_KEY is empty string", () => {
    expect(getFallbackProvider({ DEEPSEEK_API_KEY: "" })).toBeNull();
  });
  it("returns a provider when DEEPSEEK_API_KEY is set", () => {
    const provider = getFallbackProvider({ DEEPSEEK_API_KEY: "sk-test-key" });
    expect(provider).not.toBeNull();
    expect(provider?.name).toBe("deepseek");
  });
});
