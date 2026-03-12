import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const devApiTarget = 'http://backend:8080'

export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'CLERK_'],
  server: {
    host: '0.0.0.0', // Necessary for Dev Containers
    proxy: {
      '/api': {
        target: devApiTarget,
        changeOrigin: true,
        // Keep '/api' prefix when proxying: /api/foo -> http://backend:8080/api/foo
        rewrite: (path) => path,
      },
      '/health': {
        target: devApiTarget,
        changeOrigin: true,
        // Keep '/health' prefix when proxying: /health -> http://backend:8080/health
        rewrite: (path) => path,
      },
    },
    watch: {
      usePolling: true, // Helps Docker detect file changes
    },
  },
})
