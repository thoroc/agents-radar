import { DateTime } from "luxon";
import { runDaily } from "./phases/run-daily";
import { runMonthlyRollup } from "./rollup/run-monthly-rollup";
import { runWeeklyRollup } from "./rollup/run-weekly-rollup";
import { loadConfig } from "./utils";
import { cronMatch } from "./utils/cron";

export const runScheduler = async (): Promise<void> => {
  const { schedules } = loadConfig();
  const now = DateTime.now().toUTC();

  if (schedules.daily.enabled && cronMatch(schedules.daily.cron, now)) {
    console.error(`[scheduler] Daily digest due at ${now.toISO()}`);
    await runDaily();
  }

  if (schedules.weekly.enabled && cronMatch(schedules.weekly.cron, now)) {
    console.error(`[scheduler] Weekly rollup due at ${now.toISO()}`);
    await runWeeklyRollup();
  }

  if (schedules.monthly.enabled && cronMatch(schedules.monthly.cron, now)) {
    console.error(`[scheduler] Monthly rollup due at ${now.toISO()}`);
    await runMonthlyRollup();
  }

  console.error("[scheduler] Done!");
};
