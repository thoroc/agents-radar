import { describe, expect, it, vi } from "vitest";

import * as runWeeklyRollupModule from "./run-weekly-rollup";

const mockDotenvxConfig = vi.fn();
vi.mock("@dotenvx/dotenvx", () => ({ default: { config: mockDotenvxConfig } }));

describe("weekly entry point", () => {
  it("calls dotenvx.config and runWeeklyRollup on import", async () => {
    mockDotenvxConfig.mockReset();
    vi.spyOn(runWeeklyRollupModule, "runWeeklyRollup").mockResolvedValue(undefined);
    await import("./weekly");
    expect(mockDotenvxConfig).toHaveBeenCalledWith({ quiet: true });
    expect(runWeeklyRollupModule.runWeeklyRollup).toHaveBeenCalledOnce();
  });
});
