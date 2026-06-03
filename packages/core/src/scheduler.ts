import { DateTime } from "luxon";
import { runDaily } from "./phases/run-daily";
import { runMonthly } from "./rollup/run-monthly";
import { runWeekly } from "./rollup/run-weekly";
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
    await runWeekly();
  }

  if (schedules.monthly.enabled && cronMatch(schedules.monthly.cron, now)) {
    console.error(`[scheduler] Monthly rollup due at ${now.toISO()}`);
    await runMonthly();
  }

  console.error("[scheduler] Done!");
};
