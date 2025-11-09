// Vite configuration for the frontend
// Vite is the build tool that runs our React app during development

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()], // Enable React plugin
  root: '.', // Frontend files are in current directory
  build: {
    outDir: 'dist', // Output directory for production build
    sourcemap: false, // Disable source maps in production (set to true for debugging)
    minify: 'esbuild', // Minify code for production
    emptyOutDir: true, // Clear output directory before building
  },
  server: {
    port: 5173, // Frontend runs on port 5173
    host: 'localhost', // Only accessible from localhost
    strictPort: true, // Don't try another port if 5173 is taken (prevents confusion)
    open: true // Automatically open browser when dev server starts
  },
  preview: {
    port: 4173, // Port for preview mode (testing production build)
    host: 'localhost',
  }
})
