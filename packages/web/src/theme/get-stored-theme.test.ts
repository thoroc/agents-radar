import { beforeEach, describe, expect, it } from "vitest";
import { getStoredTheme } from "./get-stored-theme";

describe("getStoredTheme", () => {
  beforeEach(() => localStorage.clear());

  it("returns stored theme", () => {
    localStorage.setItem("ar-theme", "light");
    expect(getStoredTheme()).toBe("light");
  });

  it("defaults to dark when nothing stored", () => {
    expect(getStoredTheme()).toBe("dark");
  });
});
