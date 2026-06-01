import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchHfData } from "./hf";

const sampleModel = {
  _id: "664d8f8a1a2b3c4d5e6f7a8b",
  id: "meta-llama/Llama-3.1-8B",
  author: "meta-llama",
  likes: 15200,
  downloads: 2500000,
  tags: ["llama", "transformer", "text-generation"],
  pipeline_tag: "text-generation",
  lastModified: "2026-05-30T12:00:00.000Z",
};

beforeEach(() => {
  vi.restoreAllMocks();
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [sampleModel],
  });
});

describe("fetchHfData", () => {
  it("returns parsed models on success", async () => {
    const result = await fetchHfData();
    expect(result.fetchSuccess).toBe(true);
    expect(result.models).toHaveLength(1);
    expect(result.models[0]!.id).toBe("meta-llama/Llama-3.1-8B");
    expect(result.models[0]!.author).toBe("meta-llama");
    expect(result.models[0]!.likes).toBe(15200);
    expect(result.models[0]!.downloads).toBe(2500000);
    expect(result.models[0]!.pipelineTag).toBe("text-generation");
    expect(result.models[0]!.tags).toContain("llama");
    expect(result.models[0]!.url).toBe("https://huggingface.co/meta-llama/Llama-3.1-8B");
  });

  it("returns empty models on fetch failure", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("Network error"));
    const result = await fetchHfData();
    expect(result.fetchSuccess).toBe(false);
    expect(result.models).toHaveLength(0);
  });

  it("returns empty models on HTTP error", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: async () => ({}),
    });
    const result = await fetchHfData();
    expect(result.fetchSuccess).toBe(false);
    expect(result.models).toHaveLength(0);
  });

  it("handles missing optional fields", async () => {
    const minimalModel = {
      _id: "abc123",
      id: "org/minimal-model",
      likes: 100,
      downloads: 5000,
    };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [minimalModel],
    });
    const result = await fetchHfData();
    expect(result.models).toHaveLength(1);
    expect(result.models[0]!.author).toBe("org");
    expect(result.models[0]!.tags).toEqual([]);
    expect(result.models[0]!.pipelineTag).toBe("");
    expect(result.models[0]!.lastModified).toBe("");
  });

  it("infers author from id when author is missing", async () => {
    const modelWithoutAuthor = {
      _id: "def456",
      id: "some-user/my-model",
      likes: 50,
      downloads: 1000,
      tags: [],
    };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [modelWithoutAuthor],
    });
    const result = await fetchHfData();
    expect(result.models[0]!.author).toBe("some-user");
  });

  it("returns fetchSuccess false when models array is empty", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    });
    const result = await fetchHfData();
    expect(result.fetchSuccess).toBe(false);
    expect(result.models).toHaveLength(0);
  });

  it("handles non-array response gracefully", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ error: "not an array" }),
    });
    const result = await fetchHfData();
    expect(result.fetchSuccess).toBe(false);
    expect(result.models).toHaveLength(0);
  });
});
