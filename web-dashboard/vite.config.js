import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const devApiTarget = process.env.VITE_DEV_API_TARGET ?? 'http://localhost:8080'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Necessary for Dev Containers
    proxy: {
      '/api': {
        target: devApiTarget,
        changeOrigin: true,
      },
    },
    watch: {
      usePolling: true, // Helps Docker detect file changes
    },
  },
})
