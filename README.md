# MyHealth - Web Component Integration

This module defines the types used to describe the inputs and outputs exposed by the MyHealth Web Components.

It also provides a web component documentation template (markdown) at: [README-component.template.md](README-component.template.md).

Please refer to the specification located at the root of this repository, under `myhealth-webcomponent-specification-vX.Y.pdf`

This library is published to the NPM registry at: [https://www.npmjs.com/package/@smals-belgium/myhealth-wc-integration](https://www.npmjs.com/package/@smals-belgium/myhealth-wc-integration)


## Documentation

### `componentSpecVersion`

This is a `const` string variable holding the version of the specification implemented by this module.

This variable can be used by integrators to populate the `version` input.
It can also be used by component developers to compare it with the `version` input value provided by integrators.


### `Language`

Enum type used to describe the language a component should use to display information. Possible values: `EN`, `FR`, `NL`, `DE`

Used by the `language` input.


### `Configuration`

Enum type used to describe the configuration where a component is being deployed. Possible values: `DEV` (development), `INT` (integration), `ACC` (acceptance), `PROD` (production), `DEMO` (demo), 

Used by the `configName` input.


### `ComponentServices`

Complex type composed of the following:

```
cache:                   ComponentCache,
offlineStore?:           ComponentOfflineStore,
getAccessToken:          GetAccessToken,
registerRefreshCallback: RegisterRefreshCallback
```

#### `ComponentCache`

Provides methods to access the in-memory cache provided by integrators.

```
get:    (key:string)            => any
set:    (key:string, value:any) => void
remove: (key:string)            => void
```


#### `ComponentOfflineStore`

Provides methods to access the optional offline store provided by integrators.

```
get:    (key:string)                                => Promise<any>
set:    (key:string, value:any, encryption:boolean) => Promise<void>
remove: (key:string)                                => Promise<void>
```

#### `getAccessToken`

Function definition used by components to retrieve an access token (exchanged provided the `audience`)

```
type GetAccessToken = (audience:string) => Promise<string|null>
```


#### `RegisterRefreshCallback`

Function definition used by components to register themselves to receive refresh events.

```
type RefreshCallback = (done:()=>void) => void
type RegisterRefreshCallback = (callback:RefreshCallback) => void
```


### `ComponentError`

Used by components when firing an error event to the host. This complex type contains 2 fields: `title` and `text`, both strings

Used by the `onError` output defined in components.


## Release Process

You can follow the steps below to perform a new release:

1. Ensure `README.md` is up-to-date with whatever changes made to the specification or types
2. Ensure the `myhealth-webcomponent-specification-v*.pdf` file has been updated with the corresponding specification version.
3. Ensure a new entry has been added to the `CHANGELOG.md` file for the new version
4. Issue `npm version <major|minor|patch>` in the `main` branch to update the version info and generate a corresponding git tag
5. `git push` the latest commits. Do not git push the tag just yet
6. Verify that the build pipeline completes successfully
7. `git push` the version tag and verify a new draft release gets created in the GitHub repository
8. Update the draft release content with something similar to the added content in the `CHANGELOG.md` and hit the `Publish Release` button
9. This will kick off the publish pipeline, which will publish the new version of the library to the official NPM registry.
