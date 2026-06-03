/**
 * Central source of truth for all environment variables.
 *
 * Import from here instead of reading process.env directly.
 * Startup validation is handled by requireEnv() in src/index.ts.
 */
export const env = {
  githubToken: process.env.GITHUB_TOKEN ?? "",
  digestRepo: process.env.DIGEST_REPO ?? "",
  llmProvider: process.env.LLM_PROVIDER ?? "anthropic",
} as const;
