# Contributing

Thanks for your interest in contributing to agents-radar!

## Branch Strategy

- Default branch is `main`. All PRs target `main`.
- **Never commit directly to `main`** — always work from a feature branch and merge via PR.

## Getting Started

1. Fork the repo and clone your fork.
2. Install dependencies:
   ```bash
   bun install
   ```
3. Set up required environment variables (see `.env.example`):
   ```bash
   export GITHUB_TOKEN=ghp_xxxxx
   export ANTHROPIC_API_KEY=sk-ant-xxxxx
   ```
4. Run the full pipeline locally to verify:
   ```bash
   bun run start
   ```

## Development Commands

| Command | Description |
|---------|-------------|
| `bun run start` | Run the full digest pipeline |
| `bun test` | Run unit tests |
| `bun run typecheck` | TypeScript type checking (`tsc --noEmit`) |
| `bun run lint` | Lint with Biome |
| `bun run lint:fix` | Lint and auto-fix with Biome |
| `bun run format` | Format source files with Biome |
| `bun run format:check` | Check formatting without writing |

## Coding Standards

- **Arrow functions only** — no `function` declarations.
- **One function per module** — extract helpers to their own files.
- **Extension-free imports** — `import { foo } from "./foo"`, not `"./foo.ts"`.
- **Dependency injection** — I/O boundaries (env, argv, console) are injectable parameters.
- **stderr for diagnostics** — progress/errors go to `console.error`; stdout is for data only.
- **Tests are collocated** — `foo.ts` → `foo.test.ts` beside it.
- **Barrel modules** — every directory has an `index.ts` re-exporting all siblings.

## Pull Request Process

1. Create a feature branch from `main`.
2. Make your changes — please include tests for new functionality.
3. Run checks before pushing:
   ```bash
   bun run lint && bun run typecheck && bun test
   ```
4. Open a PR targeting `main`.
5. The `release-please` bot will handle versioning and changelogs on merge.

## Commit Conventions

This project uses [release-please](https://github.com/googleapis/release-please) for automated changelog generation. Commits should follow [conventional commits](https://www.conventionalcommits.org/):

```
feat: add support for new data source
fix: handle rate-limiting in GitHub API client
docs: update README with new environment variables
chore: upgrade Biome to v2
```

## Adding a New Language

Drop a valid JSON locale file into `locales/` matching the existing schema, then add its ISO code to the `languages` list in `config.yml` — no code changes needed.

## Adding a New Report Type

See the detailed guide in `CLAUDE.md` under "Adding a new report type" — it covers the 9 steps from data fetcher through manifest generation.
