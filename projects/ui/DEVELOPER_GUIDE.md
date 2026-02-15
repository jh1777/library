# Developer Guide

Welcome to the UI Library Developer Guide! This document provides an overview of all developer resources and helps you navigate the documentation.

## Quick Links

- **[Quick Start](./QUICK_START.md)** - Get started creating components quickly
- **[Component Structure](./COMPONENT_STRUCTURE.md)** - Detailed guide on component architecture
- **[Contributing](./CONTRIBUTING.md)** - How to contribute to the project
- **[Component Templates](./.templates/)** - Ready-to-use template files

## Getting Started

### For New Contributors

1. Read the [Contributing Guide](./CONTRIBUTING.md)
2. Set up your development environment
3. Review the [Component Structure Guide](./COMPONENT_STRUCTURE.md)
4. Create your first component using the [Quick Start Guide](./QUICK_START.md)

### For Experienced Developers

Use the component creation script for quick scaffolding:

```bash
./create-component.sh my-component
```

Then implement your component following the [Component Structure Guide](./COMPONENT_STRUCTURE.md).

## Repository Structure

```
library/
├── projects/
│   └── ui/                          # UI Library (main focus)
│       ├── .templates/              # Component templates
│       │   └── component-template/  # Standard component structure
│       ├── src/
│       │   ├── lib/
│       │   │   ├── components/      # All UI components
│       │   │   ├── shared/          # Shared utilities and base classes
│       │   │   └── styles/          # Global styles and variables
│       │   └── public-api.ts        # Public API exports
│       ├── COMPONENT_STRUCTURE.md   # Component structure guide
│       ├── QUICK_START.md           # Quick start guide
│       ├── CONTRIBUTING.md          # Contributing guidelines
│       ├── DEVELOPER_GUIDE.md       # This file
│       └── README.md                # UI Library documentation
├── src/                             # Demo application
├── create-component.sh              # Component creation script
└── package.json                     # Project dependencies
```

## Component Structure

### Standard Component Files

Every component should have these files:

```
component-name/
├── component-name.component.ts       # Component logic
├── component-name.component.html     # Component template
├── component-name.component.scss     # Component styles
├── component-name.component.spec.ts  # Unit tests
├── component-name.models.ts          # Models and enums
└── index.ts                          # Barrel export
```

### UIBaseComponent

All components extend `UIBaseComponent` which provides:

- `id()` - Unique identifier
- `tooltip()` - Tooltip text
- `isLoading()` - Loading state
- `errorMessage()` - Error message
- `data()` - Custom data property

### Example Component

```typescript
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIBaseComponent } from '../../shared';

@Component({
  selector: 'ui-my-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './my-component.component.html',
  styleUrl: './my-component.component.scss'
})
export class MyComponentComponent extends UIBaseComponent {
  
  // Input properties
  label = input<string>('Default Label');
  isDisabled = input<boolean>(false);
  
  // Output events
  onClick = output<string>();
  
  // Component logic
  handleClick() {
    if (!this.isDisabled()) {
      this.onClick.emit(this.id());
    }
  }
}
```

## Common Patterns

### Input Properties

```typescript
// Simple input with default
value = input<string>('default');

// Required input
title = input.required<string>();

// Enum input
style = input<ComponentStyle>(ComponentStyle.None);
```

### Output Events

```typescript
// Simple event
onClick = output<string>();

// Complex event
onValueChange = output<{old: string, new: string}>();

// Emit an event
this.onClick.emit(this.id());
```

### Content Children

```typescript
@ContentChildren(ChildComponent) children!: QueryList<ChildComponent>;

ngAfterContentInit(): void {
  super.limitContentChildren(this.children, 5);
}
```

### Styling with Enums

```typescript
// Define enum in models file
export enum ComponentStyle {
    None = 0,
    Primary = 1,
    Secondary = 2,
    Success = 3,
    Error = 4
}

// Use in component
style = input<ComponentStyle>(ComponentStyle.None);

// Apply in template
[class.primary]="style() === ComponentStyle.Primary"
```

## Development Workflow

### 1. Create Component

```bash
./create-component.sh my-component
```

### 2. Implement Logic

Edit `my-component.component.ts`:
- Add input properties with `input()`
- Add output events with `output()`
- Implement component logic
- Add JSDoc comments

