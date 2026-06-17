#ตัวแทน-เรดาร์

## ภาษาที่รองรับ

ประเทศอังกฤษ | [เชคเกอร์](./README.uk-UA.md) | [🇮🇹 العربية](./README.ar-SA.md) | [🇷🇺 Русский](./README.ru-RU.md) | [🇮รี हिन्दी](./README.hi-IN.md) | [🇩🇪 Deutsch](./README.de-DE.md) | [🇹🇷 Türkçe](./README.tr-TR.md) | [🇹🇭 ไทย](./README.th-TH.md) | [ภูธร🇱 Polski](./README.pl-PL.md) | [🇮🇹 อิตาลี](./README.it-IT.md) | [🇫🇷 ฝรั่งเศส](./README.fr-FR.md) | [🇮🇹 中文](./README.zh-CN.md) | [🇧🇷 Português](./README.pt-BR.md) | [🇻🇷 Tiếng Viết](./README.vi-VN.md) | [🇧🇩 বাংলা](./README.bn-BD.md) | [🇪🇷 Español](./README.es-ES.md) | [🇮🇩 บาฮาซา อินโดนีเซีย](./README.id-ID.md) | [🇷🇴 โรมานา](./README.ro-RO.md) | [🇰🇷 เกาหลี](./README.ko-KR.md) | [🇮🇱 เนเธอร์แลนด์](./README.nl-NL.md) | [🇯🇵 ภาษาญี่ปุ่น](./README.ja-JP.md)

