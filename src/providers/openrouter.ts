/**
 * OpenRouter provider — OpenAI-compatible endpoint via openrouter.ai.
 *
 * Env vars:
 *   OPENROUTER_API_KEY  - API key
 *   OPENROUTER_MODEL    - model name (default: anthropic/claude-sonnet-4)
 */

import { DEFAULT_MODELS } from "../config/models";
import { createOpenAICompatibleProvider } from "./openai-compatible";
import type { LlmProvider } from "./types";

export const createOpenRouterProvider = (
  opts?: {
    apiKey?: string;
    model?: string;
    baseURL?: string;
  },
  env: NodeJS.ProcessEnv = process.env,
): LlmProvider =>
  createOpenAICompatibleProvider("openrouter", {
    apiKey: opts?.apiKey ?? env.OPENROUTER_API_KEY,
    baseURL: opts?.baseURL ?? env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1",
    model: opts?.model ?? env.OPENROUTER_MODEL ?? DEFAULT_MODELS.openrouter,
  });
