import { Command } from "@cliffy/command";
import { dailyAction } from "./action";

export const dailyCommand = new Command()
  .name("daily")
  .description("Run the daily digest")
  .action(async () => {
    await dailyAction({});
  });
