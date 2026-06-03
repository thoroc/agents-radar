import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { notifyAction } from "./action";
import * as buildMessageModule from "./build-message";

describe("notifyAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(buildMessageModule, "buildMessage").mockReturnValue("mocked telegram content" as never);
    vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true } as Response);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("skips when TELEGRAM_BOT_TOKEN not set", async () => {
    await notifyAction({ verbosity: 0 });
    expect(buildMessageModule.buildMessage).not.toHaveBeenCalled();
  });
});
