import { Command } from "@cliffy/command";
import type { CloseStaleIssuesActionArgs } from "./action";
import { closeStaleIssuesAction } from "./action";

export const closeStaleIssuesCommand = new Command()
  .name("close-stale-issues")
  .description("Close stale issues older than 7 days")
  .option("-V, --verbose", "Enable verbose output", { collect: true })
  .action(async (opts) => {
    const args: CloseStaleIssuesActionArgs = {
      verbosity: opts.verbose?.length ?? 0,
    };
    await closeStaleIssuesAction(args);
  });
