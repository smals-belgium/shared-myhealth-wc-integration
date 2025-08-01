# Guideline on component events

Web components can emit events that should be handled by the host application. For the vast majority of interactions
between component and host, the events provided in the integration library should suffice, but it's possible to emit
custom events as well.

General guidelines regarding events:
- prefer using the built-in events, as they can be handled in a generic way
- when using custom events, avoid using the names of the provided events
- when using custom events, provide thorough documentation on how they should be handled by the host

All events, whether built-in or custom, should be 
[CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)s, which means their custom payload will be 
in the `detail` property of the event.

## Built-in events

The integration library provides a few generic-purpose events that will cover most use cases already.

| Event type | Summary | Payload |
| --- | --- | --- |
| `open` | display a web component | `componentTag`: The `tagName` of the component to display. |
| | | `props`: Optional properties to pass to the component. |
| `print` | print some content | `title`: The title of the print job (e.g., the document name or page title). |
| | | `content`: The content to be printed. |
| | | `mimeType`: The mime type of the requested print format. |
| | | `orientation`: The orientation of the printed document (portrait or landscape). |
| `refresh` | reload data of the active web component | `status`: The status of the refresh operation. |
| `select` | select an item | `type`: Discriminator to determine what is being selected. |
| | | `id`: The ID of the selected item. |

### OpenEvent

Request the host application to display the component provided in the event detail.
```ts
import { openEvent } from '@smals-belgium/myhealth-wc-integration';

export class MyWebComponent {
  onButtonClick() {
    this.dispatchEvent(openEvent({ componentTag: 'my-other-component' }));
  }
}
```

It has an optional property `props` that allows you to pass additional information into the web component's properties.
```ts
import { openEvent } from '@smals-belgium/myhealth-wc-integration';

export class MyWebComponent {
  onButtonClick() {
    this.dispatchEvent(openEvent({ 
      componentTag: 'my-other-component',
      props: { title: 'hello world' }
    }));
  }
}
```
Obviously, avoid passing any of the [host settings](./02-host_settings.md) like this, because those are the host
application's responsibility.

It's also worth noting that it's not strictly necessary to work with properties like this. Given multiple components
living in the same [module](./05-modules_and_prefetching.md) it's perfectly possible to use a module's internal state
to pass information from one component to another.

### PrintEvent

Request the host application to print a document.

```ts
import { printEvent } from '@smals-belgium/myhealth-wc-integration';

export class MyWebComponent {
  onButtonClick() {
    this.dispatchEvent(printEvent({
      title: 'my-document.pdf',
      content: 'some content',
      mimeType: 'application/pdf',
      orientation: 'portrait'
    }));
  }
}
```

### RefreshEvent

Either request the web component to start refreshing its data (`status: 'request'`)
or inform the host application that the operation is complete (`status: 'success' | 'fail'`).

This event is only used at the component level, since we only want to refresh the data of a specific component.
It is the host application's job to dispatch a `request` on the component.
The web component **must** listen to this event and respond with a `success` or `fail` status
when the refresh operation is done. Even if it doesn't need to refresh anything,
otherwise the host app will remain in a "requesting" state forever.

Extending from the base `WebComponentElement` class will automatically take care of this.

```ts
import { WebComponentElement } from '@smals-belgium/myhealth-wc-integration';

export class MyWebComponent extends WebComponentElement {

  protected override readonly refreshData = () => fetch('/my-resource')
    .then(res => res.json())
    .then(data => this.doSomethingWith(data));

}
```

For manual implementation, use the factory function to create the event.

```ts
import { type RefreshEvent, refreshEvent } from '@smals-belgium/myhealth-wc-integration';

export class MyWebComponent {

  connectedCallback() {
    this.addEventListener('refresh', this.#handleRefresh);
  }

  #handleRefresh(event: RefreshEvent) {
    if (event.detail.status === 'request') fetch('/my-resource')
      .then(res => res.json())
      .then(data => this.doSomethingWith(data))
      .then(() => 'success' as const)
      .catch(() => 'fail' as const)
      .then(status => this.dispatchEvent(refreshEvent({ status })));
  }

  disconnectedCallback() {
    this.removeEventListener('refresh', this.#handleRefresh);
  }

}
```

### SelectEvent

Inform the host application that something has been selected and pass the ID of that selected item.  
If the only purpose of the event is to display a component for the item with the given ID, prefer the more generic
`OpenEvent`. Use `SelectEvent` only if you need the host app to handle the selection in a special way and document
that expected behaviour thoroughly.

```ts
import { selectEvent } from '@smals-belgium/myhealth-wc-integration';

export class MyWebComponent {
  onButtonClick() {
    this.dispatchEvent(selectEvent({
      type: 'my-item',
      id: '123'
    }));
  }
}
```

## Custom events

Next to the built-in events, a web component can also emit custom events if it wants to. But it's important to note 
that the host application cannot handle these custom events in a generic way.

So the following points need to be considered when creating custom events:
- only use them when default behaviour of built-in events don't cover your needs
- avoid `type` name clashes with built-in events
- document what is expected of the host application

```js
export class MedicationOverviewComponent {
  onButtonClick(id: string): void {
    this.dispatchEvent(new CustomEvent('selectMedication', { id }));
  }
}
```

Note that the above example is a bad one, because it can perfectly be handled through the built-in `OpenEvent`.

```ts
import { openEvent } from '@smals-belgium/myhealth-wc-integration';

export class MyWebComponent {
  onButtonClick(id: string) {
    this.dispatchEvent(openEvent({ 
      componentTag: 'medication-details',
      props: { medicationId: id } 
    }));
  }
}
```
