import { describe, expect, it } from "vitest";

describe("fetchHnData", () => {
  it("has correct function signature", async () => {
    const { fetchHnData } = await import("./hn");
    expect(typeof fetchHnData).toBe("function");
  });
});
