import type { MyHealthModuleConfig } from './module-config';
import type { MyHealthModulePreFetch } from './module-pre-fetch';


/**
 * This function is called by the host application when it decides to bootstrap the web component module.
 * This allows for code to be executed at the module level, before any component is initialised.
 * Typically this would be used for initial configuration (like configuring providers in an Angular module).
 *
 * At this time the host app provides some configuration (settings and services) that can be used to wire your module.
 *
 * It can return a "pre-fetch" function if the module wants to leverage that feature, but it doesn't have to.
 * "pre-fetch" is returned from "bootstrap" to allow it to use the configuration options.
 *
 * @example
 * ```js
 * const bootstrap = ({ services }) => () => fetch('/my-rest/v1/my-resource')
 *   .then(res => res.json())
 *   .then(data => services.cacheDataStorage.set('resource', data));
 * ```
 */
export type MyHealthModuleBootstrap = (config: MyHealthModuleConfig) => void | MyHealthModulePreFetch;
