import { beforeEach, describe, expect, it } from "vitest";
import { showManifestError } from "./show-manifest-error";

describe("showManifestError", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="nav"></div><div id="content"></div>';
  });

  it("replaces nav contents with error message element", () => {
    showManifestError("fetch failed");
    const nav = document.getElementById("nav");
    expect(nav?.querySelector(".msg")).not.toBeNull();
  });

  it("includes the error message text in nav", () => {
    showManifestError("timeout");
    expect(document.getElementById("nav")?.textContent).toContain("timeout");
  });

  it("does not throw when nav element is absent", () => {
    document.body.innerHTML = '<div id="content"></div>';
    expect(() => showManifestError("no nav")).not.toThrow();
  });
});
