# claude-code-advanced-engineering

Training sandbox for advanced Claude Code usage: subagents, hooks, MCP servers, slash
commands, skills, and multi-agent workflows. The repo starts as a skeleton (only
`README.md` and `.gitignore` are tracked) and is built up through hands-on exercises.

## Branching

- `main` is the stable base. Never push to it directly; merge via pull request.
- `training/claude-code-advanced` is the long-lived working branch and tracks
  `origin/training/claude-code-advanced`.
- Create short-lived feature branches off `main` using `<type>/<short-description>`
  (for example `feat/pre-commit-hook`, `docs/readme-outline`).

## Start of every task

1. Run `git status` and `git branch --show-current` to confirm where you are.
2. Re-read `README.md` and this file. Do not assume structure that is not on disk.
3. If the task adds a new area (hooks, agents, MCP), check whether a directory for it
   already exists before creating one.

## Commands

Repository and review workflow:

- `git checkout -b <type>/<name> main` - start a feature branch
- `git push -u origin <branch>` - publish a branch
- `gh pr create --base main` - open a pull request against `main`

Project tooling: none configured yet. When you add a runnable tool (test runner,
linter, formatter, script), record its exact command here in the same commit.

## Repository layout

Currently tracked:

- `README.md` - project entry point
- `.gitignore` - covers Python and build artifacts, env files, and local settings
- `CLAUDE.md` - this file

Planned areas (create only when an exercise needs them, and update this list):

- `.claude/agents/` - subagent definitions
- `.claude/commands/` - project slash commands
- `.claude/hooks/` - hook scripts
- `docs/` - notes and decision records

No application code exists yet.

## Conventions

- Scaffold deliberately: one concept per commit, with a README or docs note explaining
  what it demonstrates and why.
- Keep scripts small, readable, and runnable from the repo root.
- Comments explain why, not what.
- No emoji in commit messages, pull request descriptions, code, or comments.
- Commit messages: short imperative subject line, optional body, and this trailer:

```
Co-Authored-By: Claude Code <noreply@anthropic.com>
```

- Pull request descriptions: a summary, what changed, how it was verified, and this
  final line:

```
Generated with [Claude Code](https://claude.com/claude-code)
```

## Testing and verification

No test tooling is configured yet. When code is added, add tests with it and run them
before committing. Until then, verify changes by running the script or hook directly
and noting the result in the pull request description.

## Before opening a pull request

- Working tree is clean and only intended files are staged.
- No secrets, tokens, `.env` files, or local settings are included.
- `README.md` and this file reflect any new commands or directories.
- The branch targets `main`.

## Do not

- Push directly to `main`.
- Paste auth tokens into chat or commit them anywhere.
- Reference `.claude/settings.local.json` in tracked files; it is local-only.
- Force push, reset hard, or delete branches without explicit confirmation.
- Create placeholder files or directories that no exercise needs yet.

## Notes

- Single-contributor sandbox. Update the branching and review sections if more people
  join.
- If this file and the repository disagree, trust the repository and fix this file.