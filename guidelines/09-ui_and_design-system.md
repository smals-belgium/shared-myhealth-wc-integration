# Guideline on UI (ui-variables/design system)

Our component styling approach leverages the Shadow DOM and the MyHealth Design Kit, extended with slots, CSS variables, 
and ::part selectors, to build maintainable and customizable web components. The Shadow DOM encapsulates styles to 
prevent global conflicts, while the MyHealth Design Kit provides a consistent Material-based theme. Slots enable 
flexible content placement, CSS variables support dynamic theming, and the ::part selector allows precise styling of 
internal elements. Together, these tools ensure visual consistency and flexibility across components.

To ensure seamless integration with Mags, all web components must conform to the 
[MyHealthBelgium.be](http://myhealthbelgium.be/) Design Kit.


## Browser's native Shadow DOM

An important aspect of custom elements is encapsulation, because a custom element, by definition, is a piece of 
reusable functionality: it might be dropped into any web page and be expected to work. So it's important that code 
running in the page should not be able to accidentally break a custom element by modifying its internal implementation.

Shadow DOM enables you to attach a DOM tree to an element, and have the internals of this tree hidden from JavaScript 
and CSS running in the page.

When you create a shadow root for your custom element, you're establishing a boundary between the element's internal 
implementation and the surrounding page context. This boundary prevents CSS styles from the page affecting your 
component's appearance and prevents external JavaScript from directly accessing the component's internal DOM nodes.

(ref: mdn - Aug 30, 2024 - https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)

### How to Use It in an Angular component

```ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'custom-web-component',
  templateUrl: './custom-web-component.html',
  styleUrls: ['./custom-web-component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CustomWebComponent {}
```

This will ensure your Angular component behaves as a true web component with proper encapsulation.

## My Health Design Kit

Styling is based on Material Design version 3 with the MyHealth Design Kit on top.

Web components and integrators using the Angular framework are strongly invited to leverage Angular Materials v19+.

The MyHealth Design Kit is intended for building web components that integrate with
[MyHealthBelgium.be](http://myhealthbelgium.be/).

In its current version (version `3.0.2`), the design kit supports only SCSS and Angular. 
It's built to work alongside Angular Material and customizes its styles to match the MyHealth design language.

If you're not using Angular nor Angular Material, you should still ensure your components align visually with the 
design kit, so they maintain a consistent look and feel with the rest of the MyHealth UI.

[Storybook](https://smals-belgium.github.io/myhealth-storybook-design-kit)

## CSS variables (–*)

If the MyHealth Design Kit does not meet your styling needs, use CSS variables for any necessary customizations. 
CSS variables (or CSS custom properties) are reusable style values that you can update dynamically. 
These powerful properties enhance style maintainability and flexibility, particularly when implementing themes or 
maintaining consistent design elements across your components.

Property names beginning with `--`, such as `--example-name`, and function as custom properties that store values 
which can be referenced in other style declarations through the `var()` function.

CSS variables are defined inside a `:root` selector or within any element.

### How to Use It:
```css
:root {
  --mh-sys-gap: 1rem;
  --mh-sys-padding-xs: 4px;
  --mh-sys-padding-sm: calc(var(--mh-sys-padding-xs) * 3);
  --mh-sys-padding-md: calc(var(--mh-sys-padding-sm) * 2);
  --mh-sys-padding-lg: calc(var(--mh-sys-padding-sm) * 3);
}
```

### How to implement it:

To use a CSS variable, you use the `var()` function.

```css
action-row {
  gap: var(--mh-sys-gap, 1rem);
  button {
    padding: var(--mh-sys-padding-sm, 15px);
  }
}
```

### How to use it as an integrator:

To use a CSS variable, you use the `var()` function.

```css
html {
  --mh-sys-gap: 15px;
  --mh-sys-padding-xs: 18px;
  --mh-sys-padding-sm: calc(var(--ehealth-sys-padding-xs) * 3);
}
```

**Note:** Always Provide fallback values in case a variable is missing.

### CSS Variable Naming & Usage Rules

#### Naming conventions:

1. Use a clear, hierarchical structure:
  - Prefix variables with `--mh-` to maintain a consistent namespace. ???
  - Follow a structure like:  `--mh-[category]-[property]-[modifier]`
2. Categories (`[category]`) should describe the UI element or system:
  - `sys` → System-wide spacing, padding, margins
  - `button`, `input`, `table` etc. → Component-specific styles
3. Properties (`[property]`) should describe what is being styled:
  - `gap`, `padding`, `margin`, `border-radius`, `color`, `shadow`
4. Modifiers (`[modifier]`) define variations:
  - `xs`, `sm`, `md`, `lg`, `first-child`, `hover`, `inactive`, etc.

#### Example Naming Guidelines:

| Variable | Meaning |
| --- | --- |
| --mh-sys-gap | Global spacing unit |
| --mh-sys-padding-sm	| Small padding for the system |
| --mh-table-row-border-radius | Border radius for table rows |
| --mh-chip-padding | Padding inside a chip |

#### Colors:

1. Use `color` as the property and define clear roles:
  - `--mh-table-td-color` (Primary text color)
  - `--mh-table-inactive-td-color` (Disabled/inactive state)
  - `--mh-table-row-hover-background-color` (Hover effect)
2. Use `unset` for system inheritance where necessary:
  - `--mat-table-background-color: unset;`

#### Component-Specific Properties:

1. Use component names (`table`, `chip`, `button`) for isolation:
  - Table-related variables:  
  `--mh-table-row-border-radius: 40px;`  
  `--mh-table-row-hover-border-color: white;`  
  `--mh-table-border-radius-first-child: 10px 0 0 10px;`
  - Chip-related variables:
  - `--mh-chip-padding: 0.25rem;`  
  - `--mh-chip-outline-width: 2px;`  
  - `--mh-chip-container-shape-radius: 1rem;`
2. Use `box-shadow`, `border-radius`, and `hover` effects where necessary.
3. Avoid excessive nesting that makes debugging harder:
  `--mh-bad-example: calc(var(--mh-sys-padding-sm) * var(--mh-table-border-radius-first-child));`

Each CSS variable should be documented in the component’s documentation, specifying its purpose, expected value types
(e.g., rem, colors) if needed, and any styling considerations. When defining new variables, ensure they follow the 
established naming conventions and align with the Design Kit to maintain a consistent and flexible design system.

## Slots

Named slots provide a flexible way to allow host applications to customize specific parts of a web component. 
By defining **clear and descriptive** slot names (e.g., `slot="close-icon"` or `slot="open-in-new"`), developers can 
override default content while maintaining structured control.

For now, we primarily use named slots for `icon customization`.

In your component template, include a `<slot>` element with a default icon that appears when no custom icon is provided.

You only need to use the `slot` attribute on your icon if you're _not_ using 
[Google Material Symbols Rounded](https://github.com/google/material-design-icons/tree/master/variablefont). 
If you're using Material Symbols outlined, the `slot` is not required.

### How to implement It:

```html
<button mat-icon-button disabled aria-label="Example icon button with a open in new tab icon">
   <slot name="open-in-new">
      <svg class="default-new-window-icon" viewBox="0 0 24 24"></svg>
   </slot>
</button>
```

### How to use it as an integrator:

```html
<poc-web-component pink>
   <mat-icon slot="open_in_new">open_in_new</mat-icon>
</poc-web-component>
```

Each slot should be documented in the component’s documentation, specifying expected dimensions and styling 
considerations. Slots should also maintain proper sizing and positioning, regardless of the custom content provided 
by the host application. 

## Parts

The `::part` selector allows specific elements within a web component’s Shadow DOM to be styled externally.

When implementing parts, follow these guidelines:
1. Prefer CSS variables for customization whenever possible, as they provide a cleaner API and better encapsulation.
2. Only expose elements with the part attribute when CSS variables cannot provide the necessary styling flexibility 
and the host application requires direct access to component internals:  
`<button part="submit-button">Submit</button>`
3. Choose descriptive part names that clearly communicate the element's purpose and relationship to the component 
(e.g., `header`, `submit-button`, `dropdown-toggle`).
4. Limit parts to elements where external styling is absolutely necessary for customization without breaking component
functionality.
5. Maintain a consistent naming convention across your component library (e.g., `{element-type}-{purpose}`).
6. Document all available parts in your component's documentation, specifying:
  - The element type that carries the part
  - Which CSS properties are safe to override
  - Any limitations or considerations when styling the part

### How to implement It:

```html
<button mat-icon-button part="submit-button">
   Submit
</button>
```
How to use it as an integrator:
```css
custom-component::part(submit-button) { 
   background-color: blue; 
   border-radius: 8px; 
   padding: 10px 20px; 
}
```

Remember that each exposed part creates an additional maintenance consideration and potential point of failure. Use parts judiciously as a fallback when CSS variables cannot meet customization requirements.
