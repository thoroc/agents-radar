import { feishuCommand } from "./command";

export type { FeishuActionArgs, FeishuDeps } from "./feishu-action";
export { feishuAction } from "./feishu-action";

if (import.meta.main) {
  await feishuCommand.parse(process.argv.slice(2));
}
