//
// Definition of the various input & output types used by web components
// See the "MyHealth Web Component Development & Integration Guide" for detailed information about the types defined here.
//
// The const below holds the version of the specification and has the form: <major>.<minor>
// Minor changes are expected to be backward compatible, so one working with v2.1 can be injected any v2.x where x>=0
// Major changes are expected to be broken changes and this not backward compatible.
import { version } from './version'
export const componentSpecVersion = version

export enum Language {
  EN = "en",
  FR = "fr",
  NL = "nl",
  DE = "de"
}

export enum Configuration {
  DEV  = "dev",
  DEMO = "demo",
  INT  = "int",
  ACC  = "acc",
  PROD = "prod"
}

// Return null when an new authentication flow has been started. Caller should abort whatever it's currently doing
export type GetAccessToken = (audience:string) => Promise<string|null>

export type ComponentCacheDataStorage = {
  get:    (key:string) => any
  set:    (key:string, value:any) => void
  remove: (key:string) => void
}

export type ComponentOfflineDataStorage = {
  get:    (key:string) => Promise<any>
  set:    (key:string, value:any) => Promise<void>
  remove: (key:string) => Promise<void>
}

export type RefreshCallback = (done:()=>void) => void
export type RegisterRefreshCallback = (callback:RefreshCallback) => void

export type ComponentServices = {
  cacheDataStorage:        ComponentCacheDataStorage,
  offlineDataStorage?:     ComponentOfflineDataStorage,
  getAccessToken:          GetAccessToken,
  registerRefreshCallback: RegisterRefreshCallback
}

export enum PrintableMimeType {
  HTML = 'text/html',
  PLAIN = 'text/plain',
  PDF = 'application/pdf',
  BASE64 = 'application/base64',
}

export enum PrintableOrientation {
  LANDSCAPE = 'landscape',
  PORTRAIT = 'portrait',
}

export type Printable = {
  title: string;
  content: string;
  mimeType: PrintableMimeType;
  orientation?: PrintableOrientation;
};

