import { Command } from "@cliffy/command";
import dotenvx from "@dotenvx/dotenvx";
import { closeStaleIssues } from "./github";

const STALE_DAYS = 7;

const main = async (opts: { verbose?: boolean[] }): Promise<void> => {
  dotenvx.config({ quiet: true });
  const verbosity = opts.verbose?.length ?? 0;
  const closed = await closeStaleIssues(STALE_DAYS);
  console.error(`[close-stale] Closed ${closed} issue(s) older than ${STALE_DAYS} days.`);
  if (verbosity >= 1) {
    console.error(`[close-stale] Stale threshold: ${STALE_DAYS} days`);
  }
};

const command = new Command()
  .name("close-stale-issues")
  .description("Close stale issues older than 7 days")
  .option("-V, --verbose", "Enable verbose output", { collect: true })
  .action(async (opts) => {
    await main(opts);
  });

if (import.meta.main) {
  await command.parse(process.argv.slice(2));
}
