# agentes-radar

## Idiomas admitidos

🇬🇧 Inglés · 🇨🇳 中文 · 🇯🇵 日本語 · 🇰🇷 한국어 · 🇪🇸 Español · 🇧🇷 Português · 🇫🇷 Français · 🇩🇪 Deutsch · 🇮🇹 Italiano · 🇵🇱 Polski · 🇷🇺 Русский · 🇸🇦 العربية · 🇹🇷 Türkçe · 🇻🇳 Tiếng Việt · 🇹🇭 ไทย · 🇳🇱 Nederlands · 🇮🇳 हिन्दी · 🇷🇴 Română · 🇮🇩 Bahasa Indonesia · 🇺🇦 Українська · 🇧🇩 বাংলা

Inglés | [Chino](./README.zh-CN.md)

Para habilitar idiomas adicionales para la generación de informes, consulte [Compatibilidad con varios idiomas](./docs/setup.md#multi-language-support).

Un flujo de trabajo de GitHub Actions que se ejecuta todas las mañanas a las 08:00 CST. Agrega señales del ecosistema de IA de 10 fuentes de datos y publica resúmenes diarios (en todos los idiomas configurados) como incidencias de GitHub y archivos Markdown confirmados. También genera automáticamente informes acumulativos semanales y mensuales.

## Fuentes de datos

| Fuente | Tipo | Datos |

|--------|------|------|

| [Repositorios de GitHub](https://github.com) | API | Incidencias, solicitudes de extracción y lanzamientos de más de 17 repositorios de herramientas de IA |

| [Habilidades de Claude Code](https://github.com/anthropics/skills) | API | Habilidades de tendencia ordenadas por participación de la comunidad |

| [Tendencias de GitHub](https://github.com/trending) | HTML + API | Repositorios de tendencia diarios + búsqueda de temas de IA (ventana de 7 días) |

| [Hacker News](https://news.ycombinator.com) | [API de Algolia](https://hn.algolia.com/api) | Las 30 noticias más importantes sobre IA de las últimas 24 horas, 6 consultas paralelas |

| [Product Hunt](https://www.producthunt.com) | API GraphQL | Los mejores productos de IA de ayer por votación |

| [ArXiv](https://arxiv.org) | [API de ArXiv](https://export.arxiv.org/api/query) | Últimos artículos de cs.AI, cs.CL, cs.LG (últimas 48 horas) |

| [Hugging Face](https://huggingface.co) | [API de Hub](https://huggingface.co/api/models) | 30 modelos en tendencia ordenados por "me gusta" semanales |

| [Dev.to](https://dev.to) | [API de Forem](https://dev.to/api) | Los mejores artículos sobre IA/LLM de 5 etiquetas |

| [Lobste.rs](https://lobste.rs) | API JSON | Noticias etiquetadas con IA/ML de los últimos 7 días |

| [Anthropic](https://anthropic.com) + [OpenAI](https://openai.com) | Mapa del sitio | Nuevos artículos detectados mediante la comparación de `lastmod` |

## Interfaz web

**`PAGES_URL`** — Establece esta variable de repositorio para configurar la URL base de la interfaz web para tu bifurcación.

Consulta todos los resúmenes históricos en una interfaz limpia con tema oscuro; no se requiere iniciar sesión. Los informes se generan a partir de los archivos Markdown de este repositorio mediante GitHub Pages.

La interfaz web es una SPA (Single Page Application) de Vite + TypeScript ubicada en `packages/web/`. Obtiene `manifest.json` y los archivos de resumen individuales en tiempo de ejecución; los nuevos resúmenes diarios aparecen sin necesidad de reconstruir la interfaz.

```bash
bun run dev:web    # start Vite dev server for local UI development
bun run build:web  # build the web UI for deployment
```
![Interfaz web](assets/web-en.png)

## Canal de Telegram y Grupo Feishu

Suscríbete para recibir notificaciones diarias con el resumen del día directamente en tu plataforma preferida. Cada mensaje incluye enlaces a todos los informes del día, además de la interfaz web y el feed RSS.

<table>

<tr>

<td align="center"><b><a href="https://t.me/agents_radar">Únete al canal de Telegram</a></b></td>

<td align="center"><b><a href="https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=b56v3be8-b027-4ee6-abc4-65bf1f80bccd">Únete al grupo de Feishu</a></b></td>

</tr>

<tr>

<td><img src="assets/telegram.jpg" width="300" alt="Notificación de Telegram"></td>

<td><img src="assets/feishu.jpg" width="300" alt="Notificación de Feishu"></td>

</tr>
</table>

## RSS Fuente

**`PAGES_URL`/feed.xml** — Suscríbase en cualquier lector de RSS (Feedly, Reeder, NewsBlur, etc.) para recibir automáticamente los nuevos resúmenes. La URL de la fuente se obtiene de la configuración de `PAGES_URL`. La fuente incluye los 30 informes más recientes de todos los tipos, actualizados diariamente junto con `manifest.json`.

## Servidor MCP

**`https://agents-radar-mcp.duanyytop.workers.dev`**

Un servidor [Model Context Protocol](https://modelcontextprotocol.io) alojado que expone los datos de agents-radar como herramientas. Cualquier cliente compatible con MCP (Claude Desktop, OpenClaw, etc.) puede consultar directamente los informes más recientes del ecosistema de IA.

**Herramientas disponibles:**

| Herramienta | Descripción |

|------|-------------|

| `list_reports` | Lista las fechas y tipos de informes disponibles (últimos N días) |

| `get_latest` | Obtiene el informe más reciente de un tipo determinado |

| `get_report` | Obtiene un informe específico por fecha y tipo |

| `search` | Búsqueda por palabra clave en informes recientes |

**Configuración de Claude Desktop** — agregue a `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "agents-radar": {
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```
Reinicia Claude Desktop después de guardar. Luego podrás hacerle preguntas como:

- *"¿Cuáles son las últimas novedades en herramientas CLI de IA?"* → llama a `get_latest`
- *"Busca menciones de Claude Code de esta semana"* → llama a `search`

- *"Muéstrame el informe de tendencias de IA del 5 de marzo de 2026"* → llama a `get_report`

**Configuración de OpenClaw** — ejecuta el siguiente comando:

```bash
openclaw mcp add --transport http agents-radar https://agents-radar-mcp.duanyytop.workers.dev
```
O agréguelo manualmente a `~/.openclaw/openclaw.json`:

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
Luego puedes hacerle a OpenClaw preguntas como:

- *"¿Cuáles son las últimas novedades en herramientas CLI de IA?"* → llama a `get_latest`
- *"Buscar menciones de Claude Code esta semana"* → llama a `search`

- *"Muéstrame el informe de tendencias de IA del 5 de marzo de 2026"* → llama a `get_report`

**Autoalojamiento**: implementa tu propia instancia desde el directorio `mcp/`:

```bash
cd mcp
pnpm install
wrangler deploy
```
## Fuentes rastreadas

10 fuentes de datos en repositorios de GitHub, noticias, investigaciones y feeds de la comunidad. Consulta [docs/sources.md](./docs/sources.md) para ver la lista completa con enlaces a los repositorios y detalles de cada fuente.

**Resumen rápido:** 9 repositorios de CLI de IA + OpenClaw + 12 agentes pares (API de GitHub) · Claude Code Skills · GitHub Trending (HTML + API de búsqueda) · Hacker News · ArXiv · Hugging Face · Product Hunt · Dev.to · Lobste.rs · Anthropic + mapas del sitio de OpenAI.

## Funcionalidades

- Obtiene incidencias, solicitudes de extracción y versiones actualizadas en las últimas 24 horas en todos los repositorios monitorizados.
- Monitoriza las tendencias de Claude Code Skills, ordenadas por participación de la comunidad, no por fecha de publicación.
- Genera un resumen por herramienta para cada repositorio de CLI y un análisis comparativo entre herramientas.
- Genera un informe detallado del proyecto OpenClaw, además de una comparación entre ecosistemas con 11 proyectos similares.
- Extrae contenido web oficial de Anthropic y OpenAI mediante mapas del sitio; detecta nuevos artículos de forma incremental.
- Monitoriza las tendencias diarias de GitHub y busca en 6 etiquetas temáticas de IA; clasifica los repositorios por dimensión y extrae señales de tendencia.
- Obtiene las 30 noticias más importantes sobre IA de Hacker News (últimas 24 horas, clasificadas por puntos); genera un informe de opinión de la comunidad.
- Publica incidencias de GitHub para cada tipo de informe; guarda los archivos Markdown en `assets/digests/AAAA-MM-DD/`.
- Se ejecuta diariamente mediante GitHub Actions. Admite activación manual.
- Todos los repositorios monitorizados se pueden configurar mediante `config.yml`; no se requieren cambios en el código.
- Sistema de localización centralizado mediante `locales/*.json`; 21 idiomas compatibles con el catálogo `t()` en `packages/core/src/locales/t.ts`.

## Configuración

1. Bifurque este repositorio.
2. Añada la clave de su proveedor LLM como secreto del repositorio (por ejemplo, `ANTHROPIC_API_KEY`).
3. Habilite el flujo de trabajo en la pestaña **Acciones**; se ejecutará automáticamente a partir de entonces.

Para obtener la guía completa (referencia de secretos, proveedores LLM, personalización de `config.yml`, desarrollo local, configuración multilingüe y programación), consulte [docs/setup.md](./docs/setup.md).

## Formato de salida

Un archivo por tipo de informe y por idioma habilitado, que se guarda en `assets/digests/AAAA-MM-DD/`. Los resúmenes históricos se encuentran en [`assets/digests/`](./assets/digests/). Consulta [docs/output-format.md](./docs/output-format.md) para ver la lista completa de archivos, la estructura de cada informe y la referencia de etiquetas de incidencias de GitHub.

## Preguntas frecuentes

Las preguntas más comunes —por qué se omitió un informe, cuánto cuesta ejecutarlo, cómo añadir repositorios, cómo cambiar la programación, cómo solucionar errores 429— se responden en [docs/faq.md](./docs/faq.md).

## Contribuciones

Se aceptan contribuciones. Consulta [CONTRIBUTING.md](./CONTRIBUTING.md) para obtener información sobre la estrategia de ramas, los estándares de codificación, las convenciones de confirmación y las instrucciones para añadir nuevos idiomas o tipos de informes.

## Historial estelar

[![Gráfico del historial estelar](https://api.star-history.com/svg?repos=duanyytop/agents-radar&type=Date)](https://star-history.com/#duanyytop/agents-radar&Date)

Gráfico del historial estelar