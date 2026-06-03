import { describe, expect, it } from "vitest";
import { sleep } from "./sleep";

describe("sleep", () => {
  it("resolves after approximately the given ms", async () => {
    const start = Date.now();
    await sleep(50);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(40);
    expect(elapsed).toBeLessThan(200);
  });
});
