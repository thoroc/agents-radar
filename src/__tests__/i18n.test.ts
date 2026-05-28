import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { t, validateLocale, SUPPORTED_LOCALES, LANGUAGE_NAMES } from "../i18n.ts";
import { LocaleFileSchema } from "../locale-schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("t()", () => {
  it("returns zh and en strings for all major report fields", () => {
    const keys = [
      "noActivity",
      "cliTitle",
      "cliComparison",
      "cliDetail",
      "openclawTitle",
      "openclawDeepDive",
      "openclawPeers",
      "webTitle",
      "trendingTitle",
      "hnTitle",
      "phTitle",
      "arxivTitle",
      "hfTitle",
      "communityTitle",
      "weeklyTitle",
      "monthlyTitle",
    ] as const;
    for (const key of keys) {
      expect(t("zh")[key]).toBeTruthy();
      expect(t("en")[key]).toBeTruthy();
      expect(t("zh")[key]).not.toBe(t("en")[key]);
    }
  });

  it("returns footer strings", () => {
    expect(t("zh").autoGen).toContain("本日报由");
    expect(t("en").autoGen).toContain("auto-generated");
  });

  it("returns issue label keys", () => {
    expect(t("zh").issueLabelCli).toBe("digest");
    expect(t("en").issueLabelCli).toBe("digest-en");
    expect(t("zh").issueLabelOpenclaw).toBe("openclaw");
    expect(t("en").issueLabelTrending).toBe("trending-en");
    expect(t("en").issueLabelHn).toBe("hn-en");
  });

  it("returns issue title strings without date", () => {
    expect(t("zh").issueTitleCli).toContain("AI CLI");
    expect(t("en").issueTitleCli).toContain("AI CLI Tools Digest");
    expect(t("zh").issueTitleWeb).toContain("官方");
    expect(t("en").issueTitleWeb).toContain("Official");
  });
});

describe("t() fallback", () => {
  it("returns English for unknown locale", () => {
    const result = t("xx");
    expect(result.cliTitle).toBeTruthy();
  });

  it("returns strings for empty string input", () => {
    const result = t("");
    expect(result.cliTitle).toBeTruthy();
  });

  it("does not crash on undefined", () => {
    const result = t();
    expect(result.cliTitle).toBeTruthy();
  });
});

describe("validateLocale", () => {
  it("returns the locale if supported", () => {
    expect(validateLocale("en")).toBe("en");
    expect(validateLocale("zh")).toBe("zh");
  });

  it("falls back to en for unsupported locale", () => {
    expect(validateLocale("xx")).toBe("en");
    expect(validateLocale("")).toBe("en");
  });
});

describe("SUPPORTED_LOCALES", () => {
  it("includes zh and en", () => {
    expect(SUPPORTED_LOCALES).toContain("en");
    expect(SUPPORTED_LOCALES).toContain("zh");
  });

  it("includes all 21 locales", () => {
    expect(SUPPORTED_LOCALES.length).toBeGreaterThanOrEqual(21);
  });
});

describe("LANGUAGE_NAMES", () => {
  it("maps locale codes to names", () => {
    expect(LANGUAGE_NAMES.en).toBe("English");
    expect(LANGUAGE_NAMES.zh).toBe("Chinese");
  });
});

describe("all locale files pass Zod schema", () => {
  const localesDir = path.resolve(__dirname, "../../locales");
  const files = fs.readdirSync(localesDir).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    const code = path.basename(file, ".json");
    it(`${code}.json validates against LocaleFileSchema`, () => {
      const raw = JSON.parse(fs.readFileSync(path.join(localesDir, file), "utf-8"));
      expect(() => LocaleFileSchema.parse(raw)).not.toThrow();
    });
  }
});

describe("notify label strings", () => {
  const NOTIFY_KEYS = [
    "notifyCli",
    "notifyAgents",
    "notifyWeb",
    "notifyTrending",
    "notifyHn",
    "notifyPh",
    "notifyArxiv",
    "notifyHf",
    "notifyCommunity",
    "notifyWeekly",
    "notifyMonthly",
  ] as const;

  for (const key of NOTIFY_KEYS) {
    it(`${key} has zh and en values`, () => {
      expect(t("zh")[key]).toBeTruthy();
      expect(t("en")[key]).toBeTruthy();
    });
  }
});

describe("report label strings", () => {
  const REPORT_LABEL_KEYS = [
    "reportLabelAiCli",
    "reportLabelAiAgents",
    "reportLabelAiWeb",
    "reportLabelAiTrending",
    "reportLabelAiHn",
    "reportLabelAiWeekly",
  ] as const;

  for (const key of REPORT_LABEL_KEYS) {
    it(`${key} in zh`, () => {
      expect(t("zh")[key]).toBeTruthy();
    });
    it(`${key} in en`, () => {
      expect(t("en")[key]).toBeTruthy();
    });
  }
});

describe("format items", () => {
  it("provide labels for GitHub item formatting", () => {
    expect(t("zh").formatItemAuthor).toBeTruthy();
    expect(t("en").formatItemAuthor).toBe("Author");
    expect(t("en").formatItemCreated).toBe("Created");
    expect(t("en").formatItemSummary).toBe("Summary");
    expect(t("en").sampleNote).toContain("total");
  });
});

describe("rollup strings", () => {
  it("provide weekly and monthly report labels", () => {
    expect(t("en").weeklyTitle).toContain("Weekly");
    expect(t("zh").weeklyTitle).toContain("周报");
    expect(t("en").monthlyTitle).toContain("Monthly");
    expect(t("zh").monthlyTitle).toContain("月报");
    expect(t("en").weeklyCoverage).toBe("Coverage");
    expect(t("zh").weeklyCoverage).toBe("覆盖日期");
  });
});

describe("truncation and error strings", () => {
  it("provide issue truncation message", () => {
    expect(t("en").issueTruncation).toContain("GitHub Issue");
    expect(t("zh").issueTruncation).toContain("GitHub Issue");
  });

  it("provide daily/weekly truncation markers", () => {
    expect(t("en").digestTruncation).toContain("truncated");
    expect(t("en").weeklyTruncation).toContain("truncated");
  });
});
