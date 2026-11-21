# Repo Conventions for Clean Code

These conventions are drawn from CLAUDE.md and README.md. The `write-clean-code` skill enforces them.

## Code Style

- No emoji in commit messages, pull request descriptions, code, or comments.
- Keep scripts small, readable, and runnable from the repo root.
- Comments explain why, not what.

## Commit Messages

- Short imperative subject line.
- Optional body.
- Trailer: `Co-Authored-By: Claude Code <noreply@anthropic.com>`

## Pull Request Descriptions

- A summary of what changed.
- How it was verified.
- Final line: `Generated with [Claude Code](https://claude.com/claude-code)`

## Branching

- `main` is the stable base. Never push to it directly; merge via pull request.
- `training/claude-code-advanced` is the long-lived working branch.
- Create short-lived feature branches off `main` using `<type>/<short-description>` (e.g. `feat/pre-commit-hook`, `docs/readme-outline`).

## Before Opening a Pull Request

- Working tree is clean and only intended files are staged.
- No secrets, tokens, `.env` files, or local settings are included.
- `README.md` and `CLAUDE.md` reflect any new commands or directories.
- The branch targets `main`.

## Do Not

- Push directly to `main`.
- Paste auth tokens into chat or commit them anywhere.
- Reference `.claude/settings.local.json` in tracked files; it is local-only.
- Force push, reset hard, or delete branches without explicit confirmation.
- Create placeholder files or directories that no exercise needs yet.
- Run any git operation without explicit permission.

## Testing and Verification

- No test tooling is configured yet. When code is added, add tests with it and run them before committing.
- Until then, verify changes by running the script or hook directly and noting the result in the pull request description.
