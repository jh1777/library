# Project Structure Reference

This document provides a detailed overview of the project's directory structure and organization.

## Root Directory

```
library/
├── .editorconfig              # Editor configuration
├── .gitignore                 # Git ignore rules
├── .npmrc                     # NPM configuration
├── .vscode/                   # VS Code settings
├── angular.json               # Angular workspace configuration
├── create-component.sh        # Component creation script ⭐
├── package.json               # Project dependencies
├── package-lock.json          # Locked dependencies
├── tsconfig.json              # TypeScript configuration
├── tsconfig.app.json          # App-specific TS config
├── tsconfig.spec.json         # Test-specific TS config
├── karma.conf.js              # Karma test runner config
├── README.md                  # Project documentation
├── LICENSE                    # License file
├── CODE_OF_CONDUCT.md         # Code of conduct
├── library.code-workspace     # VS Code workspace
├── build-ui.sh                # UI build script
├── projects/                  # Angular projects ⭐
├── src/                       # Demo application source ⭐
└── documentation/             # Generated documentation
```

## Projects Directory

The `projects/` directory contains the Angular library projects:

```
projects/
├── ui/                        # Main UI component library ⭐
│   ├── .templates/            # Component templates
│   ├── .npmignore             # NPM publish ignore
│   ├── src/                   # Library source code
│   ├── ng-package.json        # Angular package config
│   ├── package.json           # Library package info
│   ├── tsconfig.lib.json      # Library TS config
│   ├── tsconfig.lib.prod.json # Production TS config
│   ├── tsconfig.spec.json     # Test TS config
│   ├── README.md              # Library documentation
│   ├── DEVELOPER_GUIDE.md     # Developer overview ⭐
│   ├── QUICK_START.md         # Quick start guide ⭐
│   ├── COMPONENT_STRUCTURE.md # Component structure guide ⭐
│   ├── CONTRIBUTING.md        # Contributing guidelines ⭐
│   ├── Components-Diagram.md  # Component diagram
│   └── LICENSE                # Library license
└── test/                      # Test library project
    └── ...
```

## UI Library Source (`projects/ui/src/`)

```
projects/ui/src/
├── lib/                       # Library code
│   ├── components/            # All UI components ⭐
│   ├── shared/                # Shared utilities ⭐
│   └── styles/                # Global styles
└── public-api.ts              # Public API exports ⭐
```

### Components Directory (`projects/ui/src/lib/components/`)

Each component follows this structure:

```
components/
├── badge/
│   ├── badge.component.ts
│   ├── badge.component.html
│   ├── badge.component.scss
│   ├── badge.component.spec.ts
│   ├── badge.models.ts
│   └── index.ts
├── button/
│   ├── button.component.ts
│   ├── button.component.html
│   ├── button.component.scss
│   ├── button.component.spec.ts
│   ├── button.models.ts
│   ├── button.stories.ts      # Optional
│   └── index.ts
├── card/
│   ├── card.component.ts
│   ├── card.component.html
│   ├── card.component.scss
│   ├── card.component.spec.ts
│   ├── card.models.ts
│   ├── index.ts
│   └── card-section-basic/    # Sub-component
│       ├── card-section-basic.component.ts
│       ├── card-section-basic.component.html
│       ├── card-section-basic.component.scss
│       └── card-section-basic.component.spec.ts
├── ... (other components)
```

### Shared Directory (`projects/ui/src/lib/shared/`)

```
shared/
├── index.ts                   # Barrel export
├── ui-base.component.ts       # Base component class ⭐
├── ui-base.models.ts          # Base interfaces
├── ui-spinner/                # Loading spinner
│   ├── ui-spinner.component.ts
│   ├── ui-spinner.component.html
│   ├── ui-spinner.component.scss
│   └── ui-spinner.models.ts
├── ui-error/                  # Error display
│   ├── ui-error.component.ts
│   ├── ui-error.component.html
│   └── ui-error.component.scss
└── ui-collapse-button/        # Collapse button
    ├── ui-collapse-button.component.ts
    ├── ui-collapse-button.component.html
    ├── ui-collapse-button.component.scss
    └── ui-collapse-button.models.ts
```

### Styles Directory (`projects/ui/src/lib/styles/`)

```
styles/
├── _variables.scss            # SCSS variables
├── _mixins.scss               # SCSS mixins
└── ... (other style files)
```

## Templates Directory (`projects/ui/.templates/`)

```
.templates/
├── README.md                  # Templates documentation
└── component-template/        # Component template ⭐
    ├── component-name.component.ts
    ├── component-name.component.html
    ├── component-name.component.scss
    ├── component-name.component.spec.ts
    ├── component-name.models.ts
    └── index.ts
```

## Demo Application (`src/`)

```
src/
├── app/                       # Application code
│   ├── components/            # App components
│   ├── pages/                 # App pages
│   ├── app.component.ts       # Root component
│   ├── app.component.html
│   ├── app.component.scss
│   └── app.routes.ts          # Routing config
├── assets/                    # Static assets
├── styles.scss                # Global styles
├── index.html                 # HTML entry point
├── main.ts                    # Application bootstrap
└── favicon.ico                # Favicon
```

