import { createOpenAICompatibleProvider } from "./openai-compatible";
import type { LlmProvider } from "./types";

export const createDeepSeekProvider = (
  apiKey: string,
  model?: string,
  baseURL?: string,
  env: NodeJS.ProcessEnv = process.env,
): LlmProvider =>
  createOpenAICompatibleProvider("deepseek", {
    apiKey,
    baseURL: baseURL ?? env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com",
    model: model ?? "deepseek-chat",
  });
