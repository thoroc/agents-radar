import { createOpenAICompatibleProvider } from "./openai-compatible";
import type { LlmProvider } from "./types";

export const createDeepSeekProvider = (apiKey: string, model?: string): LlmProvider =>
  createOpenAICompatibleProvider("deepseek", {
    apiKey,
    baseURL: "https://api.deepseek.com",
    model: model ?? "deepseek-chat",
  });
