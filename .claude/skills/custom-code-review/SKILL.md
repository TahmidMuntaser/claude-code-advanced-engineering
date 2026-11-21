---
name: custom-code-review
description: Review changed code for correctness bugs, reuse/simplification, efficiency, and altitude cleanups; report findings in terminal with optional inline comments
---

# Custom Code Review

## Overview

Review code before it ships. Every change must survive scrutiny across four dimensions: correctness, simplification, efficiency, and altitude.

## When to Use

**Always:**
- New features
- Bug fixes
- Refactoring
- Behavior changes

**Exceptions (ask your human partner):**
- Throwaway prototypes
- Generated code
- Configuration files

## The Four Dimensions

Review every changed file through these lenses:

1. **Correctness** — Does the code do what it claims? Are there bugs, edge cases, or wrong branches?
2. **Simplification** — Can duplication be removed? Can names be improved? Can helpers be extracted?
3. **Efficiency** — Is the code doing unnecessary work? Are there performance problems?
4. **Altitude** — Is the code at the right level of abstraction? Is it testing the framework instead of its own contract?

## Review Process

1. Read the changed code in full.
2. Run the project's test command (bare `pytest`, `npm test`, `cargo test` — whatever the repo uses).
3. Write down findings, most severe first.
4. Report findings in the terminal.
5. Optionally post findings as inline PR comments (`--comment`) or apply fixes (`--fix`).
6. Run the verification checklist before marking work complete.

## Verification Checklist

Before marking work complete:

- [ ] Every changed file reviewed across all four dimensions
- [ ] Findings ranked most-severe first
- [ ] Full test suite passes
- [ ] Output pristine (no errors, warnings)
- [ ] No secrets, tokens, or `.env` files included
- [ ] `README.md` and `CLAUDE.md` reflect any new commands or directories

## Reporting

Report findings as a typed list, most-severe first, with:

- File and line
- One-sentence summary of the defect
- Short summary (≤60 chars)
- Failure scenario (concrete inputs → wrong output)
- Category (correctness / simplification / efficiency / altitude)
- Verdict (CONFIRMED / PLAUSIBLE)