## Documentation Directory

```
documentation/
├── components/                # Component docs
├── interfaces/                # Interface docs
├── miscellaneous/             # Misc docs
├── graph/                     # Dependency graphs
├── images/                    # Documentation images
├── js/                        # Documentation scripts
├── styles/                    # Documentation styles
├── index.html                 # Documentation home
├── overview.html              # Overview page
├── modules.html               # Modules page
├── coverage.html              # Coverage report
└── ... (other generated files)
```

## Key Files

### Component Files

| File | Purpose |
|------|---------|
| `*.component.ts` | Component logic and configuration |
| `*.component.html` | Component template |
| `*.component.scss` | Component styles |
| `*.component.spec.ts` | Unit tests |
| `*.models.ts` | TypeScript models, enums, interfaces |
| `index.ts` | Barrel export file |

### Configuration Files

| File | Purpose |
|------|---------|
| `angular.json` | Angular workspace and project configuration |
| `package.json` | Project dependencies and scripts |
| `tsconfig.json` | TypeScript compiler configuration |
| `ng-package.json` | Angular library packaging configuration |
| `karma.conf.js` | Karma test runner configuration |

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Project and library documentation |
| `DEVELOPER_GUIDE.md` | Complete developer overview |
| `QUICK_START.md` | Quick start guide |
| `COMPONENT_STRUCTURE.md` | Component architecture guide |
| `CONTRIBUTING.md` | Contributing guidelines |

### Scripts

| File | Purpose |
|------|---------|
| `create-component.sh` | Automated component creation |
| `build-ui.sh` | UI library build script |

## File Naming Conventions

### Components
- **TypeScript**: `component-name.component.ts` (kebab-case)
- **HTML**: `component-name.component.html` (kebab-case)
- **SCSS**: `component-name.component.scss` (kebab-case)
- **Tests**: `component-name.component.spec.ts` (kebab-case)
- **Models**: `component-name.models.ts` (kebab-case)
- **Barrel**: `index.ts` (always lowercase)

### Classes and Interfaces
- **Components**: `ComponentNameComponent` (PascalCase)
- **Services**: `ComponentNameService` (PascalCase)
- **Interfaces**: `ComponentNameInterface` (PascalCase)
- **Enums**: `ComponentNameStyle` (PascalCase)

### Selectors
- **Components**: `ui-component-name` (kebab-case with `ui-` prefix)

## Import Paths

### Within Library

```typescript
// Import from shared
import { UIBaseComponent } from '../../shared';

// Import from other component
import { BadgeComponent } from '../badge/badge.component';

// Import models
import { ButtonStyle } from './button.models';

// Import styles
@import '../../styles/variables';
```

### From Application

```typescript
// Import from library
import { ButtonComponent, ButtonStyle } from '@ui/button';

// Or import from public API
import { ButtonComponent } from 'ui';
```

## Build Output

```
dist/
├── ui/                        # Built library
│   ├── bundles/               # UMD bundles
│   ├── esm2022/               # ES2022 modules
│   ├── fesm2022/              # Flat ES2022 modules
│   ├── lib/                   # Compiled source
│   ├── package.json           # Package metadata
│   ├── README.md              # Documentation
│   └── public-api.d.ts        # Type definitions
└── library/                   # Built application
    ├── browser/               # Browser bundle
    └── ... (application files)
```

## Node Modules (Not Committed)

```
node_modules/                  # Installed dependencies
├── @angular/                  # Angular framework
├── typescript/                # TypeScript
└── ... (other dependencies)
```

## Important Locations for Developers

### When creating a component:
1. Component files: `projects/ui/src/lib/components/your-component/`
2. Add export: `projects/ui/src/public-api.ts`
3. Use templates: `projects/ui/.templates/component-template/`
4. Run script: `./create-component.sh your-component`

### When updating shared code:
1. Base component: `projects/ui/src/lib/shared/ui-base.component.ts`
2. Shared utilities: `projects/ui/src/lib/shared/`
3. Global styles: `projects/ui/src/lib/styles/`

### When writing tests:
1. Component tests: `*.component.spec.ts` (alongside component)
2. Run tests: `npm test`
3. Coverage: `npm test -- --coverage`

### When building:
1. Build library: `npm run build`
2. Build application: `ng build`
3. Output: `dist/ui/` and `dist/library/`

## Quick Reference

| Task | Location | Command |
|------|----------|---------|
| Create component | Root | `./create-component.sh name` |
| View templates | `projects/ui/.templates/` | - |
| Add to public API | `projects/ui/src/public-api.ts` | - |
| Build library | Root | `npm run build` |
| Run tests | Root | `npm test` |
| View docs | `projects/ui/DEVELOPER_GUIDE.md` | - |

## Related Documentation

- [Developer Guide](./DEVELOPER_GUIDE.md)
- [Component Structure Guide](./COMPONENT_STRUCTURE.md)
- [Quick Start Guide](./QUICK_START.md)
- [Contributing Guide](./CONTRIBUTING.md)
