# وكلاء الرادار

## اللغات المدعومة

🇬🇧 الإنجليزية · 🇨🇳 中文 · 🇯🇵 日本語 · 🇰🇷 한국어 · 🇪🇸 الإسبانية · 🇧🇷 البرتغالية · 🇫🇷 الفرنسية · 🇩🇪 الألمانية · 🇮🇹 Italiano · 🇵🇱 Polski · 🇷🇺 Русский · 🇸🇦 العربية · 🇹🇷 Türkçe · 🇻🇳 Tiếng Việt · 🇹🇭 ไทย · 🇳🇱 Nederlands · 🇮🇳 هندى · 🇷🇴 Română · 🇮🇩 البهاسا الإندونيسية · 🇺🇦 أوكرانيا · 🇧🇩 بنغلاديش

الإنجليزية | [Українська](./README.uk-UA.md) | [العربية](./README.ar-SA.md) | [Русский](./README.ru-RU.md) | [هيندي](./README.hi-IN.md) | [الألمانية](./README.de-DE.md) | [Türkçe](./README.tr-TR.md) | [ไทย](./README.th-TH.md) | [بولسكي](./README.pl-PL.md) | [الإيطالية](./README.it-IT.md) | [Français](./README.fr-FR.md) | [中文](./README.zh-CN.md) | [البرتغالية](./README.pt-BR.md) | [تيانج فيت](./README.vi-VN.md) | [تمهيد](./README.bn-BD.md) | [الإسبانية](./README.es-ES.md) | [الإندونيسية](./README.id-ID.md) | [الرومانية](./README.ro-RO.md) | [الكورية](./README.ko-KR.md) | [الهولندية](./README.nl-NL.md) | [اليابانية](./README.ja-JP.md)

