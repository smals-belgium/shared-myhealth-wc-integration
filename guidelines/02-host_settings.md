# Guideline on host settings 

## Required vs optional

We must clarify the meaning of "required" here, because it depends from which perspective one looks at it.

From the perspective of the host application, all settings are required. This means all of them _will_ be passed to the 
web component, no matter if they are handled on the other side or not.

This means that from the perspective of the web component, you will always receive a value for every setting.
However, you are required to implement some, and you are free to ignore the optional ones, if you choose so.

## Component/Module mirroring

An implementor can decide whether to handle host settings at the module or at the component level.

### Web component attributes

All web components instantiated by the host will receive host settings through attributes. Simply monitor
changes to these attributes to do what's required. Bear in mind that if you take this approach, each web component
must (re-)implement the same watching mechanism. For example, each component must be translated into multiple languages,
so each one of them must listen for changes to the `user-language` attribute.

Be aware that there is a difference between component attributes and properties. If you're uncertain how to implement
attributes in a custom component, have a look at the web components implementation section
in [our common pitfalls](./22-common_pitfalls.md#custom-web-components).

### Module parameters

We'll talk about [modules](./05-modules.md) more in depth in a different chapter, but at this point it's 
sufficient to know that it's a level above web components that **will receive the same properties as each web 
component** from the host application. 

### Which one to use ?
You can use either one, decide which one suits your workflow best, so long as you make sure that the required inputs
are handled.

For example, for a module with just one component it may be more convenient to handle language changes directly in the
component. But a more complex module with multiple components might prefer to handle it in a more centralized and 
decoupled way.

## Settings overview

| Setting name | Required | Type | Summary |
| --- | --- | --- | --- |
| userLanguage | Y | 'en' \| 'fr' \| 'nl' \| 'de' | Language used to display translated content to the end user. |
| configName | Y | 'dev' \| 'demo' \| 'int' \| 'acc' \| 'prod' | Name of the environment configuration the application and the components are being deployed to. |
| offlineDataStorageEnabled | N | boolean | A boolean flag indicating whether offline data storage has been enabled by the user. When true, the web component can store and retrieve data locally for offline access. |
| authenticationStatus | N |  'unauthenticated' \| 'online-authenticated' \| 'offline-authenticated'  | Status of the user's authentication within the host application. |
| crashReportingEnabled | N | boolean | A boolean flag indicating if the user has given the permission to crash report to be sent. Must be implemented if the web component uses a crash report tool such as Sentry. |
| ~~isOfflineAuthenticated (@deprecated since version 5.0.2)~~ | ~~N~~ | ~~boolean~~ | ~~A boolean flag indicating whether the web component is being accessed from an offline state. By offline state we mean when the user logged in using a "light" authentication (pin code, biometrics) that lets them access the offline stored data, as opposed to a "strong" authentication with ItsMe or Bosa wallet. When true, the web component might want to fetch the data that is stored in the offline storage. When false, it might want to fetch data from the backend and update the offline data.~~ |

## Property details

### userLanguage (required)

Components are expected to display text content in the provided language.

Supported languages are English, French, Dutch and German. All are represented by their respective ISO-2 codes 
(en, fr, nl, de).

Components need to take into account that the language can change at runtime and currently displayed components may 
have to be re-translated at any time.

### configName (required)

The objective of this input is to indicate to a web component the kind of environment it's been deployed into, which 
can imply contacting specific backend servers or having different internal implementations based on the provided config.

The possible configuration values are:
- `dev`: development environment
- `int`: integration environment
- `acc`: acceptance environment
- `prod`: production environment
- `demo`: demo mode (no auth / backend)

When injected with the "demo" value it is expected that only static/mock data will be rendered. 
See the Guideline on [demo mode](./14-demo.md).  
This input is required, because at the very least the demo mode must be implemented. 
Otherwise, what you implement in terms environment handling is entirely up to you,
but remember that the host application may implement these different environments,
so whatever works in prod must also work in lower environments, so that the host application can execute proper
integration tests in all envs.

The application will always be compiled (and therefore initialise) with one of the environment values 
(dev, int, acc or prod).
At runtime the value can only change to "demo", so the web component must be able to switch to mocked services at 
any time.

### offlineDataStorageEnabled (optional)

TBD

### isOfflineAuthenticated (optional)

TBD

### crashReportingEnabled (optional)

TBD
