import { afterEach, describe, expect, it, vi } from "vitest";
import { createOpenAICompatibleProvider } from "./openai-compatible";

const openaiCreate = vi.fn();

vi.mock("openai", () => {
  class MockOpenAI {
    chat = { completions: { create: openaiCreate } };
  }
  return { default: MockOpenAI };
});

describe("createOpenAICompatibleProvider", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("creates a provider with a custom name", () => {
    const provider = createOpenAICompatibleProvider("my-provider", {
      apiKey: "key",
      model: "gpt-4",
    });
    expect(provider.name).toBe("my-provider");
  });

  it("has a call method", () => {
    const provider = createOpenAICompatibleProvider("test", {
      apiKey: "key",
      model: "gpt-4",
    });
    expect(typeof provider.call).toBe("function");
  });

  it("call passes prompt to OpenAI SDK and returns text", async () => {
    openaiCreate.mockResolvedValueOnce({
      choices: [{ message: { content: "Hello from AI" } }],
    });

    const provider = createOpenAICompatibleProvider("test", {
      apiKey: "k",
      baseURL: "https://custom.com",
      model: "gpt-test",
    });

    const result = await provider.call("test prompt", 2048);

    expect(result).toBe("Hello from AI");
    expect(openaiCreate).toHaveBeenCalledWith({
      model: "gpt-test",
      max_completion_tokens: 2048,
      messages: [{ role: "user", content: "test prompt" }],
    });
  });

  it("throws on null content response", async () => {
    openaiCreate.mockResolvedValueOnce({
      choices: [{ message: { content: null } }],
    });

    const provider = createOpenAICompatibleProvider("test", {
      apiKey: "k",
      model: "m",
    });

    await expect(provider.call("prompt", 100)).rejects.toThrow("Unexpected empty response from test");
  });

  it("throws when choices array is empty", async () => {
    openaiCreate.mockResolvedValueOnce({ choices: [] });

    const provider = createOpenAICompatibleProvider("empty", {
      apiKey: "k",
      model: "m",
    });

    await expect(provider.call("prompt", 100)).rejects.toThrow("Unexpected empty response from empty");
  });
});
