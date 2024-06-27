
import react from '@vitejs/plugin-react-swc'
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    https: false, // Ensure HTTPS is disabled
  },
  plugins: [react()],
});
