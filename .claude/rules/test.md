---
paths:
  - "**/*.test.*"
  - "**/*.spec.*"
  - "tests/**/*"
---

# Testing Rules

- Write tests for every new function or bug fix.
- Name tests by behavior, e.g. `returns empty list when no items exist`.
- Follow Arrange / Act / Assert, with one behavior per test.
- Keep tests independent: no shared state, no reliance on test order.
- Mock only external dependencies (network, DB, time). Don't mock the code under test.
- Cover edge cases: empty input, null/undefined, boundary values, error paths.
- Never delete or weaken a failing test to make it pass. Fix the code or ask me first.
- Run the relevant tests after making changes and report the results.