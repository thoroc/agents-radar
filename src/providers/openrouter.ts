/**
 * OpenRouter provider — OpenAI-compatible endpoint via openrouter.ai.
 *
 * Env vars:
 *   OPENROUTER_API_KEY  - API key
 *   OPENROUTER_MODEL    - model name (default: anthropic/claude-sonnet-4)
 */

import { createOpenAICompatibleProvider } from "./openai-compatible";
import type { LlmProvider } from "./types";

const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1";

export const createOpenRouterProvider = (opts?: { apiKey?: string; model?: string }): LlmProvider =>
  createOpenAICompatibleProvider("openrouter", {
    apiKey: opts?.apiKey ?? process.env.OPENROUTER_API_KEY,
    baseURL: OPENROUTER_BASE_URL,
    model: opts?.model ?? process.env.OPENROUTER_MODEL ?? "anthropic/claude-sonnet-4",
  });
