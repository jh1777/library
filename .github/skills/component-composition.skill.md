# SKILL: Component Composition (`ui-list` / `ui-side-menu` pattern)

## Use when

- Building parent-child component systems
- Migrating config-heavy APIs to projected sub-components
- Adding selectable/collapsible/list-like structures

## Reference examples

- `projects/ui/src/lib/components/list/`
- `projects/ui/src/lib/components/side-menu/`

## Recipe

1. Parent component
   - Extends `UIBaseComponent`
   - Owns shared state via signals
   - Uses `ng-content` slots for child content
2. Child component(s)
   - Keep focused inputs/outputs
   - Optionally inject parent (`inject(ParentComponent, { optional: true })`) for coordination
3. Parent queries children
   - Use `@ContentChildren(ChildComponent)` for orchestration
   - Compute derived state with `computed()`

## Do

- Keep child APIs small and typed
- Keep parent as the orchestration boundary
- Use clear content slots (`<ng-content select="ui-...">`)

## Don't

- Don't replace composition with oversized config interfaces
- Don't use legacy `@Input/@Output` decorators
- Don't bypass parent for selection state when a parent exists

## Acceptance checklist

- Content projection works with realistic nested markup
- Parent and children stay standalone and OnPush
- States/events are testable in unit tests
