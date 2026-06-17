# agentes-radar

## Idiomas suportados

🇬🇧 Inglês · 🇨🇳 中文 · 🇯🇵 日本語 · 🇰🇷 한국어 · 🇪🇸 Español · 🇧🇷 Português · 🇫🇷 Français · 🇩🇪 Deutsch · 🇮🇹 Italiano · 🇵🇱 Polski · 🇷🇺 Русский · 🇸🇦 العربية · 🇹🇷 Türkçe · 🇻🇳 Tiếng Việt · 🇹🇭 ไทย · 🇳🇱 Nederlands · 🇮🇳 हिन्दी · 🇷🇴 Română · 🇮🇩 Bahasa Indonésia · 🇺🇦 Українська · 🇧🇩 বাংলা

Inglês | [Українська](./README.uk-UA.md) | [العربية](./README.ar-SA.md) | [Русский](./README.ru-RU.md) | [हिन्दी](./README.hi-IN.md) | [Alemão](./README.de-DE.md) | [Türkçe](./README.tr-TR.md) | [ไทย](./README.th-TH.md) | [Polês](./README.pl-PL.md) | [Italiano](./README.it-IT.md) | [Français](./README.fr-FR.md) | [中文](./README.zh-CN.md) | [Português](./README.pt-BR.md) | [Tiếng Việt](./README.vi-VN.md) | [বাংলা](./README.bn-BD.md) | [Espanhol](./README.es-ES.md) | [Bahasa Indonésia](./README.id-ID.md) | [Română](./README.ro-RO.md) | [한국어](./README.ko-KR.md) | [Holanda](./README.nl-NL.md) | [Japonês](./README.ja-JP.md)

