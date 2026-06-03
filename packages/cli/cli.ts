import { Command } from "@cliffy/command";
import dotenvx from "@dotenvx/dotenvx";
import { dailyCommand } from "./daily";
import { localeCommand } from "./locale";
import { monthlyCommand } from "./monthly";
import { schedulerCommand } from "./scheduler";
import { weeklyCommand } from "./weekly";

const main = async (): Promise<void> => {
  dotenvx.config({ quiet: true });

  await new Command()
    .name("agents-radar")
    .version("1.2.0")
    .description("Daily digest generator for the AI open-source ecosystem")
    .command("daily", dailyCommand)
    .command("weekly", weeklyCommand)
    .command("monthly", monthlyCommand)
    .command("scheduler", schedulerCommand)
    .command("locale", localeCommand)
    .parse(process.argv.slice(2));
};

if (import.meta.main) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
