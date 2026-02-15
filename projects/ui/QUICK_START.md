# Quick Start: Creating a New Component

This guide will help you quickly create a new component in the UI library.

## Method 1: Using the Component Creation Script (Recommended)

1. **Run the script from the project root:**
   ```bash
   ./create-component.sh my-component
   ```

2. **Implement your component:**
   - Edit `projects/ui/src/lib/components/my-component/my-component.component.ts`
   - Update the template in `my-component.component.html`
   - Add styles in `my-component.component.scss`
   - Define models and enums in `my-component.models.ts`
   - Write tests in `my-component.component.spec.ts`

3. **Build and test:**
   ```bash
   npm run build
   npm test
   ```

That's it! The script automatically:
- Creates the component folder with all necessary files
- Renames files to match your component name
- Updates file contents with proper naming
- Adds the export to `public-api.ts`

## Method 2: Using Component Templates

1. **Copy the template:**
   ```bash
   cp -r projects/ui/.templates/component-template projects/ui/src/lib/components/my-component
   ```

2. **Rename files:**
   ```bash
   cd projects/ui/src/lib/components/my-component
   for file in component-name.*; do
     mv "$file" "${file/component-name/my-component}"
   done
   ```

3. **Update file contents:**
   - Replace `component-name` with `my-component` (kebab-case)
   - Replace `ComponentName` with `MyComponent` (PascalCase)
   - Update the selector to `ui-my-component`

4. **Add to public API:**
   
   Edit `projects/ui/src/public-api.ts`:
   ```typescript
   export * from './lib/components/my-component';
   ```

5. **Build and test:**
   ```bash
   npm run build
   npm test
   ```

## Method 3: Using Angular CLI

```bash
# Generate component with proper settings
ng generate component projects/ui/src/lib/components/my-component \
  --skip-tests=false \
  --standalone=true \
  --change-detection=OnPush \
  --style=scss

# Then manually:
# 1. Create models file
# 2. Create barrel file (index.ts)
# 3. Update component to extend UIBaseComponent
# 4. Add to public-api.ts
```

## Common Component Features

### Input Properties

```typescript
// Simple input with default value
label = input<string>('default');

// Required input
title = input.required<string>();

// Numeric input
count = input<number>(0);

// Boolean input
isDisabled = input<boolean>(false);

// Enum input
style = input<ComponentStyle>(ComponentStyle.None);
```

### Output Events

```typescript
// Simple event
onClick = output<string>();

// Event with complex data
onValueChange = output<{oldValue: string, newValue: string}>();

// Void event
onDismiss = output<void>();

// Emit events
handleClick() {
  this.onClick.emit(this.id());
}
```

### Content Children

```typescript
import { ContentChildren, QueryList, AfterContentInit } from '@angular/core';

@ContentChildren(ChildComponent) children!: QueryList<ChildComponent>;

ngAfterContentInit(): void {
  // Limit number of children (optional)
  super.limitContentChildren(this.children, 5);
}
```

### Styling with Enums

```typescript
// In models file
export enum ComponentStyle {
    None = 0,
    Primary = 1,
    Secondary = 2,
    Success = 3,
    Error = 4
}

// In component
style = input<ComponentStyle>(ComponentStyle.None);

// In template
<div [class.primary]="style() === ComponentStyle.Primary">
```

## Component Structure

### Basic Component Structure

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
  // Your component code here
}
```

### With Content Children

```typescript
import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'ui-parent',
  standalone: true,
  // ...
})
export class ParentComponent extends UIBaseComponent implements AfterContentInit {
  
  @ContentChildren(ChildComponent) children!: QueryList<ChildComponent>;
  
  ngAfterContentInit(): void {
    super.limitContentChildren(this.children, 10);
  }
}
```

## Need More Details?

For comprehensive documentation, see:
- [Component Structure Guide](./COMPONENT_STRUCTURE.md) - Complete guide with best practices
- [Component Templates](./.templates/README.md) - Template usage details
- [Contributing Guide](./CONTRIBUTING.md) - Contribution guidelines

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `alert-box.component.ts` |
| Classes | PascalCase | `AlertBoxComponent` |
| Selectors | kebab-case with `ui-` prefix | `ui-alert-box` |
| Properties | camelCase | `isDisabled` |
| Enums | PascalCase | `AlertBoxStyle` |
| Enum Values | PascalCase | `AlertBoxStyle.Primary` |

## Tips & Best Practices

1. **Always Extend UIBaseComponent:** Gets you `id`, `tooltip`, `isLoading`, `errorMessage`, and `data` for free
2. **OnPush Detection:** Use `ChangeDetectionStrategy.OnPush` for better performance
3. **Standalone:** All components should be standalone with `standalone: true`
4. **Signal-based APIs:** Use `input()` and `output()` instead of `@Input()` and `@Output()`
5. **Documentation:** Add JSDoc comments to all public properties and methods
6. **Testing:** Write unit tests for all components
7. **Accessibility:** Add ARIA labels, keyboard navigation, and focus management
8. **Selectors:** Always prefix with `ui-` (e.g., `ui-alert-box`)

## Common Patterns

### Clickable Component

```typescript
isClickable = input<boolean>(false);
onClick = output<string | null>();

handleClick() {
  if (this.isClickable()) {
    this.onClick.emit(this.id());
  }
}
```

### Toggle Selection

```typescript
isSelected = input<boolean>(false);
toggleSelect = input<boolean>(false);

handleToggle() {
  if (this.toggleSelect()) {
    this.isSelected.set(!this.isSelected());
  }
}
```

### Loading State

```typescript
// Inherited from UIBaseComponent
// Just use isLoading() in template
<div *ngIf="isLoading()">
  <ui-spinner></ui-spinner>
</div>
```

### Error State

```typescript
// Inherited from UIBaseComponent
// Just use errorMessage() in template
<div *ngIf="errorMessage()" class="error">
  {{ errorMessage() }}
</div>
```

## Build and Test Commands

```bash
# Build the UI library
npm run build

# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run Storybook
npm run storybook

# Lint code
npm run lint  # (if configured)
```

## Next Steps

After creating your component:
1. Add it to the UI README documentation
2. Create Storybook stories (optional)
3. Test it in the demo application
4. Create a pull request with your changes
