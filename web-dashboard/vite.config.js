import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isContainer = process.env.DOCKER_CONTAINER === 'true' || process.env.CONTAINER === 'true'
const defaultTarget = isContainer ? 'http://backend:8080' : 'http://localhost:8080'
const devApiTarget = process.env.VITE_DEV_API_TARGET ?? defaultTarget

export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'CLERK_'],
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
