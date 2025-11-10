// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Importa los paquetes que Vercel necesita para la compilación de estilos
import tailwindcss from 'tailwindcss'; // Usamos el paquete base (el que está en tu node_modules)
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  css: {
    // Definimos la configuración de PostCSS directamente aquí
    postcss: {
      plugins: [
        // La versión de tu Tailwind (v4.1.17) requiere la sintaxis de función
        tailwindcss(), 
        autoprefixer,  
      ],
    },
  },
});