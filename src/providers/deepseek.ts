import { createOpenAICompatibleProvider } from "./openai-compatible";
import type { LlmProvider } from "./types";

const DEEPSEEK_BASE_URL = process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com";

export const createDeepSeekProvider = (apiKey: string, model?: string): LlmProvider =>
  createOpenAICompatibleProvider("deepseek", {
    apiKey,
    baseURL: DEEPSEEK_BASE_URL,
    model: model ?? "deepseek-chat",
  });
