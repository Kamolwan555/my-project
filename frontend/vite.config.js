import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    outDir: 'dist',
  },

  
  server: {
    // Listen on all addresses so Docker container is accessible externally
    host: true, 
    port: 5173,
    strictPort: true,
    cors: true,

    watch: {
      usePolling: true,
    },
  },
})
