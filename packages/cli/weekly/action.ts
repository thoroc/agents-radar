import { runWeekly } from "@agents-radar/core";

export type WeeklyActionArgs = {};
export type WeeklyDeps = Record<string, never>;

export const weeklyAction = async (_args: WeeklyActionArgs, _deps: WeeklyDeps = {}): Promise<void> => {
  await runWeekly();
};
