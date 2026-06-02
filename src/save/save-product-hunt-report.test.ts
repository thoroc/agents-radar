import { beforeEach, describe, expect, it, vi } from "vitest";

const mockSaveDataSourceReport = vi.fn();
vi.mock("./save-data-source-report", () => ({
  saveDataSourceReport: mockSaveDataSourceReport,
  buildSourceHeader: vi.fn(),
}));

import { saveProductHuntReport } from "./save-product-hunt-report";

describe("saveProductHuntReport", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
    await saveProductHuntReport(data as never, "2026-01-01T00:00:00Z", "2026-01-01", "", "\nfooter", "en");

    expect(mockSaveDataSourceReport).toHaveBeenCalledOnce();
    const opts = mockSaveDataSourceReport.mock.calls[0]![0] as Record<string, unknown>;

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

    await saveProductHuntReport(noData as never, "2026-01-01T00:00:00Z", "2026-01-01", "", "", "zh");

    expect(mockSaveDataSourceReport).toHaveBeenCalledOnce();
    const opts = mockSaveDataSourceReport.mock.calls[0]![0] as Record<string, unknown>;
    expect(opts.hasData).toBe(false);
  });
});
