import { describe, expect, it } from "vitest";

describe("GitHub API", () => {
  it("exports expected function signatures", async () => {
    const mod = await import("./");
    expect(typeof mod.fetchRecentItems).toBe("function");
    expect(typeof mod.fetchRecentReleases).toBe("function");
    expect(typeof mod.fetchSkillsData).toBe("function");
  });
});
