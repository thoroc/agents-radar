import { notifyCommand } from "./command";

export type { NotifyActionArgs, NotifyDeps } from "./action";
export { notifyAction } from "./action";

if (import.meta.main) {
  await notifyCommand.parse(process.argv.slice(2));
}
