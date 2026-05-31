import dotenvx from "@dotenvx/dotenvx";
import { runMonthlyRollup } from "./rollup";

dotenvx.config({ quiet: true });
runMonthlyRollup().catch((err) => {
  console.error(err);
  process.exit(1);
});
