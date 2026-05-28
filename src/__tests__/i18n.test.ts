import { describe, it, expect } from "vitest";
import { t } from "../i18n.ts";

describe("t() returns localized strings", () => {
  const en = t("en");
  const zh = t("zh");

  it("provides zh and en for all major string keys", () => {
    const keys = ["noActivity", "cliTitle", "openclawTitle", "webTitle", "trendingTitle", "hnTitle"] as const;
    for (const key of keys) {
      expect(zh[key]).toBeTruthy();
      expect(en[key]).toBeTruthy();
      expect(zh[key]).not.toBe(en[key]);
    }
  });

  it("returns autoGen (footer) in both languages", () => {
    expect(zh.autoGen).toContain("本日报由");
    expect(en.autoGen).toContain("auto-generated");
  });

  it("returns issue label keys", () => {
    expect(zh.issueLabelCli).toBe("digest");
    expect(en.issueLabelCli).toBe("digest-en");
    expect(zh.issueLabelOpenclaw).toBe("openclaw");
    expect(en.issueLabelTrending).toBe("trending-en");
    expect(en.issueLabelHn).toBe("hn-en");
  });
});

describe("notify labels via t()", () => {
  const ALL_NOTIFY_KEYS = [
    "notifyCli", "notifyAgents", "notifyWeb", "notifyTrending", "notifyHn",
    "notifyPh", "notifyArxiv", "notifyHf", "notifyCommunity", "notifyWeekly", "notifyMonthly",
  ] as const;

  it("covers all report types in both languages", () => {
    const en = t("en");
    const zh = t("zh");
    for (const key of ALL_NOTIFY_KEYS) {
      expect(zh[key]).toBeTruthy();
      expect(en[key]).toBeTruthy();
    }
  });
});

describe("report labels via t()", () => {
  it("returns display names for all report types", () => {
    const en = t("en");
    const zh = t("zh");
    expect(zh.reportLabelAiCli).toContain("AI CLI");
    expect(en.reportLabelAiCliEn).toContain("AI CLI Tools Digest");
    expect(zh.reportLabelAiWeekly).toContain("周报");
    expect(en.reportLabelAiMonthlyEn).toContain("Monthly");
  });
});

describe("issue title fields in t()", () => {
  it("include emoji + topic", () => {
    const en = t("en");
    const zh = t("zh");
    expect(zh.issueTitleCli).toContain("AI CLI");
    expect(en.issueTitleCli).toContain("AI CLI Tools Digest");
  });
});
