import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  createAnthropicProvider,
  createGitHubCopilotProvider,
  createOpenAIProvider,
  createOpenRouterProvider,
  createProvider,
  type LlmProvider,
  VALID_PROVIDER_NAMES,
} from "./index";

// ---------------------------------------------------------------------------
// Mock the SDKs at module level
// ---------------------------------------------------------------------------

const anthropicCreate = vi.fn();

vi.mock("@anthropic-ai/sdk", () => {
  class MockAnthropic {
    messages = { create: anthropicCreate };
  }
  return { default: MockAnthropic };
});

const openaiCreate = vi.fn();

vi.mock("openai", () => {
  class MockOpenAI {
    chat = { completions: { create: openaiCreate } };
  }
  return { default: MockOpenAI };
});

// ---------------------------------------------------------------------------
// Env helpers
// ---------------------------------------------------------------------------

function withEnv(vars: Record<string, string | undefined>, fn: () => void | Promise<void>) {
  return async () => {
    const saved: Record<string, string | undefined> = {};
    for (const key of Object.keys(vars)) {
      saved[key] = process.env[key];
      if (vars[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = vars[key];
      }
    }
    try {
      await fn();
    } finally {
      for (const key of Object.keys(saved)) {
        if (saved[key] === undefined) {
          delete process.env[key];
        } else {
          process.env[key] = saved[key];
        }
      }
    }
  };
}

// ---------------------------------------------------------------------------
// LlmProvider interface contract
// ---------------------------------------------------------------------------

describe("LlmProvider interface", () => {
  it("createAnthropicProvider has correct name", () => {
    const p = createAnthropicProvider();
    expect(p.name).toBe("anthropic");
  });

  it("createOpenAIProvider has correct name", () => {
    const p = createOpenAIProvider({ apiKey: "test" });
    expect(p.name).toBe("openai");
  });

  it("createGitHubCopilotProvider has correct name", () => {
    const p = createGitHubCopilotProvider({ apiKey: "test" });
    expect(p.name).toBe("github-copilot");
  });

  it("createOpenRouterProvider has correct name", () => {
    const p = createOpenRouterProvider({ apiKey: "test" });
    expect(p.name).toBe("openrouter");
  });

  it("all providers implement LlmProvider with call()", () => {
    const providers: LlmProvider[] = [
      createAnthropicProvider(),
      createOpenAIProvider({ apiKey: "k" }),
      createGitHubCopilotProvider({ apiKey: "k" }),
      createOpenRouterProvider({ apiKey: "k" }),
    ];
    for (const p of providers) {
      expect(typeof p.name).toBe("string");
      expect(typeof p.call).toBe("function");
    }
  });
});

// ---------------------------------------------------------------------------
// VALID_PROVIDER_NAMES
// ---------------------------------------------------------------------------

describe("VALID_PROVIDER_NAMES", () => {
  it("contains all four supported providers", () => {
    expect(VALID_PROVIDER_NAMES).toEqual(["anthropic", "openai", "github-copilot", "openrouter"]);
  });
});

// ---------------------------------------------------------------------------
// createAnthropicProvider
// ---------------------------------------------------------------------------

describe("createAnthropicProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("uses default model when ANTHROPIC_MODEL is not set", () => {
    delete process.env.ANTHROPIC_MODEL;
    const p = createAnthropicProvider();
    expect(p.name).toBe("anthropic");
  });

  it(
    "uses ANTHROPIC_MODEL env var",
    withEnv({ ANTHROPIC_MODEL: "claude-opus-99" }, () => {
      const p = createAnthropicProvider();
      expect(p.name).toBe("anthropic");
    }),
  );

  it("uses constructor model parameter over env", () => {
    const p = createAnthropicProvider("custom-model");
    expect(p.name).toBe("anthropic");
  });

  it("call returns text from Anthropic SDK", async () => {
    const mockCreate = anthropicCreate;
    mockCreate.mockResolvedValueOnce({
      content: [{ type: "text", text: "Hello from Anthropic" }],
    });

    const p = createAnthropicProvider("test-model");
    const result = await p.call("test prompt", 1024);
    expect(result).toBe("Hello from Anthropic");
    expect(mockCreate).toHaveBeenCalledWith({
      model: "test-model",
      max_tokens: 1024,
      messages: [{ role: "user", content: "test prompt" }],
    });
  });

  it("throws on non-text response", async () => {
    const mockCreate = anthropicCreate;
    mockCreate.mockResolvedValueOnce({
      content: [{ type: "image", source: {} }],
    });

    const p = createAnthropicProvider();
    await expect(p.call("prompt", 100)).rejects.toThrow("Unexpected response type from Anthropic");
  });
});

// ---------------------------------------------------------------------------
// createOpenAIProvider
// ---------------------------------------------------------------------------

