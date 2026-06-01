import { notifyCommand } from "./command";

export type { NotifyActionArgs, NotifyDeps } from "./notify-action";
export { notifyAction } from "./notify-action";

if (import.meta.main) {
  await notifyCommand.parse(process.argv.slice(2));
}
