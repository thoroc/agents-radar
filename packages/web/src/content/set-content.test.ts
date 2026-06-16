import { beforeEach, describe, expect, it } from "vitest";
import { setContent } from "./set-content";

describe("setContent", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="content"></div>';
  });

  it("populates the content element", () => {
    setContent("<p>hello</p>");
    expect(document.getElementById("content")?.innerHTML).toContain("hello");
  });

  it("replaces previous content on successive calls", () => {
    setContent("<p>first</p>");
    setContent("<p>second</p>");
    const el = document.getElementById("content")!;
    expect(el.innerHTML).toContain("second");
    expect(el.innerHTML).not.toContain("first");
  });

  it("strips script tags via DOMPurify", () => {
    setContent("<p>safe</p><script>alert(1)</script>");
    expect(document.getElementById("content")?.innerHTML).not.toContain("script");
  });

  it("does not throw when content element is absent", () => {
    document.body.innerHTML = "";
    expect(() => setContent("<p>test</p>")).not.toThrow();
  });
});
