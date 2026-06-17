import fs from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { saveWebState } from "./save-web-state";
import type { WebState } from "./web-state-types";

let mockMkdirSync: ReturnType<typeof vi.spyOn>;
let mockWriteFileSync: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  vi.restoreAllMocks();
  mockMkdirSync = vi.spyOn(fs, "mkdirSync").mockReturnValue(undefined as never);
  mockWriteFileSync = vi.spyOn(fs, "writeFileSync").mockReturnValue(undefined as never);
});

describe("saveWebState", () => {
  const testState: WebState = {
    anthropic: { lastChecked: "2026-05-30T00:00:00.000Z", seenUrls: { "https://example.com": "seen" } },
    openai: { lastChecked: "", seenUrls: {} },
  };

  it("creates digests directory if needed", () => {
    saveWebState(testState);
    expect(mockMkdirSync).toHaveBeenCalledWith(expect.stringContaining("assets/digests"), {
      recursive: true,
    });
  });

  it("writes state as formatted JSON to digests/web-state.json", () => {
    saveWebState(testState);
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      expect.stringContaining("web-state.json"),
      JSON.stringify(testState, null, 2),
      "utf-8",
    );
  });

  it("writes state for empty state too", () => {
    const empty: WebState = {
      anthropic: { lastChecked: "", seenUrls: {} },
      openai: { lastChecked: "", seenUrls: {} },
    };
    saveWebState(empty);
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      expect.stringContaining("web-state.json"),
      JSON.stringify(empty, null, 2),
      "utf-8",
    );
  });

  it("calls mkdirSync only once per save", () => {
    saveWebState(testState);
    expect(mockMkdirSync).toHaveBeenCalledTimes(1);
  });

  it("calls writeFileSync only once per save", () => {
    saveWebState(testState);
    expect(mockWriteFileSync).toHaveBeenCalledTimes(1);
  });
});
