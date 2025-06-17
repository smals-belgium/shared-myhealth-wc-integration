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

### `Printable`

Type representing printable content, used by components for their onPrint output

```ts
type Printable = {
  title: string;
  content: string;
  mimeType: PrintableMimeType;
  orientation?: PrintableOrientation;
}
```

### `PrintableMimeType`

Enum type used to describe the MIME type of the printable content.  
Used by the `mimeType` property in the `Printable` type.

Possible values:

- `PrintableMimeType.HTML` → `'text/html'`
- `PrintableMimeType.PLAIN` → `'text/plain'`
- `PrintableMimeType.PDF` → `'application/pdf'`
- `PrintableMimeType.BASE64` → `'application/base64'`


### `PrintableOrientation`

Enum type used to describe the orientation of printable content.  
Used by the optional `orientation` property in the `Printable` type.

Possible values:

- `PrintableOrientation.LANDSCAPE` → `'landscape'`
- `PrintableOrientation.PORTRAIT` → `'portrait'`

