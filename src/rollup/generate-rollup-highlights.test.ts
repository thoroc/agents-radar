import fs from "node:fs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockCallLlm = vi.fn();
const mockSaveFile = vi.fn();
const mockBuildHighlightsPrompt = vi.fn();
vi.mock("../report/call-llm", () => ({ callLlm: mockCallLlm }));
vi.mock("../report/save-file", () => ({ saveFile: mockSaveFile }));
vi.mock("../prompts", () => ({ buildHighlightsPrompt: mockBuildHighlightsPrompt }));

import { generateRollupHighlights } from "./generate-rollup-highlights";

describe("generateRollupHighlights", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCallLlm.mockResolvedValue('{"key": "value"}');
    mockSaveFile.mockReturnValue("digests/2026-03-09/highlights.json");
    mockBuildHighlightsPrompt.mockReturnValue("prompt");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls LLM for zh and en highlights", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);

    await generateRollupHighlights("zh content", "en content", "ai-weekly", "2026-03-09", 6);

    expect(mockCallLlm).toHaveBeenCalledTimes(2);
    expect(mockBuildHighlightsPrompt).toHaveBeenCalledTimes(2);
    expect(mockSaveFile).toHaveBeenCalledOnce();
  });

  it("merges with existing highlights when file exists", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify({ zh: { existing: "data" }, en: {} }));

    await generateRollupHighlights("zh content", "en content", "ai-weekly", "2026-03-09", 6);

    expect(mockCallLlm).toHaveBeenCalledTimes(2);
    expect(mockSaveFile).toHaveBeenCalledOnce();
  });

  it("handles LLM failure gracefully", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    mockCallLlm.mockRejectedValue(new Error("LLM error"));

    await expect(
      generateRollupHighlights("zh content", "en content", "ai-weekly", "2026-03-09", 6),
    ).resolves.toBeUndefined();
  });
});
