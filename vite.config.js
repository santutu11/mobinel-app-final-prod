// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Asegúrate de que las rutas a los archivos de configuración sean correctas
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss, // Carga Tailwind CSS
        autoprefixer // Carga Autoprefixer
      ],
    },
  },
});