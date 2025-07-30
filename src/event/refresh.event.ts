export type RefreshEventDetail = Readonly<{

  /** The status of the refresh operation. */
  status: 'request' | 'success' | 'fail';

}>;

export const refreshEventType = 'refresh' as const;

export const refreshEvent = (detail: RefreshEventDetail) =>
  new CustomEvent(refreshEventType, { detail }) as RefreshEvent;

/**
 * Either request the web component to start refreshing its data (`status: 'request'`)
 * or inform the host application that the operation is complete (`status: 'success' | 'fail'`).
 *
 * This event is only used at the component level, since we only want to refresh the data of a specific component.
 * It is the host application's job to dispatch a `request` on the component.
 * The web component **must** listen to this event and respond with a `success` or `fail` status
 * when the refresh operation is done. Even if it doesn't need to refresh anything,
 * otherwise the host app will remain in a "requesting" state forever.
 *
 * Extending from the base `WebComponentElement` class will automatically take care of this.
 * @see WebComponentElement
 *
 * @example
 * ```ts
 * import { WebComponentElement } from '@smals-belgium/myhealth-wc-integration';
 *
 * export class MyWebComponent extends WebComponentElement {
 *
 *   protected override readonly refreshData = () => fetch('/my-resource')
 *     .then(res => res.json())
 *     .then(data => this.doSomethingWith(data));
 *
 * }
 * ```
 *
 * For manual implementation, use the factory function to create the event.
 *
 * @example
 * ```ts
 * import { type RefreshEvent, refreshEvent } from '@smals-belgium/myhealth-wc-integration';
 *
 * export class MyWebComponent {
 *
 *   connectedCallback() {
 *     this.addEventListener('refresh', this.#handleRefresh);
 *   }
 *
 *   #handleRefresh(event: RefreshEvent) {
 *     if (event.detail.status === 'request') fetch('/my-resource')
 *       .then(res => res.json())
 *       .then(data => this.doSomethingWith(data))
 *       .then(() => 'success' as const)
 *       .catch(() => 'fail' as const)
 *       .then(status => this.dispatchEvent(refreshEvent({ status })));
 *   }
 *
 *   disconnectedCallback() {
 *     this.removeEventListener('refresh', this.#handleRefresh);
 *   }
 *
 * }
 * ```
 */
export type RefreshEvent = CustomEvent<RefreshEventDetail> & { type: typeof refreshEventType };
