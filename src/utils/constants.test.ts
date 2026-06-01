import { describe, expect, it } from "vitest";
import { GITHUB_REPO_DEFAULT, PAGES_URL_DEFAULT } from "./constants";

describe("constants", () => {
  it("PAGES_URL_DEFAULT has expected value", () => {
    expect(PAGES_URL_DEFAULT).toBe("https://duanyytop.github.io/agents-radar");
  });

  it("GITHUB_REPO_DEFAULT has expected value", () => {
    expect(GITHUB_REPO_DEFAULT).toBe("duanyytop/agents-radar");
  });
});
