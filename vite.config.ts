import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    // Гарантируем единственную копию React (иначе framer-motion ловит «Invalid hook call»).
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
  build: {
    rollupOptions: {
      input: {
        // Две точки входа: русская (/) и арабская (/ar) — у каждой свои meta/OG-теги.
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        ar: fileURLToPath(new URL('./ar.html', import.meta.url)),
        en: fileURLToPath(new URL('./en.html', import.meta.url)),
      },
    },
  },
})
