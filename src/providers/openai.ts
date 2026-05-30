/**
 * OpenAI provider — wraps the openai SDK.
 *
 * Env vars:
 *   OPENAI_API_KEY   - API key
 *   OPENAI_BASE_URL  - endpoint override (optional)
 *   OPENAI_MODEL     - model name (default: gpt-4o)
 */

import { createOpenAICompatibleProvider } from "./openai-compatible";
import type { LlmProvider } from "./types";

export const createOpenAIProvider = (opts?: {
  apiKey?: string;
  baseURL?: string;
  model?: string;
}): LlmProvider =>
  createOpenAICompatibleProvider("openai", {
    apiKey: opts?.apiKey ?? process.env.OPENAI_API_KEY,
    baseURL: opts?.baseURL ?? process.env.OPENAI_BASE_URL,
    model: opts?.model ?? process.env.OPENAI_MODEL ?? "gpt-4o",
  });
