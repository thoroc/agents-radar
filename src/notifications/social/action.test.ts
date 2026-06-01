import { beforeEach, describe, expect, it, vi } from "vitest";

const mockCallLlm = vi.fn(() => Promise.resolve("Generated content"));

vi.mock("@dotenvx/dotenvx", () => ({
  default: { config: vi.fn() },
}));

vi.mock("../../report/call-llm", () => ({
  callLlm: mockCallLlm,
}));

import { socialAction } from "./action";

describe("socialAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("generates xiaohongshu content", async () => {
    await socialAction({ platform: "xiaohongshu", verbosity: 0 });
    expect(mockCallLlm).toHaveBeenCalled();
  });

  it("generates wechat weekly content", async () => {
    await socialAction({ platform: "wechat", verbosity: 0 });
    expect(mockCallLlm).toHaveBeenCalled();
  });

  it("generates wechat monthly content", async () => {
    await socialAction({ platform: "wechat:monthly", verbosity: 0 });
    expect(mockCallLlm).toHaveBeenCalled();
  });
});
