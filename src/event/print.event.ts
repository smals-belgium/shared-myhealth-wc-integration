export const PrintMimeType = {
  HTML: 'text/html',
  PLAIN: 'text/plain',
  PDF: 'application/pdf',
  BASE64: 'application/base64',
} as const;

export type PrintMimeType = typeof PrintMimeType[keyof typeof PrintMimeType];

export const PrintOrientation = {
  LANDSCAPE: 'landscape',
  PORTRAIT: 'portrait',
} as const;

export type PrintOrientation = typeof PrintOrientation[keyof typeof PrintOrientation];

export type PrintEventDetail = Readonly<{

  /** The title of the print job (e.g., the document name or page title). */
  title: string;

  /** The content to be printed. */
  content: string;

  /** The mime type of the requested print format. */
  mimeType: PrintMimeType;

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
