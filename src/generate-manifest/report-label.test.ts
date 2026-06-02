import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as utilsModule from "../utils";

import { reportLabel } from "./report-label";

describe("reportLabel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(utilsModule, "t").mockImplementation(
      (_lang) =>
        ({
          reportLabelAiCliEn: "AI CLI (EN)",
          reportLabelAiAgentsEn: "AI Agents (EN)",
          reportLabelAiHnEn: "HN (EN)",
          reportLabelAiCli: "AI CLI",
          reportLabelAiAgents: "AI Agents",
          reportLabelAiHn: "HN",
        }) as ReturnType<typeof utilsModule.t>,
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
