import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./build-feishu-message", () => ({
  buildFeishuMessage: vi.fn(() => "mocked feishu content"),
}));

import { feishuAction } from "./action";
import { buildFeishuMessage } from "./build-feishu-message";

describe("feishuAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("skips when FEISHU_WEBHOOK_URLS not set", async () => {
    await feishuAction({ verbosity: 0 }, {}, {});
    expect(buildFeishuMessage).not.toHaveBeenCalled();
  });

  it("reads manifest.json and builds message", async () => {
    await feishuAction({ verbosity: 0 }, {}, { FEISHU_WEBHOOK_URLS: "https://hooks.feishu.cn/xxx" });
    expect(buildFeishuMessage).toHaveBeenCalledWith(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
      expect.any(Array),
      undefined,
      expect.any(Object),
      expect.any(Object),
    );
  });
});