لتفعيل لغات إضافية لإنشاء التقارير، راجع [دعم اللغات المتعددة](./docs/setup.md#multi-language-support).

سير عمل GitHub Actions يُنفذ كل صباح الساعة 8:00 بتوقيت CST. يجمع هذا النظام إشارات بيئة الذكاء الاصطناعي من 10 مصادر بيانات، ثم ينشر ملخصات يومية (بجميع اللغات المُهيأة) كملفات GitHub Issues وملفات Markdown المُلتزمة. كما يتم إنشاء تقارير تجميعية أسبوعية وشهرية تلقائيًا.

## مصادر البيانات

| المصدر | النوع | البيانات |

|--------|------|------|

| [مستودعات GitHub](https://github.com) | واجهة برمجة التطبيقات | المشكلات، وطلبات السحب، والإصدارات من أكثر من 17 مستودعًا لأدوات الذكاء الاصطناعي المُتتبعة |

| [مهارات Claude البرمجية](https://github.com/anthropics/skills) | واجهة برمجة التطبيقات | المهارات الرائجة مُرتبة حسب تفاعل المجتمع |

| [المهارات الرائجة على GitHub](https://github.com/trending) | HTML + واجهة برمجة التطبيقات | المستودعات الرائجة يوميًا + البحث عن مواضيع الذكاء الاصطناعي (خلال 7 أيام) |

| [هاكر نيوز](https://news.ycombinator.com) | [واجهة برمجة تطبيقات ألغوليا](https://hn.algolia.com/api) | أهم 30 خبرًا في مجال الذكاء الاصطناعي خلال الـ 24 ساعة الماضية، 6 استعلامات متوازية |


[برودكت هانت](https://www.producthunt.com) | واجهة برمجة تطبيقات GraphQL | أفضل منتجات الذكاء الاصطناعي ليوم أمس حسب التصويت |


[أركيف](https://arxiv.org) | [واجهة برمجة تطبيقات أركيف](https://export.arxiv.org/api/query) | أحدث الأبحاث من cs.AI و cs.CL و cs.LG (خلال الـ 48 ساعة الماضية) |


[هاغينغ فيس](https://huggingface.co) | [واجهة برمجة تطبيقات Hub](https://huggingface.co/api/models) | 30 نموذجًا رائجًا مرتبة حسب الإعجابات الأسبوعية |


[ديف.تو](https://dev.to) | [Forem API](https://dev.to/api) | أفضل مقالات الذكاء الاصطناعي/التعلم الآلي من 5 وسوم |

| [Lobste.rs](https://lobste.rs) | JSON API | قصص مُوسومة بالذكاء الاصطناعي/التعلم الآلي من آخر 7 أيام |

| [Anthropic](https://anthropic.com) + [OpenAI](https://openai.com) | خريطة الموقع | يتم رصد المقالات الجديدة عبر `lastmod` diff |


## واجهة المستخدم

**`PAGES_URL`** — عيّن هذا كمتغير في المستودع لتكوين عنوان URL الأساسي لواجهة المستخدم لنسختك.


تصفح جميع الملخصات السابقة في واجهة أنيقة ذات تصميم داكن — لا يتطلب تسجيل دخول. يتم عرض التقارير من ملفات Markdown في هذا المستودع عبر صفحات GitHub.


واجهة المستخدم عبارة عن تطبيق صفحة واحدة (SPA) مكتوب بلغة Vite + TypeScript في `packages/web/`. يقوم البرنامج بجلب ملف `manifest.json` وملفات الملخصات الفردية أثناء التشغيل، فتظهر ملخصات يومية جديدة دون الحاجة إلى إعادة بناء واجهة المستخدم.


```bash
bun run dev:web    # start Vite dev server for local UI development
bun run build:web  # build the web UI for deployment
```

![واجهة المستخدم على الويب](assets/web-en.png)

## قناة تيليجرام ومجموعة فيشو

اشترك لتلقي ملخصات يومية مباشرةً على منصتك المفضلة. تحتوي كل رسالة على روابط لجميع التقارير الخاصة بذلك اليوم، بالإضافة إلى واجهة المستخدم على الويب وخلاصة RSS.
... <table>

<tr>

<td align="center"><b><a href="https://t.me/agents_radar">انضم إلى قناة تيليجرام</a></b></td>

<td align="center"><b><a href="https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=b56v3be8-b027-4ee6-abc4-65bf1f80bccd">انضم إلى مجموعة فيشو</a></b></td>

</tr>

<tr>

<td><img src="assets/telegram.jpg" width="300" alt="إشعار تيليجرام"></td>

<td><img src="assets/feishu.jpg" width="300" alt="إشعار فيشو"></td>
</tr>
</table>

## موجز RSS

**`PAGES_URL`/feed.xml** — اشترك في أي قارئ RSS (مثل Feedly، Reeder، NewsBlur، إلخ) لتلقي ملخصات جديدة تلقائيًا. يتم اشتقاق رابط الموجز من إعداد `PAGES_URL` الخاص بك. يتضمن الموجز أحدث 30 تقريرًا من جميع أنواع التقارير، ويتم تحديثه يوميًا مع ملف `manifest.json`.


## خادم MCP

**`https://agents-radar-mcp.duanyytop.workers.dev`**

خادم مُستضاف لبروتوكول سياق النموذج (Model Context Protocol) (https://modelcontextprotocol.io) يُتيح الوصول إلى بيانات agents-radar كأدوات. يمكن لأي عميل متوافق مع MCP (مثل Claude Desktop، OpenClaw، إلخ) الاستعلام مباشرةً عن أحدث تقارير نظام الذكاء الاصطناعي.


**الأدوات المتاحة:**

| الأداة | الوصف |

|------|-------------|

| `list_reports` | عرض التواريخ وأنواع التقارير المتاحة (آخر N يومًا) |

| `get_latest` | جلب أحدث تقرير من نوع محدد |

| `get_report` | جلب تقرير محدد حسب التاريخ والنوع |

| `search` | البحث بالكلمات المفتاحية في التقارير الحديثة |


**إعداد Claude Desktop** — أضف إلى `~/Library/Application Support/Claude/claude_desktop_config.json`:


```json
{
  "mcpServers": {
    "agents-radar": {
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```
أعد تشغيل Claude Desktop بعد الحفظ. يمكنك حينها سؤال Claude أسئلة مثل:

- *"ما هي أحدث أدوات سطر الأوامر للذكاء الاصطناعي؟"* → استدعاء `get_latest`

- *"ابحث عن إشارات Claude Code لهذا الأسبوع"* → استدعاء `search`

- *"أرني تقرير اتجاهات الذكاء الاصطناعي بتاريخ 5 مارس 2026"* → استدعاء `get_report`

**إعداد OpenClaw** — نفّذ الأمر التالي:


```bash
openclaw mcp add --transport http agents-radar https://agents-radar-mcp.duanyytop.workers.dev
```
أو أضفها يدويًا إلى `~/.openclaw/openclaw.json`:

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
يمكنك بعد ذلك طرح أسئلة على OpenClaw، مثل:

- *"ما هي أحدث أدوات سطر الأوامر للذكاء الاصطناعي؟"* → استدعاء `get_latest`
- *"ابحث عن إشارات Claude Code هذا الأسبوع"* → استدعاء `search`
- *"أرني تقرير اتجاهات الذكاء الاصطناعي بتاريخ 5 مارس 2026"* → استدعاء `get_report`

**الاستضافة الذاتية** — انشر نسختك الخاصة من مجلد `mcp/`:


```bash
cd mcp
pnpm install
wrangler deploy
```
## المصادر المُتتبّعة

١٠ مصادر بيانات من مستودعات GitHub، والأخبار، والأبحاث، وموجزات المجتمع. راجع [docs/sources.md](./docs/sources.md) للاطلاع على القائمة الكاملة مع روابط المستودعات وتفاصيل كل مصدر.

**ملخص سريع:** ٩ مستودعات واجهات سطر أوامر الذكاء الاصطناعي + OpenClaw + ١٢ وكيلًا نظيرًا (واجهة برمجة تطبيقات GitHub) · مهارات برمجة Claude · GitHub Trending (HTML + واجهة برمجة تطبيقات البحث) · Hacker News · ArXiv · Hugging Face · Product Hunt · Dev.to · Lobste.rs · خرائط مواقع Anthropic وOpenAI.



## الميزات

- جلب المشكلات وطلبات السحب والإصدارات المُحدَّثة خلال الـ ٢٤ ساعة الماضية من جميع المستودعات المُتتبَّعة

- تتبُّع مهارات Claude Code الرائجة - مُرتبة حسب تفاعل المجتمع، وليس حسب الحداثة

- إنشاء مُلخَّص لكل أداة في مستودع واجهة سطر الأوامر، بالإضافة إلى تحليل مُقارن بين الأدوات

- إنشاء تقرير مُفصَّل عن مشروع OpenClaw، بالإضافة إلى مُقارنة شاملة مع ١١ مشروعًا مُماثلاً

- استخراج محتوى الويب الرسمي لـ Anthropic وOpenAI عبر خرائط المواقع؛ واكتشاف المقالات الجديدة تدريجيًا

- مُراقبة GitHub Trending يوميًا، والبحث في ٦ وسوم لمواضيع الذكاء الاصطناعي؛ وتصنيف المستودعات حسب البُعد، واستخراج مؤشرات الاتجاه

- جلب أفضل ٣٠ قصة في مجال الذكاء الاصطناعي من Hacker News (خلال الـ ٢٤ ساعة الماضية، مُرتبة حسب النقاط)؛ وإنشاء تقرير عن آراء المجتمع

- نشر مشكلات GitHub لكل نوع من أنواع التقارير؛ يقوم بحفظ ملفات Markdown في `assets/digests/YYYY-MM-DD/`

- يتم تشغيله يومياً عبر GitHub Actions؛ يدعم التشغيل اليدوي
- جميع المستودعات المُتتبّعة قابلة للتكوين عبر ملف `config.yml` - لا حاجة لتغيير أي كود
- نظام لغة مركزي عبر `locales/*.json` - يدعم 21 لغة مع فهرس `t()` في `packages/core/src/locales/t.ts`

## الإعداد

1. **أنشئ نسخة** من هذا المستودع

2. أضف مفتاح موفر LLM الخاص بك كسرّ للمستودع (مثلاً `ANTHROPIC_API_KEY`)

3. فعّل سير العمل في علامة التبويب **الإجراءات** - سيعمل تلقائيًا من الآن فصاعدًا

للاطلاع على الدليل الكامل - مرجع الأسرار، وموفرو LLM، وتخصيص `config.yml`، والتطوير المحلي، وتكوين اللغات المتعددة، والجدولة - راجع [docs/setup.md](./docs/setup.md).
... ## تنسيق الإخراج

ملف واحد لكل نوع تقرير ولكل لغة مُفعّلة، يُكتب في المسار `assets/digests/YYYY-MM-DD/`. توجد ملخصات التقارير السابقة في المسار `assets/digests/`. راجع الملف `docs/output-format.md` للاطلاع على قائمة الملفات الكاملة، وبنية كل تقرير، ومرجع تصنيفات مشاكل GitHub.

## الأسئلة الشائعة

أسئلة شائعة - مثل: لماذا تم تخطي تقرير؟ ما تكلفة تشغيله؟ إضافة مستودعات؟ تغيير الجدول الزمني؟ حل مشكلات الخطأ 429؟ - تجد إجاباتها في الملف `docs/faq.md`.

## المساهمة

نرحب بالمساهمات. راجع الملف `CONTRIBUTING.md` للاطلاع على استراتيجية الفروع، ومعايير البرمجة، واتفاقيات الالتزام، وتعليمات إضافة لغات أو أنواع تقارير جديدة.

## تاريخ النجوم

[![مخطط تاريخ النجوم](https://api.star-history.com/svg?repos=duanyytop/agents-radar&type=Date)](https://star-history.com/#duanyytop/agents-radar&Date)



#تاريخ النجوم


[![مخطط تاريخ النجوم](https://api.star-history.com/svg?repos=duanyytop/agents-radar&type=Date)



[![مخطط تاريخ النجوم](https://star-history.com/#duanyytop/agents-radar&Date)



[![مخطط تاريخ النجوم](https://api.star-history.com/svg?repos= ...