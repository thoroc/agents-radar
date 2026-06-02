import { beforeEach, describe, expect, it, vi } from "vitest";

// Read real locale data for zh and en to avoid breaking downstream tests
const ZH_LOCALE = JSON.parse(require("fs").readFileSync("locales/zh.json", "utf-8"));
const EN_LOCALE = JSON.parse(require("fs").readFileSync("locales/en.json", "utf-8"));

vi.mock("../utils", () => ({
  t: (lang: string) => (lang === "en" ? EN_LOCALE : ZH_LOCALE),
}));

import { reportLabel } from "./report-label";

describe("reportLabel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns zh label for ai-cli", () => {
    expect(reportLabel("ai-cli")).toBe(ZH_LOCALE.reportLabelAiCli);
  });

  it("returns zh label for ai-agents", () => {
    expect(reportLabel("ai-agents")).toBe(ZH_LOCALE.reportLabelAiAgents);
  });

  it("returns en label for ai-cli-en", () => {
    expect(reportLabel("ai-cli-en")).toBe(EN_LOCALE.reportLabelAiCliEn);
  });

  it("returns en label for ai-hn-en", () => {
    expect(reportLabel("ai-hn-en")).toBe(EN_LOCALE.reportLabelAiHnEn);
  });

  it("returns the id itself for unknown values", () => {
    expect(reportLabel("unknown-id")).toBe("unknown-id");
  });
});
