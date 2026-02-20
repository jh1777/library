# Copilot Instructions — @jh1777/jh-ui

## Project Overview
Angular UI component library (`@jh1777/jh-ui`). Angular 20, standalone components, published via ng-packagr.
Usually you can assume the project is already running when a chat session starts and reachable at `http://localhost:4200/` for the demo app.

- **Library source**: `projects/ui/src/lib/`
- **Public API**: `projects/ui/src/public-api.ts` (barrel — every component must be exported here)
- **Demo app**: `src/` (Angular app that consumes the library for development/showcase)
- **Build**: `npm run build` → output in `dist/ui`
- **Test**: `npm test` (Karma, ChromeHeadless)

## Component Structure
Every component lives under `projects/ui/src/lib/components/<component-name>/` with:
```
component-name/
├── index.ts                        # barrel: export component + models
├── component-name.component.ts
├── component-name.component.html
├── component-name.component.scss
├── component-name.component.spec.ts
├── component-name.models.ts        # enums, interfaces
└── sub-component/                   # optional nested sub-components
```

## Key Patterns

### 1. Every component extends `UIBaseComponent`
Located in `projects/ui/src/lib/shared/ui-base.component.ts`. Provides: `id`, `tooltip`, `isLoading`, `errorMessage`, `data`, `isHidden`, `limitContentChildren()`.

### 2. Standalone + OnPush + Signals
All components must be `standalone: true`, use `ChangeDetectionStrategy.OnPush`, and Angular signal-based APIs (`input()`, `output()`, `model()`, `signal()`, `computed()`). No decorators like `@Input`/`@Output`.

### 3. Sub-component composition (critical pattern!)
Complex components are composed of **parent + sub-components via `ng-content` + `@ContentChildren`**, NOT through large config objects/models.

Example — `ui-tabs` contains `ui-tab` children:
```html
<ui-tabs>
  <ui-tab label="First">Content 1</ui-tab>
  <ui-tab label="Second">Content 2</ui-tab>
</ui-tabs>
```
The parent uses `@ContentChildren(TabComponent)` to query/manage children. Sub-components live in nested folders under the parent.

Other examples: `ui-card` → `ui-card-section-basic`, `ui-navigation` → `ui-navigation-section`, `ui-modal` → `ui-confirmation-modal`, `ui-side-menu` → `ui-side-menu-section` → `ui-side-menu-entry`.

### 4. Selector prefix: `ui-`
All selectors use `ui-` prefix (e.g., `ui-button`, `ui-card`, `ui-tabs`).

### 5. Models file conventions
- Enums for style variants (e.g., `CardStyle`, `ButtonStyle`) — values start at `0`
- Interfaces extend `UIBaseComponentInterface` from `shared/ui-base.models.ts`

### 6. Shared internal components
`projects/ui/src/lib/shared/` contains reusable internal pieces: `UiErrorComponent`, `UiSpinnerComponent`, `UiCollapseButtonComponent`. Import from `'../../shared'`.

### 7. Styles
- SCSS variables defined in `projects/ui/src/lib/styles/ui.styles.scss` — import via `@import '../../styles/ui.styles'`
- Color naming: `$ui-<variant>-color` (e.g., `$ui-petrol-color`, `$ui-error-color`)
- Icons: FontAwesome (`@fortawesome/angular-fontawesome` + `@fortawesome/free-solid-svg-icons`)

## Creating a New Component
1. Create folder under `projects/ui/src/lib/components/<name>/`
2. Add component, template, styles, spec, models, and `index.ts` barrel
3. Export from `projects/ui/src/public-api.ts`
4. Alternatively use: `./create-component.sh <name>`

## Demo App (src/)
The `src/` app imports the library for local dev. Showcase pages live in `src/app/pages/`. View models in `src/app/models/` provide sample data for components.

## Agent & SKILL Workflow

Use the specialized agent instructions in `.github/agents/` and the reusable playbooks in `.github/skills/`.

### Agent entrypoints

- `library-orchestrator.agent.md` — single entrypoint that coordinates all agents end-to-end
- `component-builder.agent.md` — implement/refactor components and sub-components
- `unit-test-engineer.agent.md` — ensure unit tests per component
- `showcase-curator.agent.md` — maintain dedicated showcase section per component with suitable examples
- `api-guardian.agent.md` — keep `index.ts` barrels and `public-api.ts` complete
- `quality-gatekeeper.agent.md` — run final guardrail checks and quality validation

Each agent may declare YAML frontmatter (`name`, `description`, `model`, `tools`, `handoffs`, `user-invokable`).
Treat these as routing hints unless your runtime explicitly enforces them.

### Recommended execution order

Preferred usage: invoke the orchestrator and let it delegate in this order.

1. Component Builder
2. Unit Test Engineer
3. Showcase Curator
4. API Guardian
5. Quality Gatekeeper

### Mandatory guardrails (non-negotiable)

- No `@Input` / `@Output` decorators in component I/O
- No `::ng-deep`
- No Angular Material or external UI framework components
- Standalone + `ChangeDetectionStrategy.OnPush` + signals API only
- Components must extend `UIBaseComponent`
- For user-facing changes, run visual regression checks: `npm run visual:test`

### Visual test usage

Use this flow for visual checks:

1. **Single changed user-facing component**
  - `npm run visual:test:component -- <component-key>`
2. **Intentional visual update for that component**
  - `npm run visual:update:component -- <component-key>`
  - then verify with `npm run visual:test:component -- <component-key>`
3. **Shared styles/layout/showcase changes**
  - `npm run visual:test`
4. **Intentional broad visual updates**
  - `npm run visual:update`
  - then verify with `npm run visual:test`

Component keys:

- `badge`, `button`, `switch-toggle`, `input`, `cards`, `entry-tiles`, `metrics`, `value-tile`, `table`, `list`, `toolbar`, `tabs`, `accordion`, `grid`, `modal`, `signpost`, `banner`

### Skill mapping by task

- New component: `component-composition` → `unit-tests-per-component` → `showcase-section-design` → `public-api-and-barrels` → `guardrails-modern-angular-only`
- Refactor: `component-composition` → `unit-tests-per-component` → `public-api-and-barrels` → `guardrails-modern-angular-only`

### Reference examples

- Composition patterns: `ui-list`, `ui-side-menu`
- Testing style baseline: `projects/ui/src/lib/components/list/list.component.spec.ts`
- Showcase baseline: `src/app/pages/showcase-page/showcase-page.component.html`
