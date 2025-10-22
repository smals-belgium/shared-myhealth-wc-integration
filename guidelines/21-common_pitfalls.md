# Common pitfalls

## FAQ

- Q: I'm binding a boolean value into my web component, but it comes out as a string `"true"` instead of `true`  
A: read about [the difference between HTML attributes and properties](#html-attributes-vs-properties)

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
import { booleanAttribute } from '@angular/core'

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

## Navigation

## Modals

## Offline mode
