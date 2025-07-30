import type { HostEventTarget } from './host-event-target';
import type { OfflineDataStorage } from './offline-data-storage';


/**
 * A JSON web token necessary for authentication with backend services,
 * which may contain additional information about the user or one of his mandates.
 */
export type AccessToken = string & { _brand: 'my-health:access-token' };
export const accessToken = (s: string) => s as AccessToken;

/**
 * @summary
 * An object containing al services provided by the host application.
 *
 * @description
 * The host application provides a few services to all the web components.
 * This is to ensure a certain level of consistency in how things function,
 * but still giving a high level of flexibility.
 */
export type HostServices = Readonly<{

  /**
   * The Cache data storage allows you to store, retrieve, and remove data within a temporary in-memory cache.
   *
   * This cache is specific to each component family and only exists temporarily while the app is running — it is
   * not saved permanently. It is used to share data between components within the same family.
   *
   * The host has full control over when to clear the cache. However, it must always provide a valid cache when
   * requested by components.
   *
   * It's important to know that, on web browsers, the cache will be cleared automatically when the page is reloaded.
   * On mobile app, the cache gets cleared when the user logs out or when the app is re-opened after having been
   * closed.
   *
   * Note: this cache is not the same as offline data storage, which is used to keep data between app sessions or
   * restarts.
   */
  cacheDataStorage: Map<string, unknown>;

  /** @see OfflineDataStorage */
  offlineDataStorage: OfflineDataStorage;

  /**
   * An event hub that sends out messages related to changes in the host application that may be of interest
   * to all the web components of a family.
   * Events that relate to a specific component are dispatched on the component itself.
   *
   * @see HostEventTarget
   */
  events: HostEventTarget;

  /**
   * Assuming any web component will make calls to a secured backend, this function must be used to retrieve an access
   * token to attach to the request headers.
   *
   * If the user switched his profile to any of his mandates, this method will perform a token exchange to one that
   * represents the mandated citizen, and return the exchanged token.
   * The token exchange mechanism is implemented by the host app, so the web component should never implement any logic
   * to obtain or exchange an access token.
   *
   * When a web component is loaded, the user should already be authenticated.
   * If for whatever reason there should not be a valid token present, the Promise will be rejected.
   */
  getAccessToken(): Promise<AccessToken>;

}>;
