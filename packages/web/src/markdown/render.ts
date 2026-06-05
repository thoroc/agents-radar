import DOMPurify from "dompurify";
import { marked } from "marked";

marked.use({ breaks: true, gfm: true });

DOMPurify.addHook("uponSanitizeElement", (_node, data) => {
  if (data.tagName === "details" || data.tagName === "summary") {
    data.allowedTags[data.tagName] = true;
  }
});

export const renderMarkdown = (raw: string): string => {
  const html = marked.parse(raw) as string;
  return DOMPurify.sanitize(html, {
    ADD_TAGS: ["details", "summary"],
    ADD_ATTR: ["open"],
  });
};
