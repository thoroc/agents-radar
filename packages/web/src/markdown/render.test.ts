import { describe, expect, it } from "vitest";
import { renderMarkdown } from "./render";

describe("renderMarkdown", () => {
  it("converts markdown heading to HTML", () => {
    const result = renderMarkdown("# Hello");
    expect(result).toContain("<h1>Hello</h1>");
  });

  it("strips script tags", () => {
    const result = renderMarkdown('<script>alert("xss")</script>');
    expect(result).not.toContain("<script>");
  });

  it("preserves details and summary elements", () => {
    const result = renderMarkdown("<details><summary>Title</summary>Content</details>");
    expect(result).toContain("<details>");
    expect(result).toContain("<summary>");
  });

  it("renders bold text", () => {
    const result = renderMarkdown("**bold**");
    expect(result).toContain("<strong>bold</strong>");
  });

  it("applies marked pipeline before DOMPurify sanitization", () => {
    const result = renderMarkdown("## Section");
    expect(result).toContain("<h2>Section</h2>");
  });
});
