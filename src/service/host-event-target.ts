import { type SettingsChangeEvent, settingsChangeEventType } from '../event/settings-change.event';
import { type VersionMismatchEvent, versionMismatchEventType } from '../event/version-mismatch.event';


/**
 * All events that can be emitted by the host application and are relevant module-wide.
 */
type HostEventMap = {
  [settingsChangeEventType]: SettingsChangeEvent;
  [versionMismatchEventType]: VersionMismatchEvent;
}

/**
 * @summary
 * An "event bus" that can send messages from the host app to web component modules.
 *
 * @description
 * It's a standard `EventTarget` but with stricter types that allow only known events.
 * The `EventTarget#dispatchEvent` method is omitted because this is supposed to be one-way communication,
 * i.e. host sends messages and web component module listens.
 *
 * @example
 * ```ts
 * import type { MyHealthModuleBootstrap, SettingsChangeEvent } from '@smals-belgium/myhealth-wc-integration';
 *
 * export const bootstrap: MyHealthModuleBootstrap = ({ events }) => {
 *   const handleSettingsChange = (event: SettingsChangeEvent) => {
 *     if (event.setting === 'userLanguage') handleLanguageChange(event.value);
 *     events.removeEventListener('settings-change', handleSettingsChange);
 *   };
 *   events.addEventListener('settings-change', handleSettingsChange);
 * ```
 */
export type HostEventTarget = {
  addEventListener<K extends keyof HostEventMap>(type: K, listener: (event: HostEventMap[K]) => void): void;
  removeEventListener<K extends keyof HostEventMap>(type: K): void;
};
