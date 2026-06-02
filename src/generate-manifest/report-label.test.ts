import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../utils", () => ({
  t: (lang: string) =>
    lang === "en"
      ? {
          reportLabelAiCliEn: "AI CLI (EN)",
          reportLabelAiAgentsEn: "AI Agents (EN)",
          reportLabelAiHnEn: "HN (EN)",
        }
      : {
          reportLabelAiCli: "AI CLI",
          reportLabelAiAgents: "AI Agents",
          reportLabelAiHn: "HN",
        },
}));

import { reportLabel } from "./report-label";

describe("reportLabel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns zh label for ai-cli", () => {
    expect(reportLabel("ai-cli")).toBe("AI CLI");
  });

  it("returns zh label for ai-agents", () => {
    expect(reportLabel("ai-agents")).toBe("AI Agents");
  });

  it("returns en label for ai-cli-en", () => {
    expect(reportLabel("ai-cli-en")).toBe("AI CLI (EN)");
  });

  it("returns en label for ai-hn-en", () => {
    expect(reportLabel("ai-hn-en")).toBe("HN (EN)");
  });

  it("returns the id itself for unknown values", () => {
    expect(reportLabel("unknown-id")).toBe("unknown-id");
  });
});
