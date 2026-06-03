import fs from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { loadWebState } from "./load-web-state";
import type { WebState } from "./web-state-types";

let mockReadFileSync: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  vi.restoreAllMocks();
  mockReadFileSync = vi.spyOn(fs, "readFileSync").mockReturnValue("" as never);
});

describe("loadWebState", () => {
  it("parses and returns valid JSON from state file", () => {
    const validState: WebState = {
      anthropic: { lastChecked: "2026-05-30T00:00:00.000Z", seenUrls: { "https://example.com": "seen" } },
      openai: { lastChecked: "", seenUrls: {} },
    };
    mockReadFileSync.mockReturnValue(JSON.stringify(validState));
    const result = loadWebState();
    expect(result).toEqual(validState);
  });

  it("returns empty state when file does not exist", () => {
    mockReadFileSync.mockImplementation(() => {
      throw new Error("ENOENT: no such file or directory");
    });
    const result = loadWebState();
    expect(result).toEqual({
      anthropic: { lastChecked: "", seenUrls: {} },
      openai: { lastChecked: "", seenUrls: {} },
    });
  });

  it("returns empty state when JSON is malformed", () => {
    mockReadFileSync.mockReturnValue("{invalid json}");
    const result = loadWebState();
    expect(result).toEqual({
      anthropic: { lastChecked: "", seenUrls: {} },
      openai: { lastChecked: "", seenUrls: {} },
    });
  });

  it("reads from digests/web-state.json", () => {
    mockReadFileSync.mockReturnValue("{}");
    loadWebState();
    expect(mockReadFileSync).toHaveBeenCalledWith(expect.stringContaining("web-state.json"), "utf-8");
  });
});
