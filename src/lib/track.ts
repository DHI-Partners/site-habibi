/**
 * Простой учёт действий на сайте.
 *
 * Сторонней аналитики в проекте нет, поэтому события уходят в свою
 * функцию и попадают в логи Vercel: `npx vercel logs <url> --follow`,
 * грепать `[track]`. Этого достаточно, чтобы сравнить два способа
 * начать разговор; для постоянной аналитики нужен отдельный инструмент.
 */
export type TrackEvent = 'hero_ask' | 'hero_how_it_works'

export function track(event: TrackEvent, props: Record<string, string> = {}) {
  try {
    const body = JSON.stringify({ event, ...props, path: location.pathname })
    // sendBeacon не задерживает переход по ссылке и переживает уход со страницы.
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', new Blob([body], { type: 'application/json' }))
      return
    }
    void fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    })
  } catch {
    // Учёт не должен ломать интерфейс.
  }
}
