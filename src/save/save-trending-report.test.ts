import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as saveReportModule from "./save-report";
import { saveTrendingReport } from "./save-trending-report";

describe("saveTrendingReport", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(saveReportModule, "saveReport").mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
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

    expect(saveReportModule.saveReport).toHaveBeenCalledOnce();
    const config = (saveReportModule.saveReport as ReturnType<typeof vi.fn>).mock.calls[0]![0] as Record<
      string,
      unknown
    >;
    expect(config.fileName).toBe("ai-trending");
    expect(typeof config.promptBuilder).toBe("function");
    expect(typeof config.headerBuilder).toBe("function");
  });

  it("skips when no data available", async () => {
    const emptyData = { trendingRepos: [], searchRepos: [], trendingFetchSuccess: false };

    await saveTrendingReport(emptyData as never, "", "2026-01-01T00:00:00Z", "2026-01-01", "", "", "zh");

    expect(saveReportModule.saveReport).not.toHaveBeenCalled();
  });
});
