import { runScheduler } from "@agents-radar/core";

export type SchedulerActionArgs = Record<string, never>;
export type SchedulerDeps = Record<string, never>;

export const schedulerAction = async (
  _args: SchedulerActionArgs,
  _deps: SchedulerDeps = {},
): Promise<void> => {
  await runScheduler();
};
