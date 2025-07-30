export const UserLanguage = {
  EN: 'en',
  FR: 'fr',
  NL: 'nl',
  DE: 'de',
} as const;

/**
 * @summary
 * Language used to display translated content to the end user.
 *
 * @description
 * Components are expected to display text content in the provided language.
 *
 * Supported languages are English, French, Dutch and German. All are represented by their respective ISO-2 codes (en, fr, nl, de).
 *
 * Components need to take into account that the language can change at runtime and currently displayed components
 * may have to be re-translated at any time.
 */
export type UserLanguage = typeof UserLanguage[keyof typeof UserLanguage];
