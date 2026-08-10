import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    // Pinned deliberately: gotrodb's CORS allowlist contains http://localhost:5173.
    // strictPort makes a port collision fail loudly instead of silently drifting
    // to 5174 and producing confusing CORS errors.
    port: 5173,
    strictPort: true,
  },
});
