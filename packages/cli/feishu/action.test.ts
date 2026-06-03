import * as buildMessageModule from "@agents-radar/core/notifications/feishu";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { feishuAction } from "./action";

describe("feishuAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(buildMessageModule, "buildMessage").mockReturnValue("mocked feishu content" as never);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("skips when FEISHU_WEBHOOK_URLS not set", async () => {
    await feishuAction({ verbosity: 0 }, {}, {});
    expect(buildMessageModule.buildMessage).not.toHaveBeenCalled();
  });

  it("reads manifest.json and builds message", async () => {
    await feishuAction({ verbosity: 0 }, {}, { FEISHU_WEBHOOK_URLS: "https://hooks.example.com/hook" });
    expect(buildMessageModule.buildMessage).toHaveBeenCalled();
  });
});
