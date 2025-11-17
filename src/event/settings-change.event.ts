import { HostSettings } from '../setting/host-settings';


/**
 * A `settings-change` event payload that is a derived union of the properties of `HostSettings`.
 * Just check the example if this makes no sense :)
 *
 * @example
 * If HostSettings has
 * ```ts
 * type HostSettings = {
 *   language: 'nl' | 'fr'`;
 *   flag: boolean;
 * }
 * ```
 * then this detail type becomes
 * ```
 * { setting: 'language', value: 'nl' | 'fr' } | { setting: 'flag', value: boolean }
 * ```
 */
export type SettingsChangeEventDetail = Readonly<{
  [K in keyof HostSettings]: {
    setting: K,
    value: HostSettings[K]
  }
}[keyof HostSettings]>;

export const settingsChangeEventType = 'settings-change';

export const settingsChangeEvent = (detail: SettingsChangeEventDetail) =>
  new CustomEvent(settingsChangeEventType, { detail }) as SettingsChangeEvent;

/**
 * Informs the web component module when a change in the user settings occurs in the host application.
 *
 * Supported settings are
 *  - configName
 *  - userLanguage
 *  - crashReportingEnabled
 *  - offlineDataStorageEnabled
 *  - isOfflineAuthenticated (@deprecated since version 5.0.2, use authenticationStatus instead)
 *  - authenticationStatus
 *
 * Listen for these events on the provided event bus.
 *
 * @example
 * ```ts
 * import type { MyHealthModuleBootstrap } from '@smals-belgium/myhealth-wc-integration';
 *
 * export const bootstrap: MyHealthModuleBootstrap =
 *   ({ events }) => events.addEventListener('settings-change', event => {
 *     if (event.setting === 'userLanguage') handleLanguageChange(event.value);
 *   });
 * ```
 */
export type SettingsChangeEvent = CustomEvent<SettingsChangeEventDetail> & { type: typeof settingsChangeEventType };
