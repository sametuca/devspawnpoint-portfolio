import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/DevSpawnPoint-Porfolio/',
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Proxy font resolver requests to bypass CORS
      '/font-proxy': {
        target: 'https://cdn.jsdelivr.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/font-proxy/, ''),
      },
    },
  },
})
