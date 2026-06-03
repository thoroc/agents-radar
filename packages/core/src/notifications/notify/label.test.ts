import { describe, expect, it } from "vitest";
import { label } from "./label";

describe("label", () => {
  it("returns zh label for ai-cli by default", () => {
    const result = label("ai-cli", "zh-CN");
    expect(result).toBe("AI CLI 工具");
  });

  it("returns en label for ai-cli when lang is en", () => {
    const result = label("ai-cli", "en-US");
    expect(result).toBe("AI CLI Tools");
  });

  it("returns zh label for ai-agents", () => {
    expect(label("ai-agents", "zh-CN")).toBe("AI Agents 生态");
  });

  it("returns en label for ai-agents", () => {
    expect(label("ai-agents", "en-US")).toBe("AI Agents Ecosystem");
  });

  it("returns zh label for ai-web", () => {
    expect(label("ai-web", "zh-CN")).toBe("官网动态");
  });

  it("returns zh label for ai-trending", () => {
    expect(label("ai-trending", "zh-CN")).toBe("GitHub 趋势");
  });

  it("returns zh label for ai-hn", () => {
    expect(label("ai-hn", "zh-CN")).toBe("HN 社区动态");
  });

  it("returns zh label for ai-ph", () => {
    expect(label("ai-ph", "zh-CN")).toBe("Product Hunt");
  });

  it("returns zh label for ai-arxiv", () => {
    expect(label("ai-arxiv", "zh-CN")).toBe("ArXiv 研究");
  });

  it("returns zh label for ai-hf", () => {
    expect(label("ai-hf", "zh-CN")).toBe("HF 模型");
  });

  it("returns zh label for ai-community", () => {
    expect(label("ai-community", "zh-CN")).toBe("技术社区");
  });

  it("returns zh label for ai-weekly", () => {
    expect(label("ai-weekly", "zh-CN")).toBe("AI 工具生态周报");
  });

  it("returns zh label for ai-monthly", () => {
    expect(label("ai-monthly", "zh-CN")).toBe("AI 工具生态月报");
  });

  it("returns unknown id as-is", () => {
    expect(label("unknown-id", "zh-CN")).toBe("unknown-id");
  });
});
