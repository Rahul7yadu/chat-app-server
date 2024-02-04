import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000/api', // replace with your API server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      
      // Add more proxy configurations if needed
    },
  },
})
