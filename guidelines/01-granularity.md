# Guideline on granularity

MyHealth will be built using [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) (wc) 
to ensure a consistent UX across all possible platforms and host applications.

Those components must adhere to a set of [inputs & outputs](./02-interfacing.md) and a granularity that allows them 
to be placed in various configurations depending on how the host app wants to integrate them.

## Granularity
A given functionality is typically composed of multiple views. A simple example is a list view and a details view 
showing the details of an item selected in the list.

In order for those list and details views to be displayed on mobile or in various layouts on the web, 
we need the functionality to be broken down into multiple individual web components.

In our simple example, we would end up with 2 components: list and details.

The way to break down a given functionality into 1 or more web components is left up to the development team.

The general rule however is to break things down when the pieces of the functionality are expected to be organized in 
different layouts depending on the platform or device they will be deployed to 
(mobile or various web apps with different layout requirements).

In the list & details example above, we know that:
- on mobile we'll show the list on one screen and the details on separate screens; 
the user will navigate from list to detail and back
- on one web app we might want to show the list on the left of the page and the details on the right
- on another web app we might want to put the list above the details
- on a tablet, we want to do one of the two previous layouts depending on screen orientation 
- etc.

In order to achieve this we'll want to break down the overall functionality into 2 components: list and details.

The layout of the components and/or navigation between them is the responsibility of the host application.


## Family of Web Components
As described above, web components are fairly granular. this means that a set of features would likely be broken down 
into multiple web components.

This set of web components belongs to what we will call a `family`.

For instance, everything related to prescriptions can be a family (composed of an overview of all your prescriptions,
 a detail view on one specific prescription, etc.).

There are a few considerations linked with this concept of `family`:
- all components of a given family share the same (in-memory) cache (see [inputs](./02-interfacing.md))
- all components of a given family share the same data storage area (in sql we would say 1 family = 1 database table)
- components of one family _can_ be grouped together in one `module` and/or NPM package, but they don't have to


## Web Component Modules
A module is a **technical** grouping of web components, as opposed to a `family` which is a **functional** grouping.
Practically speaking, we are talking about ES modules that group one or more components and share technical
resources, like services, or shared state, etc.  
One module can export one or more web components. In most cases a `module` will overlap 100% with a `family`.
But it doesn't _have_ to. A `family` can consist of multiple `modules`.

Or to put things in a different perspective:
- a `module` is a **tightly coupled** collection of components that share resources the host app has no knowledge of
- a `family` is a **loosely coupled** collection of components, that can only communicate with each other through 
the means of the host application
