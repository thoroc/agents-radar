/**
 * GitHub Copilot provider — OpenAI-compatible endpoint via GitHub Models.
 *
 * Env vars:
 *   GITHUB_TOKEN           - GitHub token (PAT or GitHub Actions `GITHUB_TOKEN`)
 *   GITHUB_COPILOT_MODEL   - model name (default: gpt-4o)
 */

import { DEFAULT_MODELS } from "../config/models";
import { createOpenAICompatibleProvider } from "./openai-compatible";
import type { LlmProvider, ProviderOpts } from "./types";

const GITHUB_COPILOT_BASE_URL = "https://models.github.ai/inference";

export const createGitHubCopilotProvider = (
  opts?: ProviderOpts,
  env: NodeJS.ProcessEnv = process.env,
): LlmProvider =>
  createOpenAICompatibleProvider("github-copilot", {
    apiKey: opts?.apiKey ?? env.GITHUB_TOKEN,
    baseURL: GITHUB_COPILOT_BASE_URL,
    model: opts?.model ?? env.GITHUB_COPILOT_MODEL ?? DEFAULT_MODELS.githubCopilot,
  });
