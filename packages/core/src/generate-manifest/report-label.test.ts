import { beforeEach, describe, expect, it, vi } from "vitest";

// Read real locale data for zh-CN and en-US to avoid breaking downstream tests
const ZH_LOCALE = JSON.parse(require("node:fs").readFileSync("locales/zh-CN.json", "utf-8"));
const EN_LOCALE = JSON.parse(require("node:fs").readFileSync("locales/en-US.json", "utf-8"));

vi.mock("../utils", () => ({
  t: (lang: string) => (lang === "en-US" ? EN_LOCALE : ZH_LOCALE),
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

  it("returns en label for ai-cli.en-US", () => {
    expect(reportLabel("ai-cli.en-US")).toBe(EN_LOCALE.reportLabelAiCli);
  });

  it("returns en label for ai-hn.en-US", () => {
    expect(reportLabel("ai-hn.en-US")).toBe(EN_LOCALE.reportLabelAiHackerNews);
  });

  it("returns the id itself for unknown values", () => {
    expect(reportLabel("unknown-id")).toBe("unknown-id");
  });
});
