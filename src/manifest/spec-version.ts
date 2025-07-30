/**
 * @summary
 * Indicates the version of the spec the web component module uses.
 * Host apps should compare this value with the version of the spec they use and ensure both speak the same language.
 *
 * @description
 * Host applications are expected to validate the version value provided in the web component module manifest.
 *
 * The "version" defined in the "@smals-belgium/myhealth-wc-integration" library provides
 * the current spec version and should be used by both the host app and integrated web components.
 *
 * The value needs only to be checked at host startup. It will never change at runtime.
 *
 * @example
 * ```ts
 * import type { SpecVersion } from '@smals-belgium/myhealth-wc-integration';
 *
 * const version: SpecVersion = {
 *   major: 5,
 *   minor: 0,
 *   patch: 0
 * };
 * ```
 */
export type SpecVersion = {

  /**
   * Major version changes indicate breaking changes,
   * typically the spec types have been changed and are not backwards compatible.
   * The host app will not accept components that use a spec with a different major version.
   */
  major: number;

  /**
   * Minor version changes indicate non breaking changes.
   * The host app will accept components that use a spec with the same major version
   * but not necessarily the same minor or patch value.
   * It will send out an event to inform the component, so it can log mismatches on its own servers.
   */
  minor: number;

  /**
   * Patch changes indicate (non-breaking) bug fixes.
   * They are unlikely to occur much, since the library hardly has any implementation.
   * The host app will accept components that use a spec with a different patch value,
   * but will log a warning to the console.
   * It will send out an event to inform the component, so it can log mismatches on its own servers.
   */
  patch: number;

};
