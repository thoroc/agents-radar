import { createOpenAICompatibleProvider } from "./openai-compatible";
import type { LlmProvider } from "./types";

export const createDeepSeekProvider = (apiKey: string, model?: string, baseURL?: string): LlmProvider =>
  createOpenAICompatibleProvider("deepseek", {
    apiKey,
    baseURL: baseURL ?? process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com",
    model: model ?? "deepseek-chat",
  });
