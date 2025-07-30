import type { MyHealthComponentManifest } from './component-manifest';
import type { Family } from './family';
import type { SpecVersion } from './spec-version';


/**
 * @summary
 * Annotates a module containing one or more web components.
 *
 * @description
 * This manifest is machine-readable documentation of a web component module.
 * The version of the spec and the `family` are the same across all components.
 * The same `family` _can_ be used by another module though.
 * A module must contain at least one component.
 *
 * @example
 * ```ts
 * import { type MyHealthModuleManifest, family } from '@smals-belgium/myhealth-wc-integration';
 * import { entryComponentManifest } from './entry-component.ts';
 *
 * export const manifest: MyHealthModuleManifest = {
 *   specVersion: { major: 5, minor: 0 },
 *   family: family('my-family'),
 *   components: [entryComponentManifest]
 * };
 * ```
 */
export type MyHealthModuleManifest = Readonly<{

  /** @see SpecVersion */
  specVersion: SpecVersion;

  /** @see Family */
  family: Family;

  /**
   * One or more components exposed by this module.
   *
   * !important
   * - There must be at least one component
   * - The first component in this list is the entry point of your module
   * (i.e. the one initially loaded by the host app)
   *
   * @see MyHealthComponentManifest
   */
  components: [MyHealthComponentManifest, ...MyHealthComponentManifest[]];

}>;