หากต้องการเปิดใช้งานภาษาเพิ่มเติมสำหรับการสร้างรายงาน โปรดดูที่ [การสนับสนุนหลายภาษา](./docs/setup.md#multi-language-support)

เวิร์กโฟลว์ GitHub Actions ที่ทำงานทุกเช้าเวลา 08:00 CST โดยจะรวบรวมสัญญาณระบบนิเวศ AI จากแหล่งข้อมูล 10 แหล่ง จากนั้นเผยแพร่บทสรุปรายวัน (ในทุกภาษาที่กำหนดค่าไว้) ในรูปแบบ GitHub Issues และไฟล์ Markdown ที่คอมมิตไว้ นอกจากนี้ยังมีการสร้างรายงานสรุปรายสัปดาห์และรายเดือนโดยอัตโนมัติ

## แหล่งข้อมูล

| แหล่งที่มา | ประเภท | ข้อมูล |

|--------|------|------|

| [GitHub Repos](https://github.com) | API | ปัญหา, PRs, การเผยแพร่จาก 17+ repos เครื่องมือ AI ที่ติดตาม |

| [ทักษะการเขียนโค้ดของ Claude](https://github.com/anthropics/skills) | API | ทักษะยอดนิยมเรียงลำดับตามการมีส่วนร่วมของชุมชน |

[GitHub Trending](https://github.com/trending) | HTML + API | คลังเก็บข้อมูลยอดนิยมรายวัน + การค้นหาหัวข้อ AI (ช่วงเวลา 7 วัน) |

[Hacker News](https://news.ycombinator.com) | [Algolia API](https://hn.algolia.com/api) | 30 เรื่องราว AI ยอดนิยมจาก 24 ชั่วโมงที่ผ่านมา, 6 การค้นหาแบบขนาน |

[Product Hunt](https://www.producthunt.com) | GraphQL API | ผลิตภัณฑ์ AI ยอดนิยมเมื่อวานนี้ตามคะแนนโหวต |

[ArXiv](https://arxiv.org) | [ArXiv API](https://export.arxiv.org/api/query) | บทความล่าสุดจาก cs.AI, cs.CL, cs.LG (48 ชั่วโมงที่ผ่านมา) |

[Hugging Face](https://huggingface.co) | [Hub API](https://huggingface.co/api/models) | 30 โมเดลยอดนิยม เรียงตามจำนวนไลค์รายสัปดาห์ |

[Dev.to](https://dev.to) | [Forem API](https://dev.to/api) | บทความ AI/LLM ยอดนิยมจาก 5 แท็ก |

[Lobste.rs](https://lobste.rs) | JSON API | เรื่องราวที่ติดแท็ก AI/ML จาก 7 วันที่ผ่านมา |

[Anthropic](https://anthropic.com) + [OpenAI](https://openai.com) | แผนผังเว็บไซต์ | ตรวจพบบทความใหม่ผ่านการเปรียบเทียบ `lastmod` |

## ส่วนติดต่อผู้ใช้บนเว็บ

**`PAGES_URL`** — ตั้งค่านี้เป็นตัวแปรของที่เก็บข้อมูลเพื่อกำหนดค่า URL พื้นฐานของส่วนติดต่อผู้ใช้บนเว็บสำหรับ fork ของคุณ

เรียกดูบทสรุปย้อนหลังทั้งหมดในอินเทอร์เฟซที่สะอาดตาและมีธีมสีเข้ม — ไม่จำเป็นต้องเข้าสู่ระบบ รายงานจะแสดงผลจากไฟล์ Markdown ในที่เก็บข้อมูลนี้ผ่าน GitHub Pages

ส่วนติดต่อผู้ใช้บนเว็บเป็น SPA ที่เขียนด้วย Vite และ TypeScript อยู่ใน `packages/web/` มันจะดึงไฟล์ `manifest.json` และไฟล์ไดเจสต์แต่ละไฟล์ในระหว่างการทำงาน — ไดเจสต์รายวันใหม่จะปรากฏขึ้นโดยไม่ต้องสร้างส่วนติดต่อผู้ใช้ใหม่

```bash
bun run dev:web    # start Vite dev server for local UI development
bun run build:web  # build the web UI for deployment
```
![Web UI](assets/web-en.png)

## ช่อง Telegram และกลุ่ม Feishu

สมัครรับการแจ้งเตือนสรุปรายวันโดยตรงไปยังแพลตฟอร์มที่คุณต้องการ ข้อความแต่ละข้อความจะเชื่อมโยงไปยังรายงานทั้งหมดสำหรับวันนั้น รวมถึง Web UI และฟีด RSS

<ตาราง>

<tr>

<td align="center"><b><a href="https://t.me/agents_radar">เข้าร่วมช่อง Telegram</a></b></td>
<td align="center"><b><a href="https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=b56v3be8-b027-4ee6-abc4-65bf1f80bccd">เข้าร่วมกลุ่ม Feishu</a></b></td>
</tr>

<tr>

<td><img src="assets/telegram.jpg" width="300" alt="การแจ้งเตือน Telegram"></td>

<td><img src="assets/feishu.jpg" width="300" alt="การแจ้งเตือน Feishu"></td>
</tr>
</table>

## RSS ฟีด

**`PAGES_URL`/feed.xml** — สมัครรับข้อมูลในโปรแกรมอ่าน RSS ใดก็ได้ (Feedly, Reeder, NewsBlur ฯลฯ) เพื่อรับรายงานสรุปใหม่โดยอัตโนมัติ URL ของฟีดจะมาจากค่า `PAGES_URL` ที่คุณตั้งไว้ ฟีดประกอบด้วยรายงานล่าสุด 30 ฉบับจากทุกประเภทรายงาน อัปเดตทุกวันพร้อมกับ `manifest.json`

## เซิร์ฟเวอร์ MCP

**`https://agents-radar-mcp.duanyytop.workers.dev`**

เซิร์ฟเวอร์ [Model Context Protocol](https://modelcontextprotocol.io) ที่โฮสต์ข้อมูล agents-radar ในรูปแบบเครื่องมือ ไคลเอนต์ที่เข้ากันได้กับ MCP ใดๆ (Claude Desktop, OpenClaw ฯลฯ) สามารถสอบถามรายงานระบบนิเวศ AI ล่าสุดได้โดยตรง

**เครื่องมือที่มีให้ใช้งาน:**

| เครื่องมือ | คำอธิบาย |

|-------------|

| `list_reports` | แสดงรายการวันที่และประเภทรายงานที่มีให้ใช้งาน (N วันที่ผ่านมา) |

| `get_latest` | ดึงรายงานล่าสุดของประเภทที่กำหนด |

`get_report` | ดึงรายงานเฉพาะตามวันที่และประเภท |

`search` | ค้นหาคำหลักในรายงานล่าสุด |

**การตั้งค่า Claude Desktop** — เพิ่มลงใน `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "agents-radar": {
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```
หลังจากบันทึกเสร็จแล้ว ให้รีสตาร์ท Claude Desktop จากนั้นคุณสามารถถาม Claude ได้ดังนี้:

- *"เครื่องมือ CLI AI ล่าสุดคืออะไร?"* → เรียกใช้ `get_latest`
- *"ค้นหาข้อความที่กล่าวถึง Claude Code ในสัปดาห์นี้"* → เรียกใช้ `search`
- *"แสดงรายงานแนวโน้ม AI สำหรับวันที่ 5 มีนาคม 2026"* → เรียกใช้ `get_report`

**การตั้งค่า OpenClaw** — เรียกใช้คำสั่งต่อไปนี้:

```bash
openclaw mcp add --transport http agents-radar https://agents-radar-mcp.duanyytop.workers.dev
```

หรือเพิ่มด้วยตนเองลงใน `~/.openclaw/openclaw.json`:

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
จากนั้นคุณสามารถถาม OpenClaw สิ่งต่างๆ ได้ เช่น:

- *"เครื่องมือ CLI AI ล่าสุดคืออะไร?"* → เรียกใช้ `get_latest`
- *"ค้นหาข้อความที่ Claude Code กล่าวถึงในสัปดาห์นี้"* → เรียกใช้ `search`
- *"แสดงรายงานแนวโน้ม AI สำหรับวันที่ 5 มีนาคม 2026"* → เรียกใช้ `get_report`

**การโฮสต์ด้วยตนเอง** — ติดตั้งอินสแตนซ์ของคุณเองจากไดเร็กทอรี `mcp/`:


**```bash
cd mcp
pnpm install
wrangler deploy
```

## แหล่งข้อมูลที่ติดตาม

10 แหล่งข้อมูลจาก GitHub repos, ข่าวสาร, งานวิจัย และฟีดชุมชน ดู [docs/sources.md](./docs/sources.md) สำหรับรายการทั้งหมดพร้อมลิงก์ไปยัง repository และรายละเอียดของแต่ละแหล่งข้อมูล

**สรุปโดยย่อ:** 9 repos AI CLI + OpenClaw + 12 peer agents (GitHub API) · Claude Code Skills · GitHub Trending (HTML + Search API) · Hacker News · ArXiv · Hugging Face · Product Hunt · Dev.to · Lobster.rs · Anthropic + แผนผังเว็บไซต์ OpenAI

## คุณสมบัติ

- ดึงข้อมูลปัญหา คำขอพูล และการเผยแพร่ที่อัปเดตใน 24 ชั่วโมงที่ผ่านมาจากทุกที่เก็บข้อมูลที่ติดตาม
- ติดตามทักษะ Claude Code ที่กำลังเป็นที่นิยม — เรียงลำดับตามการมีส่วนร่วมของชุมชน ไม่ใช่ความใหม่
- สร้างสรุปต่อเครื่องมือสำหรับแต่ละที่เก็บ CLI และการวิเคราะห์เปรียบเทียบข้ามเครื่องมือ
- สร้างรายงานโครงการ OpenClaw อย่างละเอียด พร้อมการเปรียบเทียบข้ามระบบนิเวศกับ 11 โครงการที่คล้ายคลึงกัน
- ดึงเนื้อหาเว็บอย่างเป็นทางการของ Anthropic และ OpenAI ผ่านแผนผังเว็บไซต์ ตรวจจับบทความใหม่ ๆ อย่างต่อเนื่อง
- ตรวจสอบ GitHub Trending ทุกวัน + ค้นหาแท็กหัวข้อ AI 6 แท็ก จัดประเภทที่เก็บตามมิติและดึงสัญญาณแนวโน้ม
- ดึงเรื่องราว AI 30 อันดับแรกจาก Hacker News (24 ชั่วโมงที่ผ่านมา จัดอันดับตามคะแนน) สร้างรายงานความรู้สึกของชุมชน
- เผยแพร่ GitHub Issues สำหรับแต่ละประเภทรายงาน บันทึกไฟล์ Markdown ไปยัง `assets/digests/YYYY-MM-DD/`
- รันตามกำหนดการรายวันผ่าน GitHub Actions; รองรับการเรียกใช้งานด้วยตนเอง
- สามารถกำหนดค่า repository ที่ติดตามทั้งหมดได้ผ่าน `config.yml` — ไม่จำเป็นต้องแก้ไขโค้ด
- ระบบภาษาแบบรวมศูนย์ผ่าน `locales/*.json` — รองรับ 21 ภาษา พร้อมแคตตาล็อก `t()` ใน `packages/core/src/locales/t.ts`

## การตั้งค่า

1. **Fork** repository นี้
2. เพิ่มคีย์ผู้ให้บริการ LLM ของคุณเป็น repository secret (เช่น `ANTHROPIC_API_KEY`)
3. เปิดใช้งานเวิร์กโฟลว์ในแท็บ **Actions** — จากนั้นจะทำงานโดยอัตโนมัติ

สำหรับคู่มือฉบับเต็ม — ข้อมูลอ้างอิง secrets, ผู้ให้บริการ LLM, การปรับแต่ง `config.yml`, การพัฒนาในพื้นที่, การกำหนดค่าหลายภาษา และการกำหนดเวลา — ดูที่ [docs/setup.md](./docs/setup.md)

## รูปแบบผลลัพธ์

ไฟล์หนึ่งไฟล์ต่อประเภทรายงานต่อภาษาที่เปิดใช้งาน โดยเขียนลงใน `assets/digests/YYYY-MM-DD/` ข้อมูลสรุปในอดีตจะอยู่ใน [`assets/digests/`](./assets/digests/) ดู [docs/output-format.md](./docs/output-format.md) สำหรับรายการไฟล์ทั้งหมด โครงสร้างต่อรายงาน และข้อมูลอ้างอิงป้ายกำกับปัญหา GitHub

## คำถามที่พบบ่อย

คำถามทั่วไป — เหตุใดรายงานจึงถูกข้าม ค่าใช้จ่ายในการเรียกใช้ การเพิ่ม repository การเปลี่ยนกำหนดการ การแก้ไขปัญหา 429 — มีคำตอบอยู่ใน [docs/faq.md](./docs/faq.md)

## การมีส่วนร่วม

ยินดีรับการมีส่วนร่วม ดู [CONTRIBUTING.md](./CONTRIBUTING.md) สำหรับกลยุทธ์สาขา มาตรฐานการเขียนโค้ด ข้อกำหนดการ commit และคำแนะนำสำหรับการเพิ่มภาษาหรือประเภทรายงานใหม่


## ประวัติของดาว

[![แผนภูมิประวัติของดาว](https://api.star-history.com/svg?repos=duanyytop/agents-radar&type=Date)](https://star-history.com/#duanyytop/agents-radar&Date)

