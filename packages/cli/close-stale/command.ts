import { Command } from "@cliffy/command";
import type { CloseStaleActionArgs } from "./action";
import { closeStaleAction } from "./action";

export const closeStaleCommand = new Command()
  .name("close-stale")
  .description("Close stale issues older than 7 days")
  .option("-V, --verbose", "Enable verbose output", { collect: true })
  .action(async (opts) => {
    const args: CloseStaleActionArgs = {
      verbosity: opts.verbose?.length ?? 0,
    };
    await closeStaleAction(args);
  });
