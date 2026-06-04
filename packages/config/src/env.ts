export const env = {
  githubToken: process.env.GITHUB_TOKEN ?? "",
  digestRepo: process.env.DIGEST_REPO ?? "",
  llmProvider: process.env.LLM_PROVIDER ?? "anthropic",
} as const;
