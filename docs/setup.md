# Setup Guide

## 1. Fork this repository

## 2. Customise `config.yml` (optional)

Edit `config.yml` in the repo root to add, remove, or replace tracked repositories. The file is fully commented. No code changes are needed — the pipeline reads it on every run and falls back to built-in defaults if the file is absent.

```yaml
# Add a new CLI tool
cli_repos:
  - id: my-tool
    repo: owner/my-ai-cli
    name: My AI Tool

# Add a new peer project to the OpenClaw ecosystem comparison
openclaw_peers:
  - id: my-agent
    repo: owner/my-agent
    name: My Agent
```

## 3. Add secrets and variables

Go to **Settings → Secrets and variables → Actions** and add:

| Secret / Variable | Required | Description |
|--------|----------|-------------|
| `LLM_PROVIDER` | optional | `anthropic` (default), `openai`, `github-copilot`, or `openrouter` |
| `ANTHROPIC_API_KEY` | if Anthropic | API key — works with both Anthropic and Kimi Code |
| `ANTHROPIC_BASE_URL` | optional | API endpoint override. Set to `https://api.kimi.com/coding/` for Kimi Code; leave unset for Anthropic |
| `OPENAI_API_KEY` | if OpenAI | OpenAI API key |
| `OPENAI_BASE_URL` | optional | OpenAI endpoint override |
| `OPENROUTER_API_KEY` | if OpenRouter | OpenRouter API key |
| `TELEGRAM_BOT_TOKEN` | optional | Telegram bot token from [@BotFather](https://t.me/BotFather). If set, a message is sent after each digest run |
| `TELEGRAM_CHAT_ID` | optional | Telegram chat/channel/group ID to send notifications to |
| `FEISHU_WEBHOOK_URLS` | optional | Comma-separated Feishu custom bot webhook URLs. If set, a card message is sent to each group after each digest run |
| `PAGES_URL` | **Actions variable** | GitHub Pages base URL for notifications, RSS, and manifest links. Set as a [repository variable](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables#creating-configuration-variables-for-a-repository) (e.g. `https://your-username.github.io/agents-radar`). Falls back to the centralized default in `packages/core/src/utils/constants.ts` if unset. |

> `GITHUB_TOKEN` is provided automatically by GitHub Actions. When using `github-copilot` as the provider, the same `GITHUB_TOKEN` is used for LLM calls.

### Setting up Telegram notifications (optional)

1. Message [@BotFather](https://t.me/BotFather) on Telegram, create a bot, and copy the token
2. Add the bot to your channel/group, or start a DM with it
3. Get the chat ID via [@userinfobot](https://t.me/userinfobot) or the [getUpdates](https://core.telegram.org/bots/api#getupdates) API
4. Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` as repository secrets

> If neither secret is set, the notification step is silently skipped.

## 4. Enable the workflow

Confirm the workflow is enabled in the **Actions** tab.

To test immediately, go to **Actions → Daily Agents Radar → Run workflow**.

> **First run note**: The web content step will fetch up to 50 articles (25 per site) and may take a few extra minutes. Subsequent runs are fast — only new articles are processed.

---

## LLM providers

Set `LLM_PROVIDER` to choose which model backend powers the digest generation. Defaults to `anthropic`.

| Provider | `LLM_PROVIDER` | Required env vars | Default model |
|----------|---------------|-------------------|---------------|
| Anthropic | `anthropic` | `ANTHROPIC_API_KEY` | `claude-sonnet-4-6` |
| OpenAI | `openai` | `OPENAI_API_KEY` | `gpt-4o` |
| GitHub Copilot | `github-copilot` | `GITHUB_TOKEN` | `gpt-4o` |
| OpenRouter | `openrouter` | `OPENROUTER_API_KEY` | `anthropic/claude-sonnet-4` |

Override the model name with `ANTHROPIC_MODEL`, `OPENAI_MODEL`, `GITHUB_COPILOT_MODEL`, or `OPENROUTER_MODEL` respectively.

The provider abstraction lives in `packages/providers/` — each provider is a separate file implementing the `LlmProvider` interface. Adding a new provider only requires creating a new file and registering it in the factory.

For local development setup (installing dependencies, running the pipeline, running tests), see [CONTRIBUTING.md](../CONTRIBUTING.md).

---

## Multi-language support

Reports are generated for every language listed under `languages` in `config.yml`. All 21 pre-translated locales are ready to use — add a BCP-47 tag to enable one:

```yaml
languages:
  - en-US     # primary language — empty file suffix (ai-cli.md)
  - zh-CN
  - ja-JP     # add any of the 21 supported BCP-47 tags
  - ko-KR
```

The first entry (or `defaultPrimaryLanguage` if set explicitly) is the **primary language** and gets an empty file suffix. All other languages use the BCP-47 tag as a suffix (`ai-cli.zh-CN.md`, `ai-cli.ja-JP.md`).

To add a language that isn't pre-translated yet, drop a `locales/xx-XX.json` file (see existing files for the schema) and add its BCP-47 tag to `config.yml`.

You can also override enabled languages at runtime without editing `config.yml`:

```bash
export REPORT_LANGS=en-US,ja-JP
```

> Each additional language multiplies LLM calls per run. With 5 languages and 10 data sources, a single run makes roughly 100+ LLM calls. Quality may vary for languages with less training data.

---

## Schedule

| Workflow | Cron | UTC | CST |
|----------|------|-----|-----|
| Daily digest | `0 0 * * *` | 00:00 daily | 08:00 daily |
| Weekly rollup | `0 1 * * 1` | 01:00 Monday | 09:00 Monday |
| Monthly rollup | `0 2 1 * *` | 02:00 on the 1st | 10:00 on the 1st |

To change the schedule, edit the cron expressions in the workflow files under `.github/workflows/`.
