/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the gotrodb Express API. No trailing slash. */
  readonly VITE_BACKEND_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
