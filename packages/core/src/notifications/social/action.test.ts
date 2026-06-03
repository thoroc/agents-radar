import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as callLlmModule from "../../report/call-llm";

vi.mock("@dotenvx/dotenvx", () => ({
  default: { config: vi.fn() },
}));

import { socialAction } from "./action";

describe("socialAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(callLlmModule, "callLlm").mockResolvedValue("Generated content");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("throws when no digests directory exists", async () => {
    await expect(socialAction({ platform: "xiaohongshu" })).rejects.toThrow("No digest directories found");
  });
});
