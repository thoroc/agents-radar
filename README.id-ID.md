# agen-radar

## Bahasa yang didukung

🇮🇧 Bahasa Inggris | [Ukraina Українська](./README.uk-UA.md) | [wahah العربية](./README.ar-SA.md) | [🇷 Русский](./README.ru-RU.md) | [🇮nai हिन्दी](./README.hi-IN.md) | [🇩🇪 Jerman](./README.de-DE.md) | [🇹🇷 Türkçe](./README.tr-TR.md) | [🇹🇭 ไทย](./README.th-TH.md) | [🇵🇱 Polski](./README.pl-PL.md) | [🇮🇹 Italiano](./README.it-IT.md) | [🇫🇷 Français](./README.fr-FR.md) | [🇨🇳 中文](./README.zh-CN.md) | [🇧🇷 Português](./README.pt-BR.md) | [🇻€ Tiếng Việt](./README.vi-VN.md) | [🇧🇩 বাংলা](./README.bn-BD.md) | [🇪🇪 Español](./README.es-ES.md) | [🇮🇩 Bahasa Indonesia](./README.id-ID.md) | [🇷🇴 Română](./README.ro-RO.md) | [Krisik 한국어](./README.ko-KR.md) | [€🇱 Belanda](./README.nl-NL.md) | [🇯🇵 Bahasa Jepang](./README.ja-JP.md)

