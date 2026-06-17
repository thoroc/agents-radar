import { describe, expect, it } from "vitest";
import { loadReports } from "./load-reports";

const makeDeps = (files: Record<string, string>) => ({
  existsSync: (p: string) => p in files,
  readFileSync: (p: string, _enc: "utf-8") => files[p] ?? "",
});

describe("loadReports", () => {
  it("joins available report files with separators", () => {
    const deps = makeDeps({ "assets/digests/2026-01-01/ai-cli.md": "CLI content" });
    const result = loadReports("2026-01-01", deps);
    expect(result).toContain("## [ai-cli]");
    expect(result).toContain("CLI content");
  });

  it("skips missing report files silently", () => {
    const deps = makeDeps({});
    expect(loadReports("2026-01-01", deps)).toBe("");
  });

  it("truncates content to the specified length", () => {
    const long = "x".repeat(5000);
    const deps = makeDeps({ "assets/digests/2026-01-01/ai-cli.md": long });
    const result = loadReports("2026-01-01", deps, 100);
    expect(result).toContain("x".repeat(100));
    expect(result).not.toContain("x".repeat(101));
  });

  it("separates multiple reports with ---", () => {
    const deps = makeDeps({
      "assets/digests/2026-01-01/ai-cli.md": "cli",
      "assets/digests/2026-01-01/ai-agents.md": "agents",
    });
    const result = loadReports("2026-01-01", deps);
    expect(result).toContain("---");
  });
});
