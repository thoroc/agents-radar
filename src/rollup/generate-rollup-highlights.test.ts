import fs from "node:fs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as promptsModule from "../prompts";
import * as callLlmModule from "../report/call-llm";
import * as saveFileModule from "../report/save-file";

import { generateRollupHighlights } from "./generate-rollup-highlights";

describe("generateRollupHighlights", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(callLlmModule, "callLlm").mockResolvedValue('{"key": "value"}');
    vi.spyOn(saveFileModule, "saveFile").mockReturnValue("digests/2026-03-09/highlights.json");
    vi.spyOn(promptsModule, "buildHighlightsPrompt").mockReturnValue("prompt" as never);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls LLM for zh and en highlights", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);

    await generateRollupHighlights(
      { "zh-CN": "zh content", "en-US": "en content" },
      "ai-weekly",
      "2026-03-09",
      6,
      ["en-US", "zh-CN"],
    );

    expect(callLlmModule.callLlm).toHaveBeenCalledTimes(2);
    expect(promptsModule.buildHighlightsPrompt).toHaveBeenCalledTimes(2);
    expect(saveFileModule.saveFile).toHaveBeenCalledOnce();
  });

  it("merges with existing highlights when file exists", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify({ zh: { existing: "data" }, en: {} }));

    await generateRollupHighlights(
      { "zh-CN": "zh content", "en-US": "en content" },
      "ai-weekly",
      "2026-03-09",
      6,
      ["en-US", "zh-CN"],
    );

    expect(callLlmModule.callLlm).toHaveBeenCalledTimes(2);
    expect(saveFileModule.saveFile).toHaveBeenCalledOnce();
  });

  it("handles LLM failure gracefully", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    vi.spyOn(callLlmModule, "callLlm").mockRejectedValue(new Error("LLM error"));

    await expect(
      generateRollupHighlights(
        { "zh-CN": "zh content", "en-US": "en content" },
        "ai-weekly",
        "2026-03-09",
        6,
        ["en-US", "zh-CN"],
      ),
    ).resolves.toBeUndefined();
  });
});
