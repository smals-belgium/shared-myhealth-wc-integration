import type { SpecVersion } from '../manifest/spec-version';


export const versionMismatchEventType = 'version-mismatch' as const;

export type VersionMismatchEventDetail = Readonly<{

  /**
   * The level of the mismatch.
   * Does not include `major` since the host app will refuse to load the module in that case.
   */
  level: 'minor' | 'patch';

  /** The version of the spec used by the host application. */
  hostVersion: SpecVersion;

  /** The version of the spec used by the web component module. */
  moduleVersion: SpecVersion;

}>;

export const versionMismatchEvent = (detail: VersionMismatchEventDetail) =>
  new CustomEvent(versionMismatchEventType, { detail }) as VersionMismatchEvent;

/**
 * Informs the web component module when the implemented spec version doesn't match the one used by the host.
 *
 * Listen for these events on the provided event bus.
 *
 * @example
 * ```ts
 * import type { MyHealthModuleBootstrap } from '@smals-belgium/myhealth-wc-integration';
 * import { logger } from './logger';
 *
 * export const bootstrap: MyHealthModuleBootstrap =
 *   ({ events }) => events.addEventListener('version-mismatch', event => {
 *     logger.warn(
 *       `${event.level} spec version mismatch detected.
 *        Host: ${event.hostVersion}, module: ${moduleVersion}`
 *     );
 *   });
 * ```
 */
export type VersionMismatchEvent = CustomEvent<VersionMismatchEventDetail> & { type: typeof versionMismatchEventType };