Para habilitar idiomas adicionais para a geração de relatórios, consulte [Suporte a vários idiomas](./docs/setup.md#multi-language-support).

Um fluxo de trabalho do GitHub Actions que é executado todas as manhãs às 8h CST. Ele agrega sinais do ecossistema de IA de 10 fontes de dados e, em seguida, publica resumos diários (em todos os idiomas configurados) como Issues do GitHub e arquivos Markdown. Relatórios consolidados semanais e mensais também são gerados automaticamente.

## Fontes de Dados

| Fonte | Tipo | Dados |

|--------|------|------|
| [Repositórios do GitHub](https://github.com) | API | Issues, PRs e releases de mais de 17 repositórios de ferramentas de IA monitorados |

| [Habilidades do Claude Code](https://github.com/anthropics/skills) | API | Habilidades em alta classificadas por engajamento da comunidade |

| [Tendências do GitHub](https://github.com/trending) | HTML + API | Repositórios em alta diariamente + busca por tópicos de IA (janela de 7 dias) |
| [Hacker News](https://news.ycombinator.com) | [API da Algolia](https://hn.algolia.com/api) | 30 principais notícias de IA das últimas 24 horas, 6 consultas paralelas |
| [Product Hunt](https://www.producthunt.com) | API GraphQL | Principais produtos de IA de ontem por votos |
| [ArXiv](https://arxiv.org) | [API do ArXiv](https://export.arxiv.org/api/query) | Artigos mais recentes de cs.AI, cs.CL, cs.LG (últimas 48 horas) |
| [Hugging Face](https://huggingface.co) | [API do Hub](https://huggingface.co/api/models) | 30 modelos em alta, classificados por curtidas semanais |
| [Dev.to](https://dev.to) | [API do Forem](https://dev.to/api) | Principais artigos de IA/ML de 5 tags |
| [Lobste.rs](https://lobste.rs) | API JSON | Artigos com a tag IA/ML dos últimos 7 dias |

| [Anthropic](https://anthropic.com) + [OpenAI](https://openai.com) | Mapa do site | Novos artigos detectados via diff de `lastmod` |

## Interface Web

**`PAGES_URL`** — Defina esta variável de repositório para configurar a URL base da interface web para o seu fork.

Navegue por todos os resumos históricos em uma interface limpa e com tema escuro — sem necessidade de login. Os relatórios são renderizados a partir dos arquivos Markdown neste repositório via GitHub Pages.

A interface web é um SPA Vite + TypeScript em `packages/web/`. Ela busca o arquivo `manifest.json` e os arquivos de resumo individuais em tempo de execução — novos resumos diários aparecem sem a necessidade de recompilar a interface.

```bash
bun run dev:web    # start Vite dev server for local UI development
bun run build:web  # build the web UI for deployment
```
![Interface Web](assets/web-en.png)

## Canal do Telegram e Grupo Feishu

Inscreva-se para receber notificações diárias com um resumo dos relatórios, enviadas diretamente para sua plataforma preferida. Cada mensagem contém links para todos os relatórios do dia, além da interface web e do feed RSS.

![Interface Web](assets/web-en.png)

## Canal do Telegram e Grupo Feishu

Inscreva-se para receber notificações diárias diretamente na sua plataforma preferida. Cada mensagem inclui links para todos os relatórios do dia, além da interface web e do feed RSS.

[Interface Web](assets/web-en.png) <table>

<tr>

<td align="center"><b><a href="https://t.me/agents_radar">Entrar no canal do Telegram</a></b></td>

<td align="center"><b><a href="https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=b56v3be8-b027-4ee6-abc4-65bf1f80bccd">Entrar no grupo Feishu</a></b></td>

</tr>
<tr>

<td><img src="assets/telegram.jpg" width="300" alt="Notificação do Telegram"></td>

<td><img src="assets/feishu.jpg" width="300" alt="Notificação do Feishu"></td>

</tr>
</table>

## RSS Feed

**`PAGES_URL`/feed.xml** — Assine em qualquer leitor de RSS (Feedly, Reeder, NewsBlur, etc.) para receber novos resumos automaticamente. O URL do feed é derivado da sua configuração `PAGES_URL`. O feed inclui os 30 relatórios mais recentes de todos os tipos, atualizados diariamente juntamente com o arquivo `manifest.json`.

## Servidor MCP

**`https://agents-radar-mcp.duanyytop.workers.dev`**

Um servidor hospedado do [Model Context Protocol](https://modelcontextprotocol.io) que expõe os dados do agents-radar como ferramentas. Qualquer cliente compatível com MCP (Claude Desktop, OpenClaw, etc.) pode consultar os relatórios mais recentes do ecossistema de IA diretamente.

**Ferramentas disponíveis:**

| Ferramenta | Descrição |

|------|-------------|

| `list_reports` | Lista as datas e tipos de relatório disponíveis (últimos N dias) |

| `get_latest` | Busca o relatório mais recente de um determinado tipo |
| `get_report` | Busca um relatório específico por data e tipo |

| `search` | Busca por palavra-chave em relatórios recentes |

**Configuração do Claude Desktop** — adicione ao arquivo `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "agents-radar": {
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```
Reinicie o Claude Desktop após salvar. Você poderá então perguntar ao Claude coisas como:

- *"Quais são as últimas novidades em ferramentas de linha de comando de IA?"* → chama `get_latest`
- *"Buscar menções ao Claude Code esta semana"* → chama `search`
- *"Mostrar o relatório de tendências de IA para 05/03/2026"* → chama `get_report`

**Configuração do OpenClaw** — execute o seguinte comando:

```bash
openclaw mcp add --transport http agents-radar https://agents-radar-mcp.duanyytop.workers.dev
```
Ou adicione-o manualmente ao arquivo `~/.openclaw/openclaw.json`:


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
Você pode então consultar o OpenClaw para perguntas como:

- *"Quais são as ferramentas de linha de comando de IA mais recentes?"* → chama `get_latest`
- *"Buscar menções a Claude Code esta semana"* → chama `search`
- *"Mostrar o relatório de tendências de IA para 05/03/2026"* → chama `get_report`

**Auto-hospedagem** — implante sua própria instância a partir do diretório `mcp/`:

```bash
cd mcp
pnpm install
wrangler deploy
```
## Fontes rastreadas

10 fontes de dados em repositórios do GitHub, notícias, pesquisas e feeds da comunidade. Consulte [docs/sources.md](./docs/sources.md) para obter a lista completa com links para os repositórios e detalhes de cada fonte.

**Resumo rápido:** 9 repositórios de CLI de IA + OpenClaw + 12 agentes pares (API do GitHub) · Claude Code Skills · GitHub Trending (HTML + API de Busca) · Hacker News · ArXiv · Hugging Face · Product Hunt · Dev.to · Lobste.rs · Mapas do site da Anthropic + OpenAI.

## Funcionalidades

- Busca problemas, solicitações de pull e versões atualizadas nas últimas 24 horas em todos os repositórios monitorados
- Monitora as habilidades de código mais populares do Claude — classificadas por engajamento da comunidade, não por data de atualização
- Gera um resumo por ferramenta para cada repositório de CLI e uma análise comparativa entre ferramentas
- Gera um relatório detalhado do projeto OpenClaw, além de uma comparação com 11 projetos similares em todo o ecossistema
- Extrai conteúdo oficial da Anthropic e da OpenAI por meio de sitemaps; detecta novos artigos incrementalmente
- Monitora as Tendências do GitHub diariamente + pesquisa 6 tags de tópicos de IA; classifica repositórios por dimensão e extrai sinais de tendência
- Busca as 30 principais notícias de IA do Hacker News (últimas 24 horas, classificadas por pontos); gera um relatório de sentimento da comunidade
- Publica problemas no GitHub para cada tipo de relatório; envia arquivos Markdown para `assets/digests/AAAA-MM-DD/`
- Executa diariamente via GitHub Actions; Suporta acionamento manual
- Todos os repositórios rastreados são configuráveis via `config.yml` — nenhuma alteração de código é necessária
- Sistema de localização centralizado via `locales/*.json` — 21 idiomas suportados com catálogo `t()` em `packages/core/src/locales/t.ts`

## Configuração

1. **Faça um fork** deste repositório
2. Adicione sua chave de provedor LLM como um segredo do repositório (por exemplo, `ANTHROPIC_API_KEY`)
3. Habilite o fluxo de trabalho na guia **Ações** — ele será executado automaticamente a partir de então

Para o guia completo — referência de segredos, provedores LLM, personalização de `config.yml`, desenvolvimento local, configuração multilíngue e agendamento — consulte [docs/setup.md](./docs/setup.md).

## Formato de saída

Um arquivo por tipo de relatório por idioma habilitado, gravado em `assets/digests/AAAA-MM-DD/`. Os resumos históricos estão em [`assets/digests/`](./assets/digests/). Consulte [docs/output-format.md](./docs/output-format.md) para obter a lista completa de arquivos, a estrutura por relatório e a referência de rótulos de problemas do GitHub.

## Perguntas frequentes

Perguntas comuns — por que um relatório foi ignorado, quanto custa executá-lo, como adicionar repositórios, como alterar o agendamento, como solucionar erros 429 — respondidas em [docs/faq.md](./docs/faq.md).

## Contribuições

Contribuições são bem-vindas. Consulte [CONTRIBUTING.md](./CONTRIBUTING.md) para obter informações sobre estratégia de ramificação, padrões de codificação, convenções de commit e instruções para adicionar novos idiomas ou tipos de relatório.

## Histórico de estrelas

[![Gráfico de histórico de estrelas](https://api.star-history.com/svg?repos=duanyytop/agents-radar&type=Date)](https://star-history.com/#duanyytop/agents-radar&Date)

