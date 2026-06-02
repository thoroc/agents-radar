import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { saveArxivReport } from "./save-arxiv-report";
import * as saveDataSourceReportModule from "./save-data-source-report";

describe("saveArxivReport", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(saveDataSourceReportModule, "saveDataSourceReport").mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const data = {
    papers: [
      {
        id: "2401.00001",
        title: "Test Paper",
        summary: "A test paper",
        authors: ["Author One"],
        published: "2026-01-01T00:00:00Z",
        updated: "2026-01-01T00:00:00Z",
        categories: ["cs.AI"],
        url: "https://arxiv.org/abs/2401.00001",
        pdfUrl: "https://arxiv.org/pdf/2401.00001",
      },
    ],
    fetchSuccess: true,
  };

  it("calls saveDataSourceReport with arxiv config", async () => {
    await saveArxivReport(data as never, "2026-01-01T00:00:00Z", "2026-01-01", "", "\nfooter", "en-US");

    expect(saveDataSourceReportModule.saveDataSourceReport).toHaveBeenCalledOnce();
    const opts = (saveDataSourceReportModule.saveDataSourceReport as ReturnType<typeof vi.fn>).mock
      .calls[0]![0] as Record<string, unknown>;

    expect(opts.fileName).toBe("ai-arxiv");
    expect(opts.hasData).toBe(true);
    expect(opts.logPrefix).toBe("arxiv");
    expect(opts.logAction).toBe("ArXiv");
    expect(opts.data).toEqual(data);
    expect(typeof opts.promptBuilder).toBe("function");
    expect(typeof opts.headerBuilder).toBe("function");
  });

  it("skips when fetchSuccess is false", async () => {
    const noData = { papers: [], fetchSuccess: false };

    await saveArxivReport(noData as never, "2026-01-01T00:00:00Z", "2026-01-01", "", "", "zh-CN");

    expect(saveDataSourceReportModule.saveDataSourceReport).toHaveBeenCalledOnce();
    const opts = (saveDataSourceReportModule.saveDataSourceReport as ReturnType<typeof vi.fn>).mock
      .calls[0]![0] as Record<string, unknown>;
    expect(opts.hasData).toBe(false);
  });
});
