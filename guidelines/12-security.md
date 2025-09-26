# Guideline on security

This document provides key security practices for building custom web components intended for integration into Mags. 
Adhering to these guidelines will help ensure that the components comply with our security standards and fit smoothly
within our ecosystem.

## Key Technologies for Secure Components

- **Shadow DOM Implementation:** Encapsulate your component styles and behavior using Shadow DOM to prevent conflicts 
with the global document structure. This isolation protects your component's DOM tree from external interference and 
prevents your styles from affecting other parts of the application.
- **Secure Storage Practices:** Mags will handle the encryption for any data saved on user devices to ensure 
confidentiality and integrity, particularly in the event of device loss or theft. This includes all data stored locally 
(e.g., using WebCrypto). There's no need for further implementation on this matter.

## Security Requirements for Your Components

- **Onboarding Process:** Be prepared to submit your components for comprehensive security review before production 
deployment. 
  * Source code access may be required to complete the security review.
- **Authentication Integration:**
  * Design components to work with our [OAuth2 authentication system](./19-access_management.md). 
  Ensure secure handling of tokens by storing them in secure, encrypted locations and transmitting them in HTTP 
  headers, not in URL query parameters or client-side JavaScript.
  * Components must verify user permissions and only access user-authorized data via OAuth.
- **Data Protection Responsibilities:**
  * Only access user-authorized data via OAuth.
  * Ensure any cached data remains encrypted, especially in the case of offline functionality.
  * Defer decryption operations to the API rather than handling them within your components.
  * Minimize the amount of sensitive data stored locally and ensure that it is properly encrypted.

## Data Access Policy

For security and consistency, direct access to the device's local storage is **not permitted**.

- **Do not access device storage directly:** Direct interaction with mobile storage is prohibited for security and 
consistency reasons.
- **Use only:** the provided get, set, and remove methods exposed via the 
[MyHealth - Web Component Integration](https://www.npmjs.com/package/@smals-belgium/myhealth-wc-integration).
These operations are exposed through the `services` provided in the [bootstrap](./05-modules.md#bootstrapping) 
function and are the **only approved way** to interact with storage.

These operations are the **only approved interface** for reading from or writing to storage. They ensure proper data 
handling, validation, and alignment with platform integration standards.

**! Do not attempt to bypass the provided interface** to access storage directly. Doing so can introduce security 
risks, cause data inconsistency, and violate architectural guidelines.

## Vulnerability Prevention Measures

Your components must be protected against:
- **Cross-Site Scripting (XSS)**
- **Cross-Site Request Forgery (CSRF)**
- **Insecure Component Interactions**
- **Malicious Code Injection**

Implement these protective measures:
- **Thorough Input Sanitization:** Sanitize all data inputs, not just text fields, to prevent the injection of 
malicious content. Implement input validation on both the client and server side.
- **Secure Communication:** Use only **HTTPS** for all API communications. Ensure that all data in transit is protected 
by strong encryption mechanisms to prevent interception and tampering.
- **Dependency Management:** Maintain current versions of all dependencies and regularly update them to incorporate 
security patches. Automate security patching where possible to ensure that vulnerabilities are patched promptly.
- **Component Lifecycle Security:** Secure each lifecycle stage with safe defaults and ensure proper cleanup of 
sensitive data. When components are removed, ensure no lingering event listeners or references remain that could leak 
sensitive information or cause memory leaks.

## Framework Security Best Practices

- **Use Framework Sanitization:** Utilize your framework's built-in security features for DOM manipulation and data 
binding to minimize the risk of XSS and injection attacks.
- **Avoid Security Bypasses:** Never use security bypass functions (like `dangerouslySetInnerHTML` or 
`bypassSecurityTrust`) without thorough review to ensure no security risks are introduced.
- **Prevent Template Injection:** Validate and sanitize all user inputs before rendering templates to prevent 
injection attacks and ensure data integrity.
- **Keep Dependencies Current:** Regularly update all frameworks and libraries to incorporate security patches. 
Use automated tools for auditing dependencies and detecting known vulnerabilities.
- **Vet Third-Party Code:** Thoroughly review external libraries before integration. Assess the security risks 
posed by any third-party code and ensure it meets the required standards for safety and compliance.
- **Use Security Linters:** Implement security-focused code analysis tools during development to automatically catch 
potential security vulnerabilities in the codebase.

## Continuous Security Improvement

- Participate in regular code reviews and security audits to identify and address potential security gaps.
- Keep your components and dependencies updated with the latest security patches.
- Stay informed about emerging security threats and best practices to ensure your components remain secure.

## Logging

For any web component where logging of user actions is necessary — particularly those involving access to personal or 
sensitive data — logs must be pseudonymized to protect user privacy. Logs should contain no personally identifiable 
information (PII) directly. Ensure that all logs are encrypted both in transit and at rest, and that access to logs 
is restricted to authorized personnel only.

## Additional Security Considerations

- **Client-Side and Server-Side Validation:** While client-side validation is necessary for user experience, never rely
solely on client-side validation for security. Always validate data on the server side as well to ensure its integrity.
- **Security Incident Response:** In case of a security breach or discovered vulnerability, ensure you have a clear 
response plan for patching the issue, notifying stakeholders, and mitigating any potential damage. This plan should 
include procedures for swift resolution and communication to users.

---

_This guideline is based on the OWASP Top 10 (https://owasp.org/www-project-top-ten/), a widely recognized list of the most serious security risks facing web applications. The security requirements we’ve defined are specifically aimed at reducing these risks. They provide a clear path for secure component development._
