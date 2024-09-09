/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STORAGE: 'local' | 'server'
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
