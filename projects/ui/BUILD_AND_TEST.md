# Build and Test Guide

This document provides comprehensive information about building, testing, and developing the UI library.

## Table of Contents

- [Development Environment](#development-environment)
- [Building](#building)
- [Testing](#testing)
- [Running the Application](#running-the-application)
- [Storybook](#storybook)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

## Development Environment

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**: Latest version
- **Editor**: VS Code recommended (with Angular Language Service extension)

### Initial Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jh1777/library.git
   cd library
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Verify installation:**
   ```bash
   npm run build
   ```

## Building

### Build the UI Library

Build the library in production mode:

```bash
npm run build
```

This creates optimized bundles in `dist/ui/`.

**Output:**
- ES2022 modules
- UMD bundles
- Type definitions
- Package metadata

### Build in Watch Mode

Rebuild automatically on file changes:

```bash
npm run watch
```

Useful during development for quick iterations.

### Build the Demo Application

Build the demo application:

```bash
ng build
```

Or with a specific configuration:

```bash
# Development build
ng build --configuration development

# Production build
ng build --configuration production
```

### Build Output Structure

```
dist/
├── ui/                        # UI Library
│   ├── bundles/               # UMD bundles
│   ├── esm2022/               # ES2022 modules
│   ├── fesm2022/              # Flat ES2022
│   ├── lib/                   # Compiled source
│   ├── package.json
│   ├── README.md
│   └── public-api.d.ts
└── library/                   # Demo Application
    └── browser/
        ├── index.html
        ├── main-*.js
        └── ... (bundled files)
```

## Testing

### Run All Tests

Run the test suite once:

```bash
npm test
```

### Run Tests in Watch Mode

Run tests and re-run on file changes:

```bash
npm test -- --watch
```

### Run Specific Tests

Run tests for a specific file:

```bash
npm test -- badge.component.spec.ts
```

Run tests matching a pattern:

```bash
npm test -- --testNamePattern="should create"
```

### Generate Coverage Report

```bash
npm test -- --coverage
```

Coverage report is generated in `coverage/` directory.

### Test Configuration

Tests are configured using:
- **Karma**: Test runner (karma.conf.js)
- **Jasmine**: Testing framework
- **TypeScript**: tsconfig.spec.json

### Writing Tests

Example component test:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyComponent } from './my-component.component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent]  // Standalone component
    }).compileComponents();
    
    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onClick event', () => {
    spyOn(component.onClick, 'emit');
    component.handleClick();
    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should update display when input changes', () => {
    fixture.componentRef.setInput('label', 'New Label');
    fixture.detectChanges();
    
    const element = fixture.nativeElement.querySelector('.label');
    expect(element.textContent).toBe('New Label');
  });
});
```

### Testing Best Practices

1. **Test component creation** - Verify basic instantiation
2. **Test inputs** - Verify input properties affect the component
3. **Test outputs** - Verify events are emitted correctly
4. **Test user interactions** - Verify clicks, inputs, etc.
5. **Test edge cases** - Verify error handling and boundary conditions
6. **Test accessibility** - Verify ARIA attributes and keyboard navigation

## Running the Application

### Development Server

Start the development server:

```bash
npm start
```

Or explicitly:

```bash
ng serve
```

The application will be available at `http://localhost:4200/`

**Features:**
- Hot module replacement
- Automatic recompilation
- Live reload

### Development Server Options

```bash
# Specific port
ng serve --port 4300

# Open browser automatically
ng serve --open

# Production mode
ng serve --configuration production

# Host binding (for remote access)
ng serve --host 0.0.0.0
```

## Storybook

Storybook provides an isolated environment for developing and testing components.

### Start Storybook

```bash
npm run storybook
```

Storybook will be available at `http://localhost:6006/`

### Build Storybook

Build static Storybook for deployment:

```bash
ng run ui:build-storybook
```

Output is generated in `dist/storybook/ui/`

### Creating Stories

Example story file (`button.stories.ts`):

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    label: 'Button',
    style: 1,
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Submit',
    icon: faCheck,
    style: 1,
  },
};
```

## Common Tasks

### Create a New Component

```bash
./create-component.sh my-component
```

### Add a Dependency

```bash
# Production dependency
npm install package-name

# Development dependency
npm install --save-dev package-name
```

### Update Dependencies

```bash
# Check outdated packages
npm outdated

