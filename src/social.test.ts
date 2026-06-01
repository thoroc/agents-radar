import { describe, expect, it, vi } from "vitest";

const mockParse = vi.fn();
vi.mock("./notifications/social/command", () => ({ socialCommand: { parse: mockParse } }));

describe("social entry point", () => {
  it("does not execute socialCommand.parse when not main module", async () => {
    await import("./social");
    expect(mockParse).not.toHaveBeenCalled();
  });
});
