# Component Structure Guide

This document describes the standard structure for creating new components in the UI library.

## Directory Structure

Each component should follow this standardized structure:

```
projects/ui/src/lib/components/
└── component-name/
    ├── index.ts                          # Barrel file for exports
    ├── component-name.component.ts        # Component implementation
    ├── component-name.component.html      # Component template
    ├── component-name.component.scss      # Component styles
    ├── component-name.component.spec.ts   # Component tests
    ├── component-name.models.ts           # Models, enums, and interfaces
```

### Sub-components

If a component has sub-components (e.g., `Tabs` → `Tab`, `Card` → `CardSectionBasic`), they should be nested within the parent component's folder:

```
projects/ui/src/lib/components/
└── parent-component/
    ├── index.ts
    ├── parent-component.component.ts
    ├── parent-component.component.html
    ├── parent-component.component.scss
    ├── parent-component.component.spec.ts
    ├── parent-component.models.ts
    └── sub-component/
        ├── sub-component.component.ts
        ├── sub-component.component.html
        ├── sub-component.component.scss
        ├── sub-component.component.spec.ts
        └── sub-component.models.ts
```

## File Templates

### 1. Component File (`component-name.component.ts`)

```typescript
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIBaseComponent } from '../../shared';
import { ComponentNameStyle } from './component-name.models';

@Component({
  selector: 'ui-component-name',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './component-name.component.html',
  styleUrl: './component-name.component.scss'
})
export class ComponentNameComponent extends UIBaseComponent {

  /**
   * Description of the input property
   * Default: value
   */
  propertyName = input<string>('default value');

  /**
   * Event emitted when something happens
   */
  onEvent = output<string>();

}
```

**Key Points:**
- Use `standalone: true` for all components
- Use `ChangeDetectionStrategy.OnPush` for better performance
- Extend `UIBaseComponent` to inherit common functionality (id, tooltip, isLoading, errorMessage, data)
- Use Angular's signal-based `input()` and `output()` APIs
- Use `ui-` prefix for component selectors
- Include JSDoc comments for all public properties and methods

### 2. Models File (`component-name.models.ts`)

```typescript
import { UIBaseComponentInterface } from "../../shared/ui-base.models";

/**
 * Style options for ComponentName component
 */
export enum ComponentNameStyle {
    None = 0,
    Primary = 1,
    Secondary = 2,
    Success = 3,
    Error = 4,
    Attention = 5
}

/**
 * Interface for ComponentName component
 */
export interface ComponentNameInterface extends UIBaseComponentInterface {
    propertyName?: string;
    style?: ComponentNameStyle;
}
```

**Key Points:**
- Create enums for style options (typically starting from 0)
- Extend `UIBaseComponentInterface` for component interfaces
- Use JSDoc comments for enums and interfaces

### 3. Barrel File (`index.ts`)

```typescript
export * from './component-name.component';
export * from './component-name.models';
```

**Key Points:**
- Export both the component and its models
- Keep it simple and clean

### 4. Template File (`component-name.component.html`)

```html
<div class="component-name-container">
  <!-- Component content goes here -->
</div>
```

**Key Points:**
- Use meaningful class names
- Follow BEM naming convention if applicable
- Keep templates clean and readable

### 5. Style File (`component-name.component.scss`)

```scss
@import '../../styles/variables';

.component-name-container {
  // Component styles
}
```

**Key Points:**
- Import shared variables and mixins
- Use component-specific class names
- Follow existing styling patterns

### 6. Spec File (`component-name.component.spec.ts`)

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentNameComponent } from './component-name.component';

describe('ComponentNameComponent', () => {
  let component: ComponentNameComponent;
  let fixture: ComponentFixture<ComponentNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponentNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more tests here
});
```

**Key Points:**
- Import the component directly (it's standalone)
- Add meaningful tests for component behavior
- Test inputs, outputs, and user interactions

## Creating a New Component

### Using Angular CLI (Recommended)

```bash
# From the project root
ng generate component projects/ui/src/lib/components/component-name --skip-tests=false --standalone=true --change-detection=OnPush --style=scss

