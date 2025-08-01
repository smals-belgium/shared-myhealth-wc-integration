export type SelectEventDetail<T extends string> = Readonly<{

  /** Discriminator to determine what is being selected. */
  type: T;

  /** The ID of the selected item. */
  id: string;

}>;

export const selectEventType = 'select';

export const selectEvent = <T extends string>(detail: SelectEventDetail<T>) =>
  new CustomEvent(selectEventType, { detail }) as SelectEvent<T>;

/**
 * Inform the host application that something has been selected and pass the ID of that selected item.
 * If the only purpose of the event is to display a component for the item with the given ID, prefer the more generic
 * `OpenEvent`. Use `SelectEvent` only if you need the host app to handle the selection in a special way and document
 * that expected behaviour thoroughly.
 *
 * Use the factory function to create the event.
 *
 * @example
 * ```ts
 * import { selectEvent } from '@smals-belgium/myhealth-wc-integration';
 *
 * export class MyWebComponent {
 *   onButtonClick() {
 *     this.dispatchEvent(selectEvent({
 *       type: 'my-item',
 *       id: '123'
 *     }));
 *   }
 * }
 * ```
 */
export type SelectEvent<T extends string> = CustomEvent<SelectEventDetail<T>> & { type: typeof selectEventType };
