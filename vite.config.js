import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JPG'],
  css: {
    preprocessorOptions: {
      scss: {
        // If you need any global SCSS variables or mixins
        // additionalData: `@import "@scss/variables.scss";`
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/pages/Portfolio/Projects/Benefits'),
      '@scss': path.resolve(
        __dirname,
        './src/pages/Portfolio/Projects/Benefits/scss'
      ),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '@/components': path.resolve(
        __dirname,
        './src/pages/Portfolio/Projects/Benefits/components'
      ),
    },
  },
});
