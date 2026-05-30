/**
 * Shared logic for OpenAI-compatible providers.
 *
 * Used by OpenAI, GitHub Copilot, OpenRouter, and DeepSeek providers.
 */

import OpenAI from "openai";
import type { LlmProvider } from "./types";

export const createOpenAICompatibleProvider = (
  name: string,
  opts: { apiKey?: string; baseURL?: string; model: string },
): LlmProvider => {
  const client = new OpenAI({
    apiKey: opts.apiKey,
    baseURL: opts.baseURL,
  });
  return {
    name,
    call: async (prompt: string, maxTokens: number): Promise<string> => {
      const response = await client.chat.completions.create({
        model: opts.model,
        max_completion_tokens: maxTokens,
        messages: [{ role: "user", content: prompt }],
      });
      const text = response.choices[0]?.message?.content;
      if (!text) throw new Error(`Unexpected empty response from ${name}`);
      return text;
    },
  };
};
