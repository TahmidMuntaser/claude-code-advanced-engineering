---
name: write-clean-code
description: Enforce clean code conventions before writing implementation code
---

# Write Clean Code

## Overview

Write clean code before you write implementation code. Every new function or method must follow repo conventions and pass a clean-code check.

## When to Use

**Always:**
- Before writing new implementation code
- Before modifying existing code

**Exceptions (ask your human partner):**
- Throwaway prototypes
- Generated code
- Configuration files

## Repo Conventions

Enforce these conventions from CLAUDE.md and README.md:

- **No emoji** in commit messages, pull request descriptions, code, or comments
- **Short, readable functions** runnable from the repo root
- **Comments explain why, not what**
- **One concept per commit**, with a README or docs note explaining what it demonstrates and why
- **Commit messages**: short imperative subject line, optional body, `Co-Authored-By: Claude Code <noreply@anthropic.com>` trailer
- **Pull request descriptions**: summary, what changed, how verified, `Generated with [Claude Code](https://claude.com/claude-code)`
- **No secrets, tokens, `.env` files, or local settings** included
- **Branch off `main`** using `<type>/<short-description>`; never push directly to `main`

## The Clean-Code Check

Before writing any implementation code:

1. Read `repo-conventions.md` for the full convention list.
2. Name the production change you're making.
3. Write the simplest code that satisfies the convention.
4. Run the project's test command to confirm nothing breaks.
5. Refactor only after green — remove duplication, improve names, extract helpers.
6. Keep tests green. Don't add behavior beyond what's needed.

## Verification Checklist

Before marking work complete:

- [ ] Every new function/method follows repo conventions
- [ ] No emoji in code, comments, commits, or PRs
- [ ] Comments explain why, not what
- [ ] Functions are short and readable, runnable from repo root
- [ ] Full test suite passes
- [ ] Output pristine (no errors, warnings)
- [ ] No secrets, tokens, or `.env` files included
