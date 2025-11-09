// frontend/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@lib': path.resolve(__dirname, './src/lib'),
    },
  },
  server: {
    host: true, // Escucha en todas las direcciones locales
    // Redirige peticiones que empiecen con /api a la dirección del backend
    proxy: {
      '/api': {
        target: 'http://backend:3000', // Usamos el nombre del servicio de Docker
        changeOrigin: true,
        secure: false, 
      }
    }
  }
});