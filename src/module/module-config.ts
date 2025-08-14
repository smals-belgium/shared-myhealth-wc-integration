import type { HostServices } from '../service/host-services';
import type { HostSettings } from '../setting/host-settings';


/**
 * A configuration object passed into the web component module bootstrap function.
 */
export type MyHealthModuleConfig = Readonly<{

  /**
   * Initial values for all settings provided by the host application.
   * To monitor changes on these settings, listen for `settings-change` events on `HostServices#events`.
   *
   * @see HostSettings
   * @see HostEventTarget
   * @see SettingsChangeEvent
   */
  settings: HostSettings;

  /** @see HostServices */
  services: HostServices;

}>;
