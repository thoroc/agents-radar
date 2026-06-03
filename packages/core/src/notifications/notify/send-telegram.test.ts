import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendTelegram } from "./send-telegram";

describe("sendTelegram", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: true } as Response);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends POST to Telegram API with bot token", async () => {
    await sendTelegram("Hello", { TELEGRAM_BOT_TOKEN: "abc:123" });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://api.telegram.org/botabc:123/sendMessage",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: expect.stringContaining("Hello"),
      }),
    );
  });

  it("uses default chat_id when not provided", async () => {
    await sendTelegram("Hello", { TELEGRAM_BOT_TOKEN: "abc:123" });

    const args = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    const body = JSON.parse((args![1] as { body: string }).body);
    expect(body.chat_id).toBe("@agents_radar");
  });

  it("uses custom chat_id when provided", async () => {
    await sendTelegram("Hello", {
      TELEGRAM_BOT_TOKEN: "abc:123",
      TELEGRAM_CHAT_ID: "@custom_channel",
    });

    const args = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    const body = JSON.parse((args![1] as { body: string }).body);
    expect(body.chat_id).toBe("@custom_channel");
  });

  it("sets disable_web_page_preview to true", async () => {
    await sendTelegram("Hello", { TELEGRAM_BOT_TOKEN: "abc:123" });

    const args = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    const body = JSON.parse((args![1] as { body: string }).body);
    expect(body.disable_web_page_preview).toBe(true);
  });

  it("throws on non-ok response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 403,
      text: vi.fn().mockResolvedValue("Forbidden"),
    } as unknown as Response);

    await expect(sendTelegram("Hello", { TELEGRAM_BOT_TOKEN: "abc:123" })).rejects.toThrow(
      "Telegram API 403: Forbidden",
    );
  });
});
