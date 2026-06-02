import { describe, expect, it } from "vitest";
import { getWebhookUrls } from "./get-webhook-urls";

describe("getWebhookUrls", () => {
  it("returns URLs from FEISHU_WEBHOOK_URLS", () => {
    const result = getWebhookUrls({
      FEISHU_WEBHOOK_URLS: "https://hooks.feishu.cn/a,https://hooks.feishu.cn/b",
    });
    expect(result).toEqual(["https://hooks.feishu.cn/a", "https://hooks.feishu.cn/b"]);
  });

  it("falls back to FEISHU_WEBHOOK_URL", () => {
    const result = getWebhookUrls({
      FEISHU_WEBHOOK_URL: "https://hooks.feishu.cn/fallback",
    });
    expect(result).toEqual(["https://hooks.feishu.cn/fallback"]);
  });

  it("prefers FEISHU_WEBHOOK_URLS over FEISHU_WEBHOOK_URL", () => {
    const result = getWebhookUrls({
      FEISHU_WEBHOOK_URLS: "https://hooks.feishu.cn/primary",
      FEISHU_WEBHOOK_URL: "https://hooks.feishu.cn/fallback",
    });
    expect(result).toEqual(["https://hooks.feishu.cn/primary"]);
  });

  it("trims whitespace from URLs", () => {
    const result = getWebhookUrls({
      FEISHU_WEBHOOK_URLS: "  https://hooks.feishu.cn/a , https://hooks.feishu.cn/b  ",
    });
    expect(result).toEqual(["https://hooks.feishu.cn/a", "https://hooks.feishu.cn/b"]);
  });

  it("filters empty entries", () => {
    const result = getWebhookUrls({
      FEISHU_WEBHOOK_URLS: "https://hooks.feishu.cn/a,,,https://hooks.feishu.cn/b",
    });
    expect(result).toEqual(["https://hooks.feishu.cn/a", "https://hooks.feishu.cn/b"]);
  });

  it("returns empty array when no env var is set", () => {
    const result = getWebhookUrls({});
    expect(result).toEqual([]);
  });
});
