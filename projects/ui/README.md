
WORK IN PROGRESS

# Table of Contents

- [Disclaimer](#disclaimer)
- [Abstract](#abstract)
- [Key Features](#key-features)
- [Common Input Properties](#common-input-properties)
- [Default Components](#default-components)
  - [Badge](#badge)
  - [Button](#button)
  - [Switch](#switch)
  - [Card](#card)
    - [Card Section Basic](#card--card-section-basic)
  - [Entry Container](#entry-container)
  - [Entry Metric](#entry-metric)
  - [Entry Key Value](#entry-key-value)
  - [Entry Tile Item](#entry-tile-item)
  - [Entry Tile](#entry-tile)
  - [Metric Tile](#metric-tile)
  - [Tabs](#tabs)
  - [Tab](#tab)
  - [Toolbar](#toolbar)
  - [Value Tile](#value-tile)
- [Content and Navigation Components](#content-and-navigation-components)
  - [Grid](#grid)
  - [Menu Bar](#menu-bar)
  - [Menu Item (config only)](#menu-item-config-only)
  - [Window](#window)
  - [Content](#content)
- [Component Usage](#component-usage)

# Disclaimer

This is a private fun project which has no productive focus. It is not actively maintained and there is no support. It is free of use at own risk.

# Abstract

Welcome to the documentation of this project, a comprehensive and modular library designed to streamline the development of user interfaces in Angular applications. This documentation serves as a guide to help you leverage the power and flexibility of our UI components effectively in your projects.

It offers a rich collection of reUseable components that are carefully crafted to enhance the user experience while promoting consistency and scalability across applications. Whether you are building a simple web application or a complex enterprise-grade solution, our library provides the building blocks you need to create modern and visually appealing interfaces with ease.

### Key Features:

**Modular Architecture**: Our library follows a modular architecture, allowing you to pick and choose the components you need for your specific project requirements. Each component is self-contained and can be easily integrated into your Angular application, promoting code reusability and maintainability.

# Common Input Properties

These properties are supported in each component and so only described once in this section.

### `isLoading`

> boolean

Indicates whether the content is still loading. If set to `true` the component will show a loading indicator.  
Default is `false`. When use building blocks consider using `isLoading` on most granular components.  

### `tooltip`

> string

Tooltip is an optional text that can be shown on mouse over for applicable components.  
In each component it is defined if this supports tooltips or not.

### `data`

> any

This property can be optionally set to any value for further / future use.

### `id`

> string

The Id can uniquely indentify the current item. All output events will emit this id (for example onClick events).  

### `errorMessage`

> string

If set the component will fallback in its error state and will show an overlay with the provided `errorMessage`.  
Any content or loading states will be overriden / hidden.  
Please make sure that this is understandable and short.


# Default Components

Short description about the purpose and content of the component.  

## Badge
> Useable standalone: **Yes**  
> Supports loading indicator: **No**  
> Supports tooltip: **Yes**  
> Supports error message: **No**  
> Selector: `ui-badge`

### Inputs
#### `value`
> Type: *number*  
> Optional: **Yes** (in case `label` is used, this can be omitted)  

Represents the number that is shown in the badge circle.   Maximum is 99. Everything bigger is shown as 99+.  

#### `label`
> Type: *string*   
> Optional: **Yes** (in case `value` is used, this can be omitted)  

Displays text on the left to the badge `value`. Can also be used without setting a `value`.  

### Accepts as Sub-Component
NONE

#### Useable inside
- Button
- Accordion Panel Header
- Entry Tile Item
- Value Tile

### Usage
`<ui-badge value="4" [style]="3"></ui-badge>`

### Screenshot
![alt text](./assets/docs/badge.jpg){width=50%}

---

## Button
> Useable standalone: **Yes**  
> Supports loading indicator: **Yes**  
> Supports error message: **No**  
> Supports tooltip: **Yes**  
> Selector: `ui-button`

### Inputs

#### `label`
> Type: *string*  
> Optional: **Yes**  
The text label displayed on the button.

#### `style`
> Type: *ButtonStyle*  
> Optional: **Yes** (default: `Primary`)  
Defines the visual style of the button.  
Possible values:  
- `Simple_primary = 0`: Small petrol button, no border/background  
- `Simple_destructive = 6`: Small red button, no border/background  
- `Primary = 1`: Petrol background, white text (**default**)  
- `Secondary = 2`: Grey background, white text  
- `Outline = 3`: White fill, petrol border  
- `Destructive = 4`: Red background, white text  
- `Confirm = 5`: Green background, white text  

#### `icon`
> Type: *IconDefinition*  
> Optional: **Yes**  
Font Awesome icon to display in the button.

#### `isDisabled`
> Type: *boolean*  
> Optional: **Yes** (default: `false`)  
Disables the button if set to `true`.

#### `onClick`
> Type: *EventEmitter&lt;MouseEvent&gt;*  
> Emits when the button is clicked.

#### `simpleOnly`
> Type: *boolean*  
> Internal use only  
Forces simple-only styles (overrides others).

#### `iconOnlySimpleStyle`
> Type: *boolean*  
> Internal use only  
Forces icon-only simple style (overrides others).

#### `whiteMode`
> Type: *boolean*  
> Optional: **Yes** (default: `false`)  
Use for simple styles on dark backgrounds.

### Accepts as Sub-Component
- [Badge](#badge)

#### Useable inside
- Entry Tile
- Entry Item
- Card
- Card Section Basic
- Toolbar
- Value Tile

### Usage
`<ui-button label="Apply" [icon]="faCheck()" [style]="1">`

### Screenshot
![alt text](./assets/docs/button.jpg){width=75%}

---

## Switch
> Useable standalone: **Yes**  
> Supports loading indicator: **No**  
> Supports error message: **No**  
> Supports tooltip: **Yes**  
> Selector: `ui-switch`

### Inputs

#### `label`
> Type: *string*  
> Optional: **Yes**  
The text label displayed next to the switch.

#### `state`
> Type: *boolean*  
> Optional: **Yes** (default: `false`)  
> Two-way binding supported  
The current state of the switch (on/off).

#### `isDisabled`
> Type: *boolean*  
> Optional: **Yes** (default: `false`)  
Disables the switch if set to `true`.

### Accepts as Sub-Component
NONE

#### Useable inside
- Accordion Panel Header
- Entry Tile Item

### Usage
`<ui-switch label="Enable feature" [(state)]="featureEnabled">`

### Screenshot

![alt text](./assets/docs/switch-off.jpg){width=25%}
![alt text](./assets/docs/switch-on.jpg){width=25%}

--- 

## Card
> Useable standalone: **Yes**  
> Supports loading indicator: **Yes**  
> Supports error message: **Yes**  
> Supports tooltip: **Yes** (on header)  
> Selector: `ui-card`

### Inputs

#### `header`
> Type: *string*  
> Required: **Yes**  
Main header title of the card, shown at the top.

#### `headerRight`
> Type: *string*  
> Optional: **Yes**  
Header content shown in the right slot of the header.

#### `style`
> Type: *CardStyle*  
> Optional: **Yes** (default: `None`)  
Defines the visual style of the card header and border.  
Possible values:  
- `None` = grey (default)  
- `Attention` = orange  
- `Error` = red  
- `Success` = green  
- `Highlight` = petrol  

#### `toggleSelect`
> Type: *boolean*  
> Optional: **Yes** (default: `false`)  
If `true` and `isClickable` is `true`, the selection of the component is retained until the next click (toggles).

#### `isSelected`
> Type: *boolean*  
> Optional: **Yes** (default: `false`)  
Selection state of the component. If `isClickable` and `toggleSelect` are `true`, the selection is retained until the next click.

#### `isClickable`
> Type: *boolean*  
> Optional: **Yes** (default: `false`)  
If `true`, the card is clickable and emits the `onClick` event.

#### `onClick`
> Type: *EventEmitter&lt;string | null&gt;*  
> Emits the `id` of the component when clicked.

### Accepts as Sub-Component
- [Button](#button) (in header only)
- [Switch](#switch) (in header only)
- [Card Section Basic](#card-section-basic)



## Card :: Card Section Basic
> Useable standalone: **No**  
> Supports loading indicator: **Yes**  
> Supports error message: **Yes**  
> Supports tooltip: **No**  
> Selector: `ui-card-section-basic`

### Inputs

#### `header`
> Type: *string*  
> Optional: **Yes**  
Header/title for this section, shown on top before `text`.

#### `text`
> Type: *string*  
> Optional: **Yes**  
Text shown as section content. Uses `innerHTML` so HTML formatting can be applied.

#### `list`
> Type: *Array&lt;string&gt;*  
> Optional: **Yes**  
Simple unformatted list shown below the `text`.

#### `style`
> Type: *CardStyle*  
> Optional: **Yes** (default: `None`)  
Defines the style and icon of the section.  
Possible values:  
- `None` = no icon (default)  
- `Attention` = orange  
- `Error` = red  
- `Success` = green  
- `Information` = grey  

#### `styledMessage`
> Type: *string*  
> Optional: **Yes**  
Message shown in the style color. Ignored if `style` is `None`.

#### `showStyledBackground`
> Type: *boolean*  
> Optional: **Yes** (default: `false`)  
Shows a colored background if the style is not `None`.

#### `toggleSelect`
> Type: *boolean*  
> Optional: **Yes** (default: `false`)  
If `true` and `isClickable` is `true`, the selection of the component is retained until the next click (toggles).

#### `isSelected`
> Type: *boolean*  
> Optional: **Yes** (default: `false`)  
Selection state of the component. If `isClickable` and `toggleSelect` are `true`, the selection is retained until the next click.

#### `isClickable`
> Type: *boolean*  
> Optional: **Yes** (default: `false`)  
If `true`, the section is clickable and emits the `onClick` event.

#### `onClick`
> Type: *EventEmitter&lt;string | null&gt;*  
> Emits the `id` of the component when clicked.

### Accepts as Sub-Component
- [Button](#button)
- [Switch](#switch)

### Usage Example

```html
<ui-card header="Orders" [style]="1">
  <ui-card-section-basic 
    header="Partner A" 
    [style]="3">
  </ui-card-section-basic>
  <ui-card-section-basic 
    text="There is some text" 
    styledMessage="The confirmation is pending since 2 days."
    header="Partner A"
    [showStyledBackground]="true"
    [style]="1">
  </ui-card-section-basic>
</ui-card>
```
### Screenshot
![alt text](./assets/docs/card.jpg){width=100%}

---
TODO: update docs from here...

## Entry Container
> Useable standalone: **Yes**  
> Supports loading indicator: **No**  
> Supports error message: **No**  
> Supports tooltip: **No**  
> Selector: `ui-entry-container`  
### Accepts as Sub-Component
- [Entry Metric](#entry-metric)
- [Entry Key Value](#entry-key-value)

## Entry Metric
> Useable standalone: **No**  
> Supports error message: **Yes**  
> Supports loading indicator: **Yes**  
> Supports tooltip: **Yes**  
> Selector: `ui-entry-metric`  
### Accepts as Sub-Component
NONE

## Entry Key Value 
> Useable standalone: **No**  
> Supports error message: **Yes**  
> Supports loading indicator: **Yes**  
> Supports tooltip: **Yes** (right side)  
> Selector: `ui-entry-key-value`  
### Accepts as Sub-Component
NONE

## Entry Tile Item
> Useable standalone: **No**  
> Supports error message: **Yes**  
> Supports loading indicator: **Yes**  
> Supports tooltip: **Yes**  
> Selector: `ui-entry-item`  
### Accepts as Sub-Component
- [Badge](#badge)
- [Button](#button)
- [Switch](#switch)

## Entry Tile
> Useable standalone: **Yes**  
> Supports error message: **No**    
> Supports loading indicator: **Yes**  
> Supports tooltip: **No**  
> Selector: `ui-entry-tile`  
### Accepts as Sub-Component
- [Entry Tile Item](#entry-tile-item)
- [Entry Key Value](#entry-key-value)

## Metric Tile
> Useable standalone: **Yes**  
> Supports error message: **No**  
> Supports loading indicator: **No**  
> Supports tooltip: **No**  
> Selector: `ui-metric-tile`  
### Accepts as Sub-Component
- [Entry Container](#entry-container)

## Tabs
> Useable standalone: **Yes**  
> Supports error message: **No**   
> Supports loading indicator: **No**  
> Supports tooltip: **No**  
> Selector: `ui-tabs`  
### Accepts as Sub-Component
- [Tab](#tab)

## Tab
> Useable standalone: **No**  
> Supports error message: **No**     
> Supports loading indicator: **No**  
> Supports tooltip: **Yes**  
> Selector: `ui-tab`  
### Accepts as Sub-Component
Everything

## Toolbar
> Useable standalone: **Yes**  
> Supports error message: **No**    
> Supports loading indicator: **No**  
> Supports tooltip: **No**  
> Selector: `ui-toolbar`  
### Accepts as Sub-Component
- [Badge](#badge)
- [Button](#button)
- [Switch](#switch)
- [Value Tile](#value-tile)

## Value Tile
> Useable standalone: **Yes**  
> Supports loading indicator: **Yes**  
> Supports tooltip: **Yes**  
> Selector: `ui-value-tile`  
#### Useable inside
- Toolbar

# Content and Navigation Components

## Grid
> Useable standalone: **Yes**  
> Supports loading indicator: **No**  
> Supports tooltip: **No**  
> Selector: `ui-grid`  
#### Accepts
- Entry Tile
- Metric Tile

## Menu Bar
> Useable standalone: **Yes**  
> Supports loading indicator: **No**  
> Supports tooltip: **No**  
> Selector: `ui-menu-bar`
#### Accepts
- Menu Item

## Menu Item (config only)
> Useable standalone: **No**  
> Supports loading indicator: **No**  
> Supports tooltip: **Yes**  
> Selector: `uic-menu-item`
#### Useable inside
- Menu Bar

## Window
> Useable standalone: **Yes**  
> Supports loading indicator: **Yes**  
> Supports tooltip: **No**  
> Selector: `ui-window`
#### Accepts
- Content
- Menu Bar

## Content
> Useable standalone: **Yes**  
> Supports loading indicator: **Yes**  
> Supports tooltip: **No**  
> Selector: `ui-content`
#### Useable inside
- Window

# Component Usage

tbd