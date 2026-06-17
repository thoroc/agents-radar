# đặc vụ-ra-đa

## Ngôn ngữ được hỗ trợ

🇬🇧 Tiếng Anh | [🇺🇦 Українська](./README.uk-UA.md) | [🇸🇦 العربية](./README.ar-SA.md) | [🇷🇺 Русский](./README.ru-RU.md) | [🇮🇳 हिन्दी](./README.hi-IN.md) | [🇩🇪 Tiếng Đức](./README.de-DE.md) | [🇹🇷 Tiếng Thổ Nhĩ Kỳ](./README.tr-TR.md) | [🇹🇭 Tiếng Thái](./README.th-TH.md) | [🇵🇱 Tiếng Ba Lan](./README.pl-PL.md) | [🇮🇹 Tiếng Ý](./README.it-IT.md) | [🇫🇷 Tiếng Pháp](./README.fr-FR.md) | [🇨🇳 Tiếng Trung](./README.zh-CN.md) | [🇧🇷 Tiếng Bồ Đào Nha](./README.pt-BR.md) | [🇻🇳 Tiếng Việt](./README.vi-VN.md) | [🇧🇩 বাংলা](./README.bn-BD.md) | [🇪🇸 Español](./README.es-ES.md) | [🇮🇩 Tiếng Bahasa Indonesia](./README.id-ID.md) | [🇷🇴 Română](./README.ro-RO.md) | [🇰🇷 한국어](./README.ko-KR.md) | [🇳🇱 Nederlands](./README.nl-NL.md) | [🇯🇵 Tiếng Nhật](./README.ja-JP.md)

