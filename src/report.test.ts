import fs from "node:fs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { LlmProvider } from "./providers/index";
import { autoGenFooter, callLlm, is429, saveFile } from "./report";

const mockCall = vi.fn<(prompt: string, maxTokens: number) => Promise<string>>();
const mockProvider: LlmProvider = { name: "mock", call: mockCall };

// ---------------------------------------------------------------------------
// is429
// ---------------------------------------------------------------------------

describe("is429", () => {
  it("detects status 429 from error-like objects", () => {
    expect(is429({ status: 429 })).toBe(true);
  });

  it("detects 429 from string representation", () => {
    expect(is429(new Error("Request failed with 429"))).toBe(true);
  });

  it("returns false for other status codes", () => {
    expect(is429({ status: 500 })).toBe(false);
    expect(is429({ status: 200 })).toBe(false);
  });

  it("returns false for null/undefined", () => {
    expect(is429(null)).toBe(false);
    expect(is429(undefined)).toBe(false);
  });

  it("returns false for unrelated errors", () => {
    expect(is429(new Error("Something else"))).toBe(false);
  });

  it("detects OpenAI SDK RateLimitError shape (status + code)", () => {
    const openaiError = Object.assign(new Error("Rate limit reached"), {
      status: 429,
      code: "rate_limit_exceeded",
      type: "tokens",
    });
    expect(is429(openaiError)).toBe(true);
  });

  it("detects Anthropic SDK APIError shape (status + headers)", () => {
    const anthropicError = Object.assign(new Error("rate_limit_error"), {
      status: 429,
      headers: { "retry-after": "30" },
    });
    expect(is429(anthropicError)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// saveFile
// ---------------------------------------------------------------------------

describe("saveFile", () => {
  beforeEach(() => {
    vi.spyOn(fs, "mkdirSync").mockReturnValue(undefined);
    vi.spyOn(fs, "writeFileSync").mockReturnValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the expected file path", () => {
    const result = saveFile("content", "2026-03-09", "ai-cli.md");
    expect(result).toBe("digests/2026-03-09/ai-cli.md");
  });

  it("creates parent directories recursively", () => {
    saveFile("content", "2026-03-09", "ai-cli.md");
    expect(fs.mkdirSync).toHaveBeenCalledWith("digests/2026-03-09", { recursive: true });
  });

  it("writes content as utf-8", () => {
    saveFile("hello world", "2026-03-09", "test.md");
    expect(fs.writeFileSync).toHaveBeenCalledWith("digests/2026-03-09/test.md", "hello world", "utf-8");
  });
});

// ---------------------------------------------------------------------------
// autoGenFooter
// ---------------------------------------------------------------------------

describe("autoGenFooter", () => {
  const originalEnv = process.env.DIGEST_REPO;

  afterEach(() => {
    if (originalEnv !== undefined) {
      process.env.DIGEST_REPO = originalEnv;
    } else {
      delete process.env.DIGEST_REPO;
    }
  });

  it("returns empty string when DIGEST_REPO is not set", () => {
    delete process.env.DIGEST_REPO;
    expect(autoGenFooter()).toBe("");
  });

  it("returns empty string when DIGEST_REPO is empty", () => {
    process.env.DIGEST_REPO = "";
    expect(autoGenFooter()).toBe("");
  });

  it("returns Chinese footer when DIGEST_REPO is set", () => {
    process.env.DIGEST_REPO = "user/repo";
    const result = autoGenFooter("zh");
    expect(result).toContain("agents-radar");
    expect(result).toContain("github.com/user/repo");
    expect(result).toContain("自动生成");
  });

  it("returns English footer when lang is en", () => {
    process.env.DIGEST_REPO = "user/repo";
    const result = autoGenFooter("en");
    expect(result).toContain("auto-generated");
    expect(result).toContain("agents-radar");
  });
});

// ---------------------------------------------------------------------------
// callLlm
// ---------------------------------------------------------------------------

const noopSleep = async () => {};

describe("callLlm", () => {
  beforeEach(() => {
    mockCall.mockReset();
  });

  it("passes prompt and maxTokens to provider.call()", async () => {
    mockCall.mockResolvedValueOnce("response text");

    const result = await callLlm("hello", 2048, { provider: mockProvider });

    expect(result).toBe("response text");
    expect(mockCall).toHaveBeenCalledOnce();
    expect(mockCall).toHaveBeenCalledWith("hello", 2048);
  });

  it("uses default maxTokens of 4096", async () => {
    mockCall.mockResolvedValueOnce("ok");

    await callLlm("prompt", 4096, { provider: mockProvider });

    expect(mockCall).toHaveBeenCalledWith("prompt", 4096);
  });

  it("retries on 429 with exponential backoff", async () => {
    const err429 = Object.assign(new Error("rate limited"), { status: 429 });
    mockCall.mockRejectedValueOnce(err429);
    mockCall.mockResolvedValueOnce("success after retry");

    const result = await callLlm("prompt", 1024, { provider: mockProvider, sleep: noopSleep });

    expect(result).toBe("success after retry");
    expect(mockCall).toHaveBeenCalledTimes(2);
  });

  it("retries up to MAX_RETRIES times then throws", async () => {
    const err429 = Object.assign(new Error("rate limited"), { status: 429 });
    mockCall
      .mockRejectedValueOnce(err429)
      .mockRejectedValueOnce(err429)
      .mockRejectedValueOnce(err429)
      .mockRejectedValueOnce(err429);

    await expect(callLlm("prompt", 1024, { provider: mockProvider, sleep: noopSleep })).rejects.toThrow(
      "rate limited",
    );
    expect(mockCall).toHaveBeenCalledTimes(4);
  });

  it("throws immediately on non-429 errors", async () => {
    mockCall.mockRejectedValueOnce(new Error("server error"));

    await expect(callLlm("prompt", 4096, { provider: mockProvider })).rejects.toThrow("server error");
    expect(mockCall).toHaveBeenCalledOnce();
  });

  it("does not leak concurrency slots on 429 retries", async () => {
    const err429 = Object.assign(new Error("429"), { status: 429 });
    mockCall.mockRejectedValueOnce(err429);
    mockCall.mockResolvedValueOnce("ok");

    await callLlm("prompt", 4096, { provider: mockProvider, sleep: noopSleep });

    mockCall.mockResolvedValue("ok");
    const batch = Array.from({ length: 5 }, (_, i) => callLlm(`p${i}`, 4096, { provider: mockProvider }));
    const results = await Promise.all(batch);
    expect(results).toEqual(["ok", "ok", "ok", "ok", "ok"]);
  });
});
