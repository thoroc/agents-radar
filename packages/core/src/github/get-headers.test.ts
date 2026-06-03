import { describe, expect, it } from "vitest";
import { getHeaders } from "./get-headers";

describe("getHeaders", () => {
  it("sets Authorization as Bearer token", () => {
    expect(getHeaders("ghp_abc").Authorization).toBe("Bearer ghp_abc");
  });

  it("sets Accept to GitHub media type", () => {
    expect(getHeaders("t").Accept).toBe("application/vnd.github+json");
  });

  it("sets X-GitHub-Api-Version", () => {
    expect(getHeaders("t")["X-GitHub-Api-Version"]).toBe("2022-11-28");
  });
});
