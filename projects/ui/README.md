# Abstract
TODO: Add Tooltip to base class??!?!


Welcome to the documentation of this project, a comprehensive and modular library designed to streamline the development of user interfaces in Angular applications. This documentation serves as a guide to help you leverage the power and flexibility of our UI components effectively in your projects.

It offers a rich collection of reUseable components that are carefully crafted to enhance the user experience while promoting consistency and scalability across applications. Whether you are building a simple web application or a complex enterprise-grade solution, our library provides the building blocks you need to create modern and visually appealing interfaces with ease.

### Key Features:

**Modular Architecture**: Our library follows a modular architecture, allowing you to pick and choose the components you need for your specific project requirements. Each component is self-contained and can be easily integrated into your Angular application, promoting code reusability and maintainability.

**Customizability**: We understand that every aoolication has unique requirements. That's why our components are structured in a flexible way so a majority of use-cases can be fulfilled.

**State-of-the-Art**: The library is developed to leverage current best practices and features for optimal maintainability and performance.

# Default Components

Short description about the purpose and content of the component.  

## Badge
> Useable standalone: **Yes**  
> Selector: `ui-badge`

#### Useable inside 
- Button
- Entry Item
- Toolbar
- Value Tile

## Button
> Useable standalone: **Yes**  
> Selector: `ui-button`

#### Useable inside
- Entry Tile
- Entry Item
- Card
- Card Section Basic
- Toolbar
- Value Tile

## Switch
> Useable standalone: **Yes**  
> Selector: `ui-switch`

#### Useable inside
- Entry Item
- Card
- Card Section Basic
- Toolbar

## Card
> Useable standalone: **Yes**  
> Selector: `ui-card`

## Card Section Basic
> Useable standalone: **No**   
> Selector: `ui-card-section-basic`  

#### Useable inside
- Card

## Entry Container
> Useable standalone: **Yes**  
> Selector: `ui-entry-container`  

#### Useable inside
- Entry Tile (todo: to be implemented/adjusted)
- Metric Tile

## Entry Key Value 
> Useable standalone: **No**  
> Selector: `ui-entry-key-value`  
#### Useable inside
- Entry Container

## Entry Metric
> Useable standalone: **No**  
> Selector: `ui-entry-metric`  
#### Useable inside
- Entry Container

## Entry Item --> new name: Entry Tile Item
> Useable standalone: **No**
> Selector: `ui-entry-item`  
#### Useable inside
- Entry Tile

## Entry Tile
> Useable standalone: **Yes**  
> Selector: `ui-entry-tile`  
#### Useable inside
- Grid

## Metric Tile
> Useable standalone: **Yes**  
> Selector: `ui-metric-tile`  
#### Useable inside
- Grid

## Tabs
> Useable standalone: **Yes**  
> Selector: `ui-tabs`  

## Tab
> Useable standalone: **No**  
> Selector: `ui-tab`  
#### Useable inside
- Tabs

## Toolbar
> Useable standalone: **Yes**  
> Selector: `ui-toolbar`  

## Value Tile
> Useable standalone: **Yes**  
> Selector: `ui-value-tile`  
#### Useable inside
- Toolbar

# Content and Navigation Components

## Grid
> Useable standalone: **Yes**  
> Selector: `ui-grid`  
#### Accepts
- Entry Tile
- Metric Tile

## Menu Bar
> Useable standalone: **Yes**  
> Selector: `ui-menu-bar`

#### Accepts
- Menu Item
## Menu Item (config only)
> Useable standalone: **No**  
> Selector: `uic-menu-item`

#### Useable inside
- Menu Bar

## Window
> Useable standalone: **Yes**  
> Selector: `ui-window`
#### Accepts
- Content
- Menu Bar

## Content
> Useable standalone: **Yes**  
> Selector: `ui-content`
#### Useable inside
- Window

# Component Usage

tbd