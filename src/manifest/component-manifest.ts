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
 *   inputs: ['detailId'],
 *   events: ['print'],
 *   requiredServices: ['medicaldatamanagement']
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
   * A list of properties that the component must have a value for so it can work properly.
   * This is optional because the host application can operate without knowing this,
   * but providing it gives the host the opportunity to do some validation prior to component initialisation.
   */
  requiredProperties?: string[];

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
   *
   * **IMPORTANT**: the host application may check the presence of the `refresh` event to decide whether to indicate
   * to the user that this component can refresh its data.
   *
   * Implementation of refresh mechanism is done by listening for `refresh` events with `status: 'request'`
   * on the component, and responding with a status `success` or `fail` after the operation is completed.
   */
  events?: ComponentEvent[];

  /**
   * * Services that must be present in the user's mandate to access this component.
   * If not specified, the component is available to all types of mandates.
   * Common service names: 'medicaldatamanagement', 'recipe'
   */
  requiredServices?: string[];

}>;

export type ComponentEvent =
  | typeof openEventType
  | typeof printEventType
  | typeof refreshEventType
  | typeof selectEventType
  // trick to allow any string, but still have code completion on the known ones
  | (string & Record<never, never>);
