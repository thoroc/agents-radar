import { closeStaleIssuesAction as coreCloseStaleAction } from "../../core/src/close-stale-issues/action";

export type CloseStaleActionArgs = {
  verbosity: number;
};

export const closeStaleAction = async (args: CloseStaleActionArgs): Promise<void> => {
  await coreCloseStaleAction(args);
};
