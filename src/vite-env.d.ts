/// <reference types="vite/client" />

// Types for .env values used with import.meta.env
interface ImportMetaEnv {
    readonly VITE_APP_INSIGHTS_CONN_STRING: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
