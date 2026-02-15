#!/bin/bash

# Component Creation Helper Script
# Usage: ./create-component.sh component-name

set -e

# Check if component name is provided
if [ -z "$1" ]; then
    echo "Error: Component name is required"
    echo "Usage: ./create-component.sh component-name"
    echo "Example: ./create-component.sh alert-box"
    exit 1
fi

COMPONENT_NAME_KEBAB="$1"
# Convert kebab-case to PascalCase
COMPONENT_NAME_PASCAL=$(echo "$COMPONENT_NAME_KEBAB" | sed -r 's/(^|-)([a-z])/\U\2/g')

TEMPLATE_DIR="projects/ui/.templates/component-template"
TARGET_DIR="projects/ui/src/lib/components/$COMPONENT_NAME_KEBAB"

# Check if component already exists
if [ -d "$TARGET_DIR" ]; then
    echo "Error: Component '$COMPONENT_NAME_KEBAB' already exists at $TARGET_DIR"
    exit 1
fi

# Check if template directory exists
if [ ! -d "$TEMPLATE_DIR" ]; then
    echo "Error: Template directory not found at $TEMPLATE_DIR"
    exit 1
fi

echo "Creating component: $COMPONENT_NAME_KEBAB"
echo "PascalCase name: $COMPONENT_NAME_PASCAL"
echo ""

# Copy template directory
echo "Copying template files..."
cp -r "$TEMPLATE_DIR" "$TARGET_DIR"

# Rename files
echo "Renaming files..."
cd "$TARGET_DIR"
for file in component-name.*; do
    if [ -f "$file" ]; then
        new_name="${file/component-name/$COMPONENT_NAME_KEBAB}"
        mv "$file" "$new_name"
        echo "  Renamed: $file -> $new_name"
    fi
done

# Update file contents
echo "Updating file contents..."
for file in *; do
    if [ -f "$file" ]; then
        # Replace component-name with actual name
        sed -i "s/component-name/$COMPONENT_NAME_KEBAB/g" "$file"
        # Replace ComponentName with PascalCase name
        sed -i "s/ComponentName/$COMPONENT_NAME_PASCAL/g" "$file"
        echo "  Updated: $file"
    fi
done

cd - > /dev/null

# Update public-api.ts
PUBLIC_API="projects/ui/src/public-api.ts"
echo "" >> "$PUBLIC_API"
echo "export * from './lib/components/$COMPONENT_NAME_KEBAB';" >> "$PUBLIC_API"
echo "Added export to $PUBLIC_API"

echo ""
echo "✅ Component created successfully at: $TARGET_DIR"
echo ""
echo "Next steps:"
echo "1. Implement your component logic in $COMPONENT_NAME_KEBAB.component.ts"
echo "2. Update the template in $COMPONENT_NAME_KEBAB.component.html"
echo "3. Add styles in $COMPONENT_NAME_KEBAB.component.scss"
echo "4. Update models and enums in $COMPONENT_NAME_KEBAB.models.ts"
echo "5. Write tests in $COMPONENT_NAME_KEBAB.component.spec.ts"
echo "6. Build and test: npm run build && npm test"
echo ""
