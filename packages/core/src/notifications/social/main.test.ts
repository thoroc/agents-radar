import { describe, expect, it, vi } from "vitest";

describe("social entry point", () => {
  it("does not execute socialCommand.parse when not main module", async () => {
    const mockParse = vi.fn();
    vi.mock("./command", () => ({ socialCommand: { parse: mockParse } }));
    await import("./main");
    expect(mockParse).not.toHaveBeenCalled();
  });
});
