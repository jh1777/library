# SKILL: Showcase Section per Component

## Use when

- Adding a new component to demo app
- Updating component API requiring demo updates
- Improving demo clarity

## Required structure

- One dedicated section per component in `showcase-page.component.html`
- Matching side-menu entry and `activeSection` key (nav is `ui-side-menu` component)
- Brief section description
- 2-4 practical demo groups
- Usage snippet reflecting actual API usage

## Example quality guidelines

- Basic usage
- Variant/style examples
- Interaction/state example
- Optional advanced composition example (if component supports children)

## Data and UX guidelines

- Use realistic data labels and values
- Keep examples concise and readable
- Avoid noisy or redundant variants

## Guardrails

- No external UI framework dependencies in showcase
- Keep template syntax consistent with Angular control flow used in repo (`@if`)
- Keep state in signals in showcase component TS file

## Acceptance checklist

- Navigation selects correct section
- Demo compiles and reflects component public API
- Snippet is accurate and not stale
