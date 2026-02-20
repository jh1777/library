# AI Agent System for `@jh1777/jh-ui`

This folder defines a multi-agent setup for the UI library.

## Metadata headers

All agent files can include YAML frontmatter with:

- `name`
- `description`
- `model`
- `tools`
- `handoffs` (for orchestrator-style agents)
- `user-invokable`

These headers are **advisory** unless your runtime explicitly consumes and enforces them.

## Why this setup

- Component work in this repo is repetitive but strict (standalone + signals + `UIBaseComponent` + `ui-` selectors)
- Quality expectations are high (unit tests per component, showcase sections, barrel/public-api exports)
- Explicit guardrails are required (`@Input/@Output` decorators forbidden, `::ng-deep` forbidden, Angular Material/other UI libs forbidden)

## Agent Topology

Use one orchestrator plus specialists.

1. `library-orchestrator.agent.md`
   - Single entrypoint that coordinates all specialist agents

Specialists:

2. `component-builder.agent.md`
   - Builds/refactors library components and sub-components
3. `showcase-curator.agent.md`
   - Maintains showcase sections and realistic examples
4. `unit-test-engineer.agent.md`
   - Creates/updates unit tests for each component
5. `api-guardian.agent.md`
   - Protects `index.ts` barrels + `public-api.ts` + docs consistency
6. `quality-gatekeeper.agent.md`
   - Enforces non-negotiable guardrails and verifies no forbidden patterns
   - Runs visual regression checks for user-facing changes (`npm run visual:test`)

## Standard Handoff Contract

Every specialist should hand off using this structure:

```md
## Done
- <what was changed>

## Checks run
- <commands>
- <pass/fail summary>

## Open items
- <remaining risk or follow-up>
```

## Recommended execution order for a new/changed component

Preferred usage: invoke `library-orchestrator` and let it run this order.

1. `component-builder`
2. `unit-test-engineer`
3. `showcase-curator`
4. `api-guardian`
5. `quality-gatekeeper`

## Shared constraints (must always hold)

- No legacy decorators for component I/O (`@Input`, `@Output`)
- No `::ng-deep`
- No Angular Material or additional UI framework imports
- Use standalone components with `ChangeDetectionStrategy.OnPush`
- Use signal-based APIs (`input`, `output`, `model`, `signal`, `computed`)
- Components extend `UIBaseComponent`
- New/changed components include meaningful unit tests
- Showcase keeps one dedicated section per component with suitable examples
