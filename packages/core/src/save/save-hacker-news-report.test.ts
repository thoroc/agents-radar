import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as saveDataSourceReportModule from "./save-data-source-report";
import { saveHackerNewsReport } from "./save-hacker-news-report";

describe("saveHnReport", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(saveDataSourceReportModule, "saveDataSourceReport").mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const data = {
    stories: [
      {
        id: "1",
        title: "AI Story",
        url: "https://example.com/ai",
        hnUrl: "https://news.ycombinator.com/item?id=1",
        points: 100,
        comments: 25,
        author: "test",
        createdAt: "2026-01-01T00:00:00Z",
      },
    ],
    fetchSuccess: true,
  };

  it("calls saveDataSourceReport with hn config", async () => {
    await saveHackerNewsReport(data as never, "2026-01-01T00:00:00Z", "2026-01-01", "", "\nfooter", "en-US");

    expect(saveDataSourceReportModule.saveDataSourceReport).toHaveBeenCalledOnce();
    const opts = (saveDataSourceReportModule.saveDataSourceReport as ReturnType<typeof vi.fn>).mock
      .calls[0]![0] as Record<string, unknown>;

    expect(opts.fileName).toBe("ai-hn");
    expect(opts.hasData).toBe(true);
    expect(opts.logPrefix).toBe("hn");
    expect(opts.logAction).toBe("HN");
    expect(opts.data).toEqual(data);
    expect(typeof opts.promptBuilder).toBe("function");
    expect(typeof opts.headerBuilder).toBe("function");
  });

  it("skips when fetchSuccess is false", async () => {
    const noData = { stories: [], fetchSuccess: false };

    await saveHackerNewsReport(noData as never, "2026-01-01T00:00:00Z", "2026-01-01", "", "", "zh-CN");

    expect(saveDataSourceReportModule.saveDataSourceReport).toHaveBeenCalledOnce();
    const opts = (saveDataSourceReportModule.saveDataSourceReport as ReturnType<typeof vi.fn>).mock
      .calls[0]![0] as Record<string, unknown>;
    expect(opts.hasData).toBe(false);
  });

  it("promptBuilder and headerBuilder return strings", async () => {
    await saveHackerNewsReport(data as never, "2026-01-01T00:00:00Z", "2026-01-01", "", "\nfooter", "en-US");
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
