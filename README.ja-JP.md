# エージェントレーダー

## サポートされている言語

🇬🇧 英語 | [🇺🇦Українська](./README.uk-UA.md) | [🇸🇦 العربية](./README.ar-SA.md) | [🇷🇺 Русский](./README.ru-RU.md) | [🇮🇳 हिन्दी](./README.hi-IN.md) | [🇩🇪ドイツ語](./README.de-DE.md) | [🇹🇷 テュルクチェ](./README.tr-TR.md) | [🇹🇭 ไทย](./README.th-TH.md) | [🇵🇱ポルスキー](./README.pl-PL.md) | [🇮🇹 イタリアーノ](./README.it-IT.md) | [🇫🇷フランス語](./README.fr-FR.md) | [🇨🇳 中文](./README.zh-CN.md) | [🇧🇷ポルトガル語](./README.pt-BR.md) | [🇻🇳 Tiếng Việt](./README.vi-VN.md) | [🇧🇩 বাংলা](./README.bn-BD.md) | [🇪🇸スペイン語](./README.es-ES.md) | [🇮🇩インドネシア語](./README.id-ID.md) | [🇷🇴ローマ](./README.ro-RO.md) | [🇰🇷 한국어](./README.ko-KR.md) | [🇳🇱オランダ](./README.nl-NL.md) | [🇯🇵 日本語](./README.ja-JP.md)

