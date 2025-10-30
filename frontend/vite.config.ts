// frontend/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Redirige peticiones que empiecen con /api a la dirección del backend
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Asegúrate de que coincida con el puerto de tu backend
        changeOrigin: true,
        secure: false, 
      }
    }
  }
});