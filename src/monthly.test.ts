import { describe, expect, it, vi } from "vitest";

const mockRunMonthlyRollup = vi.fn<() => Promise<void>>();
vi.mock("./rollup/run-monthly-rollup", () => ({ runMonthlyRollup: mockRunMonthlyRollup }));

const mockDotenvxConfig = vi.fn();
vi.mock("@dotenvx/dotenvx", () => ({ default: { config: mockDotenvxConfig } }));

describe("monthly entry point", () => {
  it("calls dotenvx.config and runMonthlyRollup on import", async () => {
    mockRunMonthlyRollup.mockResolvedValue(undefined);
    await import("./monthly");
    expect(mockDotenvxConfig).toHaveBeenCalledWith({ quiet: true });
    expect(mockRunMonthlyRollup).toHaveBeenCalledOnce();
  });
});
