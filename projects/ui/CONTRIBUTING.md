# Contributing to UI Library

Thank you for your interest in contributing to this UI library! This guide will help you get started.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Creating Components](#creating-components)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Building](#building)
- [Pull Request Process](#pull-request-process)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Git
- Familiarity with Angular and TypeScript

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/library.git
   cd library
   ```

3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/jh1777/library.git
   ```

## Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the UI library:**
   ```bash
   npm run build
   ```

3. **Run tests:**
   ```bash
   npm test
   ```

## Creating Components

We have multiple methods for creating new components:

### Method 1: Component Creation Script (Recommended)

```bash
./create-component.sh my-component
```

This automatically creates all necessary files with the correct structure.

### Method 2: Using Templates

Copy from `.templates/component-template/` and manually rename files and update contents.

### Method 3: Angular CLI

```bash
ng generate component projects/ui/src/lib/components/my-component \
  --skip-tests=false \
  --standalone=true \
  --change-detection=OnPush \
  --style=scss
```

Then manually add models file and barrel export.

For detailed instructions, see:
- [Quick Start Guide](./QUICK_START.md)
- [Component Structure Guide](./COMPONENT_STRUCTURE.md)

## Code Standards

### Component Standards

1. **Always extend UIBaseComponent**
   ```typescript
   export class MyComponent extends UIBaseComponent { }
   ```

2. **Use standalone components**
   ```typescript
   @Component({
     standalone: true,
     // ...
   })
   ```

3. **Use OnPush change detection**
   ```typescript
   @Component({
     changeDetection: ChangeDetectionStrategy.OnPush,
     // ...
   })
   ```

4. **Use signal-based APIs**
   ```typescript
   // Use this
   label = input<string>('default');
   onClick = output<string>();
   
   // Not this
   @Input() label: string = 'default';
   @Output() onClick = new EventEmitter<string>();
   ```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `alert-box.component.ts` |
| Classes | PascalCase | `AlertBoxComponent` |
| Selectors | kebab-case with `ui-` prefix | `ui-alert-box` |
| Properties | camelCase | `isDisabled` |
| Enums | PascalCase | `AlertBoxStyle` |

### Code Style

- Use 2 spaces for indentation
- Add JSDoc comments for all public APIs
- Keep functions small and focused
- Follow the existing code style in the repository
- Use TypeScript strict mode
- Avoid `any` types

### File Organization

Each component should have:
- `component-name.component.ts` - Main component
- `component-name.component.html` - Template
- `component-name.component.scss` - Styles
- `component-name.component.spec.ts` - Tests
- `component-name.models.ts` - Models and enums
- `index.ts` - Barrel export

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests for a specific file
npm test -- component-name.component.spec.ts
```

### Writing Tests

All components must have unit tests:

```typescript
describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onClick event when clicked', () => {
    spyOn(component.onClick, 'emit');
    component.handleClick();
    expect(component.onClick.emit).toHaveBeenCalledWith(component.id());
  });
});
```

### Test Coverage

- Aim for high test coverage (>80%)
- Test all public APIs
- Test edge cases and error conditions
- Test user interactions
- Test accessibility features

## Building

### Build the UI Library

```bash
npm run build
```

This builds the library in production mode to the `dist/ui` folder.

### Build the Application

```bash
ng build
```

This builds the demo application.

## Pull Request Process

### Before Submitting

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/my-new-component
   ```

2. **Make your changes** following the code standards

3. **Write tests** for your changes

4. **Run tests** to ensure they pass:
   ```bash
   npm test
   ```

5. **Build the library** to ensure it compiles:
   ```bash
   npm run build
   ```

6. **Commit your changes** with clear commit messages:
   ```bash
   git add .
   git commit -m "feat: add alert-box component"
   ```

7. **Push to your fork:**
   ```bash
   git push origin feature/my-new-component
   ```

### Commit Message Format

Use conventional commit messages:

- `feat: add new component`
- `fix: correct button styling`
- `docs: update component guide`
- `test: add tests for badge component`
- `refactor: simplify card logic`
- `style: format code`
- `chore: update dependencies`

### Creating the Pull Request

1. Go to GitHub and create a pull request from your fork
2. Fill out the PR template with:
   - Description of changes
   - Related issue number (if applicable)
   - Screenshots (for UI changes)
   - Testing steps
3. Wait for review and address any feedback

### Review Process

- PRs require at least one approval
- Address all review comments
- Keep PRs focused and reasonably sized
- Ensure CI/CD checks pass

## Documentation

When adding a new component:

1. **Add to README.md** - Document the component with:
   - Description
   - Input properties
   - Output events
   - Usage example
   - Screenshot (if applicable)

2. **Update COMPONENT_STRUCTURE.md** if adding new patterns


## Questions?

If you have questions or need help:

1. Check the [Component Structure Guide](./COMPONENT_STRUCTURE.md)
2. Check the [Quick Start Guide](./QUICK_START.md)
3. Look at existing components for examples
4. Open an issue for discussion

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
