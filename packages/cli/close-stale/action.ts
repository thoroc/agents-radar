import { closeStaleIssuesAction as coreCloseStaleAction } from "@agents-radar/core";

export type CloseStaleActionArgs = {
  verbosity: number;
};

export const closeStaleAction = async (args: CloseStaleActionArgs): Promise<void> => {
  await coreCloseStaleAction(args);
};
