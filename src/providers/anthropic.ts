/**
 * Anthropic provider — wraps the @anthropic-ai/sdk.
 *
 * Env vars:
 *   ANTHROPIC_API_KEY   - API key (read automatically by the SDK)
 *   ANTHROPIC_BASE_URL  - endpoint override (read automatically by the SDK)
 *   ANTHROPIC_MODEL     - model name (default: claude-sonnet-4-6)
 */

import Anthropic from "@anthropic-ai/sdk";
import type { LlmProvider } from "./types";

export const createAnthropicProvider = (
  model?: string,
  env: NodeJS.ProcessEnv = process.env,
): LlmProvider => {
  const mdl = model ?? env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6";
  const client = new Anthropic();
  return {
    name: "anthropic",
    call: async (prompt: string, maxTokens: number): Promise<string> => {
      const message = await client.messages.create({
        model: mdl,
        max_tokens: maxTokens,
        messages: [{ role: "user", content: prompt }],
      });
      const block = message.content.find((b) => b.type === "text");
      if (!block) throw new Error("Unexpected response type from Anthropic");
      return block.text;
    },
  };
};
