import { Command } from "@cliffy/command";
import type { FeishuActionArgs } from "./feishu-action";
import { feishuAction } from "./feishu-action";

export const feishuCommand = new Command()
  .name("feishu")
  .description("Send Feishu (Lark) notification with latest report links")
  .option("-V, --verbose", "Enable verbose output", { collect: true })
  .action(async (opts) => {
    const args: FeishuActionArgs = {
      verbosity: opts.verbose?.length ?? 0,
    };
    await feishuAction(args);
  });
