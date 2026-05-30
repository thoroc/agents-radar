/**
 * Social media content generator — uses LLM to produce platform-specific
 * articles from daily digests.
 *
 * Usage:
 *   bun run src/social.ts xiaohongshu          # latest day → xiaohongshu
 *   bun run src/social.ts wechat               # last 7 days → wechat weekly
 *   bun run src/social.ts wechat:monthly       # last 30 days → wechat monthly
 *
 * Reads API keys from .env (local only).
 */

import { socialCommand } from "./social/command";

if (import.meta.main) {
  await socialCommand.parse(process.argv.slice(2));
}
