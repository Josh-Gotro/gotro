import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JPG'],
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