# This will create the basic files, then you need to:
# 1. Create the models file manually
# 2. Create the barrel file (index.ts)
# 3. Update the component to extend UIBaseComponent
# 4. Add exports to projects/ui/src/public-api.ts
```

### Using the Component Creation Script

See [QUICK_START.md](./QUICK_START.md) for details on using the helper script.

### Manual Creation Steps

1. **Create the component folder:**
   ```bash
   mkdir -p projects/ui/src/lib/components/component-name
   ```

2. **Create all necessary files** using the templates above or from `.templates/component-template/`

3. **Add exports to the public API:**
   
   Edit `projects/ui/src/public-api.ts` and add:
   ```typescript
   export * from './lib/components/component-name';
   ```

4. **Update documentation:**
   
   Add component documentation to `projects/ui/README.md`

5. **Build and test:**
   ```bash
   npm run build
   npm test
   ```

## Component Guidelines

### Naming Conventions

- **Files:** Use kebab-case (e.g., `button-group.component.ts`)
- **Classes:** Use PascalCase (e.g., `ButtonGroupComponent`)
- **Selectors:** Use kebab-case with `ui-` prefix (e.g., `ui-button-group`)
- **Properties:** Use camelCase (e.g., `isDisabled`)

### Common Input Properties

All components that extend `UIBaseComponent` automatically inherit these properties:

- `id` - Unique identifier for the component
- `tooltip` - Tooltip text to display on hover
- `isLoading` - Shows loading indicator when true
- `errorMessage` - Shows error state with message when set
- `data` - Optional data property for custom use

### Best Practices

1. **Standalone Components:** All new components should be standalone
2. **OnPush Change Detection:** Use `ChangeDetectionStrategy.OnPush` for better performance
3. **Signal-based APIs:** Use `input()` and `output()` for component properties
4. **Extend UIBaseComponent:** Inherit common functionality and ensure consistency
5. **TypeScript Strict Mode:** Ensure all types are properly defined
6. **Documentation:** Add JSDoc comments for all public APIs
7. **Testing:** Write unit tests for all components
8. **Accessibility:** Ensure components are accessible (ARIA labels, keyboard navigation, etc.)

## Example: Creating a Simple Alert Component

Here's a complete example of creating a new "Alert" component:

### 1. Create Files

```typescript
// alert.component.ts
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIBaseComponent } from '../../shared';
import { AlertStyle } from './alert.models';

@Component({
  selector: 'ui-alert',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent extends UIBaseComponent {

  /**
   * Message to display in the alert
   */
  message = input.required<string>();

  /**
   * Visual style of the alert
   * Default: Info
   */
  style = input<AlertStyle>(AlertStyle.Info);

  /**
   * Whether the alert can be dismissed
   * Default: false
   */
  dismissible = input<boolean>(false);

  /**
   * Event emitted when the alert is dismissed
   */
  onDismiss = output<void>();

  handleDismiss() {
    this.onDismiss.emit();
  }
}
```

### 2. Create Models

```typescript
// alert.models.ts
import { UIBaseComponentInterface } from "../../shared/ui-base.models";

export enum AlertStyle {
    Info = 0,
    Success = 1,
    Warning = 2,
    Error = 3
}

export interface AlertInterface extends UIBaseComponentInterface {
    message: string;
    style?: AlertStyle;
    dismissible?: boolean;
}
```

### 3. Create Barrel File

```typescript
// index.ts
export * from './alert.component';
export * from './alert.models';
```

### 4. Update Public API

```typescript
// projects/ui/src/public-api.ts
export * from './lib/components/alert';
```

## Additional Resources

- [Quick Start Guide](./QUICK_START.md)
- [Component Templates](./.templates/README.md)
- [Angular Component Guide](https://angular.dev/guide/components)
- [Angular Standalone Components](https://angular.dev/guide/components/importing)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
