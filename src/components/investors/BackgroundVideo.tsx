import { useEffect, useRef } from 'react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4'

/**
 * Полноэкранный фоновый MP4 для инвест-дека. Без затемняющего оверлея —
 * видео играет «сырым». Логика надёжного автозапуска повторяет HlsVideo:
 * принудительный muted + старт при первом взаимодействии, если браузер
 * заблокировал автозапуск.
 */
export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true

    const play = () => {
      video.play().catch(() => {})
    }
    play()

    const kickOnInteraction = () => {
      if (video.paused) play()
    }
    const events = ['pointerdown', 'keydown', 'touchstart'] as const
    events.forEach((e) =>
      window.addEventListener(e, kickOnInteraction, { passive: true }),
    )
    return () =>
      events.forEach((e) => window.removeEventListener(e, kickOnInteraction))
  }, [])

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      src={VIDEO_URL}
      autoPlay
      loop
      muted
      playsInline
    />
  )
}
