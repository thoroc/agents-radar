export const applyTheme = (theme: string): void => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("ar-theme", theme);
};
