# main

# 5.0.3

* fix for missing export of the `authenticationStatus` typing

# 5.0.2

* new guideline on working with documents
* common pitfalls documentation
* new `authenticationStatus` added to the host settings
* made `isOfflineAuthenticated` deprecated, use the new `authenticationStatus` instead

# 5.0.1

* `refresh` event in component manifest `events` is required to declare that a component can refresh its data
* `VersionMismatch` notification event
* Ability to explicitly type the `props` of an `OpenEvent`
* Restored the optional `audience` param of `getAccessToken` (for pseudonymisation scenario)
* More docs

# 5.0.0

* Module and component "manifests" for code-level annotation (instead of doc-level)
* Module bootstrap without instantiating components
* Pre-fetching mechanism to preload data for components in the background
* Official support for multiple components per package
* Added an event bus to the `HostServices` to signal relevant changes in the host app (like settings changes)
* `ComponentServices` is no longer a component input; it has been replaced with `HostServices` passed into the
`bootstrap` function at the module level
* `version` at component level is now `specVersion` in the module manifest 
(all components of the same module share a version number)
and the version check will be done by the host app instead of the web component
* Created a base class for vanilla JS web component implementations
* Added event types and factories
* Converted enums to ES-compatible implementations (backwards compatible)
* Better, stronger typing
* Improve code doc
* Add guidelines to repo (moved from private confluence)
* `getAccessToken` no longer returns `null`, if something is wrong it will reject the Promise instead
* `cacheDataStorage` implements full `Map` interface
* `OfflineDataStorage.remove` renamed to `delete` for better alignment with `Map` interface
* Replaced `RegisterRefreshCallback` with an event-based approach
* Added `.editorConfig` to the project

# 4.0.0

* Use terminology cacheDataStorage and offlineDataStorage

# 3.0.0

* Remove the encryption argument in the set method of the ComponentOfflineStore, to make encryption mandatory

# 2.0.1

* Add Printable type, PrintableMimeType enum and PrintableOrientation enum

# 2.0.0

* Align version with samples and angular library
* Removes ComponentError type

# 1.3.0

* Added `demo` `Configuration` enum value
* Specification v1.3

# 1.2.1

* Auto generate `componentSpecVersion` out of the version found in `package.json`

# 1.2.0

* Specification v1.2
* replaced the `accessToken` service with the `getAccessToken()` function (thus also removing the `getIdToken()` method)


# 1.1.0

* First official version of the specification
* Types definition according to the spec v1.1


# 1.0.0

Initial version, unreleased.
