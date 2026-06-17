import { beforeEach, describe, expect, it } from "vitest";
import { wireThemeToggle } from "./wire-toggle";

describe("wireThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
    document.body.innerHTML = `
      <button id="themeBtn">
        <span class="hdr-icon"></span>
        <span class="hdr-label"></span>
      </button>
    `;
  });

  it("applies default dark theme on init", () => {
    wireThemeToggle();
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("applies stored light theme on init", () => {
    localStorage.setItem("ar-theme", "light");
    wireThemeToggle();
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("sets icon to ◐ for dark theme", () => {
    wireThemeToggle();
    expect(document.querySelector(".hdr-icon")?.textContent).toBe("◐");
  });

  it("sets icon to ● for light theme", () => {
    localStorage.setItem("ar-theme", "light");
    wireThemeToggle();
    expect(document.querySelector(".hdr-icon")?.textContent).toBe("●");
  });

  it("sets label to LIGHT for dark theme", () => {
    wireThemeToggle();
    expect(document.querySelector(".hdr-label")?.textContent).toBe("LIGHT");
  });

  it("sets label to DARK for light theme", () => {
    localStorage.setItem("ar-theme", "light");
    wireThemeToggle();
    expect(document.querySelector(".hdr-label")?.textContent).toBe("DARK");
  });

  it("toggles from light to dark on button click", () => {
    localStorage.setItem("ar-theme", "light");
    wireThemeToggle();
    document.getElementById("themeBtn")!.click();
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("toggles from dark to light on button click", () => {
    wireThemeToggle();
    document.getElementById("themeBtn")!.click();
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("does not throw when button is absent", () => {
    document.body.innerHTML = "";
    expect(() => wireThemeToggle()).not.toThrow();
  });
});
