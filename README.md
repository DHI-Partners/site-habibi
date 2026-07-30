# Habibi — цифровая экосистема для бизнеса

Маркетинговый лендинг Habibi: тёмный кинематографичный стиль, видеофоны в секциях, ступенчатые анимации и «жидкое стекло» на кнопках и тарифах.

## Стек

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v3** (тёмная тема, shadcn-совместимые токены)
- **framer-motion** — анимации блока тарифов
- **lucide-react** — иконки
- **hls.js** — HLS-видео на фоне блока тарифов

## Разработка

```bash
npm install
npm run dev
```

Открыть http://localhost:5173

## Сборка

```bash
npm run build
npm run preview
```

## Структура

- `src/components/` — секции лендинга (Hero, Benefits, Modules, Pricing, Closing, Footer, Navbar)
- `src/components/ui/` — переиспользуемые UI-компоненты (`liquid-glass-button`, `pricing-glass`)
- `src/hooks/` — `useInView` (reveal по скроллу)
- `src/lib/utils.ts` — `cn` и `scrollToId`

Весь контент — на русском, цены в тарифах — в долларах.
