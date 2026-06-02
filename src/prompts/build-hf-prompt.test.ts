import { describe, expect, it } from "vitest";
import type { HuggingFaceData, HuggingFaceModel } from "../fetchers/hugging-face";
import { buildHuggingFacePrompt } from "./build-hf-prompt";

const makeModel = (overrides: Partial<HuggingFaceModel> = {}): HuggingFaceModel => ({
  id: "meta-llama/Llama-3.1-8B",
  author: "meta",
  likes: 15000,
  downloads: 500000,
  tags: ["llm", "text-generation", "transformer", "pytorch", "safetensors"],
  pipelineTag: "text-generation",
  lastModified: "2026-03-09T00:00:00Z",
  url: "https://huggingface.co/meta-llama/Llama-3.1-8B",
  ...overrides,
});

const makeData = (overrides: Partial<HuggingFaceData> = {}): HuggingFaceData => ({
  models: [makeModel()],
  fetchSuccess: true,
  ...overrides,
});

describe("buildHuggingFacePrompt", () => {
  it("includes model details in default locale", () => {
    const result = buildHuggingFacePrompt(makeData(), "2026-03-09");
    expect(result).toContain("Hugging Face Trending Models Digest");
    expect(result).toContain("meta-llama/Llama-3.1-8B");
    expect(result).toContain("meta");
    expect(result).toContain("15,000");
    expect(result).toContain("500,000");
    expect(result).toContain("2026-03-09");
    expect(result).toContain("Write the response in Chinese");
  });

  it("generates English variant", () => {
    const result = buildHuggingFacePrompt(makeData(), "2026-03-09", "en");
    expect(result).toContain("Hugging Face Trending Models Digest");
    expect(result).toContain("Likes:");
    expect(result).toContain("Downloads:");
    expect(result).toContain("Pipeline:");
    expect(result).toContain("Write the response in English");
  });

  it("handles pipelineTag being undefined", () => {
    const data = makeData({ models: [makeModel({ pipelineTag: "" })] });
    const result = buildHuggingFacePrompt(data, "2026-03-09");
    expect(result).toContain("N/A");
  });

  it("handles multiple models", () => {
    const data = makeData({
      models: [makeModel({ id: "model-one", likes: 100 }), makeModel({ id: "model-two", likes: 50 })],
    });
    const result = buildHuggingFacePrompt(data, "2026-03-09");
    expect(result).toContain("model-one");
    expect(result).toContain("model-two");
    expect(result).toContain("2 models");
  });
});
