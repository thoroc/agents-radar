import { Command } from "@cliffy/command";
import { monthlyAction } from "./action";

export const monthlyCommand = new Command()
  .name("monthly")
  .description("Run the monthly rollup")
  .action(async () => {
    await monthlyAction({});
  });
