import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as saveDataSourceReportModule from "./save-data-source-report";
import { saveProductHuntReport } from "./save-product-hunt-report";

describe("saveProductHuntReport", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(saveDataSourceReportModule, "saveDataSourceReport").mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const data = {
    products: [
      {
        id: "123",
        name: "AI Product",
        tagline: "An AI-powered product",
        url: "https://www.producthunt.com/posts/ai-product",
        website: "https://ai-product.example.com",
        votesCount: 500,
        commentsCount: 50,
        createdAt: "2026-01-01T00:00:00Z",
        topics: ["ai", "productivity"],
      },
    ],
    fetchSuccess: true,
  };

  it("calls saveDataSourceReport with product hunt config", async () => {
    await saveProductHuntReport(data as never, "2026-01-01T00:00:00Z", "2026-01-01", "", "\nfooter", "en-US");

    expect(saveDataSourceReportModule.saveDataSourceReport).toHaveBeenCalledOnce();
    const opts = (saveDataSourceReportModule.saveDataSourceReport as ReturnType<typeof vi.fn>).mock
      .calls[0]![0] as Record<string, unknown>;

    expect(opts.fileName).toBe("ai-ph");
    expect(opts.hasData).toBe(true);
    expect(opts.logPrefix).toBe("ph");
    expect(opts.logAction).toBe("Product Hunt");
    expect(opts.data).toEqual(data);
    expect(typeof opts.promptBuilder).toBe("function");
    expect(typeof opts.headerBuilder).toBe("function");
  });

  it("skips when fetchSuccess is false", async () => {
    const noData = { products: [], fetchSuccess: false };

    await saveProductHuntReport(noData as never, "2026-01-01T00:00:00Z", "2026-01-01", "", "", "zh-CN");

    expect(saveDataSourceReportModule.saveDataSourceReport).toHaveBeenCalledOnce();
    const opts = (saveDataSourceReportModule.saveDataSourceReport as ReturnType<typeof vi.fn>).mock
      .calls[0]![0] as Record<string, unknown>;
    expect(opts.hasData).toBe(false);
  });

  it("promptBuilder and headerBuilder return strings", async () => {
    await saveProductHuntReport(data as never, "2026-01-01T00:00:00Z", "2026-01-01", "", "\nfooter", "en-US");
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
