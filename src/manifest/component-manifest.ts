import { openEventType } from '../event/open.event';
import { printEventType } from '../event/print.event';
import { refreshEventType } from '../event/refresh.event';
import { selectEventType } from '../event/select.event';


/**
 * @summary
 * Annotates a top-level component in this module/family.
 *
 * @description
 * This manifest is machine-readable documentation of the components that are available to the host application.
 *  - it reduces the need for manual/human-readable documentation
 *  - it allows for the host app to know less about the component's internals
 *
 * @example
 * ```ts
 * import type { MyHealthComponentManifest } from '@smals-belgium/myhealth-wc-integration';
 *
 * export const manifest: MyHealthComponentManifest = {
 *   tagName: 'my-component',
 *   events: ['print']
 * };
 * ```
 */
export type MyHealthComponentManifest = Readonly<{

  /**
   * The `tagName` of the HTML element.
   * The host app can use this to instantiate the component.
   */
  tagName: string;

  /**
   * The events the component emits.
   * Before creating any custom events, check the available built-in ones in the `event` directory.
   * Prefer using those if possible as they reduce custom implementations,
   * and make sure not to use conflicting event types.
   *
   * Existing types are
   *  - open (@see OpenEvent)
   *  - print (@see PrintEvent)
   *  - refresh (@see RefreshEvent)
   *  - select (@see SelectEvent)
   * (settings-change is a module level event)
   *
   * This list must be provided if you want the host application to listen to them.
   * Except `refresh`, which is the only required event.
   */
  events?: ComponentEvent[];

}>;

export type ComponentEvent =
  | typeof openEventType
  | typeof printEventType
  | typeof refreshEventType
  | typeof selectEventType
  // trick to allow any string, but still have code completion on the known ones
  | (string & Record<never, never>);
