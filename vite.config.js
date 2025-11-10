// vite.config.js (Debe tener los imports correctos)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss'; // Importa el paquete que Vercel pide
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(), 
        autoprefixer,
      ],
    },
  },
});