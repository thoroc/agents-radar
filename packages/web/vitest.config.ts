import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    coverage: {
      provider: "v8",
      exclude: ["src/main.ts", "src/router/on-hash-change.ts", "src/search/wire.ts", "**/index.ts"],
    },
  },
});
