import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as saveDataSourceReportModule from "./save-data-source-report";
import { saveHuggingFaceReport } from "./save-hugging-face-report";

describe("saveHuggingFaceReport", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(saveDataSourceReportModule, "saveDataSourceReport").mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
    await saveHuggingFaceReport(data as never, "2026-01-01T00:00:00Z", "2026-01-01", "", "\nfooter", "en-US");

    expect(saveDataSourceReportModule.saveDataSourceReport).toHaveBeenCalledOnce();
    const opts = (saveDataSourceReportModule.saveDataSourceReport as ReturnType<typeof vi.fn>).mock
      .calls[0]![0] as Record<string, unknown>;

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

    await saveHuggingFaceReport(noData as never, "2026-01-01T00:00:00Z", "2026-01-01", "", "", "zh-CN");

    expect(saveDataSourceReportModule.saveDataSourceReport).toHaveBeenCalledOnce();
    const opts = (saveDataSourceReportModule.saveDataSourceReport as ReturnType<typeof vi.fn>).mock
      .calls[0]![0] as Record<string, unknown>;
    expect(opts.hasData).toBe(false);
  });

  it("promptBuilder and headerBuilder return strings", async () => {
    await saveHuggingFaceReport(data as never, "2026-01-01T00:00:00Z", "2026-01-01", "", "\nfooter", "en-US");
    const opts = (saveDataSourceReportModule.saveDataSourceReport as ReturnType<typeof vi.fn>).mock
      .calls[0]![0] as Record<string, unknown>;
    const prompt = (opts.promptBuilder as (d: unknown) => string)(data);
    const header = (opts.headerBuilder as (ds: string, us: string) => string)(
      "2026-01-01",
      "2026-01-01T00:00:00Z",
    );
    expect(typeof prompt).toBe("string");
    expect(typeof header).toBe("string");
  });
});