### 3. Create Template

Edit `my-component.component.html`:
- Use component properties
- Handle user interactions
- Consider accessibility

### 4. Add Styles

Edit `my-component.component.scss`:
- Import shared variables
- Follow existing patterns
- Use BEM naming if applicable

### 5. Define Models

Edit `my-component.models.ts`:
- Create enums for styles
- Define interfaces
- Extend UIBaseComponentInterface

### 6. Write Tests

Edit `my-component.component.spec.ts`:
- Test component creation
- Test input properties
- Test output events
- Test user interactions
- Test edge cases

### 7. Build and Test

```bash
npm run build
npm test
```

### 8. Update Documentation

Add component documentation to `README.md`:
- Description
- Input properties
- Output events
- Usage example
- Screenshot

## Best Practices

### Code Quality

1. **Type Safety** - Use TypeScript strict mode, avoid `any`
2. **Immutability** - Use signals and OnPush change detection
3. **Single Responsibility** - Keep components focused
4. **DRY** - Don't repeat yourself, use shared utilities
5. **Documentation** - Add JSDoc comments to all public APIs

### Component Design

1. **Standalone** - All components should be standalone
2. **OnPush** - Use OnPush change detection for performance
3. **Signals** - Use signal-based APIs (input/output)
4. **Accessibility** - Support keyboard navigation and ARIA
5. **Consistency** - Follow existing patterns

### Testing

1. **Coverage** - Aim for >80% test coverage
2. **Unit Tests** - Test component behavior in isolation
3. **Edge Cases** - Test error conditions and edge cases
4. **User Interactions** - Test clicks, inputs, etc.
5. **Accessibility** - Test ARIA and keyboard navigation

### Performance

1. **OnPush Detection** - Reduce change detection cycles
2. **Lazy Loading** - Load components on demand
3. **Small Bundles** - Keep component imports minimal
4. **Pure Functions** - Use pure functions when possible
5. **TrackBy** - Use trackBy with ngFor

## Shared Utilities

### UIBaseComponent

Located in `projects/ui/src/lib/shared/ui-base.component.ts`

Provides common functionality:
- `id` - Component identifier
- `tooltip` - Tooltip text
- `isLoading` - Loading state
- `errorMessage` - Error state
- `data` - Custom data
- `limitContentChildren()` - Helper for content children

### UiSpinnerComponent

Loading spinner component used across the library.

### UiErrorComponent

Error display component used for error states.

### UiCollapseButton

Button for collapsing/expanding content.

## Build and Test

### Build Commands

```bash
# Build UI library
npm run build

# Build for production
ng build --configuration production

# Watch mode
npm run watch
```

### Test Commands

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage

# Specific test
npm test -- component-name.component.spec.ts
```

### Storybook

```bash
# Start Storybook
npm run storybook

# Build Storybook
ng run ui:build-storybook
```

## Troubleshooting

### Build Errors

1. **Module not found** - Check imports and public-api.ts
2. **Type errors** - Ensure strict mode compliance
3. **Style errors** - Check SCSS syntax and imports

### Test Failures

1. **Component not created** - Check TestBed configuration
2. **Fixture errors** - Ensure detectChanges() is called
3. **Spy errors** - Verify method names and calls

### Common Issues

1. **Component not exported** - Add to public-api.ts
2. **Styles not applied** - Check styleUrl path
3. **Template not found** - Check templateUrl path
4. **Change detection** - Use detectChanges() in tests

## Additional Resources

### Angular Documentation

- [Angular Components](https://angular.dev/guide/components)
- [Standalone Components](https://angular.dev/guide/components/importing)
- [Signals](https://angular.dev/guide/signals)
- [Testing](https://angular.dev/guide/testing)

### TypeScript

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

### Project Documentation

- [UI Library README](./README.md)
- [Component Structure Guide](./COMPONENT_STRUCTURE.md)
- [Quick Start Guide](./QUICK_START.md)
- [Contributing Guide](./CONTRIBUTING.md)

## Getting Help

If you need help:

1. Check this guide and other documentation
2. Look at existing components for examples
3. Open an issue on GitHub
4. Contact the maintainers

## License

This project is private and for personal use. See LICENSE file for details.
