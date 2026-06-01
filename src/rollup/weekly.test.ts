import { describe, expect, it, vi } from "vitest";

const mockRunWeeklyRollup = vi.fn<() => Promise<void>>();
vi.mock("./run-weekly-rollup", () => ({ runWeeklyRollup: mockRunWeeklyRollup }));

const mockDotenvxConfig = vi.fn();
vi.mock("@dotenvx/dotenvx", () => ({ default: { config: mockDotenvxConfig } }));

describe("weekly entry point", () => {
  it("calls dotenvx.config and runWeeklyRollup on import", async () => {
    mockRunWeeklyRollup.mockResolvedValue(undefined);
    await import("./weekly");
    expect(mockDotenvxConfig).toHaveBeenCalledWith({ quiet: true });
    expect(mockRunWeeklyRollup).toHaveBeenCalledOnce();
  });
});
