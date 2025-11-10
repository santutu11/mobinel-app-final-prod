// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Importa el PostCSS plugin de la forma que Tailwind espera (es el paquete `@tailwindcss/postcss`)
import tailwindcss from '@tailwindcss/postcss'; // <--- CORRECCIÓN CLAVE
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  css: {
    // Definimos la configuración de PostCSS directamente aquí
    postcss: {
      plugins: [
        tailwindcss(), // Usa la función del paquete PostCSS
        autoprefixer,
      ],
    },
  },
});