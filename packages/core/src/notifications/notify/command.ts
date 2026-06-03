import { Command } from "@cliffy/command";
import type { NotifyActionArgs } from "./action";
import { notifyAction } from "./action";

export const notifyCommand = new Command()
  .name("notify")
  .description("Send Telegram notification with latest report links")
  .option("-V, --verbose", "Enable verbose output", { collect: true })
  .action(async (opts) => {
    const args: NotifyActionArgs = {
      verbosity: opts.verbose?.length ?? 0,
    };
    await notifyAction(args);
  });
