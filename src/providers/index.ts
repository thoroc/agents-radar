/**
 * Provider barrel — re-exports and factory.
 *
 * Usage:
 *   import { createProvider, type LlmProvider } from "./providers/index";
 */

export { createAnthropicProvider } from "./anthropic";
export { createGitHubCopilotProvider } from "./github-copilot";
export { createOpenAIProvider } from "./openai";
export { createOpenRouterProvider } from "./openrouter";
export type { LlmProvider } from "./types";

import { createAnthropicProvider } from "./anthropic";
import { createGitHubCopilotProvider } from "./github-copilot";
import { createOpenAIProvider } from "./openai";
import { createOpenRouterProvider } from "./openrouter";
import type { LlmProvider } from "./types";

const PROVIDERS = {
  anthropic: (env?: NodeJS.ProcessEnv) => createAnthropicProvider(undefined, env),
  openai: (env?: NodeJS.ProcessEnv) => createOpenAIProvider(undefined, env),
  "github-copilot": (env?: NodeJS.ProcessEnv) => createGitHubCopilotProvider(undefined, env),
  openrouter: (env?: NodeJS.ProcessEnv) => createOpenRouterProvider(undefined, env),
} satisfies Record<string, (env?: NodeJS.ProcessEnv) => LlmProvider>;

type ProviderName = keyof typeof PROVIDERS;

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
export const createProvider = (name?: ProviderName, env: NodeJS.ProcessEnv = process.env): LlmProvider => {
  const providerName = name ?? (env.LLM_PROVIDER as ProviderName | undefined) ?? "anthropic";

  const factories = PROVIDERS as Record<string, ((env?: NodeJS.ProcessEnv) => LlmProvider) | undefined>;
  const factory = factories[providerName];
  if (!factory) {
    throw new Error(
      `Invalid LLM provider: "${providerName}". ` +
        `Valid providers are: ${VALID_PROVIDER_NAMES.join(", ")}. ` +
        `Set the LLM_PROVIDER env var to one of these values.`,
    );
  }

  console.error(`[providers] Using LLM provider: ${providerName}`);
  return factory(env);
};
