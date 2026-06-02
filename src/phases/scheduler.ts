import dotenvx from "@dotenvx/dotenvx";
import { DateTime } from "luxon";
import { getEnabledLangs, loadConfig } from "../utils";
import { cronMatch } from "../utils/cron";

dotenvx.config({ quiet: true });

const main = async (): Promise<void> => {
  const { languages: configLangs, schedules } = loadConfig();
  const enabledLangs = getEnabledLangs(configLangs);
  const now = DateTime.now().toUTC();

  if (schedules.daily.enabled && cronMatch(schedules.daily.cron, now)) {
    console.error(`[scheduler] Daily digest due at ${now.toISO()}`);
    const { main: runDaily } = await import("../index");
    await runDaily();
  }

  if (schedules.weekly.enabled && cronMatch(schedules.weekly.cron, now)) {
    console.error(`[scheduler] Weekly rollup due at ${now.toISO()}`);
    const { runWeeklyRollup } = await import("../rollup/run-weekly-rollup");
    await runWeeklyRollup(undefined, undefined, enabledLangs);
  }

  if (schedules.monthly.enabled && cronMatch(schedules.monthly.cron, now)) {
    console.error(`[scheduler] Monthly rollup due at ${now.toISO()}`);
    const { runMonthlyRollup } = await import("../rollup/run-monthly-rollup");
    await runMonthlyRollup(undefined, undefined, enabledLangs);
  }

  console.error("[scheduler] Done!");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
