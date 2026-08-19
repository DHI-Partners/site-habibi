import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Порт из окружения (preview-запуск может назначить свой), иначе 5173.
    port: Number(process.env.PORT) || 5173,
    // Serverless-функции локально обслуживает `npm run dev:api` (vercel dev):
    // запусти его рядом — и /api/* с vite-сервера попадёт туда.
    proxy: {
      '/api': `http://localhost:${process.env.API_PORT || 5181}`,
    },
  },
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
        // Отдельные точки входа — у каждой свои meta/OG-теги.
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        ar: fileURLToPath(new URL('./ar.html', import.meta.url)),
        en: fileURLToPath(new URL('./en.html', import.meta.url)),
        partner: fileURLToPath(new URL('./partner.html', import.meta.url)),
        partnerEn: fileURLToPath(new URL('./partner-en.html', import.meta.url)),
      },
    },
  },
})
