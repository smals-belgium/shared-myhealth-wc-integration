export const DocumentMimeType = {
  HTML: 'text/html',
  PLAIN: 'text/plain',
  GIF: 'image/gif',
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  SVG: 'image/svg+xml',
  WEBP: 'image/webp',
  PDF: 'application/pdf',
} as const;

export type DocumentMimeType = typeof DocumentMimeType[keyof typeof DocumentMimeType];

/**
 * A document that is already available on the client, i.e. it must no longer be downloaded from a server.
 * We need a mime type to tell the host what kind of document is contained in the `content` property.
 * If the mime type matches `text/*`, the content can be a simple string.
 * Otherwise the content is considered binary and can be provided as a Blob or a base64-encoded string.
 */
export type ClientDocument = Readonly<{

  /** The content of the document. */
  content: string | Blob;

  /** The mime type of the document. */
  mimeType: DocumentMimeType;

}>

/**
 * A document that can only be downloaded from a server.
 * In this case, the mime type should be provided as a response header of the given `url`.
 * This allows the host application to access the document directly and e.g. download it onto the device
 * without having to load it into application memory first.
 * The `url` can only be secured by the oidc authentication used by the host app.
 * If any other securing mechanisms are used, you'll have to download the document in memory first
 * and then send it to the host as a `ClientDocument`. Be aware that this approach may have performance impact.
 */
export type ServerDocument = Readonly<{

  /** A URL to download a document from a remote location. */
  url: string;

  /**
   * In case a specific OIDC audience is needed for this document.
   * By default the host app will determine the audience the same way as for any call to `getAccessToken()`.
   * @see HostServices#getAccessToken
   */
  audience?: string;

}>

export type DocumentEventDetail = (ClientDocument | ServerDocument) & Readonly<{

  /**
   * The title of the document.
   * This may have different meaning depending on the specific action.
   * For example, when sharing the 'title' could be the email subject,
   * but when printing it would be the print job name.
   */
  title: string;

}>;
