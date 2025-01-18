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
    proxy: {
      '/cal': {
        target: 'https://osd101.ldd.go.th',
        changeOrigin: true,
        secure: false, // ถ้าเป็น HTTPS ที่ไม่มีใบรับรองที่ถูกต้อง
        rewrite: (path) => path.replace(/^\/cal/, '') // กำหนดเส้นทางที่ต้องการ
      }
    }
  },
})
