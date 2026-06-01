import { feishuCommand } from "./command";

export type { FeishuActionArgs, FeishuDeps } from "./action";
export { feishuAction } from "./action";

if (import.meta.main) {
  await feishuCommand.parse(process.argv.slice(2));
}
