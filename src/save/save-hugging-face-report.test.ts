import { beforeEach, describe, expect, it, vi } from "vitest";

const mockSaveDataSourceReport = vi.fn();
vi.mock("./save-data-source-report", () => ({
  saveDataSourceReport: mockSaveDataSourceReport,
  buildSourceHeader: vi.fn(),
}));

import { saveHuggingFaceReport } from "./save-hugging-face-report";

describe("saveHuggingFaceReport", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const data = {
    models: [
      {
        id: "meta-llama/Llama-3.1-8B",
        author: "meta-llama",
        likes: 1000,
        downloads: 50000,
        tags: ["nlp", "llama"],
        pipelineTag: "text-generation",
        lastModified: "2026-01-01T00:00:00Z",
        url: "https://huggingface.co/meta-llama/Llama-3.1-8B",
      },
    ],
    fetchSuccess: true,
  };

  it("calls saveDataSourceReport with hugging face config", async () => {
    await saveHuggingFaceReport(data as never, "2026-01-01T00:00:00Z", "2026-01-01", "", "\nfooter", "en");

    expect(mockSaveDataSourceReport).toHaveBeenCalledOnce();
    const opts = mockSaveDataSourceReport.mock.calls[0]![0] as Record<string, unknown>;

    expect(opts.fileName).toBe("ai-hf");
    expect(opts.hasData).toBe(true);
    expect(opts.logPrefix).toBe("hf");
    expect(opts.logAction).toBe("Hugging Face");
    expect(opts.data).toEqual(data);
    expect(typeof opts.promptBuilder).toBe("function");
    expect(typeof opts.headerBuilder).toBe("function");
  });

  it("skips when fetchSuccess is false", async () => {
    const noData = { models: [], fetchSuccess: false };

    await saveHuggingFaceReport(noData as never, "2026-01-01T00:00:00Z", "2026-01-01", "", "", "zh");

    expect(mockSaveDataSourceReport).toHaveBeenCalledOnce();
    const opts = mockSaveDataSourceReport.mock.calls[0]![0] as Record<string, unknown>;
    expect(opts.hasData).toBe(false);
  });
});
