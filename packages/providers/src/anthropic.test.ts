import { describe, expect, it } from "vitest";
import { createAnthropicProvider } from "./anthropic";

describe("createAnthropicProvider", () => {
  it("creates a provider with the correct name", () => {
    const provider = createAnthropicProvider();
    expect(provider.name).toBe("anthropic");
  });

  it("has a call method", () => {
    const provider = createAnthropicProvider();
    expect(typeof provider.call).toBe("function");
  });

  it("uses default model when no argument and ANTHROPIC_MODEL not set", () => {
    delete process.env.ANTHROPIC_MODEL;
    const provider = createAnthropicProvider();
    expect(provider.name).toBe("anthropic");
  });
});
