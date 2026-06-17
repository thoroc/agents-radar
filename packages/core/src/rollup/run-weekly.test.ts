import * as loadConfigModule from "@agents-radar/config";
import * as getEnabledLangsModule from "@agents-radar/locales";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as githubModule from "../github";
import * as autoGenFooterModule from "../report/auto-gen-footer";
import * as callLlmModule from "../report/call-llm";
import * as saveFileModule from "../report/save-file";
import * as utilsModule from "../utils";
import * as generateHighlightsModule from "./generate-highlights";
import * as getDateDirsModule from "./get-date-dirs";
import * as readDailyDigestModule from "./read-daily-digest";
import { runWeekly } from "./run-weekly";
import * as weekStrModule from "./week-str";

describe("runWeekly", () => {
  beforeEach(() => {
    vi.spyOn(callLlmModule, "callLlm").mockResolvedValue("mocked summary");
    vi.spyOn(saveFileModule, "saveFile").mockReturnValue("assets/digests/2026-03-09/report.md");
    vi.spyOn(autoGenFooterModule, "autoGenFooter").mockReturnValue("\n\n---\nfooter");
    vi.spyOn(githubModule, "createGitHubIssue").mockResolvedValue("https://github.com/owner/repo/issues/1");
    vi.spyOn(utilsModule, "t").mockReturnValue({
      weeklyTitle: "Weekly Report",
      weeklyCoverage: "Coverage",
      weeklyMeta: "> Coverage: {range} | Generated: {utcStr} UTC\n\n",
    } as never);
    vi.spyOn(utilsModule, "toCstDateStr").mockReturnValue("2026-03-09");
    vi.spyOn(utilsModule, "toUtcStr").mockReturnValue("2026-03-09 00:00:00");
    vi.spyOn(loadConfigModule, "loadConfig").mockReturnValue({
      languages: ["en-US", "zh-CN"],
      defaultPrimaryLanguage: "en-US",
      defaultFallbackLanguage: "en-US",
    } as never);
    vi.spyOn(getEnabledLangsModule, "getEnabledLangs").mockReturnValue(["zh-CN", "en-US"]);
    vi.spyOn(getDateDirsModule, "getDateDirs").mockReturnValue(["2026-03-09", "2026-03-02"]);
    vi.spyOn(readDailyDigestModule, "readDailyDigest").mockReturnValue("daily content");
    vi.spyOn(generateHighlightsModule, "generateHighlights").mockResolvedValue({} as never);
    vi.spyOn(weekStrModule, "toWeekStr").mockReturnValue("2026-W11");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("generates weekly rollup with digest content", async () => {
    await runWeekly("owner/repo");

    expect(callLlmModule.callLlm).toHaveBeenCalled();
    expect(saveFileModule.saveFile).toHaveBeenCalled();
  });

  it("handles missing previous week gracefully", async () => {
    vi.clearAllMocks();
    vi.spyOn(getDateDirsModule, "getDateDirs").mockReturnValue([]);

    await expect(runWeekly("owner/repo")).resolves.toBeUndefined();
  });
});
