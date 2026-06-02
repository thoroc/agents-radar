import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as githubModule from "../github";
import * as autoGenFooterModule from "../report/auto-gen-footer";
import * as callLlmModule from "../report/call-llm";
import * as saveFileModule from "../report/save-file";
import * as utilsModule from "../utils";
import * as getEnabledLangsModule from "../utils/get-enabled-langs";
import * as loadConfigModule from "../utils/load-config";
import * as generateRollupHighlightsModule from "./generate-rollup-highlights";
import * as getDateDirsModule from "./get-date-dirs";
import * as readDailyDigestModule from "./read-daily-digest";
import { runWeeklyRollup } from "./run-weekly-rollup";
import * as weekStrModule from "./week-str";

describe("runWeeklyRollup", () => {
  beforeEach(() => {
    vi.spyOn(callLlmModule, "callLlm").mockResolvedValue("mocked summary");
    vi.spyOn(saveFileModule, "saveFile").mockReturnValue("digests/2026-03-09/report.md");
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
      languages: ["en", "zh"],
      defaultPrimaryLanguage: "en",
      defaultFallbackLanguage: "en",
    } as never);
    vi.spyOn(getEnabledLangsModule, "getEnabledLangs").mockReturnValue(["zh", "en"]);
    vi.spyOn(getDateDirsModule, "getDateDirs").mockReturnValue(["2026-03-09", "2026-03-02"]);
    vi.spyOn(readDailyDigestModule, "readDailyDigest").mockReturnValue("daily content");
    vi.spyOn(generateRollupHighlightsModule, "generateRollupHighlights").mockResolvedValue({} as never);
    vi.spyOn(weekStrModule, "toWeekStr").mockReturnValue("2026-W11");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("generates weekly rollup with digest content", async () => {
    await runWeeklyRollup("owner/repo");

    expect(callLlmModule.callLlm).toHaveBeenCalled();
    expect(saveFileModule.saveFile).toHaveBeenCalled();
  });

  it("handles missing previous week gracefully", async () => {
    vi.clearAllMocks();
    vi.spyOn(getDateDirsModule, "getDateDirs").mockReturnValue([]);

    await expect(runWeeklyRollup("owner/repo")).resolves.toBeUndefined();
  });
});
