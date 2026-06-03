import { Command } from "@cliffy/command";
import dotenvx from "@dotenvx/dotenvx";
import { closeStaleCommand } from "./close-stale";
import { dailyCommand } from "./daily";
import { feishuCommand } from "./feishu";
import { localeCommand } from "./locale";
import { manifestCommand } from "./manifest";
import { monthlyCommand } from "./monthly";
import { notifyCommand } from "./notify";
import { schedulerCommand } from "./scheduler";
import { socialCommand } from "./socials";
import { weeklyCommand } from "./weekly";

const main = async (): Promise<void> => {
  dotenvx.config({ quiet: true });

  await new Command()
    .name("agents-radar")
    .version("1.2.0")
    .description("Daily digest generator for the AI open-source ecosystem")
    .command("close-stale", closeStaleCommand)
    .command("daily", dailyCommand)
    .command("feishu", feishuCommand)
    .command("locale", localeCommand)
    .command("manifest", manifestCommand)
    .command("monthly", monthlyCommand)
    .command("notify", notifyCommand)
    .command("scheduler", schedulerCommand)
    .command("social", socialCommand)
    .command("weekly", weeklyCommand)
    .parse(process.argv.slice(2));
};

if (import.meta.main) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
