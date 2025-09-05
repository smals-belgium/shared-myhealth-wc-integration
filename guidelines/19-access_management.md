# Guideline on access management and documentation for Web Components Developers

This guideline explains what technical teams must document about access management when developing new web components that integrate with the MyHealth WC Integration library and call backend APIs. It standardizes how to describe JWT construction, client onboarding, scopes/claims, and token exchange behavior, so consumers and platform teams can integrate securely and predictably.

## Scope and audience

- Audience: backend/API owners, web component authors.
- Scope: authentication and authorization documentation for APIs called by web components, with emphasis on JWT content, client registration, scopes/claims, and RFC 8693 token exchange.

## Key definitions

- JWT (JSON Web Token): compact token format carrying claims used for authentication/authorization.
- Claims: name/value pairs in a JWT (e.g., sub, aud, iss, scope, exp). Custom claims should use collision-resistant names.
- Scopes: permissions defined in the JWT, e.g., patient.read, patient.write.
- Client allowlist (formerly whitelist): model where specific client-ids are permitted.
- eHealth client-id: a registered OAuth2/OIDC client at eHealth used by the platform for authentication and authorization.
- Token exchange (RFC 8693): protocol to exchange an incoming token for another token targeted to a downstream API.

## What you must document for your API

1. JWT construction requirements
   - Required standard claims: which ones are mandatory and how you validate them (`iss`, `aud`, `exp`, `iat`, `nbf`, `sub`).
   - Required custom claims: exact names, types, and acceptable values; include examples.
   - Required scopes: list the minimal scopes, their meaning, and which endpoints need them.
   - Audience (`aud`) rules: what value(s) you expect and how you validate them.

2. Client onboarding model
   - If you allowlist client-ids only (no specific scopes/claims required):
     - Document how a team requests onboarding: required information, contact channel.
     - Describe the approval criteria and how you communicate the registration back to the requester.
   - If you require specific scopes/claims:
     - Provide an eHealth client-id already configured with the correct scopes/claims for token exchange.
     - Document the approval flow to get exchange rights to this client-id (who approves, what evidence is needed, expected lead times).

3. Token exchange behavior (RFC 8693)
   - If using exchanged tokens: state that, per RFC 8693, the original client-id of the caller is available in the `aud` claim of the exchanged token (if you choose to use it), and document how you use it.

4. Error handling and responses
   - Provide troubleshooting steps for common failures (wrong audience, missing scope, etc.).

## Documentation checklist (copy into your API README)

- Title: Access management for <Your API>
- Contact for onboarding: <email/team/portal>
- Token type expected: <access token | exchanged token>
- Required audience (`aud`): <value(s)>
- Required issuer (`iss`): <value(s)>
- Required scopes: <list>
- Required custom claims: <list with definition>
- Client onboarding model: <allowlist | scopes/claims> and process description
- eHealth client-id for exchange (if applicable): <client-id> + approval steps
- Example valid JWT payload and a failing example
- References: RFC 8693, OIDC, organizational security policy

## Common pitfalls

- Accepting tokens without validating `exp`, `nbf`, and `iss`.
- Forgetting to validate `aud` according to your policy.
- Relying on unstable custom claim names; prefer namespaced claims.
- Clock skew issues: allow a small leeway (e.g., 60–120 seconds) for `nbf`/`exp`.

## References

- RFC 8693: OAuth 2.0 Token Exchange — https://datatracker.ietf.org/doc/html/rfc8693
- OAuth 2.0 Bearer Token Usage — https://datatracker.ietf.org/doc/html/rfc6750
- OpenID Connect Core — https://openid.net/specs/openid-connect-core-1_0.html