# Update all dependencies
npm update

# Update specific package
npm install package-name@latest
```

### Lint Code

If ESLint is configured:

```bash
npm run lint
```

### Format Code

If Prettier is configured:

```bash
npm run format
```

### Generate Documentation

If Compodoc is configured:

```bash
npx compodoc -p tsconfig.json
```

## Troubleshooting

### Build Errors

#### "Module not found"

**Cause:** Missing import or incorrect path

**Solution:**
1. Check import path is correct
2. Ensure component is exported in `public-api.ts`
3. Verify the file exists

#### "Type error: Property does not exist"

**Cause:** TypeScript strict mode errors

**Solution:**
1. Add proper type annotations
2. Initialize properties with default values
3. Use optional chaining `?.` or nullish coalescing `??`

#### "Cannot find module '@angular/core'"

**Cause:** Dependencies not installed

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Test Errors

#### "Component not created"

**Cause:** TestBed not configured correctly

**Solution:**
```typescript
await TestBed.configureTestingModule({
  imports: [MyComponent]  // For standalone components
}).compileComponents();
```

#### "Fixture is null"

**Cause:** `detectChanges()` not called

**Solution:**
```typescript
fixture = TestBed.createComponent(MyComponent);
component = fixture.componentInstance;
fixture.detectChanges();  // Add this
```

#### "Cannot read property 'emit' of undefined"

**Cause:** Output not initialized

**Solution:**
Make sure outputs are properly defined:
```typescript
onClick = output<string>();  // Not undefined
```

### Runtime Errors

#### "Template parse errors"

**Cause:** Invalid template syntax

**Solution:**
1. Check component is imported
2. Verify selector is correct
3. Check template syntax

#### "ExpressionChangedAfterItHasBeenCheckedError"

**Cause:** Property changed after change detection

**Solution:**
1. Use `ChangeDetectionStrategy.OnPush`
2. Update properties in proper lifecycle hooks
3. Use `setTimeout()` or `Promise.resolve()`

#### "Cannot bind to 'property'"

**Cause:** Property not defined as input

**Solution:**
```typescript
propertyName = input<string>();  // Define as input
```

### Performance Issues

#### "Slow build times"

**Solution:**
1. Use incremental builds: `npm run watch`
2. Clear Angular cache: `rm -rf .angular/`
3. Upgrade to latest Angular CLI

#### "Slow test execution"

**Solution:**
1. Run specific tests instead of full suite
2. Use `fdescribe` and `fit` for focused tests
3. Mock heavy dependencies

### Environment Issues

#### "Node version mismatch"

**Solution:**
```bash
# Check required version
node --version

# Use nvm to switch versions
nvm install 18
nvm use 18
```

#### "Permission denied"

**Solution:**
```bash
# On Unix/Mac
chmod +x create-component.sh

# On Windows, run as administrator or use WSL
```

## Quick Reference

### Common Commands

```bash
# Development
npm start                    # Start dev server
npm run build               # Build library
npm run watch              # Build in watch mode
npm test                   # Run tests
npm run storybook          # Start Storybook

# Component Creation
./create-component.sh name # Create new component

# Cleanup
rm -rf node_modules dist .angular
npm install                # Reinstall dependencies
```

### Directory Shortcuts

```bash
# UI Library source
cd projects/ui/src/lib

# Components
cd projects/ui/src/lib/components

# Shared utilities
cd projects/ui/src/lib/shared

# Templates
cd projects/ui/.templates
```

### File Locations

| Task | File/Directory |
|------|----------------|
| Add component | `projects/ui/src/lib/components/` |
| Export API | `projects/ui/src/public-api.ts` |
| Configure build | `angular.json` |
| Configure tests | `karma.conf.js` |
| Project config | `package.json` |

## Additional Resources

- [Developer Guide](./DEVELOPER_GUIDE.md)
- [Component Structure Guide](./COMPONENT_STRUCTURE.md)
- [Quick Start Guide](./QUICK_START.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Project Structure](./PROJECT_STRUCTURE.md)

## Getting Help

If you encounter issues:

1. Check this troubleshooting guide
2. Review the [Developer Guide](./DEVELOPER_GUIDE.md)
3. Look at existing components for examples
4. Check Angular documentation
5. Open an issue on GitHub
