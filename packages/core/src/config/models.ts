/**
 * Default LLM model names per provider.
 *
 * Provider factories fall back to these when no model is supplied via
 * opts or the corresponding *_MODEL env var.
 */
export const DEFAULT_MODELS = {
  anthropic: "claude-sonnet-4-6",
  openai: "gpt-4o",
  githubCopilot: "gpt-4o",
  openrouter: "anthropic/claude-sonnet-4",
} as const;
