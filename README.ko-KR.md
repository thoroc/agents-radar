# 에이전트 레이더

## 지원되는 언어

🇬🇧 영어 · 🇨🇳 中文 · 🇯🇵 日本語 · 🇷🇷 한국어 · 🇪🇸 Español · 🇧🇷 Português · 🇫🇷 Français · 🇩🇪 Deutsch · 🇮🇹 Italiano · 🇵🇱 Polski · 🇷🇺 Русский · 🇸🇦 العربية · 🇹🇷 Türkçe · 🇻🇳 Tiếng Viet · 🇹🇭 ไท้ · 🇳🇱 Nederlands · 🇮🇳 hin्دي · 🇷🇴 Română · 🇮🇩 바하사 인도네시아 · 🇺🇦 Украѕнська · 🇧🇩 বাংলা

영어 | [Украѕнська](./README.uk-UA.md) | [العربية](./README.ar-SA.md) | [Русский](./README.ru-RU.md) | [힌디어](./README.hi-IN.md) | [독일어](./README.de-DE.md) | [터키어](./README.tr-TR.md) | [ไท้](./README.th-TH.md) | [폴스키](./README.pl-PL.md) | [이탈리아어](./README.it-IT.md) | [프랑스어](./README.fr-FR.md) | [중문](./README.zh-CN.md) | [포르투갈어](./README.pt-BR.md) | [Tiếng Viet](./README.vi-VN.md) | [문서](./README.bn-BD.md) | [스페인어](./README.es-ES.md) | [인도네시아어](./README.id-ID.md) | [로마](./README.ro-RO.md) | [한국어](./README.ko-KR.md) | [네덜란드](./README.nl-NL.md) | [일본어](./README.ja-JP.md)

