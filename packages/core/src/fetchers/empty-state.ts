import type { WebState } from "./web-state-types";

export const emptyState = (): WebState => ({
  anthropic: { lastChecked: "", seenUrls: {} },
  openai: { lastChecked: "", seenUrls: {} },
});
