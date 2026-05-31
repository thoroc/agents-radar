import { DateTime } from "luxon";
import { LABEL_COLORS } from "./labels";

const GITHUB_ISSUE_BODY_LIMIT = 65536;
const TRUNCATION_NOTICE = "\n\n---\n> ⚠️ 内容超过 GitHub Issue 上限，完整报告见提交的 Markdown 文件。";

const headers = (token: string): Record<string, string> => ({
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
});

const neutralizeGitHubRefs = (text: string): string => {
  return text
    .replace(/https:\/\/github\.com\//g, "https://github\u200B.com/")
    .replace(/@([a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38})/g, "@\u200B$1");
};

export const ensureLabel = async (
  name: string,
  color: string,
  GITHUB_TOKEN: string = process.env.GITHUB_TOKEN ?? "",
  DIGEST_REPO: string = process.env.DIGEST_REPO ?? "",
): Promise<void> => {
  const resp = await fetch(`https://api.github.com/repos/${DIGEST_REPO}/labels`, {
    method: "POST",
    headers: { ...headers(GITHUB_TOKEN), "Content-Type": "application/json" },
    body: JSON.stringify({ name, color }),
  });
  if (!resp.ok && resp.status !== 422) {
    throw new Error(`Failed to create label "${name}": ${await resp.text()}`);
  }
};

export const createGitHubIssue = async (
  title: string,
  body: string,
  label: string,
  GITHUB_TOKEN: string = process.env.GITHUB_TOKEN ?? "",
  DIGEST_REPO: string = process.env.DIGEST_REPO ?? "",
): Promise<string> => {
  body = neutralizeGitHubRefs(body);
  if (body.length > GITHUB_ISSUE_BODY_LIMIT) {
    body = body.slice(0, GITHUB_ISSUE_BODY_LIMIT - TRUNCATION_NOTICE.length) + TRUNCATION_NOTICE;
  }
  await ensureLabel(label, LABEL_COLORS[label] ?? "0075ca", GITHUB_TOKEN, DIGEST_REPO);
  const resp = await fetch(`https://api.github.com/repos/${DIGEST_REPO}/issues`, {
    method: "POST",
    headers: { ...headers(GITHUB_TOKEN), "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, labels: [label] }),
  });
  if (!resp.ok) throw new Error(`Failed to create issue: ${await resp.text()}`);
  const data = (await resp.json()) as { html_url: string };
  return data.html_url;
};

export const closeStaleIssues = async (
  days: number,
  GITHUB_TOKEN: string = process.env.GITHUB_TOKEN ?? "",
  DIGEST_REPO: string = process.env.DIGEST_REPO ?? "",
): Promise<number> => {
  if (!DIGEST_REPO) return 0;
  const cutoffMs = DateTime.now().minus({ days }).toMillis();
  let closed = 0;

  while (true) {
    const issues = await fetch(
      `https://api.github.com/repos/${DIGEST_REPO}/issues?state=open&sort=created&direction=asc&per_page=100`,
      { headers: headers(GITHUB_TOKEN) },
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
          headers: { ...headers(GITHUB_TOKEN), "Content-Type": "application/json" },
          body: JSON.stringify({ state: "closed" }),
        });
        if (!resp.ok) console.error(`[github] Failed to close #${i.number}: ${resp.status}`);
      }),
    );
    closed += stale.length;
  }
  return closed;
};
