import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./build-message", () => ({
  buildMessage: vi.fn(() => "mocked telegram content"),
}));

import { notifyAction } from "./action";
import { buildMessage } from "./build-message";

describe("notifyAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true } as Response);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("skips when TELEGRAM_BOT_TOKEN not set", async () => {
    await notifyAction({ verbosity: 0 }, {}, {});
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("reads manifest.json and builds message", async () => {
    await notifyAction({ verbosity: 0 }, {}, { TELEGRAM_BOT_TOKEN: "abc:123" });
    expect(buildMessage).toHaveBeenCalledWith(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
      expect.any(Array),
      undefined,
      expect.any(Object),
      expect.any(Object),
    );
  });

  it("sends POST with JSON body to Telegram API", async () => {
    await notifyAction({ verbosity: 0 }, {}, { TELEGRAM_BOT_TOKEN: "abc:123" });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://api.telegram.org/botabc:123/sendMessage",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: expect.stringContaining("mocked telegram content"),
      }),
    );
  });

  it("sends with custom chat_id when set", async () => {
    await notifyAction(
      { verbosity: 0 },
      {},
      { TELEGRAM_BOT_TOKEN: "abc:123", TELEGRAM_CHAT_ID: "@custom_channel" },
    );
    const args = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(args).toBeDefined();
    const body = JSON.parse((args![1] as { body: string }).body);
    expect(body.chat_id).toBe("@custom_channel");
  });

  it("handles API errors", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 403,
      text: vi.fn().mockResolvedValue("Forbidden"),
    } as unknown as Response);
    await expect(notifyAction({ verbosity: 0 }, {}, { TELEGRAM_BOT_TOKEN: "abc:123" })).rejects.toThrow(
      "Telegram API 403: Forbidden",
    );
  });
});
