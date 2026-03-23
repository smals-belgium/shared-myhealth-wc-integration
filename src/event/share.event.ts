import type { DocumentEventDetail } from './document.payload';

export type ShareEventDetail = DocumentEventDetail & Readonly<{

  /** Describe the document to the sharee. If sharing through mail this would set the mail body. */
  description?: string;

  /** Set a title for the share modal. This option is only supported on Android. */
  dialogTitle?: string;

}>;

export const shareEventType = 'share';

export const shareEvent = (detail: ShareEventDetail) =>
  new CustomEvent(shareEventType, { detail }) as ShareEvent;

/**
 * Request the host application to share a document.
 *
 * Use the factory function to create the event.
 *
 * @example
 * ```ts
 * import { shareEvent } from '@smals-belgium/myhealth-wc-integration';
 *
 * export class MyWebComponent {
 *   onButtonClick() {
 *     this.dispatchEvent(shareEvent({
 *       title: 'my-document.pdf',
 *       description: 'This is a document for you',
 *       content: 'some content',
 *       mimeType: 'application/pdf'
 *     }));
 *   }
 * }
 * ```
 */
export type ShareEvent = CustomEvent<ShareEventDetail> & { type: typeof shareEventType };
