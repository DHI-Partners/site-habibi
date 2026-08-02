import { useEffect, useRef } from 'react'

const SERENE_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4'

interface SereneBackgroundProps {
  /** Плотность затемняющего оверлея (Tailwind-класс), по умолчанию bg-black/20. */
  overlayClassName?: string
}

/**
 * Полноэкранный фоновый Serene-видео + мягкое затемнение. Логика надёжного
 * автозапуска: принудительный muted + старт при первом взаимодействии.
 */
export default function SereneBackground({
  overlayClassName = 'bg-black/20',
}: SereneBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.defaultMuted = true
    const play = () => video.play().catch(() => {})
    play()
    const kick = () => {
      if (video.paused) play()
    }
    const events = ['pointerdown', 'keydown', 'touchstart'] as const
    events.forEach((e) => window.addEventListener(e, kick, { passive: true }))
    return () => events.forEach((e) => window.removeEventListener(e, kick))
  }, [])

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={SERENE_VIDEO}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </>
  )
}
