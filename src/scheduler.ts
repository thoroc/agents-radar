import dotenvx from "@dotenvx/dotenvx";
import { DateTime } from "luxon";
import { loadConfig } from "./utils/config";
import { cronMatch } from "./utils/cron";

dotenvx.config({ quiet: true });

const main = async (): Promise<void> => {
  const { schedules } = loadConfig();
  const now = DateTime.now().toUTC();

  if (schedules.daily.enabled && cronMatch(schedules.daily.cron, now)) {
    console.error(`[scheduler] Daily digest due at ${now.toISO()}`);
    const { main: runDaily } = await import("./index");
    await runDaily();
  }

  if (schedules.weekly.enabled && cronMatch(schedules.weekly.cron, now)) {
    console.error(`[scheduler] Weekly rollup due at ${now.toISO()}`);
    const { runWeeklyRollup } = await import("./rollup");
    await runWeeklyRollup();
  }

  if (schedules.monthly.enabled && cronMatch(schedules.monthly.cron, now)) {
    console.error(`[scheduler] Monthly rollup due at ${now.toISO()}`);
    const { runMonthlyRollup } = await import("./rollup");
    await runMonthlyRollup();
  }

  console.error("[scheduler] Done!");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
