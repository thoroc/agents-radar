import { describe, expect, it } from "vitest";
import { buildSourceHeader } from "./build-source-header";

describe("buildSourceHeader", () => {
  const base = {
    lang: "en-US" as const,
    dateStr: "2026-01-01",
    utcStr: "12:00",
    title: "Hacker News",
    sourceLabel: "HN",
    sourceUrl: "https://news.ycombinator.com/",
    count: "30 stories",
  };

  it("includes title and date in h1", () => {
    const result = buildSourceHeader(...(Object.values(base) as Parameters<typeof buildSourceHeader>));
    expect(result).toMatch(/^# Hacker News 2026-01-01/);
  });

  it("includes source label and url", () => {
    const result = buildSourceHeader(...(Object.values(base) as Parameters<typeof buildSourceHeader>));
    expect(result).toContain("[HN](https://news.ycombinator.com/)");
  });

  it("includes count and UTC marker", () => {
    const result = buildSourceHeader(...(Object.values(base) as Parameters<typeof buildSourceHeader>));
    expect(result).toContain("30 stories");
    expect(result).toContain("UTC");
  });

  it("appends extraMeta when provided", () => {
    const result = buildSourceHeader(
      base.lang,
      base.dateStr,
      base.utcStr,
      base.title,
      base.sourceLabel,
      base.sourceUrl,
      base.count,
      "extra info",
    );
    expect(result).toContain("| extra info");
  });

  it("omits extraMeta separator when not provided", () => {
    const result = buildSourceHeader(...(Object.values(base) as Parameters<typeof buildSourceHeader>));
    expect(result).not.toContain("extra info");
  });
});
