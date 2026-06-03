import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { LlmProvider } from "@agents-radar/providers";
import { callLlm } from "./call-llm";

const mockCall = vi.fn<(prompt: string, maxTokens: number) => Promise<string>>();
const mockProvider: LlmProvider = { name: "mock", call: mockCall };

describe("callLlm", () => {
  const noopSleep = async () => {};
  beforeEach(() => {
    mockCall.mockReset();
  });
  afterEach(() => {
    mockCall.mockClear();
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
