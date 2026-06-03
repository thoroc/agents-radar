import { runMonthlyRollup } from "@agents-radar/core";

export type MonthlyActionArgs = {};
export type MonthlyDeps = Record<string, never>;

export const monthlyAction = async (_args: MonthlyActionArgs, _deps: MonthlyDeps = {}): Promise<void> => {
  await runMonthlyRollup();
};
