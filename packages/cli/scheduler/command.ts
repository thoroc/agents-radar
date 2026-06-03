import { Command } from "@cliffy/command";
import { schedulerAction } from "./action";

export const schedulerCommand = new Command()
  .name("scheduler")
  .description("Run the cron-matched scheduler")
  .action(async () => {
    await schedulerAction({});
  });
