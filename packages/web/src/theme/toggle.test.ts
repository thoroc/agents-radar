import { beforeEach, describe, expect, it } from "vitest";
import { applyTheme } from "./toggle";

describe("applyTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  it("sets data-theme on documentElement", () => {
    applyTheme("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("stores theme in localStorage", () => {
    applyTheme("light");
    expect(localStorage.getItem("ar-theme")).toBe("light");
  });

  it("updates theme value", () => {
    applyTheme("dark");
    applyTheme("light");
    expect(document.documentElement.dataset.theme).toBe("light");
  });
});
