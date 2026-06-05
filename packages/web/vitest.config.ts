import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    coverage: {
      exclude: ["src/main.ts", "src/content/set-content.ts", "src/router/on-hash-change.ts"],
    },
  },
});
