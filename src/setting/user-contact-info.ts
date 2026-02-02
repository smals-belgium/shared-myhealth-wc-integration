// either have dialCode AND number, or neither of them
type PhoneInfo = {
  dialCode: string,
  phoneNumber: string
} | {
  dialCode?: never
  phoneNumber?: never
}

/**
 * The main user's contact information.
 * This data can be used to prefill forms in modules.
 * The object will always be passed into components, but it could be empty if no contact info was configured.
 *
 * When another profile (mandate or child) is selected in the host app, the contact info remains that of the primary
 * user of the app. For example, when ordering prescriptions on behalf of someone else, the contact info should still
 * be that of the main user.
 *
 * Like all other host settings, the host app will send this data to the modules.
 * To a web component's attributes the object will be passed as a stringified JSON object. The component must
 * deserialise the data before usage.
 * Data passed to the modules will always be validated, but since this can only be done client-side depending on the
 * host app's context, the final validation responsibility always remains with the module's backend.
 *
 * Unlike other host settings, the module can send contact info back to the host application.
 * i.e. when the user fills in contact information inside a module form, that module can send that info to the host
 * app and ask it to save this data.
 * The module can do its own validation if it wants to, but the host app will do a "second validation round" to make
 * sure that data complies with its rules. You could compare this to server-side validation on top of client-side
 * validation.
 *
 * Phone numbers will be checked by the host app using the
 * [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js) library.
 */
export type UserContactInfo = {
  email?: string
} & PhoneInfo

