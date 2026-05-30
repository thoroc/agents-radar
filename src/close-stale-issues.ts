import { closeStaleIssues } from "./github";

const STALE_DAYS = 7;

const main = async (): Promise<void> => {
  const closed = await closeStaleIssues(STALE_DAYS);
  console.error(`[close-stale] Closed ${closed} issue(s) older than ${STALE_DAYS} days.`);
}

main().catch((e: unknown) => {
  console.error("[close-stale]", e instanceof Error ? e.message : e);
  process.exit(1);
});
