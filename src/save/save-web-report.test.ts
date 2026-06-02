import { beforeEach, describe, expect, it, vi } from "vitest";

const mockSaveReport = vi.fn();
vi.mock("./save-report", () => ({
  saveReport: mockSaveReport,
  defaultDeps: {},
}));

const mockSaveWebState = vi.fn();
vi.mock("../fetchers", () => ({
  saveWebState: mockSaveWebState,
}));

import { saveWebReport } from "./save-web-report";

describe("saveWebReport", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const webState = {
    anthropic: { lastChecked: "2026-01-01T00:00:00Z", seenUrls: {} },
    openai: { lastChecked: "2026-01-01T00:00:00Z", seenUrls: {} },
  };

  const webResultsWithContent = [
    {
      site: "anthropic" as const,
      siteName: "Anthropic",
      isFirstRun: false,
      newItems: [
        {
          url: "https://anthropic.com/news",
          title: "News",
          lastmod: "2026-01-01",
          content: "content",
          site: "anthropic" as const,
          category: "blog",
        },
      ],
      totalDiscovered: 10,
    },
    {
      site: "openai" as const,
      siteName: "OpenAI",
      isFirstRun: false,
      newItems: [],
      totalDiscovered: 5,
    },
  ];

  const webResultsEmpty = [
    {
      site: "anthropic" as const,
      siteName: "Anthropic",
      isFirstRun: false,
      newItems: [],
      totalDiscovered: 10,
    },
    {
      site: "openai" as const,
      siteName: "OpenAI",
      isFirstRun: false,
      newItems: [],
      totalDiscovered: 5,
    },
  ];

  it("calls saveReport with web config when new content exists", async () => {
    await saveWebReport(
      webResultsWithContent as never,
      webState as never,
      "2026-01-01T00:00:00Z",
      "2026-01-01",
      "",
      "\nfooter",
      "en",
    );

    expect(mockSaveReport).toHaveBeenCalledOnce();
    const config = mockSaveReport.mock.calls[0]![0] as Record<string, unknown>;
    expect(config.fileName).toBe("ai-web");
    expect(typeof config.promptBuilder).toBe("function");
    expect(typeof config.headerBuilder).toBe("function");
  });

  it("skips saveReport when no new content", async () => {
    await saveWebReport(
      webResultsEmpty as never,
      webState as never,
      "2026-01-01T00:00:00Z",
      "2026-01-01",
      "",
      "",
      "en",
    );

    expect(mockSaveReport).not.toHaveBeenCalled();
  });

  it("saves web state for zh locale after successful report", async () => {
    await saveWebReport(
      webResultsWithContent as never,
      webState as never,
      "2026-01-01T00:00:00Z",
      "2026-01-01",
      "",
      "",
      "zh",
    );

    expect(mockSaveReport).toHaveBeenCalledOnce();
    expect(mockSaveWebState).toHaveBeenCalledWith(webState);
  });

  it("saves web state for zh locale even when no new content", async () => {
    await saveWebReport(
      webResultsEmpty as never,
      webState as never,
      "2026-01-01T00:00:00Z",
      "2026-01-01",
      "",
      "",
      "zh",
    );

    expect(mockSaveReport).not.toHaveBeenCalled();
    expect(mockSaveWebState).toHaveBeenCalledWith(webState);
  });

  it("does not save web state for non-zh locale", async () => {
    await saveWebReport(
      webResultsEmpty as never,
      webState as never,
      "2026-01-01T00:00:00Z",
      "2026-01-01",
      "",
      "",
      "en",
    );

    expect(mockSaveReport).not.toHaveBeenCalled();
    expect(mockSaveWebState).not.toHaveBeenCalled();
  });

  it("handles saveReport error gracefully", async () => {
    mockSaveReport.mockRejectedValueOnce(new Error("LLM error"));

    await expect(
      saveWebReport(
        webResultsWithContent as never,
        webState as never,
        "2026-01-01T00:00:00Z",
        "2026-01-01",
        "",
        "",
        "zh",
      ),
    ).resolves.toBeUndefined();
  });
});
