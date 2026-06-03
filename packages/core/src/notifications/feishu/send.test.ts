import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as getWebhookUrlsModule from "./get-webhook-urls";
import { send } from "./send";
import * as sendToOneWebhookModule from "./send-to-one-webhook";

describe("send", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(getWebhookUrlsModule, "getWebhookUrls").mockReturnValue(["https://hooks.example.com/hook"]);
    vi.spyOn(sendToOneWebhookModule, "sendToOneWebhook").mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends to all webhook URLs", async () => {
    await send("title", "test");
    expect(sendToOneWebhookModule.sendToOneWebhook).toHaveBeenCalledTimes(1);
  });
});
