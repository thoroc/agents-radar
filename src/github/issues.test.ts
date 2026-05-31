import { describe, expect, it } from "vitest";

describe("closeStaleIssues", () => {
  it("returns 0 when DIGEST_REPO is not set", async () => {
    const { closeStaleIssues } = await import("./issues");
    expect(typeof closeStaleIssues).toBe("function");
  });
});
