import dotenvx from "@dotenvx/dotenvx";
import { runWeeklyRollup } from "./rollup/run-weekly-rollup";

dotenvx.config({ quiet: true });
runWeeklyRollup().catch((err) => {
  console.error(err);
  process.exit(1);
});
