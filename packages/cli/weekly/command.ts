import { Command } from "@cliffy/command";
import { weeklyAction } from "./action";

export const weeklyCommand = new Command()
  .name("weekly")
  .description("Run the weekly rollup")
  .action(async () => {
    await weeklyAction({});
  });
