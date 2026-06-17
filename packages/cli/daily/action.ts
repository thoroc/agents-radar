import { runDaily } from "@agents-radar/core";

export type DailyActionArgs = Record<string, never>;
export type DailyDeps = Record<string, never>;

export const dailyAction = async (_args: DailyActionArgs, _deps: DailyDeps = {}): Promise<void> => {
  await runDaily();
};
