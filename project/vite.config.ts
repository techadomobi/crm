import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/proxy': {
        target: 'https://apiv2.offersmeta.in',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/proxy/, ''),
      },
    },
  },
});
