import { feishuAction as coreFeishuAction } from "../../core/src/notifications/feishu/action";

export type FeishuActionArgs = {
  verbosity: number;
};

export const feishuAction = async (args: FeishuActionArgs): Promise<void> => {
  await coreFeishuAction(args);
};
