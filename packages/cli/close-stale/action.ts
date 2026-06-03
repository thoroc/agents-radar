import { closeStaleIssues } from "@agents-radar/core/github";
import dotenvx from "@dotenvx/dotenvx";

export interface CloseStaleIssuesActionArgs {
  verbosity: number;
}

export type CloseStaleIssuesDeps = {
  write?: (s: string) => void;
};

const STALE_DAYS = 7;

export const closeStaleIssuesAction = async (
  args: CloseStaleIssuesActionArgs,
  _deps: CloseStaleIssuesDeps = {},
): Promise<void> => {
  dotenvx.config({ quiet: true });
  const { verbosity } = args;
  const closed = await closeStaleIssues(STALE_DAYS);
  console.error(`[close-stale] Closed ${closed} issue(s) older than ${STALE_DAYS} days.`);
  if (verbosity >= 1) {
    console.error(`[close-stale] Stale threshold: ${STALE_DAYS} days`);
  }
};
