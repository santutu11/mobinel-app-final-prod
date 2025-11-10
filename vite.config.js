// vite.config.js (Versión Segura)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Eliminamos toda la configuración de CSS/PostCSS que causaba problemas.
  // La aplicación cargará estilos básicos sin Tailwind, pero al menos mostrará el HTML.
});