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


The following events are all related to document handling, and share a few common payload properties.

All documents have a `title`. This may have different meaning depending on the specific action.  
For example, when sharing the 'title' could be the email subject, but when printing it would be the print job name.

Other shared properties depend on whether the document must be downloaded by the host app from a server
or it's already available on the client.

**Client**  
A document that is already available on the client, i.e. it must no longer be downloaded from a server.
We need a mime type to tell the host what kind of document is contained in the `content` property.
If the mime type matches `text/*`, the content can be a simple string.
Otherwise the content is considered binary and can be provided as a Blob or a base64-encoded string.
- `content`: The content of the document in string or blob format. If the document format is binary, the content must
be either a Blob or a base64-encoded string.
- `mimeType`: The mime type of the document, which tells the host app how to deal with specific file types.

**Server**  
A document that can only be downloaded from a server.
In this case, the mime type should be provided as a response header of the given `url`.
This allows the host application to access the document directly and e.g. download it onto the device
without having to load it into application memory first.
The `url` can only be secured by the oidc authentication used by the host app.
If any other securing mechanisms are used, you'll have to download the document in memory first
and then send it to the host as a `ClientDocument`. Be aware that this approach may have performance impact.
- `url`: A URL to download from a remote location
- `audience`: In case a specific OIDC audience is needed for this document.
By default the host app will determine the audience the same way as for any call to `getAccessToken()`.

Below is the full list of document events with their corresponding additional payload on top of the shared properties.

| Event type | Summary | Payload |
| --- | --- | --- |
| `download` | Download a document on device | N/A |
| `print` | Send a document to printer | `orientation`: The orientation of the printed document (portrait or landscape). |
| `share` | Share a document natively | `description`: Describe the doument to the sharee. |
| | | `dialogTitle`: Set a title for the share modal (Android only). |
| `view` | View the document directly in the app | `actions`: An array of actions that the host can perform in the viewer. |
| | | `shareDescription`: See `description` property of `share` event. |
| | | `printOrientation`: See `orientation` property of `print` event. |


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
living in the same [module](./05-modules.md) it's perfectly possible to use a module's internal state
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
The web component can listen to this event and respond with a `success` or `fail` status
when the refresh operation is done. 

The host app determines whether a component's data can be refreshed, based on the presence of the `refresh` event
in the [component manifest](./07-manifest.md).

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
