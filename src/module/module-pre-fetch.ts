/**
 * @summary
 * Eagerly load data for web components in this module.
 *
 * @description
 * The "pre-fetch" function allows the host application to (p)re-load data while no web components of this module have
 * been instantiated yet.
 * In a mobile app for example the pre-fetchers of all modules would be called at start-up time, so that data is
 * readily available when a component is loaded. Pull-to-refresh on the home page could then re-trigger the loading
 * of data for all components that implement this feature.
 *
 * This functionality is only available at the module level, not at the individual component level.
 * If you need to refresh the data of a specific component (for example pull-to-refresh on mobile when a specific
 * component is active), use its `refresh` event mechanism.
 *
 * This function returns a `Promise` so that the host application can know when the pre-fetch operation is finished
 * (e.g. to display/hide a spinner), but it's important to note that the host app does nothing with the data.
 * It's the web component's responsibility to decide what to do;
 * for example it could decide to store the data in localStorage for offline usage, or it could just cache it within
 * the current session for perceived performance improvements, or whatever else.
 *
 * @example
 * ```js
 * const preFetch = () => fetch('/my-rest/v1/my-resource')
 *   .then(res => res.json())
 *   .then(data => cache.set('resource', data));
 * ```
 */
export type MyHealthModulePreFetch = () => Promise<unknown>;
