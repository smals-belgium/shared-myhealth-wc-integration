# Guideline on manifests

## Module manifest

A module manifest is the technical documentation of your package.

As we've discussed before
- a module is part of a `family`
- a module contains at least one component

A module must also declare which version of the spec it is using.

So, a minimal module manifest looks like this

```ts
import { type MyHealthModuleManifest, family } from '@smals-belgium/myhealth-wc-integration';
import { entryComponentManifest } from './entry-component.ts';

export const manifest: MyHealthModuleManifest = {
  specVersion: { major: 5, minor: 0, patch: 0 },
  family: family('my-family'),
  components: [entryComponentManifest],
  permissionsForMandateAccess: ['medicaldatamanagement']
};
```

**IMPORTANT**: The first component in the `components` list is your module's entry point.  
In other words: it is the component that will be shown to the user when they first access your module.

For example:
```ts
import { type MyHealthModuleManifest, family } from '@smals-belgium/myhealth-wc-integration';
import { listComponentManifest } from './list-component.ts';
import { detailComponentManifest } from './detail-component.ts';

export const manifest: MyHealthModuleManifest = {
  specVersion: { major: 5, minor: 0, patch: 0 },
  family: family('my-family'),
  components: [
    listComponentManifest,
    detailComponentManifest
  ],
  permissionsForMandateAccess: ['medicaldatamanagement']
};
```

Have a look at the [source code](../src//manifest/module-manifest.ts)

### Properties

| Name | Summary |
| --- | --- |
| [specVersion](#specversion) | Indicates the version of the spec the web component module uses |
| [family](#family) | A type for grouping multiple web-components that loosely interact with each other |
| [components](#component-manifest) | One or more components exposed by this module |
| [permissionsForMandateAccess](#permissionsformandateaccess) | Services required in the user's mandate to access this module |

### SpecVersion

Host applications are expected to validate the version value provided in the web component module manifest.

The "version" defined in the "@smals-belgium/myhealth-wc-integration" library provides
the current spec version and should be used by both the host app and integrated web components.

The value needs only to be checked at host startup. It will never change at runtime.

```ts
import type { SpecVersion } from '@smals-belgium/myhealth-wc-integration';

export const version: SpecVersion = {
  major: 5,
  minor: 0,
  patch: 0
};
```

You may want to consider generating a file in your build pipeline
like the above example from the `package.json` of the version of this library that you installed.

### Family

See [guideline on granularity](./01-granularity.md)

`Family` is a so-called branded type, which means at runtime it's just a string, but at compile time it is more
precise. You can assign a `Family` to a `string`, but you can't assign a `string` (or any other branded type)
to a `Family`.
Cast or use the factory function to create the type.

```ts
import { family } from '@smals-belgium/myhealth-wc-integration';

const myFamily = family('my-family');
```

### permissionsForMandateAccess

Services that must be present in the user's mandate to access this module.
If not specified, the module is available to all types of mandates.

The values correspond to the `userProfile.serviceNames` field in the eHealth token.

**IMPORTANT**: If multiple services are specified, the user needs **ANY** of them (not all).
The module will be accessible if the user's mandate includes at least one of the listed services.

This property allows you to restrict component access based on the user's authorization level.
The host application can use this information to hide or disable components the user doesn't have permission to access

Common service names include:
- `medicaldatamanagement` - for medical data access
- `recipe` - for prescription-related functionality

Example usage:
```ts
export const manifest: MyHealthModuleManifest = {
  specVersion: { major: 5, minor: 0, patch: 0 },
  family: family('medical-records'),
  components: [listComponentManifest, detailComponentManifest],
  permissionsForMandateAccess: ['medicaldatamanagement']
};
```

In this example, the entire `medical-records` module will only be accessible to users whose mandate includes the `medicaldatamanagement` service in their eHealth token's `userProfile.serviceNames`.

## Component manifest

Each component in the module is also technically documented through a component manifest.
This manifest is machine-readable documentation of the components that are available to the host application.
 - it reduces the need for manual/human-readable documentation
 - it allows for the host app to know less about the component's internals

```ts
import type { MyHealthComponentManifest } from '@smals-belgium/myhealth-wc-integration';

export const manifest: MyHealthComponentManifest = {
  tagName: 'my-component',
  requiredProperties: ['detailId'],
  events: ['print']
};
```

Have a look at the [source code](../src//manifest/component-manifest.ts)

### Properties

| Name | Type | Required | Summary |
| --- | --- | --- | --- |
| [tagName](#tagname) | string | Y | The `tagName` of the HTML element |
| [requiredProperties](#requiredproperties) | string[] | N | A list of properties the component expects (excluding [HostSettings](./02-host_settings.md)) |
| [events](#events) | string[] | N | The events the component emits |

### tagName

The `tagName` of the HTML element.
The host app can use this to instantiate the component.

### requiredProperties

A list of properties that the component must have a value for so it can work properly.  
This is optional because the host application can operate without knowing this,
but providing it gives the host the opportunity to do some validation prior to component initialisation.

### events

The events the component emits.
Before creating any custom events, check the available built-in ones in the `event` directory.

Prefer using those if possible as they reduce custom implementations,
and make sure not to use conflicting event types.

Existing types are
 - open 
 - print 
 - refresh 
 - select   

See [guideline on component events](./03-component_events.md)

This list must be provided if you want the host application to listen to them.

**IMPORTANT**: the host application may check the presence of the `refresh` event to decide whether to indicate to the
user that this component can refresh its data.

Implementation of refresh mechanism is done by listening for `refresh` events with `status: 'request'`
on the component, and responding with a status `success` or `fail` after the operation is completed.

See [guideline on pre-fetch versus refresh](./06-data_pre-fetching_vs_refreshing.md)
