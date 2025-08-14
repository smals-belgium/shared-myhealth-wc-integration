/**
 * @summary
 * A type for grouping multiple web-components that loosely interact with each other.
 *
 * @description
 * Web components are fairly granular. This means that a set of features would likely be broken down into
 * multiple web components.
 *
 * This set of web components belongs to what we will call a family.
 *
 * For instance, everything related to prescriptions can be a family
 * (composed of an overview of all your prescriptions, a detail view on one specific prescription, etc.).
 *
 * There are a few considerations linked with this concept of family:
 *  - all components of a given family share the same (in-memory) cache (@see HostServices#cacheDataStorage)
 *  - all components of a given family share the same data storage area
 * (in SQL we would say 1 family = 1 database table)
 *  - components of one family _can_ be grouped together in one `module` and/or NPM package, but they don't have to
 *
 * `Family` is a so-called branded type, which means at runtime it's just a string, but at compile time it is more
 * precise. You can assign a `Family` to a `string`, but you can't assign a `string` (or any other branded type)
 * to a `Family`.
 * Cast or use the factory function to create the type.
 *
 * @example
 * ```ts
 * import { family } from '@smals-belgium/myhealth-wc-integration';
 *
 * const myFamily = family('my-family');
 * ```
 */
export type Family = string & { _brand: 'my-health:family' };

export const family = (s: string) => s as Family;
