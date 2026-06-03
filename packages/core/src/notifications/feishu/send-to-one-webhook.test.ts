import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendToOneWebhook } from "./send-to-one-webhook";

describe("sendToOneWebhook", () => {
  beforeEach(() => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true } as Response);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends POST with correct JSON body", async () => {
    await sendToOneWebhook("https://hooks.feishu.cn/xxx", "Test Title", "Hello");

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://hooks.feishu.cn/xxx",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: expect.stringContaining("Test Title"),
      }),
    );
  });

  it("throws on non-ok response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 400,
      text: vi.fn().mockResolvedValue("Bad Request"),
    } as unknown as Response);

    await expect(sendToOneWebhook("https://hooks.feishu.cn/xxx", "Title", "Content")).rejects.toThrow(
      "Feishu API 400: Bad Request",
    );
  });
});
