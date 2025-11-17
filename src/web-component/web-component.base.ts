import { refreshEvent, type RefreshEvent, refreshEventType } from '../event/refresh.event';
import type { AuthenticationStatus } from '../setting/authentication-status.setting';
import type { ConfigName } from '../setting/config-name.setting';
import type { UserLanguage } from '../setting/user-language.setting';
import { WebComponentAttributeInitError } from './web-component.error';
import type { WebComponent, WebComponentAttribute } from './web-component.types';


/** The spec properties will be part of the component's `observedAttributes` by default. */
export const webComponentAttributes: WebComponentAttribute[] = [
  'user-language',
  'config-name',
  'crash-reporting-enabled',
  'offline-data-storage-enabled',
  'is-offline-authenticated'
];

/**
 * A base class for a vanilla JS web component that implements the myhealth `WebComponent` type.
 *
 *  - All spec properties are present _and_ mapped to HTML attributes.
 *  - You can pass a template at construction (if you wish; full control is still yours if you need it).
 *  - Performs a sanity check on the presence of all property values on initialisation.
 *  - Provides an easy-to use interface for the refresh mechanism.
 *
 * @example
 * ```ts
 * import { WebComponentElement } from '@smals-belgium/myhealth-wc-integration';
 *
 * export class MyWebComponent extends WebComponentElement {
 *
 *   constructor() {
 *     super('<h1>Hello user</h1><div class="user-name"><div>');
 *     this.refreshData();
 *   }
 *
 *   protected override readonly refreshData = () => fetch('/user')
 *     .then(res => res.json())
 *     .then(user => this.shadowRoot?.querySelector('.user-name').textContent = user.name);
 *
 *   attributeChangedCallback(name: WebComponentAttribute, previous: string, current: string) {
 *     if (name === 'user-language')
 *       console.log(`User language changed from ${previous} to ${current}`);
 *   }
 *
 * }
 * ```
 *
 * Note that `attributeChangedCallback` is not some custom hook of the `WebComponentElement` base class, but a lifecycle
 * hook from the custom element spec itself:
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes
 *
 * Don't forget that HTML `attribute` values are always strings, even if you pass other primitives into them.
 * So to avoid surprises, better read the value from the property getters.
 *
 * ```ts
 *   attributeChangedCallback(name: WebComponentAttribute) {
 *     if (name === 'crash-reporting-enabled') {
 *       if (this.crashReportingEnabled) console.log('Crash reporting was enabled');
 *     }
 *   }
 * ```
 *
 * Don't do
 *
 * ```ts
 *   attributeChangedCallback(name, _, current) {
 *     if (name === 'crash-reporting-enabled') {
 *       if (current) console.log('Crash reporting was enabled');
 *     }
 *   }
 * ```
 * because this will always evaluate to `true`, the value being `"true"` or `"false"` strings.
 */
export abstract class WebComponentElement extends HTMLElement implements WebComponent {

  readonly #wc: WebComponent = this;

  static get observedAttributes(): string[] {
    return webComponentAttributes;
  }

  get userLanguage(): UserLanguage { return this.getAttribute('user-language') as UserLanguage; }
  set userLanguage(value: UserLanguage) { this.setAttribute('user-language', value); }

  get configName(): ConfigName { return this.getAttribute('config-name') as ConfigName; }
  set configName(value: ConfigName) { this.setAttribute('config-name', value); }

  get crashReportingEnabled(): boolean { return this.getAttribute('crash-reporting-enabled') !== 'false'; }
  set crashReportingEnabled(value: boolean) { this.setAttribute('crash-reporting-enabled', String(value)); }

  get offlineDataStorageEnabled(): boolean { return this.getAttribute('offline-data-storage-enabled') !== 'false'; }
  set offlineDataStorageEnabled(value: boolean) { this.setAttribute('offline-data-storage-enabled', String(value)); }

  get authenticationStatus(): AuthenticationStatus { return this.getAttribute('authentication-status') as AuthenticationStatus; }
  set authenticationStatus(value: AuthenticationStatus) { this.setAttribute('authentication-status', value); }

  /** @deprecated since version 5.0.2, use authenticationStatus instead */
  get isOfflineAuthenticated(): boolean { return this.getAttribute('is-offline-authenticated') !== 'false'; }
  /** @deprecated since version 5.0.2, use authenticationStatus instead */
  set isOfflineAuthenticated(value: boolean) { this.setAttribute('is-offline-authenticated', String(value)); }

  constructor(template?: HTMLTemplateElement) {
    super();

    if (template) {
      this.attachShadow({ mode: 'open' });
      const content = template.content.cloneNode(true);
      this.shadowRoot?.appendChild(content);
    }
  }

  connectedCallback() {
    webComponentAttributes.forEach(attr => {
      if (this.getAttribute(attr) === null) throw new WebComponentAttributeInitError(this.tagName, attr);
    });

    this.#wc.addEventListener(refreshEventType, this.#handleRefresh);
  }

  #handleRefresh(event: RefreshEvent) {
    if (event.detail.status === 'request') this.refreshData()
      .then(() => 'success' as const)
      .catch(() => 'fail' as const)
      .then(status => this.dispatchEvent(refreshEvent({ status })));
  }

  protected readonly refreshData = (): Promise<unknown> => Promise.resolve();

  disconnectedCallback() {
    this.#wc.removeEventListener(refreshEventType, this.#handleRefresh);
  }

}
