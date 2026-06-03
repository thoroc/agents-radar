import * as callLlmModule from "@agents-radar/core/report";
import { describe, expect, it, vi } from "vitest";

vi.mock("@dotenvx/dotenvx", () => ({
  default: { config: vi.fn() },
}));

import { socialAction } from "./action";

describe("socialAction", () => {
  it("throws when no digests directory exists", async () => {
    vi.spyOn(callLlmModule, "callLlm").mockResolvedValue("Generated content");
    await expect(
      socialAction(
        { platform: "xiaohongshu" },
        {
          readdirSync: () => [],
          existsSync: () => false,
          readFileSync: () => "",
          writeFileSync: () => undefined,
          mkdirSync: () => undefined,
        },
      ),
    ).rejects.toThrow("No digest directories found");
  });
});
