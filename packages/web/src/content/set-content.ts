import DOMPurify from "dompurify";

export const setContent = (html: string): void => {
  const el = document.getElementById("content");
  if (!el) return;
  const clean = DOMPurify.sanitize(html);
  const fragment = document.createRange().createContextualFragment(clean);
  el.replaceChildren(fragment);
};
