import { describe, expect, it, vi } from "vitest";

import * as runMonthlyRollupModule from "./run-monthly-rollup";

const mockDotenvxConfig = vi.fn();
vi.mock("@dotenvx/dotenvx", () => ({ default: { config: mockDotenvxConfig } }));

describe("monthly entry point", () => {
  it("calls dotenvx.config and runMonthlyRollup on import", async () => {
    mockDotenvxConfig.mockReset();
    vi.spyOn(runMonthlyRollupModule, "runMonthlyRollup").mockResolvedValue(undefined);
    await import("./monthly");
    expect(mockDotenvxConfig).toHaveBeenCalledWith({ quiet: true });
    expect(runMonthlyRollupModule.runMonthlyRollup).toHaveBeenCalledOnce();
  });
});
