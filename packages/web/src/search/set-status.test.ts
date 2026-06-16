import { beforeEach, describe, expect, it } from "vitest";
import { setSearchStatus } from "./set-status";

describe("setSearchStatus", () => {
  beforeEach(() => {
    document.body.innerHTML = '<span id="searchStatus"></span>';
  });

  it("sets text content of searchStatus element", () => {
    setSearchStatus("3 results");
    expect(document.getElementById("searchStatus")?.textContent).toBe("3 results");
  });

  it("clears text content when called with empty string", () => {
    const el = document.getElementById("searchStatus")!;
    el.textContent = "old";
    setSearchStatus("");
    expect(el.textContent).toBe("");
  });

  it("does not throw when element is absent", () => {
    document.body.innerHTML = "";
    expect(() => setSearchStatus("test")).not.toThrow();
  });
});
