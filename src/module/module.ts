import { MyHealthModuleManifest } from '../manifest/module-manifest';
import { MyHealthModuleBootstrap } from './module-bootstrap';


/**
 * @summary
 * What the npm package entry point needs to export.
 *
 * @description
 * When using ES module `export` syntax, this type cannot be used at that level. It merely describes what to export.
 * Host applications can use this type when they import such a module though.
 *
 * A module is a **technical** grouping of web components, as opposed to a `family` which is a **functional** grouping.
 * Practically speaking, we are talking about ES modules that group one or more components and share technical
 * resources, like services, or shared state, etc.
 * One module can export one or more web components. In most cases a `module` will overlap 100% with a `family`.
 * But it doesn't _have_ to. A `family` can consist of multiple `modules`.
 *
 * Or to put things in a different perspective:
 * - a `module` is a **tightly coupled** collection of components that share resources the host app has no knowledge of
 * - a `family` is a **loosely coupled** collection of components, that can only communicate with each other through
 *   the means of the host application
 *
 * @example
 * ```ts
 * // index.ts
 *
 * import type { MyHealthModuleBootstrap, MyHealthModuleManifest } from '@smals-belgium/myhealth-wc-integration';
 *
 * export const manifest: MyHealthModuleManifest = { ... };
 * export const bootstrap: MyHealthModuleBootstrap = config => { ... };
 * ```
 */
export type MyHealthModule = Readonly<{
  manifest: MyHealthModuleManifest;
  bootstrap: MyHealthModuleBootstrap;
}>;
