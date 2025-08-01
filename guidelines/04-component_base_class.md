# Guideline for using the web component base class

If your web component is implemented in vanilla JS, using just the 
[Web Component standards](https://developer.mozilla.org/en-US/docs/Web/API/Web_components), you can use the base class
provided in the integration library that will give you a default implementation of the 
[properties](./02-host_settings.md) and [refresh handling](./03-component_events.md).

 - All spec properties are present _and_ mapped to HTML attributes.
 - You can pass a template at construction (if you wish; full control is still yours if you need it).
 - Performs a sanity check on the presence of all property values on initialisation.
 - Provides an easy-to use interface for the refresh mechanism.

```ts
import { WebComponentAttribute, WebComponentElement } from '@smals-belgium/myhealth-wc-integration';

export class MyWebComponent extends WebComponentElement {

  constructor() {
    super('<h1>Hello user</h1><div class="user-name"><div>');
    this.refreshData();
  }

  protected override readonly refreshData = () => fetch('/user')
    .then(res => res.json())
    .then(user => this.shadowRoot?.querySelector('.user-name').textContent = user.name);

  attributeChangedCallback(name: WebComponentAttribute, previous: string, current: string) {
    if (name === 'user-language') 
      console.log(`User language changed from ${previous} to ${current}`);
  }

}
```

Note that `attributeChangedCallback` is not some custom hook of the `WebComponentElement` base class, but a lifecycle
hook from the custom element spec itself: 
https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes

Don't forget that HTML `attribute` values are always strings, even if you pass other primitives into them.  
So to avoid surprises, better read the value from the property getters.

```ts
  attributeChangedCallback(name: WebComponentAttribute) {
    if (name === 'crash-reporting-enabled') {
      if (this.crashReportingEnabled) console.log('Crash reporting was enabled');
    }
  }
```

Don't do

```ts
  attributeChangedCallback(name, _, current) {
    if (name === 'crash-reporting-enabled') {
      if (current) console.log('Crash reporting was enabled');
    }
  }
```
because this will always evaluate to `true`, the value being `"true"` or `"false"` strings.
