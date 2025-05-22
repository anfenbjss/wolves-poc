import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import { qrcode } from 'vite-plugin-qrcode';
import { defineConfig } from 'vitest/config';

import manifest from './manifest.json';

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: { '@': path.resolve(__dirname, './src') },
    },
    server: {
        port: 5173,
        host: !process.env.TF_BUILD, // Allows external access (e.g. from mobile) to vite dev server
    },
    plugins: [
        react(),
        process.env.TF_BUILD ? undefined : basicSsl(),
        qrcode(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest,
            includeAssets: ['robots.txt', 'icon-512x512.png'],
            workbox: {
                globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
            },
        }),
    ],
    test: {
        environment: 'jsdom',
        include: ['**/*.test.tsx', '**/*.spec.ts'],
        globals: true,
    },
});
