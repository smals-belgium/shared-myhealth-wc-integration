import type { DocumentEventDetail } from './document.payload';

export const PrintOrientation = {
  LANDSCAPE: 'landscape',
  PORTRAIT: 'portrait',
} as const;

export type PrintOrientation = typeof PrintOrientation[keyof typeof PrintOrientation];

export type PrintEventDetail = DocumentEventDetail & Readonly<{

  /** The orientation of the printed document (portrait or landscape). */
  orientation?: PrintOrientation;

}>;

export const printEventType = 'print';

export const printEvent = (detail: PrintEventDetail) =>
  new CustomEvent(printEventType, { detail }) as PrintEvent;

/**
 * Request the host application to print a document.
 *
 * Use the factory function to create the event.
 *
 * @example
 * ```ts
 * import { printEvent } from '@smals-belgium/myhealth-wc-integration';
 *
 * export class MyWebComponent {
 *   onButtonClick() {
 *     this.dispatchEvent(printEvent({
 *       title: 'my-document.pdf',
 *       content: 'some content',
 *       mimeType: 'application/pdf',
 *       orientation: 'portrait'
 *     }));
 *   }
 * }
 * ```
 */
export type PrintEvent = CustomEvent<PrintEventDetail> & { type: typeof printEventType };
