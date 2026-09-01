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

### ИИ-чат: нужен `vercel dev`, а не `npm run dev`

`npm run dev` поднимает только Vite, который **не обслуживает `api/*`** — запрос на `/api/chat` вернёт 404, и чат покажет ошибку. Для работы с чатом:

```bash
npx vercel env pull .env.local   # подтянуть ANTHROPIC_API_KEY из Vercel
npm run dev:api                  # Vite + serverless-функции на одном порту
```

## Сборка

```bash
npm run build
npm run preview
```

`npm run build` перед сборкой запускает `check:kb` — сверяет цены в базе знаний ИИ-чата с секцией тарифов и падает при расхождении.

## Структура

- `src/components/` — секции лендинга (Hero, Benefits, Modules, Pricing, Closing, Footer, Navbar)
- `src/components/ui/` — переиспользуемые UI-компоненты (`liquid-glass-button`, `pricing-glass`)
- `src/hooks/` — `useInView` (reveal по скроллу), `useChat` (механика ИИ-чата)
- `src/lib/utils.ts` — `cn` и `scrollToId`
- `src/components/chat/` — нейтральный UI чата; тексты — в трёх `AiChatWidget.tsx` (ru/en/ar)
- `api/chat.js` — serverless-функция чата, `api/_kb.js` — база знаний бота

## ИИ-консультант

Отвечает на вопросы о продукте, модулях, тарифах и внедрении на языке посетителя. Модель — Claude Sonnet 5.

Требуется переменная окружения `ANTHROPIC_API_KEY` (Vercel → Settings → Environment Variables, все три окружения). Без неё эндпоинт отдаёт `500 not_configured`, а чат показывает ошибку.

**База знаний — `api/_kb.js`.** Один документ на русском; модель отвечает на языке вопроса. При изменении тарифов на сайте базу нужно обновлять вместе с ними, иначе бот будет называть устаревшие цены — за этим следит `npm run check:kb`.

Три языковые версии сайта; цены в тарифах — в евро для русской, английской и арабской версий.
