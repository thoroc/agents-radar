import { env } from "@agents-radar/config";
import { getHeaders } from "./get-headers";

export const ensureLabel = async (
  name: string,
  color: string,
  GITHUB_TOKEN: string = env.githubToken,
  DIGEST_REPO: string = env.digestRepo,
): Promise<void> => {
  const resp = await fetch(`https://api.github.com/repos/${DIGEST_REPO}/labels`, {
    method: "POST",
    headers: { ...getHeaders(GITHUB_TOKEN), "Content-Type": "application/json" },
    body: JSON.stringify({ name, color }),
  });
  if (!resp.ok && resp.status !== 422) {
    throw new Error(`Failed to create label "${name}": ${await resp.text()}`);
  }
};