보고서 생성에 추가 언어를 사용하려면 [다국어 지원](./docs/setup.md#multi-language-support)을 참조하세요.

이 GitHub Actions 워크플로는 매일 아침 8시(미국 중부 표준시)에 실행됩니다. 10개의 데이터 소스에서 AI 생태계 신호를 집계하여 구성된 모든 언어로 일일 요약 보고서를 GitHub 이슈 및 커밋된 Markdown 파일로 게시합니다. 주간 및 월간 종합 보고서도 자동으로 생성됩니다.

## 데이터 소스

| 소스 | 유형 | 데이터 |

|--------|------|------|

[GitHub 리포지토리](https://github.com) | API | 추적 중인 17개 이상의 AI 도구 리포지토리의 이슈, PR, 릴리스 |

[Claude Code 스킬](https://github.com/anthropics/skills) | API | 커뮤니티 참여도 순으로 정렬된 인기 스킬 |

| [GitHub Trending](https://github.com/trending) | HTML + API | 일일 인기 저장소 + AI 주제 검색(7일 기간) |

| [Hacker News](https://news.ycombinator.com) | [Algolia API](https://hn.algolia.com/api) | 지난 24시간 동안의 AI 관련 주요 뉴스 30개, 6개 병렬 쿼리 |

| [Product Hunt](https://www.producthunt.com) | GraphQL API | 어제 투표 수 기준 최고 AI 제품 |

| [ArXiv](https://arxiv.org) | [ArXiv API](https://export.arxiv.org/api/query) | cs.AI, cs.CL, cs.LG 최신 논문(지난 48시간) |

| [Hugging Face](https://huggingface.co) | [Hub API](https://huggingface.co/api/models) | 주간 좋아요 수 기준으로 정렬된 인기 모델 30개 |

[Dev.to](https://dev.to) | [Forem API](https://dev.to/api) | 5개 태그별 인기 AI/LLM 기사 |

[Lobste.rs](https://lobste.rs) | JSON API | 지난 7일간 AI/ML 태그가 지정된 기사 |

[Anthropic](https://anthropic.com) + [OpenAI](https://openai.com) | 사이트맵 | `lastmod` 변경 사항을 통해 새 기사 감지 |

## 웹 UI

**`PAGES_URL`** — 이 변수를 저장소 변수로 설정하여 포크의 웹 UI 기본 URL을 구성하세요.

깔끔하고 어두운 테마의 인터페이스에서 모든 과거 요약을 탐색할 수 있습니다. 로그인이 필요하지 않습니다. 보고서는 이 저장소의 Markdown 파일을 GitHub Pages를 통해 렌더링합니다.

웹 UI는 `packages/web/`에 있는 Vite + TypeScript 기반의 SPA입니다. 런타임에 `manifest.json` 파일과 개별 요약 파일을 가져오므로, 새로운 일일 요약 정보는 UI를 다시 빌드하지 않고도 표시됩니다.

```bash
bun run dev:web    # start Vite dev server for local UI development
bun run build:web  # build the web UI for deployment
```
![웹 UI](assets/web-en.png)

## 텔레그램 채널 및 페이슈 그룹

구독하시면 매일 요약 보고서를 원하시는 플랫폼으로 바로 받아보실 수 있습니다. 각 메시지에는 당일 보고서 전체와 웹 UI, RSS 피드 링크가 포함되어 있습니다.

<테이블>

<tr>
<td align="center"><b><a href="https://t.me/agents_radar">텔레그램 채널 가입</a></b></td>
<td align="center"><b><a href="https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=b56v3be8-b027-4ee6-abc4-65bf1f80bccd">페이슈 그룹 가입</a></b></td>
</tr>
<tr>
<td><img src="assets/telegram.jpg" width="300" alt="텔레그램 알림"></td>

<td><img src="assets/feishu.jpg" width="300" alt="페이슈 알림"></td>
</tr>
</테이블>

## RSS 피드

**`PAGES_URL`/feed.xml** — Feedly, Reeder, NewsBlur 등과 같은 RSS 리더에서 구독하여 새 요약본을 자동으로 수신하세요. 피드 URL은 `PAGES_URL` 설정에서 파생됩니다. 이 피드에는 모든 보고서 유형의 최신 30개 보고서가 포함되어 있으며, `manifest.json`과 함께 매일 업데이트됩니다.

## MCP 서버

**`https://agents-radar-mcp.duanyytop.workers.dev`**

agents-radar 데이터를 도구로 제공하는 호스팅된 [모델 컨텍스트 프로토콜](https://modelcontextprotocol.io) 서버입니다. Claude Desktop, OpenClaw 등과 같은 MCP 호환 클라이언트는 최신 AI 생태계 보고서를 직접 쿼리할 수 있습니다.

**사용 가능한 도구:**

| 도구 | 설명 |

|------|-------------|

| `list_reports` | 사용 가능한 날짜 및 보고서 유형 목록 (최근 N일) |

| `get_latest` | 지정된 유형의 최신 보고서를 가져옵니다. |

| `get_report` | 날짜 및 유형별로 특정 보고서를 가져옵니다. |

| `search` | 최근 보고서에서 키워드를 검색합니다. |

**Claude Desktop 설정** — `~/Library/Application Support/Claude/claude_desktop_config.json` 파일에 다음을 추가합니다.

```json
{
  "mcpServers": {
    "agents-radar": {
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```
저장 후 Claude Desktop을 다시 시작하세요. 그러면 Claude에게 다음과 같은 질문을 할 수 있습니다.

- "최신 AI CLI 도구는 무엇인가요?" → `get_latest` 호출
- "이번 주 Claude Code 언급을 검색해 주세요." → `search` 호출
- "2026년 3월 5일 AI 트렌드 보고서를 보여주세요." → `get_report` 호출

**OpenClaw 설정** — 다음 명령어를 실행하세요.

```bash
openclaw mcp add --transport http agents-radar https://agents-radar-mcp.duanyytop.workers.dev
```
또는 `~/.openclaw/openclaw.json` 파일에 수동으로 추가하세요.

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
OpenClaw에 다음과 같은 질문을 할 수 있습니다.

- "최신 AI CLI 도구는 무엇인가요?" → `get_latest` 호출
- "이번 주 Claude Code 언급을 검색해 주세요." → `search` 호출
- "2026년 3월 5일 AI 트렌드 보고서를 보여주세요." → `get_report` 호출

**자체 호스팅** — `mcp/` 디렉터리에서 인스턴스를 배포하세요.

```bash
cd mcp
pnpm install
wrangler deploy
```
## 추적 소스

GitHub 리포지토리, 뉴스, 연구 자료 및 커뮤니티 피드를 포함한 10개의 데이터 소스를 사용했습니다. 전체 목록과 리포지토리 링크 및 소스별 세부 정보는 [docs/sources.md](./docs/sources.md)를 참조하세요.

**간략 요약:** 9개의 AI CLI 리포지토리 + OpenClaw + 12개의 피어 에이전트(GitHub API) · Claude Code Skills · GitHub Trending(HTML + 검색 API) · Hacker News · ArXiv · Hugging Face · Product Hunt · Dev.to · Lobste.rs · Anthropic + OpenAI 사이트맵

## 주요 기능

- 추적하는 모든 저장소에서 지난 24시간 동안 업데이트된 이슈, 풀 리퀘스트, 릴리스를 가져옵니다.
- 커뮤니티 참여도를 기준으로 정렬된 Claude Code Skills의 인기 동향을 추적합니다.
- 각 CLI 저장소에 대한 도구별 요약 보고서와 도구 간 비교 분석 보고서를 생성합니다.
- OpenClaw 프로젝트에 대한 심층 보고서와 11개의 유사 프로젝트와의 생태계 전반 비교 분석 보고서를 생성합니다.
- 사이트맵을 통해 Anthropic 및 OpenAI의 공식 웹 콘텐츠를 스크랩하고, 새로운 게시물을 점진적으로 감지합니다.
- GitHub Trending을 매일 모니터링하고 6개의 AI 주제 태그를 검색하여 저장소를 차원별로 분류하고 트렌드 신호를 추출합니다.
- Hacker News에서 지난 24시간 동안의 상위 30개 AI 관련 기사(점수 기준)를 가져오고, 커뮤니티 여론 보고서를 생성합니다.
- 각 보고서 유형에 대한 GitHub 이슈를 게시하고, Markdown 파일을 `assets/digests/YYYY-MM-DD/`에 커밋합니다.
- GitHub Actions를 통해 매일 실행되도록 예약되어 있습니다. 수동 트리거링 지원
- 모든 추적 대상 저장소는 `config.yml` 파일을 통해 구성 가능하며, 코드 변경이 필요하지 않습니다.
- `locales/*.json` 파일을 통한 중앙 집중식 로케일 시스템 - `packages/core/src/locales/t.ts` 파일의 `t()` 카탈로그를 통해 21개 언어를 지원합니다.

## 설정

1. 이 저장소를 **포크**하세요.
2. LLM 공급자 키를 저장소 비밀 키(예: `ANTHROPIC_API_KEY`)로 추가하세요.
3. **작업** 탭에서 워크플로를 활성화하세요. 활성화 후에는 자동으로 실행됩니다.

전체 가이드(비밀 키 참조, LLM 공급자, `config.yml` 사용자 지정, 로컬 개발, 다국어 구성 및 일정)는 [docs/setup.md](./docs/setup.md)를 참조하세요.

## 출력 형식

활성화된 언어별로 보고서 유형별로 하나의 파일이 `assets/digests/YYYY-MM-DD/` 경로에 저장됩니다. 과거 요약 보고서는 [`assets/digests/`](./assets/digests/)에 있습니다. 전체 파일 목록, 보고서별 구조 및 GitHub 이슈 레이블 참조는 [docs/output-format.md](./docs/output-format.md)를 참조하세요.

## FAQ

보고서가 건너뛴 이유, 실행 비용, 저장소 추가, 일정 변경, 429 오류 해결 등 일반적인 질문은 [docs/faq.md](./docs/faq.md)에서 확인할 수 있습니다.

## 기여하기

기여를 환영합니다. 브랜치 전략, 코딩 표준, 커밋 규칙 및 새로운 언어 또는 보고서 유형 추가 지침은 [CONTRIBUTING.md](./CONTRIBUTING.md)를 참조하세요.

## 별자리 역사

[![별자리 역사 차트](https://api.star-history.com/svg?repos=duanyytop/agents-radar&type=Date)](https://star-history.com/#duanyytop/agents-radar&Date)

