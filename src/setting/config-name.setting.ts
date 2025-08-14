export const ConfigName = {
  DEV: 'dev',
  INT: 'int',
  ACC: 'acc',
  PROD: 'prod',
  DEMO: 'demo'
} as const;

/**
 * @summary
 * Name of the environment configuration the application and the components are being deployed to.
 *
 * @description
 * The objective of this input is to indicate to a web component the kind of environment it's been deployed into,
 * which can imply contacting specific backend servers or having different internal implementations based on the
 * provided config.
 *
 * The possible configuration values are:
 * - `dev`: development environment
 * - `int`: integration environment
 * - `acc`: acceptance environment
 * - `prod`: production environment
 * - `demo`: demo mode (no auth / backend)
 *
 * When injected with the "demo" value it is expected that only static/mock data will be rendered.
 * See the Guideline on demo
 * This input is required, because at the very least the demo mode must be implemented.
 * Otherwise, what you implement in terms environment handling is entirely up to you,
 * but remember that the host application may implement these different environments,
 * so whatever works in prod must also work in lower environments, so that the host application can execute proper
 * integration tests in all envs.
 *
 * The application will always be compiled (and therefore initialise) with one of the environment values
 * (dev, int, acc or prod).
 * At runtime the value can only change to "demo", so the web component must be able to switch to mocked services
 * at any time.
 */
export type ConfigName = typeof ConfigName[keyof typeof ConfigName];
