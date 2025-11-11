import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path' // Import Node.js path module

export default defineConfig({
  plugins: [react()],
  base: '/', // Vercel handles routing at root
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    port: 8080,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})