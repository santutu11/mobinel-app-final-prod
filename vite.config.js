// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Importa los paquetes que Vercel necesita para la compilación de estilos
import tailwindcss from '@tailwindcss/postcss'; // El paquete que Vercel quiere
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  css: {
    // Definimos la configuración de PostCSS directamente aquí
    postcss: {
      plugins: [
        tailwindcss(), // Cargamos Tailwind
        autoprefixer,  // Cargamos Autoprefixer
      ],
    },
  },
});