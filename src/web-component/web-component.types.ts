import { type RefreshEvent, refreshEventType } from '../event/refresh.event';
import type { HostSettings } from '../setting/host-settings';
import type { KebabCase } from './type-util';



/**
 * A union type representing all properties as HTML attribute names.
 * e.g. `userLanguage` property becomes `user-language` attribute
 */
export type WebComponentAttribute = KebabCase<keyof HostSettings>;


/**
 * All events that can be emitted by or on the web component.
 */
type WebComponentEventMap = {
  [refreshEventType]: RefreshEvent;
}

/**
 * Existing `EventTarget` methods but with stricter typing for known events.
 */
export type WebComponentEventTarget = {

  addEventListener<K extends keyof WebComponentEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: WebComponentEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener<K extends keyof WebComponentEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: WebComponentEventMap[K]) => unknown, options?: boolean | AddEventListenerOptions
  ): void;

  dispatchEvent(event: RefreshEvent): boolean;

};

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * A type that contains all the properties and methods to be implemented by a web component in order to be compliant
 * with the myhealth specifications.
 * The properties will be set by the host app.
 * The methods are for communication with the host app.
 *
 * See the discrete type for more details.
 * @see HostSettings
 * @see WebComponentEventTarget
 */
export type WebComponent = Mutable<HostSettings> & WebComponentEventTarget;
