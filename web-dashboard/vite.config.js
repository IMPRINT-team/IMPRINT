import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isDevContainer =
  process.env.REMOTE_CONTAINERS === 'true' || process.env.DEVCONTAINER === 'true'
const devApiTarget = process.env.VITE_DEV_API_TARGET ?? (isDevContainer ? 'http://backend:8080' : 'http://localhost:8080')

export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'CLERK_'],
  server: {
    host: '0.0.0.0', // Necessary for Dev Containers
    port: 5173,
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
