import type { DocumentEventDetail } from './document.payload';


export const downloadEventType = 'download';

export const downloadEvent = (detail: DocumentEventDetail) =>
  new CustomEvent(downloadEventType, { detail }) as DownloadEvent;

/**
 * Request the host application to download a document.
 *
 * Use the factory function to create the event.
 *
 * @example
 * ```ts
 * import { downloadEvent } from '@smals-belgium/myhealth-wc-integration';
 *
 * export class MyWebComponent {
 *   onButtonClick() {
 *     this.dispatchEvent(downloadEvent({
 *       title: 'my-document.pdf',
 *       content: 'some content',
 *       mimeType: 'application/pdf'
 *     }));
 *   }
 * }
 * ```
 */
export type DownloadEvent = CustomEvent<DocumentEventDetail> & { type: typeof downloadEventType };
