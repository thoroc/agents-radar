import { describe, expect, it } from "vitest";
import { loadConfig } from "../utils/load-config";

describe("scheduler config", () => {
  it("loads default schedule config", () => {
    const config = loadConfig();
    expect(config.schedules).toBeDefined();
    expect(config.schedules.daily).toBeDefined();
    expect(config.schedules.weekly).toBeDefined();
    expect(config.schedules.monthly).toBeDefined();
  });

  it("has reasonable default cron expressions", () => {
    const config = loadConfig();
    expect(config.schedules.daily.cron).toBe("0 0 * * *");
    expect(config.schedules.weekly.cron).toBe("0 1 * * 1");
    expect(config.schedules.monthly.cron).toBe("0 2 1 * *");
  });
});
