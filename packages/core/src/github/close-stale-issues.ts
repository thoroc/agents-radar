import { DateTime } from "luxon";
import { env } from "../config/env";
import { getHeaders } from "./get-headers";

export const closeStaleIssues = async (
  days: number,
  GITHUB_TOKEN: string = env.githubToken,
  DIGEST_REPO: string = env.digestRepo,
): Promise<number> => {
  if (!DIGEST_REPO) return 0;
  const cutoffMs = DateTime.now().minus({ days }).toMillis();
  let closed = 0;

  while (true) {
    const issues = await fetch(
      `https://api.github.com/repos/${DIGEST_REPO}/issues?state=open&sort=created&direction=asc&per_page=100`,
      { headers: getHeaders(GITHUB_TOKEN) },
    ).then((r) => {
      if (!r.ok) throw new Error(`Failed to fetch issues: ${r.status}`);
      return r.json() as Promise<{ number: number; created_at: string }[]>;
    });

    if (issues.length === 0) break;

    const stale = issues.filter((i) => DateTime.fromISO(i.created_at).toMillis() < cutoffMs);
    if (stale.length === 0) break;

    await Promise.all(
      stale.map(async (i) => {
        const resp = await fetch(`https://api.github.com/repos/${DIGEST_REPO}/issues/${i.number}`, {
          method: "PATCH",
          headers: { ...getHeaders(GITHUB_TOKEN), "Content-Type": "application/json" },
          body: JSON.stringify({ state: "closed" }),
        });
        if (!resp.ok) console.error(`[github] Failed to close #${i.number}: ${resp.status}`);
      }),
    );
    closed += stale.length;
  }
  return closed;
};