Untuk mengaktifkan bahasa tambahan untuk pembuatan laporan, lihat [Dukungan multibahasa](./docs/setup.md#multi-language-support).

Sebuah alur kerja GitHub Actions yang berjalan setiap pagi pukul 08:00 CST. Alur kerja ini mengumpulkan sinyal ekosistem AI dari 10 sumber data, kemudian menerbitkan ringkasan harian (dalam semua bahasa yang dikonfigurasi) sebagai GitHub Issues dan file Markdown yang di-commit. Laporan ringkasan mingguan dan bulanan juga dihasilkan secara otomatis.

## Sumber Data

| Sumber | Tipe | Data |

|--------|------|------|

| [Repositori GitHub](https://github.com) | API | Issues, PR, rilis dari 17+ repositori alat AI yang dilacak |

| [Keterampilan Kode Claude](https://github.com/anthropics/skills) | API | Keterampilan yang sedang tren diurutkan berdasarkan keterlibatan komunitas |

| [GitHub Trending](https://github.com/trending) | HTML + API | Repositori yang sedang tren setiap hari + pencarian topik AI (jendela 7 hari) |

| [Hacker News](https://news.ycombinator.com) | [Algolia API](https://hn.algolia.com/api) | 30 berita AI teratas dari 24 jam terakhir, 6 kueri paralel |

| [Product Hunt](https://www.producthunt.com) | GraphQL API | Produk AI teratas kemarin berdasarkan suara |

| [ArXiv](https://arxiv.org) | [ArXiv API](https://export.arxiv.org/api/query) | Makalah terbaru dari cs.AI, cs.CL, cs.LG (48 jam terakhir) |

| [Hugging Face](https://huggingface.co) | [Hub API](https://huggingface.co/api/models) | 30 model trending diurutkan berdasarkan jumlah suka mingguan |

| [Dev.to](https://dev.to) | [Forem API](https://dev.to/api) | Artikel AI/LLM teratas dari 5 tag |

| [Lobste.rs](https://lobste.rs) | JSON API | Cerita bertag AI/ML dari 7 hari terakhir |

| [Anthropic](https://anthropic.com) + [OpenAI](https://openai.com) | Peta Situs | Artikel baru terdeteksi melalui perbedaan `lastmod` |

## UI Web

**`PAGES_URL`** — Tetapkan ini sebagai variabel repositori untuk mengkonfigurasi URL dasar UI Web untuk fork Anda.

Telusuri semua ringkasan historis dalam antarmuka bertema gelap yang bersih — tanpa perlu login. Laporan ditampilkan dari file Markdown di repositori ini melalui GitHub Pages.

UI web adalah SPA Vite + TypeScript di `packages/web/`. UI ini mengambil `manifest.json` dan file ringkasan individual saat runtime — ringkasan harian baru muncul tanpa perlu membangun ulang UI.

```bash
bun run dev:web    # start Vite dev server for local UI development
bun run build:web  # build the web UI for deployment
```
![Web UI](assets/web-en.png)

## Saluran Telegram & Grup Feishu

Berlangganan untuk mendapatkan notifikasi ringkasan harian yang dikirim langsung ke platform pilihan Anda. Setiap pesan berisi tautan ke semua laporan untuk hari itu ditambah Web UI dan umpan RSS.

<table>
<tr>
<td align="center"><b><a href="https://t.me/agents_radar">Gabung Saluran Telegram</a></b></td>
<td align="center"><b><a href="https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=b56v3be8-b027-4ee6-abc4-65bf1f80bccd">Gabung Grup Feishu</a></b></td>
</tr>
<tr>
<td><img src="assets/telegram.jpg" width="300" alt="Notifikasi Telegram"></td>
<td><img src="assets/feishu.jpg" width="300" alt="Notifikasi Feishu"></td>
</tr>
</table>

## RSS Feed

**`PAGES_URL`/feed.xml** — Berlangganan di pembaca RSS apa pun (Feedly, Reeder, NewsBlur, dll.) untuk menerima ringkasan baru secara otomatis. URL feed berasal dari pengaturan `PAGES_URL` Anda. Feed mencakup 30 laporan terbaru di semua jenis laporan, diperbarui setiap hari bersamaan dengan `manifest.json`.

## Server MCP

**`https://agents-radar-mcp.duanyytop.workers.dev`**

Server [Model Context Protocol](https://modelcontextprotocol.io) yang dihosting yang mengekspos data agents-radar sebagai alat. Klien yang kompatibel dengan MCP apa pun (Claude Desktop, OpenClaw, dll.) dapat langsung meminta laporan ekosistem AI terbaru.

**Alat yang tersedia:**

| Alat | Deskripsi |

|------|-------------|

| `list_reports` | Daftar tanggal dan jenis laporan yang tersedia (N hari terakhir) | | `get_latest` | Mengambil laporan terbaru dari jenis tertentu |

| `get_report` | Mengambil laporan tertentu berdasarkan tanggal dan jenis |

| `search` | Pencarian kata kunci di seluruh laporan terbaru |

**Pengaturan Claude Desktop** — tambahkan ke `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "agents-radar": {
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```
Setelah menyimpan, mulai ulang Claude Desktop. Anda kemudian dapat menanyakan hal-hal kepada Claude seperti:

- *"Apa kabar terbaru tentang alat CLI AI?"* → panggil `get_latest`
- *"Cari penyebutan Claude Code minggu ini"* → panggil `search`
- *"Tampilkan laporan tren AI untuk 2026-03-05"* → panggil `get_report`

**Pengaturan OpenClaw** — jalankan perintah berikut:

```bash
openclaw mcp add --transport http agents-radar https://agents-radar-mcp.duanyytop.workers.dev
```
Atau tambahkan secara manual ke `~/.openclaw/openclaw.json`:

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
Anda kemudian dapat menanyakan hal-hal kepada OpenClaw seperti:

- *"Apa yang terbaru dalam alat CLI AI?"* → memanggil `get_latest`
- *"Cari penyebutan Claude Code minggu ini"* → memanggil `search`
- *"Tampilkan laporan tren AI untuk 2026-03-05"* → memanggil `get_report`

**Hosting sendiri** — sebarkan instance Anda sendiri dari direktori `mcp/`:

```bash
cd mcp
pnpm install
wrangler deploy
```
## Sumber yang Dilacak

10 sumber data di seluruh repositori GitHub, berita, riset, dan umpan komunitas. Lihat [docs/sources.md](./docs/sources.md) untuk daftar lengkap dengan tautan repositori dan detail per sumber.

**Ringkasan singkat:** 9 repositori AI CLI + OpenClaw + 12 agen rekanan (API GitHub) · Claude Code Skills · GitHub Trending (HTML + API Pencarian) · Hacker News · ArXiv · Hugging Face · Product Hunt · Dev.to · Lobste.rs · Anthropic + peta situs OpenAI.

## Fitur

- Mengambil isu, permintaan tarik, dan rilis yang diperbarui dalam 24 jam terakhir di semua repositori yang dilacak
- Melacak Keterampilan Kode Claude yang sedang tren — diurutkan berdasarkan keterlibatan komunitas, bukan kekinian
- Menghasilkan ringkasan per alat untuk setiap repositori CLI dan analisis perbandingan lintas alat
- Menghasilkan laporan proyek OpenClaw yang mendalam ditambah perbandingan lintas ekosistem terhadap 11 proyek sejenis
- Mengambil konten web resmi Anthropic dan OpenAI melalui peta situs; mendeteksi artikel baru secara bertahap
- Memantau GitHub Trending setiap hari + mencari 6 tag topik AI; mengklasifikasikan repositori berdasarkan dimensi dan mengekstrak sinyal tren
- Mengambil 30 berita AI teratas dari Hacker News (24 jam terakhir, diurutkan berdasarkan poin); menghasilkan laporan sentimen komunitas
- Menerbitkan Isu GitHub untuk setiap jenis laporan; melakukan commit file Markdown ke `assets/digests/YYYY-MM-DD/`
- Berjalan sesuai jadwal harian melalui GitHub Actions; Mendukung pemicuan manual
- Semua repositori yang dilacak dapat dikonfigurasi melalui `config.yml` — tidak perlu perubahan kode
- Sistem lokal terpusat melalui `locales/*.json` — 21 bahasa yang didukung dengan katalog `t()` di `packages/core/src/locales/t.ts`

## Pengaturan

1. **Fork** repositori ini
2. Tambahkan kunci penyedia LLM Anda sebagai rahasia repositori (misalnya `ANTHROPIC_API_KEY`)
3. Aktifkan alur kerja di tab **Tindakan** — alur kerja akan berjalan otomatis mulai saat itu

Untuk panduan lengkap — referensi rahasia, penyedia LLM, kustomisasi `config.yml`, pengembangan lokal, konfigurasi multibahasa, dan penjadwalan — lihat [docs/setup.md](./docs/setup.md).

## Format keluaran

Satu file per jenis laporan per bahasa yang diaktifkan, ditulis ke `assets/digests/YYYY-MM-DD/`. Ringkasan historis ada di [`assets/digests/`](./assets/digests/). Lihat [docs/output-format.md](./docs/output-format.md) untuk daftar file lengkap, struktur per laporan, dan referensi label GitHub Issue.

## FAQ

Pertanyaan umum — mengapa laporan dilewati, berapa biaya untuk menjalankannya, menambahkan repositori, mengubah jadwal, memecahkan masalah 429 — dijawab di [docs/faq.md](./docs/faq.md).

## Kontribusi

Kontribusi dipersilakan. Lihat [CONTRIBUTING.md](./CONTRIBUTING.md) untuk strategi cabang, standar pengkodean, konvensi commit, dan instruksi untuk menambahkan bahasa atau jenis laporan baru.

## Sejarah Star

[![Grafik Sejarah Star](https://api.star-history.com/svg?repos=duanyytop/agents-radar&type=Date)](https://star-history.com/#duanyytop/agents-radar&Date)

