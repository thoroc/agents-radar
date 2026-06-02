import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as fetchersModule from "../fetchers";
import * as saveReportModule from "./save-report";

import { saveWebReport } from "./save-web-report";

describe("saveWebReport", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(saveReportModule, "saveReport").mockResolvedValue(undefined);
    vi.spyOn(fetchersModule, "saveWebState").mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
          title: "Anthropic News",
          content: "Some content about Anthropic updates",
          date: "2026-01-01",
          lastmod: "2026-01-01",
          site: "anthropic" as const,
          category: "blog",
        },
      ],
      totalDiscovered: 1,
    },
    {
      site: "openai" as const,
      siteName: "OpenAI",
      isFirstRun: false,
      newItems: [],
      totalDiscovered: 0,
    },
  ];

  it("skips LLM call when no new content", async () => {
    await saveWebReport([], webState, "utc", "2026-01-01", "", "footer", "zh-CN");
    expect(saveReportModule.saveReport).not.toHaveBeenCalled();
  });

  it("calls saveReport when there is new content", async () => {
    await saveWebReport(webResultsWithContent, webState, "utc", "2026-01-01", "", "footer", "zh-CN");
    expect(saveReportModule.saveReport).toHaveBeenCalled();
  });

  it("saves web state after processing", async () => {
    await saveWebReport(webResultsWithContent, webState, "utc", "2026-01-01", "", "footer", "en-US");
    expect(fetchersModule.saveWebState).toHaveBeenCalled();
  });
});
