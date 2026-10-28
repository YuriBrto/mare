import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração do Vite: plugin oficial do React (JSX + Fast Refresh).
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
});
