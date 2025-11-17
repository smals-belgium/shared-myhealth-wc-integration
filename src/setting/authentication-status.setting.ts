export const AuthenticationStatus = {
  UNAUTHENTICATED: 'unauthenticated',
  ONLINE: 'online-authenticated',
  OFFLINE: 'offline-authenticated'
} as const;

/**
 * @summary
 * Status of the user's authentication within the host application.
 *
 * @description
 * The objective of this input is to indicate to a web component the authentication state of the current user,
 * which determines how the component should behave and what data it can access.
 *
 * The possible authentication status values are:
 * - `unauthenticated`: user is not logged in
 * - `online-authenticated`: user is authenticated and online
 * - `offline-authenticated`: user is authenticated but currently offline
 *
 * When the status is "unauthenticated" or "offline-authenticated", the component should not fetch a token from the host application.
 * When "online-authenticated", the component can access all backend services and real-time data.
 * When "offline-authenticated", the component should use cached data and provide offline functionality.
 */
export type AuthenticationStatus = typeof AuthenticationStatus[keyof typeof AuthenticationStatus];
