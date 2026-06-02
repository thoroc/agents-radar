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

  it("generates xiaohongshu content", async () => {
    await socialAction({ platform: "xiaohongshu", verbosity: 0 });
    expect(callLlmModule.callLlm).toHaveBeenCalled();
  });

  it("generates wechat weekly content", async () => {
    await socialAction({ platform: "wechat", verbosity: 0 });
    expect(callLlmModule.callLlm).toHaveBeenCalled();
  });

  it("generates wechat monthly content", async () => {
    await socialAction({ platform: "wechat:monthly", verbosity: 0 });
    expect(callLlmModule.callLlm).toHaveBeenCalled();
  });
});
