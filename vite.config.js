import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'dynamic',
  server: {
    port: 5173,
    host: 'localhost',
    strictPort: true, // Exit if port is already in use
    open: true
  }
})
