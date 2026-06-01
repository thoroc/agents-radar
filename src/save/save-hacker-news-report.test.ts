import { beforeEach, describe, expect, it, vi } from "vitest";

const mockSaveDataSourceReport = vi.fn();
vi.mock("./save-data-source-report", () => ({
  saveDataSourceReport: mockSaveDataSourceReport,
  buildSourceHeader: vi.fn(),
}));

import { saveHackerNewsReport } from "./save-hacker-news-report";

describe("saveHnReport", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
    await saveHackerNewsReport(data as never, "2026-01-01T00:00:00Z", "2026-01-01", "", "\nfooter", "en");

    expect(mockSaveDataSourceReport).toHaveBeenCalledOnce();
    const opts = mockSaveDataSourceReport.mock.calls[0]![0] as Record<string, unknown>;

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

    await saveHackerNewsReport(noData as never, "2026-01-01T00:00:00Z", "2026-01-01", "", "", "zh");

    expect(mockSaveDataSourceReport).toHaveBeenCalledOnce();
    const opts = mockSaveDataSourceReport.mock.calls[0]![0] as Record<string, unknown>;
    expect(opts.hasData).toBe(false);
  });
});
