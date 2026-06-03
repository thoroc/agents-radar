import { describe, expect, it } from "vitest";
import { toRepoConfig } from "./to-repo-config";

describe("toRepoConfig", () => {
  it("converts a basic entry", () => {
    const result = toRepoConfig({ id: "test", repo: "org/test", name: "Test" });
    expect(result).toEqual({ id: "test", repo: "org/test", name: "Test" });
  });

  it("includes paginated when true", () => {
    const result = toRepoConfig({ id: "test", repo: "org/test", name: "Test", paginated: true });
    expect(result).toEqual({ id: "test", repo: "org/test", name: "Test", paginated: true });
  });

  it("omits paginated when false", () => {
    const result = toRepoConfig({ id: "test", repo: "org/test", name: "Test", paginated: false });
    expect(result).not.toHaveProperty("paginated");
  });
});
