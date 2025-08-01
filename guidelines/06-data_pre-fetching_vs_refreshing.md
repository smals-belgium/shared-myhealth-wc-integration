# Guideline on data pre-fetching versus refreshing

## Data pre-fetching

Pre-fetching data means that the host application can start loading data for a web component module while it's not
instantiated yet.

This eventually serves two purposes:
- the data will already be available by the time the user opens a web component, improving drastically on the perceived
performance of that component
- the data loaded at this point can be stored on device for usage when the user is offline (no internet) or not   authenticated (strong auth, with ItsMe or similar)

This functionality is only available at the [module](./05-modules.md) level, not at the individual component level.
If you need to refresh the data of a specific component, read the corresponding section below. 

### How to implement

The [module bootstrap function](./05-modules.md) can return a lazy `Promise`. Or in other words a function thar returns
 a `Promise` that the host application can execute lazily (i.e. when _it_ decides to, because Promises are eager).
The returned Promise allows the host app to know when the pre-fetch operation is finished (e.g. to display/hide a 
spinner), but it's important to note that the host app does nothing with the data.  
It's the web component's responsibility to decide what to do;
for example it could decide to store the data in localStorage for offline usage, or it could just cache it within
the current session for perceived performance improvements, or whatever else.

```js
const preFetch = () => fetch('/my-rest/v1/my-resource')
  .then(res => res.json())
  .then(data => cache.set('resource', data));
```

Or more realistically, including module bootstrap:

```ts
import type { MyHealthModuleBootstrap } from '@smals-belgium/myhealth-wc-integration';

const bootstrap: MyHealthModuleBootstrap = ({ services }) => services
  .getAuthToken()
  .then(token => fetch(
    '/my-rest/v1/my-resource', 
    { 
      method: 'GET', 
      headers: { 'my-auth-token': token }
    }
  ))
  .then(res => res.json())
  .then(data => cache.set('resource', data));
```

## Data refreshing

If you need to refresh the data of a specific component (for example pull-to-refresh on mobile when a specific
component is active), use its `refresh` [event mechanism](./03-component_events.md) (an implementation example
is provided in the referenced chapter on events).

So what is data refreshing ?
- it happens at the component level; only the data of active components can be refreshed
- the host application can ask a component to refresh its data (for example pull-to-refresh 
[gesture](./10-mobile_gestures.md) on mobile)
- this refresh could also update cache or storage, but that is up to the implementor

**It is required to implement data refreshing**, even if you don't do anything. This is because the host application
has no way of knowing whether anything is going to happen or not when it asks for a refresh. And it may want to display
some loading state, like a spinner, while the operation is ongoing.  
So if you have a component that doesn't do data refreshing, just immediately respond with a "success" `status`.

The [base web component](./04-component_base_class.md) already handles this case for you. If you don't override 
`refreshData` it will respond with 'success'.

If you must roll your own:

```ts
import { type RefreshEvent, refreshEvent } from '@smals-belgium/myhealth-wc-integration';

export class MyWebComponent {

  connectedCallback() {
    this.addEventListener('refresh', this.#handleRefresh);
  }

  #handleRefresh(event: RefreshEvent) {
    if (event.detail.status === 'request') 
      this.dispatchEvent(refreshEvent({ status: 'success' }));
  }

  disconnectedCallback() {
    this.removeEventListener('refresh', this.#handleRefresh);
  }

}
```

## Pre-fetch vs refresh
