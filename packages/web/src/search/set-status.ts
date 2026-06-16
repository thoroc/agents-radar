export const setSearchStatus = (text: string): void => {
  const el = document.getElementById("searchStatus");
  if (el) el.textContent = text;
};
