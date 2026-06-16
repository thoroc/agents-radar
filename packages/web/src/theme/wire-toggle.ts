import { getStoredTheme } from "./get-stored-theme";
import { applyTheme } from "./toggle";

export const wireThemeToggle = (): void => {
  let theme = getStoredTheme();
  applyTheme(theme);
  const btn = document.getElementById("themeBtn");
  const icon = btn?.querySelector(".hdr-icon");
  const label = btn?.querySelector(".hdr-label");
  if (icon) icon.textContent = theme === "dark" ? "◐" : "●";
  if (label) label.textContent = theme === "dark" ? "LIGHT" : "DARK";
  if (btn) {
    btn.onclick = () => {
      theme = theme === "dark" ? "light" : "dark";
      applyTheme(theme);
      if (icon) icon.textContent = theme === "dark" ? "◐" : "●";
      if (label) label.textContent = theme === "dark" ? "LIGHT" : "DARK";
    };
  }
};
