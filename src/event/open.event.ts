export type OpenEventDetail = Readonly<{

  /** The `tagName` of the component to display. */
  componentTag: string;

  /** Optional properties to pass to the component. */
  props?: Record<string, unknown>;

}>;

export const openEventType = 'open' as const;

export const openEvent = (detail: OpenEventDetail) =>
  new CustomEvent(openEventType, { detail }) as OpenEvent;

/**
 * Request the host application to display the component provided in the event detail.
 *
 * Use the factory function to create the event.
 *
 * @example
 * ```ts
 * import { openEvent } from '@smals-belgium/myhealth-wc-integration';
 *
 * export class MyWebComponent {
 *   onButtonClick() {
 *     this.dispatchEvent(openEvent({ componentTag: 'my-other-component' }));
 *   }
 * }
 * ```
 *
 * It has an optional property `props` that allows you to pass additional information into the web component's properties.
 * ```ts
 * import { openEvent } from '@smals-belgium/myhealth-wc-integration';
 *
 * export class MyWebComponent {
 *   onButtonClick() {
 *     this.dispatchEvent(openEvent({
 *       componentTag: 'my-other-component',
 *       props: { title: 'hello world' }
 *     }));
 *   }
 * }
 * ```
 * Obviously, avoid passing any of the [host settings](./02-host_settings.md) like this, because those are the host
 * application's responsibility.
 *
 * It's also worth noting that it's not strictly necessary to work with properties like this. Given multiple components
 * living in the same [module](./05-modules_and_prefetching.md) it's perfectly possible to use a module's internal state
 * to pass information from one component to another.
 */
export type OpenEvent = CustomEvent<OpenEventDetail> & { type: typeof openEventType };
