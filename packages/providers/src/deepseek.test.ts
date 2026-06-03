import { describe, expect, it } from "vitest";
import { createDeepSeekProvider } from "./deepseek";

describe("createDeepSeekProvider", () => {
  it("creates a provider with the correct name", () => {
    const provider = createDeepSeekProvider("test-key");
    expect(provider.name).toBe("deepseek");
  });

  it("has a call method", () => {
    const provider = createDeepSeekProvider("test-key");
    expect(typeof provider.call).toBe("function");
  });

  it("accepts a custom model", () => {
    const provider = createDeepSeekProvider("test-key", "deepseek-reasoner");
    expect(provider.name).toBe("deepseek");
  });
});
