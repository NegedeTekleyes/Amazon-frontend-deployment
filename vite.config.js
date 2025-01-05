import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    // Remove the `port` field to use the default port (5173)
    historyApiFallback: true, // Ensure SPA fallback works
  },
});
