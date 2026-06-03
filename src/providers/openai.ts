/**
 * OpenAI provider — wraps the openai SDK.
 *
 * Env vars:
 *   OPENAI_API_KEY   - API key
 *   OPENAI_BASE_URL  - endpoint override (optional)
 *   OPENAI_MODEL     - model name (default: gpt-4o)
 */

import { DEFAULT_MODELS } from "../config/models";
import { createOpenAICompatibleProvider } from "./openai-compatible";
import type { LlmProvider } from "./types";

export const createOpenAIProvider = (
  opts?: {
    apiKey?: string;
    baseURL?: string;
    model?: string;
  },
  env: NodeJS.ProcessEnv = process.env,
): LlmProvider =>
  createOpenAICompatibleProvider("openai", {
    apiKey: opts?.apiKey ?? env.OPENAI_API_KEY,
    baseURL: opts?.baseURL ?? env.OPENAI_BASE_URL,
    model: opts?.model ?? env.OPENAI_MODEL ?? DEFAULT_MODELS.openai,
  });
