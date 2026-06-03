import { env } from "../config/env";

const headers = (token: string): Record<string, string> => ({
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
});

export const ensureLabel = async (
  name: string,
  color: string,
  GITHUB_TOKEN: string = env.githubToken,
  DIGEST_REPO: string = env.digestRepo,
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
