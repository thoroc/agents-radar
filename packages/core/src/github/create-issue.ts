import { env } from "../config/env";
import { ensureLabel } from "./ensure-label";
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

export const createGitHubIssue = async (
  title: string,
  body: string,
  label: string,
  GITHUB_TOKEN: string = env.githubToken,
  DIGEST_REPO: string = env.digestRepo,
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
