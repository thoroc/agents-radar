# ajanlar-radar

## Desteklenen diller

🇬🇧 İngilizce · 🇨🇳 中文 · 🇯🇵 日本語 · 🇰🇷 한국어 · 🇪🇸 Español · 🇧🇷 Português · 🇫🇷 Français · 🇩🇪 Almanca · 🇮🇹 İtalyan · 🇵🇱 Polski · 🇷🇺 Русский · 🇸🇦 العربية · 🇹🇷 Türkçe · 🇻🇳 Tiếng Việt · 🇹🇭 ไทย · 🇳🇱 Nederlands · 🇮🇳 हिन्दी · 🇷🇴 Română · 🇮🇩 Bahasa Indonesia · 🇺🇦 Українська · 🇧🇩 বাংলা

English | [中文](./README.zh-CN.md)

Rapor oluşturma için ek dilleri etkinleştirmek için [Çok dilli destek](./docs/setup.md#multi-language-support) bölümüne bakın.

Her sabah 08:00 CST'de çalışan bir GitHub Actions iş akışı. Yapay zeka ekosistemine ait sinyalleri 10 veri kaynağından toplar ve ardından günlük özetleri (yapılandırılmış tüm dillerde) GitHub Sorunları ve taahhüt edilmiş Markdown dosyaları olarak yayınlar. Haftalık ve aylık özet raporlar da otomatik olarak oluşturulur.

## Veri Kaynakları

| Kaynak | Tür | Veri |

|--------|------|------|

| [GitHub Depoları](https://github.com) | API | 17'den fazla takip edilen yapay zeka aracı deposundan sorunlar, çekme istekleri ve sürümler |

| [Claude Kod Becerileri](https://github.com/anthropics/skills) | API | Topluluk etkileşimine göre sıralanmış trend beceriler |

| [GitHub Trendleri](https://github.com/trending) | HTML + API | Günlük trend depolar + yapay zeka konu araması (7 günlük pencere) |

| [Hacker Haberleri](https://news.ycombinator.com) | [Algolia API](https://hn.algolia.com/api) | Son 24 saatteki en iyi 30 yapay zeka haberi, 6 paralel sorgu |

| [Product Hunt](https://www.producthunt.com) | GraphQL API | Dün oylara göre en iyi yapay zeka ürünleri |

| [ArXiv](https://arxiv.org) | [ArXiv API](https://export.arxiv.org/api/query) | cs.AI, cs.CL, cs.LG'den en yeni makaleler (son 48 saat) |

| [Hugging Face](https://huggingface.co) | [Hub API](https://huggingface.co/api/models) | Haftalık beğenilere göre sıralanmış 30 trend model |

| [Dev.to](https://dev.to) | [Forem API](https://dev.to/api) | 5 etiketten en iyi yapay zeka/LLM makaleleri |

| [Lobste.rs](https://lobste.rs) | JSON API | Son 7 günün AI/ML etiketli haberleri |

| [Anthropic](https://anthropic.com) + [OpenAI](https://openai.com) | Site Haritası | `lastmod` farkı ile tespit edilen yeni makaleler |

## Web Arayüzü

**`PAGES_URL`** — Çatalınız için Web Arayüzü temel URL'sini yapılandırmak üzere bunu bir depo değişkeni olarak ayarlayın.

Tüm geçmiş özetleri temiz, koyu temalı bir arayüzde inceleyin — oturum açmaya gerek yok. Raporlar, bu depodaki Markdown dosyalarından GitHub Pages aracılığıyla oluşturulur.

Web arayüzü, `packages/web/` dizininde bulunan bir Vite + TypeScript SPA'dır. Çalışma zamanında `manifest.json` ve bireysel özet dosyalarını getirir — yeni günlük özetler herhangi bir arayüz yeniden oluşturma işlemine gerek kalmadan görünür.

```bash
bun run dev:web    # start Vite dev server for local UI development
bun run build:web  # build the web UI for deployment
```
![Web Arayüzü](assets/web-en.png)

## Telegram Kanalı ve Feishu Grubu

Günlük özet bildirimlerini doğrudan tercih ettiğiniz platforma almak için abone olun. Her mesaj, o güne ait tüm raporlara, Web Arayüzüne ve RSS akışına bağlantı verir.

<table>

<tr>

<td align="center"><b><a href="https://t.me/agents_radar">Telegram Kanalına Katıl</a></b></td>

<td align="center"><b><a href="https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=b56v3be8-b027-4ee6-abc4-65bf1f80bccd">Feishu Grubuna Katıl</a></b></td>

</tr>

<tr>

<td><img src="assets/telegram.jpg" width="300" alt="Telegram bildirimi"></td>

<td><img src="assets/feishu.jpg" width="300" alt="Feishu bildirimi"></td>

</tr>
</table>

## RSS Beslemesi

**`PAGES_URL`/feed.xml** — Yeni özetleri otomatik olarak almak için herhangi bir RSS okuyucusunda (Feedly, Reeder, NewsBlur, vb.) abone olun. Besleme URL'si, `PAGES_URL` ayarınızdan türetilir. Besleme, tüm rapor türlerindeki en son 30 raporu içerir ve `manifest.json` ile birlikte günlük olarak güncellenir.

## MCP Sunucusu

**`https://agents-radar-mcp.duanyytop.workers.dev`**

Agents-radar verilerini araçlar olarak sunan, barındırılan bir [Model Context Protocol](https://modelcontextprotocol.io) sunucusu. Herhangi bir MCP uyumlu istemci (Claude Desktop, OpenClaw, vb.) en son yapay zeka ekosistemi raporlarını doğrudan sorgulayabilir.

**Mevcut araçlar:**

| Araç | Açıklama |

|------|-------------|

| `list_reports` | Mevcut tarihleri ve rapor türlerini listele (son N gün) |

| `get_latest` | Belirli bir türdeki en son raporu getir |

| `get_report` | Tarih ve türe göre belirli bir raporu getir |

| `search` | Son raporlarda anahtar kelime araması |

**Claude Desktop kurulumu** — `~/Library/Application Support/Claude/claude_desktop_config.json` dosyasına ekleyin:

```json
{
  "mcpServers": {
    "agents-radar": {
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```
Kaydettikten sonra Claude Desktop'ı yeniden başlatın. Ardından Claude'a şunları sorabilirsiniz:

- *"Yapay zeka komut satırı araçlarındaki son gelişmeler neler?"* → `get_latest` çağrısını yapar
- *"Bu hafta Claude Code'da bahsedilenleri ara"* → `search` çağrısını yapar
- *"Bana 2026-03-05 için yapay zeka trend raporunu göster"* → `get_report` çağrısını yapar

**OpenClaw kurulumu** — aşağıdaki komutu çalıştırın:

```bash
openclaw mcp add --transport http agents-radar https://agents-radar-mcp.duanyytop.workers.dev
```
Veya `~/.openclaw/openclaw.json` dosyasına manuel olarak ekleyin:

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
Daha sonra OpenClaw'a şu gibi sorular sorabilirsiniz:

- *"Yapay Zeka CLI araçlarındaki son gelişmeler neler?"* → `get_latest` çağrılır
- *"Bu hafta Claude Code'un bahsettiği yerleri ara"* → `search` çağrılır
- *"Bana 2026-03-05 tarihli Yapay Zeka trend raporunu göster"* → `get_report` çağrılır

**Kendi sunucunuzda barındırma** — `mcp/` dizininden kendi örneğinizi dağıtın:

```bash
cd mcp
pnpm install
wrangler deploy
```

## İzlenen Kaynaklar

GitHub depoları, haberler, araştırmalar ve topluluk akışları dahil olmak üzere 10 veri kaynağı. Depo bağlantıları ve kaynak başına ayrıntılarla birlikte tam liste için [docs/sources.md](./docs/sources.md) dosyasına bakın.

**Kısa özet:** 9 AI CLI deposu + OpenClaw + 12 eş aracı (GitHub API) · Claude Code Skills · GitHub Trending (HTML + Arama API) · Hacker News · ArXiv · Hugging Face · Product Hunt · Dev.to · Lobste.rs · Anthropic + OpenAI site haritaları.

## Özellikler

- İzlenen tüm depolarda son 24 saat içinde güncellenen sorunları, çekme isteklerini ve sürümleri getirir
- Trend olan Claude Kod Becerilerini takip eder — güncelliğe göre değil, topluluk etkileşimine göre sıralanır
- Her CLI deposu için araç başına özet ve araçlar arası karşılaştırmalı analiz oluşturur
- Derinlemesine bir OpenClaw proje raporu ve 11 emsal projeye karşı ekosistemler arası karşılaştırma oluşturur
- Site haritaları aracılığıyla resmi Anthropic ve OpenAI web içeriğini tarar; yeni makaleleri kademeli olarak algılar
- GitHub Trendlerini günlük olarak izler + 6 yapay zeka konu etiketini arar; depoları boyuta göre sınıflandırır ve trend sinyallerini çıkarır
- Hacker News'ten en iyi 30 yapay zeka haberini getirir (son 24 saat, puanlara göre sıralanmıştır); topluluk duygu raporu oluşturur
- Her rapor türü için GitHub Sorunları yayınlar; Markdown dosyalarını `assets/digests/YYYY-MM-DD/` dizinine kaydeder
- GitHub Actions aracılığıyla günlük bir programda çalışır; Manuel tetiklemeyi destekler
- Tüm izlenen depolar `config.yml` aracılığıyla yapılandırılabilir — kod değişikliğine gerek yok
- `locales/*.json` aracılığıyla merkezi yerelleştirme sistemi — `packages/core/src/locales/t.ts` dosyasındaki `t()` kataloğu ile 21 desteklenen dil

## Kurulum

1. Bu depoyu **çatallayın**
2. LLM sağlayıcı anahtarınızı depo gizli anahtarı olarak ekleyin (örneğin `ANTHROPIC_API_KEY`)
3. **Eylemler** sekmesinde iş akışını etkinleştirin — bundan sonra otomatik olarak çalışır

Tam kılavuz için — gizli anahtarlar referansı, LLM sağlayıcıları, `config.yml` özelleştirmesi, yerel geliştirme, çok dilli yapılandırma ve zamanlama — [docs/setup.md](./docs/setup.md) dosyasına bakın.

## Çıktı Formatı

Etkinleştirilmiş her dil için rapor türü başına bir dosya, `assets/digests/YYYY-MM-DD/` dizinine yazılır. Geçmiş özetler [`assets/digests/`](./assets/digests/) dizinindedir. Tam dosya listesi, rapor başına yapı ve GitHub Sorun etiketi referansı için [docs/output-format.md](./docs/output-format.md) dosyasına bakın.

## SSS

Sıkça sorulan sorular — bir raporun neden atlandığı, çalıştırmanın maliyeti, depo ekleme, zamanlamayı değiştirme, 429 hatalarının giderilmesi — [docs/faq.md](./docs/faq.md) dosyasında yanıtlanmıştır.

## Katkıda Bulunma

Katkılar memnuniyetle karşılanır. Dal stratejisi, kodlama standartları, taahhüt kuralları ve yeni diller veya rapor türleri ekleme talimatları için [CONTRIBUTING.md](./CONTRIBUTING.md) dosyasına bakın.

## Yıldız Tarihi

[![Yıldız Tarihi Grafiği](https://api.star-history.com/svg?repos=duanyytop/agents-radar&type=Date)](https://star-history.com/#duanyytop/agents-radar&Date)
