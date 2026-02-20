# SKILL: Modern Angular Guardrails (Non-Negotiable)

## Intent

Prevent regressions into disallowed implementation patterns.

## Forbidden patterns

- `@Input(`
- `@Output(`
- `*ngIf`, `*ngFor`
- `::ng-deep`
- `@angular/material` imports
- External UI framework component imports (PrimeNG, NG-Zorro, etc.)

## Required architecture

- Standalone components
- `ChangeDetectionStrategy.OnPush`
- Signal APIs: `input`, `output`, `model`, `signal`, `computed`, `effect`
- Components extend `UIBaseComponent`

## Validation command patterns

```bash
grep -R "@Input\\|@Output\\|::ng-deep\\|@angular/material" projects/ui/src src/app
```

## Auto-fix guidance

- Replace decorator I/O with signal-based APIs
- Replace deep selectors with component-level CSS design changes
- Replace third-party UI component usage with existing library components

## Acceptance checklist

- Forbidden pattern scan returns no new violations
- Changed components follow required architecture
- Any exception is explicitly documented and approved (default: no exceptions)
