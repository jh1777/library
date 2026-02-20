# SKILL: Unit Tests for Every Component

## Use when

- Adding a new component
- Changing behavior in an existing component
- Fixing regressions

## Standard matrix (minimum)

1. Create test (`should create`)
2. Default signal/input values
3. Input updates and effects
4. Output emissions
5. Core behavior scenarios (sorting/filtering/selection/collapse/etc.)

## Patterns in this repo

- Standalone component import in `TestBed`
- Host test component for projected children (see `ui-list` style)
- `fixture.componentRef.setInput(...)` for input-driven behavior

## Quality rules

- Prefer behavior assertions over implementation internals
- Keep tests deterministic and isolated
- Cover at least one edge case for key logic

## Example edge cases

- Empty projected children list
- Disabled interaction path
- Null/optional values in computed logic

## Acceptance checklist

- Spec exists and is updated for changed API/behavior
- All new behaviors have at least one assertion path
- No brittle timing hacks or unnecessary `setTimeout`
