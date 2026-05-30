import { runMonthlyRollup } from "./rollup";

runMonthlyRollup().catch((err) => {
  console.error(err);
  process.exit(1);
});