レポート生成で追加言語を有効にするには、[多言語サポート](./docs/setup.md#multi-language-support) を参照してください。

毎日午前8時（CST）に実行されるGitHub Actionsワークフローです。10のデータソースからAIエコシステムのシグナルを集約し、GitHub Issuesとコミット済みMarkdownファイルとして、日次ダイジェスト（設定済みの全言語）を公開します。週次および月次のロールアップレポートも自動的に生成されます。

## データソース

| ソース | タイプ | データ |

|--------|------|------|

| [GitHubリポジトリ](https://github.com) | API | 17以上の追跡対象AIツールリポジトリからのIssue、PR、リリース |

| [Claude Code Skills](https://github.com/anthropics/skills) | API | コミュニティエンゲージメント順に並べられたトレンドスキル |

| [GitHub Trending](https://github.com/trending) | HTML + API | 毎日のトレンドリポジトリ + AIトピック検索 (7日間) |

| [Hacker News](https://news.ycombinator.com) | [Algolia API](https://hn.algolia.com/api) | 過去24時間のAI関連ニュース上位30件、6件の並列クエリ |

| [Product Hunt](https://www.producthunt.com) | GraphQL API | 昨日の投票数上位AI製品 |

| [arXiv](https://arxiv.org) | [arXiv API](https://export.arxiv.org/api/query) | cs.AI、cs.CL、cs.LGの最新論文 (過去48時間) |

| [Hugging Face](https://huggingface.co) | [Hub API](https://huggingface.co/api/models) | 週間のいいね数でソートされたトレンドモデル30選 |

| [Dev.to](https://dev.to) | [Forem API](https://dev.to/api) | 5つのタグで人気のAI/LLM記事 |

| [Lobste.rs](https://lobste.rs) | JSON API | 過去7日間のAI/MLタグ付き記事 |

| [Anthropic](https://anthropic.com) + [OpenAI](https://openai.com) | サイトマップ | `lastmod` diffで検出された新着記事 |

## Web UI

**`PAGES_URL`** — リポジトリ変数として設定することで、フォークのWeb UIベースURLを設定できます。

クリーンなダークテーマのインターフェースで、過去のダイジェストをすべて閲覧できます。ログインは不要です。レポートは、このリポジトリのMarkdownファイルからGitHub Pages経由でレンダリングされます。


ウェブUIは`packages/web/`にあるViteとTypeScriptで構築されたSPAです。実行時に`manifest.json`と個々のダイジェストファイルを取得し、UIを再構築することなく新しいデイリーダイジェストが表示されます。

```bash
bun run dev:web    # start Vite dev server for local UI development
bun run build:web  # build the web UI for deployment
```
![Web UI](assets/web-en.png)

## Telegramチャンネル＆Feishuグループ

購読して、毎日のダイジェスト通知をお好みのプラットフォームに直接配信してもらいましょう。各メッセージには、その日のすべてのレポートへのリンクに加え、Web UIとRSSフィードへのリンクも含まれています。



<table>

<tr>

<td align="center"><b><a href="https://t.me/agents_radar">Telegramチャンネルに参加</a></b></td>

<td align="center"><b><a href="https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=b56v3be8-b027-4ee6-abc4-65bf1f80bccd">Feishuグループに参加</a></b></td>

</tr>

<tr>

<td><img src="assets/telegram.jpg" width="300" alt="Telegram通知"></td>

<td><img src="assets/feishu.jpg" width="300" alt="Feishu通知"></td>

</tr>
</table>

## RSSフィード

**`PAGES_URL`/feed.xml** — 任意のRSSリーダー（Feedly、Reeder、NewsBlurなど）で購読すると、新しいダイジェストが自動的に受信されます。フィードURLは、`PAGES_URL`の設定から生成されます。フィードには、すべてのレポートタイプから最新の30件のレポートが含まれ、`manifest.json`とともに毎日更新されます。

## MCPサーバー

**`https://agents-radar-mcp.duanyytop.workers.dev`**

エージェントレーダーのデータをツールとして公開するホスト型[Model Context Protocol](https://modelcontextprotocol.io)サーバーです。MCP互換クライアント（Claude Desktop、OpenClawなど）は、最新のAIエコシステムレポートを直接クエリできます。

**利用可能なツール:**

| ツール | 説明 |

|------|-------------|

| `list_reports` |利用可能な日付とレポートの種類を一覧表示（過去N日間） |

| `get_latest` | 指定された種類の最新レポートを取得 |

| `get_report` | 日付と種類を指定して特定のレポートを取得 |

| `search` | 最近のレポートをキーワードで検索 |

**Claude Desktop の設定** — `~/Library/Application Support/Claude/claude_desktop_config.json` に以下を追加してください。


```json
{
  "mcpServers": {
    "agents-radar": {
      "url": "https://agents-radar-mcp.duanyytop.workers.dev"
    }
  }
}
```
保存後、Claude Desktopを再起動してください。その後、Claudeに以下のような質問をすることができます。

- *「AI CLIツールの最新情報は？」* → `get_latest` を呼び出します
- *「今週のClaude Codeの言及を検索」* → `search` を呼び出します
- *「2026年3月5日のAIトレンドレポートを表示」* → `get_report` を呼び出します

**OpenClawのセットアップ** — 次のコマンドを実行してください。


```bash
openclaw mcp add --transport http agents-radar https://agents-radar-mcp.duanyytop.workers.dev
```
または、`~/.openclaw/openclaw.json` に手動で追加してください。


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
OpenClawでは、以下のような操作が可能です。

- *「AI CLIツールの最新情報は？」* → `get_latest` を呼び出します
- *「今週のClaude Codeに関する言及を検索」* → `search` を呼び出します
- *「2026年3月5日のAIトレンドレポートを表示」* → `get_report` を呼び出します

**セルフホスティング** — `mcp/` ディレクトリから独自のインスタンスをデプロイします。


```bash
cd mcp
pnpm install
wrangler deploy
```
## 追跡対象ソース

GitHubリポジトリ、ニュース、研究論文、コミュニティフィードなど、10種類のデータソースを追跡しています。リポジトリリンクとソースごとの詳細情報を含む完全なリストについては、[docs/sources.md](./docs/sources.md)をご覧ください。

**概要:** 9つのAI CLIリポジトリ + OpenClaw + 12のピアエージェント（GitHub API） · Claude Code Skills · GitHub Trending（HTML + 検索API） · Hacker News · ArXiv · Hugging Face · Product Hunt · Dev.to · Lobste.rs · Anthropic + OpenAIサイトマップ


## 機能

- 追跡対象の全リポジトリにおいて、過去24時間以内に更新された課題、プルリクエスト、リリースを取得します。
- トレンドとなっているClaude Code Skillsを追跡します（更新頻度ではなく、コミュニティのエンゲージメントに基づいてソートされます）。
- 各CLIリポジトリごとにツールごとのサマリーと、ツール間の比較分析を生成します。
- OpenClawプロジェクトの詳細なレポートと、11の類似プロジェクトとのエコシステム全体にわたる比較レポートを生成します。
- サイトマップを介してAnthropicとOpenAIの公式Webコンテンツをスクレイピングし、新しい記事を段階的に検出します。
- GitHub Trendingを毎日監視し、6つのAIトピックタグを検索します。リポジトリをディメンション別に分類し、トレンドシグナルを抽出します。
- Hacker Newsから上位30件のAI関連記事（過去24時間、ポイント順）を取得し、コミュニティセンチメントレポートを生成します。
- レポートの種類ごとにGitHub Issuesを公開し、Markdownファイルを`assets/digests/YYYY-MM-DD/`にコミットします。
- GitHub Actionsを介して毎日実行されます。手動トリガーに対応
- 追跡対象のリポジトリはすべて `config.yml` で設定可能 — コードの変更は不要
- `locales/*.json` による集中型ロケールシステム — `packages/core/src/locales/t.ts` にある `t()` カタログで 21 言語をサポート

## セットアップ

1. このリポジトリを **フォーク**します
2. LLM プロバイダキーをリポジトリシークレットとして追加します (例: `ANTHROPIC_API_KEY`)
3. **アクション** タブでワークフローを有効にします — 以降は自動的に実行されます

シークレットリファレンス、LLM プロバイダ、`config.yml` のカスタマイズ、ローカル開発、多言語設定、スケジュール設定など、詳細なガイドについては [docs/setup.md](./docs/setup.md) を参照してください。


## 出力形式

レポートタイプごと、有効言語ごとに1つのファイルが生成され、`assets/digests/YYYY-MM-DD/` ディレクトリに書き込まれます。過去のダイジェストは [`assets/digests/`](./assets/digests/) にあります。ファイル一覧、レポートごとの構造、GitHub Issue ラベルの参照については、[docs/output-format.md](./docs/output-format.md) を参照してください。

## FAQ

レポートがスキップされた理由、実行コスト、リポジトリの追加、スケジュールの変更、429 エラーのトラブルシューティングなど、よくある質問への回答は [docs/faq.md](./docs/faq.md) に記載されています。

## 貢献

貢献を歓迎します。ブランチ戦略、コーディング規約、コミット規則、新しい言語やレポートタイプの追加方法については、[CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。


## スターヒストリー

[![スターヒストリーチャート](https://api.star-history.com/svg?repos=duanyytop/agents-radar&type=Date)](https://star-history.com/#duanyytop/agents-radar&Date)

