import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'CLERK_'],
  server: {
    host: '0.0.0.0', // Necessary for Dev Containers
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
    watch: {
      usePolling: true, // Helps Docker detect file changes
    },
  },
})
