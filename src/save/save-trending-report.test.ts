import { beforeEach, describe, expect, it, vi } from "vitest";

const mockSaveReport = vi.fn();
vi.mock("./save-report", () => ({
  saveReport: mockSaveReport,
  defaultDeps: {},
}));

import { saveTrendingReport } from "./save-trending-report";

describe("saveTrendingReport", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const data = {
    trendingRepos: [
      {
        fullName: "user/repo",
        description: "A trending repo",
        language: "TypeScript",
        todayStars: 100,
        totalStars: 5000,
        forks: 200,
        url: "https://github.com/user/repo",
      },
    ],
    searchRepos: [],
    trendingFetchSuccess: true,
  };

  it("calls saveReport with trending config when data available", async () => {
    await saveTrendingReport(
      data as never,
      "trending summary",
      "2026-01-01T00:00:00Z",
      "2026-01-01",
      "",
      "\nfooter",
      "en",
    );

    expect(mockSaveReport).toHaveBeenCalledOnce();
    const config = mockSaveReport.mock.calls[0]![0] as Record<string, unknown>;
    expect(config.fileName).toBe("ai-trending");
    expect(typeof config.promptBuilder).toBe("function");
    expect(typeof config.headerBuilder).toBe("function");
  });

  it("skips when no data available", async () => {
    const emptyData = { trendingRepos: [], searchRepos: [], trendingFetchSuccess: false };

    await saveTrendingReport(emptyData as never, "", "2026-01-01T00:00:00Z", "2026-01-01", "", "", "zh");

    expect(mockSaveReport).not.toHaveBeenCalled();
  });
});
