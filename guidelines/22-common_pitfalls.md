# Common pitfalls

## FAQ

- Q: I'm binding a boolean value into my web component, but it comes out as a string `"true"` instead of `true`  
A: Read about [the difference between HTML attributes and properties](#html-attributes-vs-properties)
- Q: After the user navigates away from my web component, some of its code is still being executed  
A: You probably forgot to clean up some listeners when the component is removed from the DOM  
Read about [component destruction in the lifecycle hooks](#init-and-destroy)
- Q: My component needs to adapt when the user language changes, but `user-language` is an attribute and I don't know 
how to track changes in element attributes  
A: Read about [observedAttributes and how to observe their changes](#observing-attribute-changes)
- Q: The guidelines say my web component is not allowed to do any navigation, but WCAG tells me I _should_ be using
proper navigation elements (like `<a href="./url"></a>`)  
A: Check our [proposed solutions](#navigation)

## Custom web components

Common issues and misconceptions concerning development of custom web components.  
These are not specifically related to MyHealth web components, but to generic HTML ones.  
We will only shortly describe the problem and potential solutions. From there it will be easy enough to find 
additional information on the internets.

### HTML attributes vs properties

HTML element attributes and properties are not the same thing.

An attribute
- can be set directly in HTML (`<my-comp my-attr="hello" />`)
- set/get with JS only through `HTMLElement#setAttribute()` and `HTMLElement#getAttribute()`
- value is always a `string`

**Gotcha** Even if you can bind a boolean or number with your framework of choice, realise that those values will be
coerced to strings. For example in `<my-comp id="123" />`, the value of `id` is `"123"` and not `123`. Or let's take
the native example of `<input type="checkbox" checked />`: the value of `checked` is `""`.

A property
- cannot be set directly in HTML
- can be set with JS as object properties (`myComp.attr = "hello"`)
- value can be any JS construct (a primitive, a Date, a complex JSON object, a class instance, a class reference, 
you name it)

To provide a uniform approach across vanilla HTML and different frameworks, you should use _attributes_ instead of
_properties_. But this means that some type coercion may be in order.

#### Vanilla JS
A potential approach for vanilla HTML/JS that mirrors an _attribute_ to a _property_ and coerces the type of the value:
```js
class MyComp extends HTMLElement {
  get myBoolean() { return this.getAttribute('my-boolean') !== 'false'; }
  set myBoolean(value) { this.setAttribute('my-boolean', String(value)); }
}
```

#### Angular
In Angular elements, _attributes_ are automatically mapped to input _properties_. Old school `@Input` annotation or
more modern `input` signals both work. **But the type coercion is still your responsibility!**  
You can use coercion functions available in `@angular/core`.
```ts
import { booleanAttribute, Component, input } from '@angular/core'

@Component({ ... })
class MyComp {
  readonly myBoolean = input(false, { transform: booleanAttribute });
}
```
Also note that Angular automatically converts the _attribute_ name to kebab-case from the lowerCamelCase input name.
In the previous example, the attribute name is `my-boolean` and not `myBoolean`.

**Gotcha** In the above example the `myBoolean` _property_ is an input signal. Setting its value through HTML tag or
`setAttribute` is seamless (`<my-comp my-boolean="true"` or `myComp.setAttribute('my-boolean', 'true')`). But for setting
the input _property_, since it's a signal and not a simple value, it goes like `myComp.myBoolean.set(true)` instead
of `myComp.myBoolean = true`.

### The component lifecycle

#### Init and destroy

Implement `connectedCallback` to execute logic when the element has been added to the DOM.  
Implement `disconnectedCallback` to execute logic when the element has been removed from the DOM.  

**Angular** will still execute its own lifecycle hooks, so you can use your usual `ngOnInit` and `ngOnDestroy`
instead of the above native hooks.

#### Observing attribute changes

Observed attributes must be registered by setting the `static observedAttributes` member.  
Any value change to an attribute in this list will then trigger the `attributeChangedCallback` hook.

```js
class MyComp extends HTMLElement {
  static observedAttributes = ['my-boolean'];

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed from ${oldValue} to ${newValue}.`);
  }
}
```

**Angular** elements will automatically register inputs as `observedAttributes`.  
i.e. when setting an attribute through `setAttribute` Angular will still execute the `ngOnChanges` hook for the 
corresponding input.

Bearing in mind that Angular groups simultaneous changes, the equivalent to the above vanilla JS code would be
```ts
class MyComp implements OnChanges {
  readonly myBoolean = input(false, { transform: booleanAttribute });

  ngOnChanges(changes) {
    Object.entries(changes).forEach(([name, change]) => console.log(
      `Input ${name} has changed from ${change.previousValue} to ${change.currentValue}.`
    ));
  }
}
```

For further reference, read the 
[MDN guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)

## Navigation

According to the [guidelines om navigation](./11-navigation.md), you are not allowed to do any URL-level navigation
within a web component. This is because different host apps may want to treat navigation differently.  
But semantically your UI elements must still be navigation elements. You may still want to us `<a>` tags, and even
if you don't in terms of accessibility the elements must behave like navigation elements, i.e. they must be focusable
and have proper keyboard interaction.

Here are a couple of solutions to this problem:

### Manual focus and keyboard support

The most ad-hoc solution is to use buttons and "manually" add focus and proper keyboard support to them.
This usually consists of
- adding a `tabindex`
- handling keyboard Enter event to do the same thing as a click event

#### Vanilla HTML/JS

```js
theButton.setAttribute('tabindex', '0');
theButton.addEventListener('click', navigateOnHost);
theButton.addEventListener('keydown', event => {
  if (event.key === 'Enter') navigateOnHost();
});
```

#### Angular

```html
<button
  type="button"
  tabindex="0"
  (click)="navigateOnHost()"
  (keydown.enter)="navigateOnHost()">

  navigate
</button>
```

### Reusable navigation interception

For a more consistent approach to the problem, you may consider creating an artifact that intercepts all usages
of `<a>` and modify the default behaviour. The core of this solution consists of
- preventing the default event
- dispatching a [myHealth open event](./03-component_events.md#openevent) instead

The exact implementation may depend on your needs and framework of choice, but here are some examples:

#### Vanilla HTML/JS

Below is a naive implementation that selects all `<a>` tags with a `data-component` attribute that are children of 
the root web component and
- sets an `href` attribute to ensure readability for screen readers and WCAG compliance
- prevents the default behaviour on click and replaces it with dispatching a custom event on the web component
For example you may have a list of users with links to details as `<a data-component="userDetail">{{ user.name }}</a>`.

```js
rootComponent
  .querySelectorAll('a[data-component]')
  .forEach(a => {
    const component = a.getAttribute('data-component');
    a.setAttribute('href', `/my-domain/${component}`);
    a.addEventListener('click', event => {
      event.preventDefault();
      rootComponent.dispatch(open(component));
    }
  });
```

#### Angular

Below is a very simple implementation of a directive that allows the usage of an `<a>` tag to navigate to a specific
other web component. For example you may have a list of users with links to details as 
`<a component="userDetail">{{ user.name }}</a>`.

```ts
@Directive({
  selector: 'a[component]',
  host: {
    '[attr.href]': 'href()'
  }
})
export class ComponentAnchorDirective {

  readonly #hostEvents = inject(HostEventService);

  readonly component = input.required<string>();
  protected readonly href = computed(() => `/my-domain/${this.component()}`);

  @HostListener('click')
  onClick() {
    this.#hostEvents.dispatch(open(this.component()));
    return false;
  }

}
```
So what happens here ?
- the binding on the `href` attribute ensures readability for screen readers (and WCAG compliance)
- the click handler returns `false` to stop the default behaviour when clicking a link, 
and replaces it with custom event dispatching

This is a minimal starting point. From here you can add additional inputs, for example to pass additional properties
to the invoked component.

## Modals

## Offline mode
