[[ _TOC_ ]]

# Abstract

Welcome to the documentation of this project, a comprehensive and modular library designed to streamline the development of user interfaces in Angular applications. This documentation serves as a guide to help you leverage the power and flexibility of our UI components effectively in your projects.

It offers a rich collection of reUseable components that are carefully crafted to enhance the user experience while promoting consistency and scalability across applications. Whether you are building a simple web application or a complex enterprise-grade solution, our library provides the building blocks you need to create modern and visually appealing interfaces with ease.

### Key Features:

**Modular Architecture**: Our library follows a modular architecture, allowing you to pick and choose the components you need for your specific project requirements. Each component is self-contained and can be easily integrated into your Angular application, promoting code reusability and maintainability.

**Customizability**: We understand that every application has unique requirements. That's why our components are structured in a flexible way so a majority of use-cases can be fulfilled.

**State-of-the-Art**: The library is developed to leverage current best practices and features for optimal maintainability and performance.

# Common Input Properties

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

...

**HINT: Maybe rewrite all _Useable inside_ to _Accepts_ perspective??**

### Accepts as Sub-Component
NONE

## Button
> Useable standalone: **Yes**  
> Supports loading indicator: **No**  
> Supports error message: **No**  
> Supports tooltip: **Yes**  
> Selector: `ui-button`

### Accepts as Sub-Component
- [Badge](#badge)

#### Useable inside
- Entry Tile
- Entry Item
- Card
- Card Section Basic
- Toolbar
- Value Tile

## Switch
> Useable standalone: **Yes**  
> Supports loading indicator: **No**  
> Supports error message: **No**  
> Supports tooltip: **Yes**  
> Selector: `ui-switch`

### Accepts as Sub-Component
NONE

## Card
> Useable standalone: **Yes**  
> Supports loading indicator: **Yes**  
> Supports error message: **Yes**  
> Supports tooltip: **Yes** (on header)  
> Selector: `ui-card`

### Accepts as Sub-Component
- [Button](#button) (in header only)
- [Switch](#switch) (in header only)
- [Card Section Basic](#card-section-basic)

## Card Section Basic
> Useable standalone: **No**   
> Supports loading indicator: **Yes**  
> Supports error message: **Yes**  
> Supports tooltip: **No**  
> Selector: `ui-card-section-basic`  

### Accepts as Sub-Component
- [Button](#button)
- [Switch](#switch)

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