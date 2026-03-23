import type { DocumentEventDetail } from './document.payload';
import type { PrintEventDetail } from './print.event';
import type { ShareEventDetail } from './share.event';

export type DocumentViewerAction =
  | 'download'
  | 'print'
  | 'search'
  | 'share'
  | 'zoom-to-fit'

export type ViewEventDetail = DocumentEventDetail & Readonly<{

  /**
   * A list of actions that the document viewer should put at the user's disposal when viewing this document.
   * The list may be empty, in which case the user can only view in the app and nothing else.
   *
   * **IMPORTANT** While security concerns are the responsibility of the web component developers,
   * a host application may still decide to ignore requested actions for security reasons.
   *
   * For example: the MAGS mobile app will never display a "share" button, but other host apps may have less strict
   * rules.
   */
  actions: DocumentViewerAction[];

  shareDescription?: ShareEventDetail['description'];
  printOrientation?: PrintEventDetail['orientation'];

}>

export const viewEventType = 'view';

export const viewEvent = (detail: ViewEventDetail) =>
  new CustomEvent(viewEventType, { detail }) as ViewEvent;

/**
 * Request the host application to (pre)view a document directly in the app.
 *
 * Use the factory function to create the event.
 *
 * @example
 * ```ts
 * import { viewEvent } from '@smals-belgium/myhealth-wc-integration';
 *
 * export class MyWebComponent {
 *   onButtonClick() {
 *     this.dispatchEvent(viewEvent({
 *       title: 'my-document.pdf',
 *       shareDescription: 'This is a document for you',
 *       content: 'some content',
 *       mimeType: 'application/pdf'
 *     }));
 *   }
 * }
 * ```
 */
export type ViewEvent = CustomEvent<ViewEventDetail> & { type: typeof viewEventType };
