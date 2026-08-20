// Учёт действий на сайте. Пишет событие в лог Vercel — постоянного
// хранилища нет, для сравнения двух способов начать разговор хватает.
//
// Читать: npx vercel logs <deployment-url> --follow | grep '\[track\]'

const ALLOWED_EVENTS = new Set(['hero_ask', 'hero_how_it_works'])

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false })
    return
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = null
    }
  }

  // Событие принимаем только из известного списка: эндпоинт публичный,
  // и произвольная строка из браузера в логах никому не нужна.
  const event = body && ALLOWED_EVENTS.has(body.event) ? body.event : null
  if (!event) {
    res.status(400).json({ ok: false })
    return
  }

  const lang = typeof body.lang === 'string' ? body.lang.slice(0, 2) : ''
  const path = typeof body.path === 'string' ? body.path.slice(0, 60) : ''
  console.log('[track]', JSON.stringify({ event, lang, path }))

  res.status(204).end()
}
