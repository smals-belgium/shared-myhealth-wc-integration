import type { WebComponentAttribute } from './web-component.types';


/**
 * Generic error to be thrown when the component was not initialised properly.
 */
export class WebComponentInitError extends Error {

  constructor(comp: string, msg: string) {
    super(`Failed to initialise web component <${comp.toLowerCase()}>. ${msg}.`)
  }

}

/**
 * Error to be thrown when the component was not initialised properly because of a missing attribute value.
 */
export class WebComponentAttributeInitError extends WebComponentInitError {

  constructor(comp: string, attr: WebComponentAttribute) {
    super(comp, `Missing attribute "${attr}".`)
  }

}
