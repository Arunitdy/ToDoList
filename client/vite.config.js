import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Base URL for production
  server: {
    proxy: {
      // Proxy API requests to your Render backend in development
      '/api': {
        target: 'https://todolist-r6j4.onrender.com' || 'http://localhost:5000', // Adjust the target URL as needed
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist', // Output directory for production build
    emptyOutDir: true, // Clear the dist folder before building
  },
});