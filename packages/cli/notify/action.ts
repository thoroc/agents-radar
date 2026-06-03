import { notifyAction as coreNotifyAction } from "@agents-radar/core";

export type NotifyActionArgs = {
  verbosity: number;
};

export const notifyAction = async (args: NotifyActionArgs): Promise<void> => {
  await coreNotifyAction(args);
};