Để bật thêm ngôn ngữ cho việc tạo báo cáo, hãy xem [Hỗ trợ đa ngôn ngữ](./docs/setup.md#multi-language-support).

Một quy trình làm việc GitHub Actions chạy mỗi sáng lúc 8:00 CST. Nó tổng hợp các tín hiệu hệ sinh thái AI từ 10 nguồn dữ liệu, sau đó xuất bản các bản tóm tắt hàng ngày (bằng tất cả các ngôn ngữ đã cấu hình) dưới dạng Vấn đề GitHub và các tệp Markdown đã được cam kết. Các báo cáo tổng hợp hàng tuần và hàng tháng cũng được tạo tự động.

## Nguồn dữ liệu

| Nguồn | Loại | Dữ liệu |

|--------|------|------|

| [Kho lưu trữ GitHub](https://github.com) | API | Vấn đề, Yêu cầu kéo, bản phát hành từ hơn 17 kho lưu trữ công cụ AI được theo dõi |

| [Kỹ năng Claude Code](https://github.com/anthropics/skills) | API | Các kỹ năng đang thịnh hành được sắp xếp theo mức độ tham gia của cộng đồng |

| [GitHub Trending](https://github.com/trending) | HTML + API | Các kho lưu trữ thịnh hành hàng ngày + Tìm kiếm chủ đề AI (cửa sổ 7 ngày) |
| [Hacker News](https://news.ycombinator.com) | [Algolia API](https://hn.algolia.com/api) | 30 câu chuyện AI hàng đầu trong 24 giờ qua, 6 truy vấn song song |
| [Product Hunt](https://www.producthunt.com) | API GraphQL | Các sản phẩm AI hàng đầu ngày hôm qua theo số phiếu bầu |
| [ArXiv](https://arxiv.org) | [ArXiv API](https://export.arxiv.org/api/query) | Các bài báo mới nhất từ cs.AI, cs.CL, cs.LG (48 giờ qua) |

| [Hugging Face](https://huggingface.co) | [Hub API](https://huggingface.co/api/models) | 30 mô hình thịnh hành được sắp xếp theo lượt thích hàng tuần |

| [Dev.to](https://dev.to) | [Forem API](https://dev.to/api) | Các bài viết hàng đầu về AI/LLM từ 5 thẻ |

| [Lobste.rs](https://lobste.rs) | API JSON | Các câu chuyện được gắn thẻ AI/ML trong 7 ngày qua |

| [Anthropic](https://anthropic.com) + [OpenAI](https://openai.com) | Sơ đồ trang web | Các bài viết mới được phát hiện thông qua `lastmod` diff |

## Giao diện người dùng web

**`PAGES_URL`** — Đặt biến này làm biến kho lưu trữ để cấu hình URL cơ sở của giao diện người dùng web cho nhánh của bạn.

Xem tất cả các bản tóm tắt lịch sử trong giao diện sạch sẽ, chủ đề tối — không cần đăng nhập. Báo cáo được hiển thị từ các tệp Markdown trong kho lưu trữ này thông qua GitHub Pages.

Giao diện người dùng web là một ứng dụng SPA Vite + TypeScript trong `packages/web/`. Nó tải xuống tệp `manifest.json` và các tệp tóm tắt riêng lẻ trong quá trình chạy — các bản tóm tắt hàng ngày mới xuất hiện mà không cần xây dựng lại giao diện người dùng.

```bash
bun run dev:web    # start Vite dev server for local UI development
bun run build:web  # build the web UI for deployment
```

![Giao diện web](assets/web-en.png)

## Kênh Telegram & Nhóm Feishu

Đăng ký để nhận thông báo tóm tắt hàng ngày được gửi trực tiếp đến nền tảng bạn ưa thích. Mỗi tin nhắn sẽ liên kết đến tất cả các báo cáo trong ngày hôm đó, cùng với giao diện web và nguồn cấp dữ liệu RSS.

<table>

<tr>

<td align="center"><b><a href="https://t.me/agents_radar">Tham gia kênh Telegram</a></b></td>

<td align="center"><b><a href="https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=b56v3be8-b027-4ee6-abc4-65bf1f80bccd">Tham gia nhóm Feishu</a></b></td>

</tr>

<tr>

<td><img src="assets/telegram.jpg" width="300" alt="Thông báo Telegram"></td>

<td><img src="assets/feishu.jpg" width="300" alt="Thông báo Feishu"></td>

</tr>

</table>

## Nguồn cấp dữ liệu RSS

**`PAGES_URL`/feed.xml** — Đăng ký Thêm vào bất kỳ trình đọc RSS nào (Feedly, Reeder, NewsBlur, v.v.) để tự động nhận các bản tóm tắt mới. URL nguồn cấp dữ liệu được lấy từ cài đặt `PAGES_URL` của bạn. Nguồn cấp dữ liệu bao gồm 30 báo cáo mới nhất trên tất cả các loại báo cáo, được cập nhật hàng ngày cùng với `manifest.json`.

## Máy chủ MCP

**`https://agents-radar-mcp.duanyytop.workers.dev`**

Một máy chủ [Giao thức Ngữ cảnh Mô hình](https://modelcontextprotocol.io) được lưu trữ, hiển thị dữ liệu agents-radar dưới dạng công cụ. Bất kỳ máy khách tương thích MCP nào (Claude Desktop, OpenClaw, v.v.) đều có thể truy vấn trực tiếp các báo cáo hệ sinh thái AI mới nhất.

**Các công cụ có sẵn:**

| Công cụ | Mô tả |

|------|-------------|

| `list_reports` | Liệt kê các ngày và loại báo cáo có sẵn (N ngày gần nhất) |

| `get_latest` | Lấy báo cáo gần đây nhất của một loại nhất định |

| `get_report` | Lấy báo cáo cụ thể theo ngày và loại |

| `search` | Tìm kiếm từ khóa trong các báo cáo gần đây |

**Thiết lập Claude Desktop** — thêm vào `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "agents-radar": {
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```
Khởi động lại Claude Desktop sau khi lưu. Sau đó, bạn có thể hỏi Claude những câu hỏi như:

- *"Công cụ CLI AI mới nhất là gì?"* → gọi hàm `get_latest`
- *"Tìm kiếm các bài viết đề cập đến Claude Code trong tuần này"* → gọi hàm `search`
- *"Cho tôi xem báo cáo xu hướng AI ngày 05/03/2026"* → gọi hàm `get_report`

**Thiết lập OpenClaw** — chạy lệnh sau:

```bash
openclaw mcp add --transport http agents-radar https://agents-radar-mcp.duanyytop.workers.dev
```
Hoặc thêm thủ công vào `~/.openclaw/openclaw.json`:

```json
{
  "mcpServers": {
    "agents-radar": {
      "type": "http",
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```
Sau đó, bạn có thể hỏi OpenClaw những câu hỏi như:

- *"Những công cụ CLI AI mới nhất là gì?"* → gọi hàm `get_latest`
- *"Tìm kiếm các bài viết đề cập đến Claude Code trong tuần này"* → gọi hàm `search`
- *"Cho tôi xem báo cáo xu hướng AI ngày 05/03/2026"* → gọi hàm `get_report`

**Tự lưu trữ** — triển khai phiên bản của riêng bạn từ thư mục `mcp/`:

```bash
cd mcp
pnpm install
wrangler deploy
```
## Nguồn dữ liệu được theo dõi

10 nguồn dữ liệu từ các kho lưu trữ GitHub, tin tức, nghiên cứu và nguồn cấp dữ liệu cộng đồng. Xem [docs/sources.md](./docs/sources.md) để biết danh sách đầy đủ với các liên kết kho lưu trữ và chi tiết từng nguồn.

**Tóm tắt nhanh:** 9 kho lưu trữ AI CLI + OpenClaw + 12 tác nhân ngang hàng (API GitHub) · Kỹ năng lập trình Claude · Xu hướng GitHub (HTML + API tìm kiếm) · Hacker News · ArXiv · Hugging Face · Product Hunt · Dev.to · Lobste.rs · Anthropic + sơ đồ trang web OpenAI.

## Tính năng

- Thu thập các vấn đề, yêu cầu kéo và bản phát hành được cập nhật trong 24 giờ qua trên tất cả các kho lưu trữ được theo dõi
- Theo dõi các kỹ năng lập trình Claude đang thịnh hành — được sắp xếp theo mức độ tham gia của cộng đồng, không phải theo thời gian gần đây
- Tạo bản tóm tắt cho mỗi công cụ trong từng kho lưu trữ CLI và phân tích so sánh giữa các công cụ
- Tạo báo cáo dự án OpenClaw chuyên sâu cùng với so sánh giữa các hệ sinh thái với 11 dự án tương đồng
- Thu thập nội dung web chính thức của Anthropic và OpenAI thông qua sơ đồ trang web; phát hiện các bài viết mới một cách tăng dần
- Giám sát Xu hướng GitHub hàng ngày + tìm kiếm 6 thẻ chủ đề AI; phân loại kho lưu trữ theo chiều và trích xuất tín hiệu xu hướng
- Thu thập 30 câu chuyện AI hàng đầu từ Hacker News (24 giờ qua, được xếp hạng theo điểm); tạo báo cáo về cảm nhận của cộng đồng
- Xuất bản Vấn đề GitHub cho mỗi loại báo cáo; cam kết các tệp Markdown vào `assets/digests/YYYY-MM-DD/`
- Chạy theo lịch trình hàng ngày thông qua GitHub Actions; Hỗ trợ kích hoạt thủ công
- Tất cả các kho lưu trữ được theo dõi đều có thể cấu hình thông qua `config.yml` — không cần thay đổi mã
- Hệ thống ngôn ngữ tập trung thông qua `locales/*.json` — hỗ trợ 21 ngôn ngữ với danh mục `t()` trong `packages/core/src/locales/t.ts`

## Thiết lập

1. **Sao chép** kho lưu trữ này
2. Thêm khóa nhà cung cấp LLM của bạn làm bí mật kho lưu trữ (ví dụ: `ANTHROPIC_API_KEY`)
3. Kích hoạt quy trình làm việc trong tab **Hành động** — quy trình sẽ tự động chạy từ đó trở đi

Để có hướng dẫn đầy đủ — tham chiếu bí mật, nhà cung cấp LLM, tùy chỉnh `config.yml`, phát triển cục bộ, cấu hình đa ngôn ngữ và lịch trình — hãy xem [docs/setup.md](./docs/setup.md).

## Định dạng đầu ra

Một tệp cho mỗi loại báo cáo cho mỗi ngôn ngữ được kích hoạt, được ghi vào `assets/digests/YYYY-MM-DD/`. Các bản tóm tắt lịch sử nằm trong [`assets/digests/`](./assets/digests/). Xem [docs/output-format.md](./docs/output-format.md) để biết danh sách đầy đủ các tệp, cấu trúc theo từng báo cáo và tham chiếu nhãn Vấn đề GitHub.

## Câu hỏi thường gặp

Các câu hỏi thường gặp — tại sao báo cáo bị bỏ qua, chi phí chạy, thêm kho lưu trữ, thay đổi lịch trình, khắc phục sự cố 429 — được trả lời trong [docs/faq.md](./docs/faq.md).

## Đóng góp

Chúng tôi hoan nghênh sự đóng góp. Xem [CONTRIBUTING.md](./CONTRIBUTING.md) để biết chiến lược nhánh, tiêu chuẩn mã hóa, quy ước cam kết và hướng dẫn thêm ngôn ngữ hoặc loại báo cáo mới.

## Lịch sử Star

[![Biểu đồ lịch sử Star](https://api.star-history.com/svg?repos=duanyytop/agents-radar&type=Date)](https://star-history.com/#duanyytop/agents-radar&Date)
