# SKILL Library for `@jh1777/jh-ui`

This folder contains reusable execution skills for AI agents working on the UI library.

## Skills

- `component-composition.skill.md`
  - Parent/sub-component architecture with content projection (`ui-list`, `ui-side-menu`)
- `unit-tests-per-component.skill.md`
  - Test matrix and patterns for standalone components
- `showcase-section-design.skill.md`
  - Dedicated section per component with suitable examples
- `public-api-and-barrels.skill.md`
  - Export integrity across local and top-level barrels
- `guardrails-modern-angular-only.skill.md`
  - Non-negotiable policy checks and modernization rules

## Recommended composition by task

- New component:
  1) component-composition
  2) unit-tests-per-component
  3) showcase-section-design
  4) public-api-and-barrels
  5) guardrails-modern-angular-only

- Existing component refactor:
  1) component-composition
  2) unit-tests-per-component
  3) public-api-and-barrels
  4) guardrails-modern-angular-only
