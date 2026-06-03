import { feishuAction as coreFeishuAction } from "@agents-radar/core";

export type FeishuActionArgs = {
  verbosity: number;
};

export const feishuAction = async (args: FeishuActionArgs): Promise<void> => {
  await coreFeishuAction(args);
};
