import type { AuthenticationStatus } from './authentication-status.setting';
import type { ConfigName } from './config-name.setting';
import type { UserLanguage } from './user-language.setting';


/**
 * The properties that all myhealth web components will receive from their host application.
 * These values will always be provided. A web component **must** do something with
 *  - userLanguage
 *  - configName
 * see their respective docs for more details.
 * Dealing with `crashReportingEnabled` is only necessary if the web component uses a crash report tool such as Sentry.
 *
 * All these properties can change at runtime and the web component has to be able to deal with those changes.
 * Monitoring those changes can be done by watching changes in these properties,
 * or by listening for `SettingsChange` events on the event bus provided as a service.
 * (The decision on this choice will most likely depend on the number of components in a module, or the framework used)
 */
export type HostSettings = Readonly<{

  /** @see UserLanguage */
  userLanguage: UserLanguage;

  /** @see ConfigName */
  configName: ConfigName;

  /**
   * A boolean flag indicating if the user has given the permission to crash report to be sent.
   * Must be implemented if the web component uses a crash report tool such as Sentry.
   */
  crashReportingEnabled: boolean;

  /**
   * A boolean flag indicating whether offline data storage has been enabled by the user.
   * When true, the web component can store and retrieve data locally for offline access.
   */
  offlineDataStorageEnabled: boolean;

  /**
   * @deprecated since version 5.0.2, use authenticationStatus instead
   * A boolean flag indicating whether the web component is being accessed from an offline state.
   * By offline state we mean when the user logged in using a "light" authentication (pin code, biometrics) that lets
   * them access the offline stored data, as opposed to a "strong" authentication with itsme or Bosa wallet.
   * When true, the web component might want to fetch the data that is stored in the offline storage.
   * When false, it might want to fetch data from the backend and update the offline data.
   */
  isOfflineAuthenticated: boolean;

  /** @see AuthenticationStatus */
  authenticationStatus: AuthenticationStatus;

}>;
