import type { HostSettings } from '../setting/host-settings';


/**
 * In its simplest form, a signal is just a function.
 * This allows us to create types for any framework that use signals.
 */
type Signal<T> = () => T;

/**
 * A web component that is based on signal inputs has the same properties as a native web component,
 * but the type of the properties is converted to a signal of the original type.
 * e.g. `prop: string` becomes `prop: Signal<string>`
 */
export type WebComponentWithSignals = {
  [K in keyof HostSettings]: Signal<HostSettings[K]>
};
