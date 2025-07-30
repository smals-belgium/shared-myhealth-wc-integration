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
