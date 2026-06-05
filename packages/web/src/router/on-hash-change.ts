export const onHashChange = (handler: () => void): void => {
  window.addEventListener("popstate", handler);
  window.addEventListener("hashchange", handler);
};
