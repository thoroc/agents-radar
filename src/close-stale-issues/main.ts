import { closeStaleIssuesCommand } from "./command";

export type { CloseStaleIssuesActionArgs, CloseStaleIssuesDeps } from "./action";
export { closeStaleIssuesAction } from "./action";
export { closeStaleIssuesCommand } from "./command";

if (import.meta.main) {
  await closeStaleIssuesCommand.parse(process.argv.slice(2));
}