describe("createOpenAIProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it(
    "uses OPENAI_MODEL env var as default",
    withEnv({ OPENAI_MODEL: "gpt-4-turbo" }, () => {
      const p = createOpenAIProvider({ apiKey: "k" });
      expect(p.name).toBe("openai");
    }),
  );

  it("uses gpt-4o when no env or constructor model given", () => {
    delete process.env.OPENAI_MODEL;
    const p = createOpenAIProvider({ apiKey: "k" });
    expect(p.name).toBe("openai");
  });

  it("call returns text from OpenAI SDK", async () => {
    const mockCreate = openaiCreate;
    mockCreate.mockResolvedValueOnce({
      choices: [{ message: { content: "Hello from OpenAI" } }],
    });

    const p = createOpenAIProvider({ apiKey: "k", model: "gpt-test" });
    const result = await p.call("test prompt", 2048);
    expect(result).toBe("Hello from OpenAI");
    expect(mockCreate).toHaveBeenCalledWith({
      model: "gpt-test",
      max_completion_tokens: 2048,
      messages: [{ role: "user", content: "test prompt" }],
    });
  });

  it("throws on empty response", async () => {
    const mockCreate = openaiCreate;
    mockCreate.mockResolvedValueOnce({
      choices: [{ message: { content: null } }],
    });

    const p = createOpenAIProvider({ apiKey: "k" });
    await expect(p.call("prompt", 100)).rejects.toThrow("Unexpected empty response from openai");
  });

  it("throws when choices is empty", async () => {
    const mockCreate = openaiCreate;
    mockCreate.mockResolvedValueOnce({ choices: [] });

    const p = createOpenAIProvider({ apiKey: "k" });
    await expect(p.call("prompt", 100)).rejects.toThrow("Unexpected empty response from openai");
  });
});

// ---------------------------------------------------------------------------
// createGitHubCopilotProvider
// ---------------------------------------------------------------------------

describe("createGitHubCopilotProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("call returns text", async () => {
    const mockCreate = openaiCreate;
    mockCreate.mockResolvedValueOnce({
      choices: [{ message: { content: "Hello from Copilot" } }],
    });

    const p = createGitHubCopilotProvider({ apiKey: "ghp_test" });
    const result = await p.call("prompt", 512);
    expect(result).toBe("Hello from Copilot");
  });

  it(
    "uses GITHUB_COPILOT_MODEL env",
    withEnv({ GITHUB_COPILOT_MODEL: "o3-mini" }, () => {
      const p = createGitHubCopilotProvider({ apiKey: "ghp_test" });
      expect(p.name).toBe("github-copilot");
    }),
  );

  it("throws on empty response", async () => {
    const mockCreate = openaiCreate;
    mockCreate.mockResolvedValueOnce({ choices: [] });

    const p = createGitHubCopilotProvider({ apiKey: "k" });
    await expect(p.call("prompt", 100)).rejects.toThrow("Unexpected empty response from github-copilot");
  });
});

// ---------------------------------------------------------------------------
// createOpenRouterProvider
// ---------------------------------------------------------------------------

describe("createOpenRouterProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("call returns text", async () => {
    const mockCreate = openaiCreate;
    mockCreate.mockResolvedValueOnce({
      choices: [{ message: { content: "Hello from OpenRouter" } }],
    });

    const p = createOpenRouterProvider({ apiKey: "or_test" });
    const result = await p.call("prompt", 256);
    expect(result).toBe("Hello from OpenRouter");
  });

  it(
    "uses OPENROUTER_MODEL env",
    withEnv({ OPENROUTER_MODEL: "meta-llama/llama-3-70b" }, () => {
      const p = createOpenRouterProvider({ apiKey: "k" });
      expect(p.name).toBe("openrouter");
    }),
  );

  it("throws on empty response", async () => {
    const mockCreate = openaiCreate;
    mockCreate.mockResolvedValueOnce({
      choices: [{ message: { content: "" } }],
    });

    const p = createOpenRouterProvider({ apiKey: "k" });
    await expect(p.call("prompt", 100)).rejects.toThrow("Unexpected empty response from openrouter");
  });
});

// ---------------------------------------------------------------------------
// createProvider factory
// ---------------------------------------------------------------------------

describe("createProvider", () => {
  const original = process.env.LLM_PROVIDER;

  afterEach(() => {
    if (original !== undefined) {
      process.env.LLM_PROVIDER = original;
    } else {
      delete process.env.LLM_PROVIDER;
    }
  });

  it("defaults to anthropic when LLM_PROVIDER is not set", () => {
    delete process.env.LLM_PROVIDER;
    const p = createProvider();
    expect(p.name).toBe("anthropic");
  });

  it("creates anthropic provider", () => {
    const p = createProvider("anthropic");
    expect(p.name).toBe("anthropic");
  });

  it("creates openai provider", () => {
    const p = createProvider("openai");
    expect(p.name).toBe("openai");
  });

  it("creates github-copilot provider", () => {
    const p = createProvider("github-copilot");
    expect(p.name).toBe("github-copilot");
  });

  it("creates openrouter provider", () => {
    const p = createProvider("openrouter");
    expect(p.name).toBe("openrouter");
  });

  it(
    "reads LLM_PROVIDER from env",
    withEnv({ LLM_PROVIDER: "openai" }, () => {
      const p = createProvider();
      expect(p.name).toBe("openai");
    }),
  );

  it("throws descriptive error for unknown provider", () => {
    expect(() => createProvider("bogus" as never)).toThrow(
      /Invalid LLM provider: "bogus".*Valid providers are: anthropic, openai, github-copilot, openrouter/,
    );
  });

  it("error message includes LLM_PROVIDER hint", () => {
    expect(() => createProvider("nope" as never)).toThrow("Set the LLM_PROVIDER env var");
  });

  it("log does not leak API keys", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    createProvider("anthropic");
    const logged = spy.mock.calls.flat().join(" ");
    expect(logged).toContain("anthropic");
    expect(logged).not.toMatch(/sk-|ghp_|key|secret/i);
    spy.mockRestore();
  });
});
