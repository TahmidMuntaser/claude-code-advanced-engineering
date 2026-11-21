# Writing Good Reviews

## Overview

A review exists to catch a specific break before it ships. Two principles govern everything:

```
1. Every finding names the break it catches
2. Every finding exercises real code, not hypotheticals
```

## Principle 1: Name the Break

Before writing a finding, answer: **what production change should make this finding fire — and is that change a bug or a decision?**

A finding earns its place by catching a wrong branch, missing side effect, wrong argument, boundary case, or broken contract.

**Derive expectations independently.** Use literals and hand-checked fixtures; never compute the expected value with the code under test.

```typescript
// ❌ Mirror assertion: the same logic computes both sides
const expected = buildSearchQuery({ tag: 'urgent' });
expect(buildSearchQuery({ tag: 'urgent' })).toBe(expected);

// ✅ Hand-derived literal
expect(buildSearchQuery({ tag: 'urgent' })).toBe('tag:"urgent"');
```

**No change detectors.** If only intentional decisions can fail — a constant's value, exact message wording — it fires on redesign and sleeps through bugs. Review the behavior that depends on the decision.

## Principle 2: Review Real Code

**Review the real component, not the mock.** Assert actual behavior; if the mock is what you're checking, unmock it or delete the assertion.

**Mock at the right level.** Learn every side effect of the real method before replacing it; mock the slow or external operation and keep what the review depends on real.

## Gate Function

```
BEFORE writing a finding:
  Name the production change that would make this finding fire.

  Cannot name one            → redesign around an observable behavior
  Only intentional decisions → change detector; review the behavior
                               that depends on the decision

  Confirm the expected behavior is derived without the code under test.
```

## Warning Signs

- Setup and assertion share the same object, guaranteeing equality
- The finding can fire only through a panic, crash, or missing selector
- Expected values are hidden behind loops, builders, or helpers
- The review greps source text
- The finding exists for coverage, checking no side effect or outcome
- Mock setup is more than half the review, or you can't explain why the mock is needed
