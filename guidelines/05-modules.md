# Guidelines on web component modules

A module is a **technical** grouping of web components, as opposed to a `family` which is a **functional** grouping (cf [granularity guideline](./01-granularity.md)).  
Practically speaking, we are talking about ES modules that group one or more components and share technical
resources, like services, or shared state, etc.  
One module can export one or more web components. In most cases a `module` will overlap 100% with a `family`.
But it doesn't _have_ to. A `family` can consist of multiple `modules`.

Or to put things in a different perspective:
- a `module` is a **tightly coupled** collection of components that share resources the host app has no knowledge of
- a `family` is a **loosely coupled** collection of components, that can only communicate with each other through
  the means of the host application

A module must export
- a module manifest
- a bootstrap function

```ts
// index.ts

import type { MyHealthModuleBootstrap, MyHealthModuleManifest } from '@smals-belgium/myhealth-wc-integration';

export const manifest: MyHealthModuleManifest = { ... };
export const bootstrap: MyHealthModuleBootstrap = config => { ... };
```

The module manifest is covered in depth  in the [manifests](./07-manifest.md) chapter.

## Bootstrapping

The exported bootstrap function is called by the host application when it decides to bootstrap the web component module.
This allows for code to be executed at the module level, before any component is initialised.
Typically this would be used for initial configuration (like configuring providers in an Angular module).

At this time the host app provides some configuration (settings and services) that can be used to wire your module.

It can return a "pre-fetch" function if the module wants to leverage that feature, but it doesn't have to.
More on the concept of prefetching in the [chapter dedicated this topic](./06-data_pre-fetching_vs_refreshing.md).

### Vanilla JS example

How you deal with the provided settings and services is entirely up to you and may depend on your framework of choice.  

```ts
import type { MyHealthModuleBootstrap } from '@smals-belgium/myhealth-wc-integration';
import { hostSettings, hostServices } from './host';
import { MyComponent } from './my-component';

export const bootstrap: MyHealthModuleBootstrap = ({ settings, services }) => {
  console.log(`Module initialised with config "${settings.configName}" and language ${settings.userLanguage}`);

  Object.assign(hostSettings, settings);
  Object.assign(hostServices, services);

  customElements.define('my-component', MyComponent);
}
```

Also do not forget that all web components receive the [host settings](./02-host_settings.md) as inputs, so it may be
more convenient for you to use those and ignore these bootstrap parameters altogether.

```ts
import type { WebComponentAttribute, MyHealthModuleBootstrap } from '@smals-belgium/myhealth-wc-integration';
import { WebComponentElement } from '@smals-belgium/myhealth-wc-integration';

class MyComponent extends WebComponentElement {

  constructor() {
    super('hello web component');
  }

  attributeChangedCallback(name: WebComponentAttribute) {
    if (name === 'user-language') 
      console.log(`I will deal with the new user language "${this.userLanguage}" here`);
  }

}

export const bootstrap: MyHealthModuleBootstrap = () => {
  customElements.define('my-component', MyComponent);
}
```

### Angular example

If you use Angular as a framework, you probably want to register these artifacts in the application's 
[providers](https://angular.dev/guide/di/dependency-injection-providers) at this point.

```ts
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import type { MyHealthModuleBootstrap } from '@smals-belgium/myhealth-wc-integration';

import { HostEvents } from './host'; // this is just an injection token
import { MyComponent } from './my-component';

export const bootstrap: MyHealthModuleBootstrap = ({ services }) => {
  createApplication({
    providers: [
      { provide: HostEvents, useValue: services.events },
      provideHttpClient(withFetch())
    ]
  }).then(app => {
    customElements.define(
      'my-component',
      createCustomElement(MyComponent, { injector: app.injector })
    );
  });
}
```

This way you can use dependency injection to access these artifacts anywhere in your web component module / Angular app.

```ts
@Injectable({ providedIn: 'root' })
export class LanguageService {

  readonly #eventSub = fromEvent<SettingsChangeEvent>(inject(HostEvents), 'settings-change').pipe(
    filter(({ detail }) => detail.setting === 'userLanguage'),
    tap(({ detail }) => console.log(`I will deal with the new user language "${detail.value}" here`))
  ).subscribe();

  ngOnDestroy() {
    this.#eventSub.unsubscribe();
  }

}
```

## But why modules ?

Module bootstrapping was introduced to make data pre-fetching possible.
- pre-fetching means that data can be fetched without instantiating a web component 
(cf [pre-fetching data](./06-data_pre-fetching_vs_refreshing.md))
- you'll need access to `HostServices#getAccessToken()` to be able to make the call (cf [authentication]())

This requires something outside of web components that can make a backend call _and_ can access the host app services 
to do so. Hence the bootstrap function taking these services as parameters was born.

As a bonus, it makes it easier for you to make web components communicate with each other by sharing resources like 
Angular service for example.
