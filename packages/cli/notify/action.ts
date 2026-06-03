import { notifyAction as coreNotifyAction } from "../../core/src/notifications/notify/action";

export type NotifyActionArgs = {
  verbosity: number;
};

export const notifyAction = async (args: NotifyActionArgs): Promise<void> => {
  await coreNotifyAction(args);
};
