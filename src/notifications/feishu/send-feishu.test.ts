import { beforeEach, describe, expect, it, vi } from "vitest";

const mockGetWebhookUrls = vi.fn();
vi.mock("./get-webhook-urls", () => ({
  getWebhookUrls: mockGetWebhookUrls,
}));

const mockSendToOneWebhook = vi.fn();
vi.mock("./send-to-one-webhook", () => ({
  sendToOneWebhook: mockSendToOneWebhook,
}));

import { sendFeishu } from "./send-feishu";

describe("sendFeishu", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sends to all webhook URLs", async () => {
    mockGetWebhookUrls.mockReturnValue(["https://hooks.feishu.cn/a", "https://hooks.feishu.cn/b"]);
    mockSendToOneWebhook.mockResolvedValue(undefined);

    await sendFeishu("Title", "Content");

    expect(mockSendToOneWebhook).toHaveBeenCalledTimes(2);
    expect(mockSendToOneWebhook).toHaveBeenCalledWith("https://hooks.feishu.cn/a", "Title", "Content");
    expect(mockSendToOneWebhook).toHaveBeenCalledWith("https://hooks.feishu.cn/b", "Title", "Content");
  });

  it("throws when all webhooks fail", async () => {
    mockGetWebhookUrls.mockReturnValue(["https://hooks.feishu.cn/a", "https://hooks.feishu.cn/b"]);
    mockSendToOneWebhook.mockRejectedValue(new Error("Network error"));

    await expect(sendFeishu("Title", "Content")).rejects.toThrow("All Feishu webhooks failed");
  });

  it("does not throw when some webhooks succeed", async () => {
    mockGetWebhookUrls.mockReturnValue(["https://hooks.feishu.cn/a", "https://hooks.feishu.cn/b"]);
    mockSendToOneWebhook.mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error("Network error"));

    await expect(sendFeishu("Title", "Content")).resolves.toBeUndefined();
  });
});
