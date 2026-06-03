import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { saveCommunityReport } from "./save-community-report";
import * as saveDataSourceReportModule from "./save-data-source-report";

describe("saveCommunityReport", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(saveDataSourceReportModule, "saveDataSourceReport").mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const devtoData = {
    articles: [
      {
        id: 1,
        title: "Dev Article",
        description: "desc",
        url: "https://dev.to/test",
        publishedAt: "2026-01-01T00:00:00Z",
        positiveReactionsCount: 10,
        commentsCount: 2,
        readingTimeMinutes: 5,
        tags: ["ai"],
        user: "author1",
      },
    ],
    fetchSuccess: true,
  };
  const lobstersData = {
    stories: [
      {
        title: "Lob Story",
        url: "https://lobste.rs/test",
        commentsUrl: "https://lobste.rs/test/comments",
        score: 50,
        commentCount: 5,
        author: "author2",
        publishedAt: "2026-01-01T00:00:00Z",
        tags: ["ai"],
      },
    ],
    fetchSuccess: true,
  };

  it("calls saveDataSourceReport with community config", async () => {
    await saveCommunityReport(
      devtoData as never,
      lobstersData as never,
      "2026-01-01T00:00:00Z",
      "2026-01-01",
      "",
      "\nfooter",
      "en-US",
    );

    expect(saveDataSourceReportModule.saveDataSourceReport).toHaveBeenCalledOnce();
    const opts = (saveDataSourceReportModule.saveDataSourceReport as ReturnType<typeof vi.fn>).mock
      .calls[0]![0] as Record<string, unknown>;

    expect(opts.fileName).toBe("ai-community");
    expect(opts.hasData).toBe(true);
    expect(opts.logPrefix).toBe("community");
    expect(opts.data).toEqual({ devto: devtoData, lobsters: lobstersData });
    expect(typeof opts.promptBuilder).toBe("function");
    expect(typeof opts.headerBuilder).toBe("function");
  });

  it("uses OR logic for hasData with both sources", async () => {
    const devtoFail = { articles: [], fetchSuccess: false };
    const lobstersOk = {
      stories: [
        {
          title: "Story",
          url: "https://lobste.rs/test",
          commentsUrl: "https://lobste.rs/test/comments",
          score: 10,
          commentCount: 1,
          author: "author",
          publishedAt: "2026-01-01T00:00:00Z",
          tags: ["ai"],
        },
      ],
      fetchSuccess: true,
    };

    await saveCommunityReport(
      devtoFail as never,
      lobstersOk as never,
      "2026-01-01T00:00:00Z",
      "2026-01-01",
      "",
      "",
      "zh-CN",
    );

    expect(saveDataSourceReportModule.saveDataSourceReport).toHaveBeenCalledOnce();
    const opts = (saveDataSourceReportModule.saveDataSourceReport as ReturnType<typeof vi.fn>).mock
      .calls[0]![0] as Record<string, unknown>;
    expect(opts.hasData).toBe(true);
  });

  it("uses OR logic for hasData — both fail", async () => {
    const devtoFail = { articles: [], fetchSuccess: false };
    const lobstersFail = { stories: [], fetchSuccess: false };

    await saveCommunityReport(
      devtoFail as never,
      lobstersFail as never,
      "2026-01-01T00:00:00Z",
      "2026-01-01",
      "",
      "",
      "zh-CN",
    );

    expect(saveDataSourceReportModule.saveDataSourceReport).toHaveBeenCalledOnce();
    const opts = (saveDataSourceReportModule.saveDataSourceReport as ReturnType<typeof vi.fn>).mock
      .calls[0]![0] as Record<string, unknown>;
    expect(opts.hasData).toBe(false);
  });

  it("promptBuilder and headerBuilder return strings", async () => {
    await saveCommunityReport(
      devtoData as never,
      lobstersData as never,
      "2026-01-01T00:00:00Z",
      "2026-01-01",
      "",
      "\nfooter",
      "en-US",
    );
    const opts = (saveDataSourceReportModule.saveDataSourceReport as ReturnType<typeof vi.fn>).mock
      .calls[0]![0] as Record<string, unknown>;
    const prompt = (opts.promptBuilder as (d: unknown) => string)({
      devto: devtoData,
      lobsters: lobstersData,
    });
    const header = (opts.headerBuilder as (ds: string, us: string) => string)(
      "2026-01-01",
      "2026-01-01T00:00:00Z",
    );
    expect(typeof prompt).toBe("string");
    expect(typeof header).toBe("string");
  });
});
