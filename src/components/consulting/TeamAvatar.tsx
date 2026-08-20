import { useState } from 'react'

/**
 * Фото спикера. Если файла ещё нет в public/ — показываем инициалы,
 * чтобы страница выглядела законченной до загрузки фотографии.
 */
export default function TeamAvatar({
  src,
  initials,
  alt,
}: {
  src?: string
  initials: string
  alt: string
}) {
  const [failed, setFailed] = useState(false)
  const showPhoto = Boolean(src) && !failed

  return (
    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-white/15 bg-gradient-to-b from-white/[0.09] to-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:h-28 sm:w-28">
      {showPhoto ? (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top"
          loading="lazy"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-2xl font-semibold tracking-tight text-white/70">
          {initials}
        </span>
      )}
    </div>
  )
}
