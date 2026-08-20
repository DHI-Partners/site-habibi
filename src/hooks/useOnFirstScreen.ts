import { useEffect, useState } from 'react'

/**
 * Находится ли посетитель ещё на первом экране (герое).
 *
 * Через IntersectionObserver, а не по положению прокрутки: он уже
 * используется в проекте (reveal-анимации, фоны партнёрской страницы),
 * не требует слушателя прокрутки и сам сообщает состояние сразу при
 * подписке — отдельное измерение на монтировании не нужно.
 *
 * @param elementId id секции первого экрана; без него хук всегда false.
 */
export function useOnFirstScreen(elementId: string | undefined): boolean {
  const [onFirst, setOnFirst] = useState(false)

  useEffect(() => {
    if (!elementId) {
      setOnFirst(false)
      return
    }

    const node = document.getElementById(elementId)
    // Нет секции или API — считаем, что скрывать нечего, и кнопка видна.
    if (!node || typeof IntersectionObserver === 'undefined') {
      setOnFirst(false)
      return
    }

    // Первый экран считается покинутым, когда его видно меньше чем наполовину.
    const observer = new IntersectionObserver(
      ([entry]) => setOnFirst(entry.intersectionRatio >= 0.5),
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [elementId])

  return onFirst
}
