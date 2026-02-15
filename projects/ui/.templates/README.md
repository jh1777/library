# Component Templates

This directory contains template files for creating new components in the UI library.

## Usage

To create a new component using these templates:

1. **Copy the template directory:**
   ```bash
   cp -r projects/ui/.templates/component-template projects/ui/src/lib/components/your-component-name
   ```

2. **Rename all files:**
   Replace `component-name` with your actual component name (in kebab-case)
   ```bash
   cd projects/ui/src/lib/components/your-component-name
   
   # On Linux/Mac:
   for file in component-name.*; do
     mv "$file" "${file/component-name/your-component-name}"
   done
   ```

3. **Update file contents:**
   - Replace all occurrences of `ComponentName` with your component name in PascalCase
   - Replace all occurrences of `component-name` with your component name in kebab-case
   - Update the component selector to `ui-your-component-name`
   - Update imports and class names as needed

4. **Add to public API:**
   Edit `projects/ui/src/public-api.ts` and add:
   ```typescript
   export * from './lib/components/your-component-name';
   ```

5. **Build and test:**
   ```bash
   npm run build
   npm test
   ```

## Template Files

- `component-name.component.ts` - Main component implementation
- `component-name.component.html` - Component template
- `component-name.component.scss` - Component styles
- `component-name.component.spec.ts` - Unit tests
- `component-name.models.ts` - Models, enums, and interfaces
- `index.ts` - Barrel file for exports

## Quick Reference

### Replace These Placeholders:

| Placeholder | Replace With | Example |
|-------------|--------------|---------|
| `component-name` | Your component name in kebab-case | `alert-box` |
| `ComponentName` | Your component name in PascalCase | `AlertBox` |
| `ui-component-name` | Selector with ui- prefix | `ui-alert-box` |

### Common Component Patterns:

#### Input Property:
```typescript
propertyName = input<string>('default value');
```

#### Required Input:
```typescript
propertyName = input.required<string>();
```

#### Output Event:
```typescript
onEvent = output<string>();
```

#### Content Children:
```typescript
@ContentChildren(ChildComponent) children!: QueryList<ChildComponent>;
```

## Automated Creation

For faster component creation, use the `create-component.sh` script in the project root:

```bash
./create-component.sh your-component-name
```

This script automatically:
- Copies the template
- Renames all files
- Updates file contents
- Adds the export to public-api.ts

For more details, see:
- [COMPONENT_STRUCTURE.md](../COMPONENT_STRUCTURE.md) - Full component structure guide
- [QUICK_START.md](../QUICK_START.md) - Quick start guide
