import { socialCommand } from "./command";

if (import.meta.main) {
  await socialCommand.parse(process.argv.slice(2));
}
