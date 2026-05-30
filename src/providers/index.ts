/**
 * Provider barrel — re-exports and factory.
 *
 * Usage:
 *   import { createProvider, type LlmProvider } from "./providers/index";
 */

export { createAnthropicProvider } from "./anthropic";
export { createGitHubCopilotProvider } from "./github-copilot";
export { createOpenAIProvider } from "./openai";
export { createOpenAICompatibleProvider } from "./openai-compatible";
export { createOpenRouterProvider } from "./openrouter";
export type { LlmProvider, ProviderFactory } from "./types";

import { createAnthropicProvider } from "./anthropic";
import { createGitHubCopilotProvider } from "./github-copilot";
import { createOpenAIProvider } from "./openai";
import { createOpenRouterProvider } from "./openrouter";
import type { LlmProvider, ProviderFactory } from "./types";

// ---------------------------------------------------------------------------
// Single source of truth — add new providers here only.
// ---------------------------------------------------------------------------

const PROVIDERS = {
  anthropic: () => createAnthropicProvider(),
  openai: () => createOpenAIProvider(),
  "github-copilot": () => createGitHubCopilotProvider(),
  openrouter: () => createOpenRouterProvider(),
} satisfies Record<string, ProviderFactory>;

/** Supported provider name — derived from the PROVIDERS registry. */
export type ProviderName = keyof typeof PROVIDERS;

/** All valid provider names — derived from the registry. */
export const VALID_PROVIDER_NAMES = Object.keys(PROVIDERS) as ProviderName[];

/**
 * Create an LLM provider by name.
 *
 * Reads `LLM_PROVIDER` env var when no explicit name is given.
 * Throws a descriptive error if the provider name is invalid.
 *
 * Log safety: only the provider *name* is logged — never API keys or
 * endpoint URLs.
 */
export function createProvider(name?: ProviderName): LlmProvider {
  const providerName = name ?? (process.env.LLM_PROVIDER as ProviderName | undefined) ?? "anthropic";

  const factory = (PROVIDERS as Record<string, ProviderFactory | undefined>)[providerName];
  if (!factory) {
    throw new Error(
      `Invalid LLM provider: "${providerName}". ` +
        `Valid providers are: ${VALID_PROVIDER_NAMES.join(", ")}. ` +
        `Set the LLM_PROVIDER env var to one of these values.`,
    );
  }

  console.error(`[providers] Using LLM provider: ${providerName}`);
  return factory();
}
