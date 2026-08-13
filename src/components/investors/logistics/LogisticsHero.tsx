import { motion } from 'framer-motion'
import { FileSpreadsheet } from 'lucide-react'

interface LogisticsHeroProps {
  onRequest: () => void
}

/**
 * Hero логистического дека: реальное фото фуры на трассе на закате (роялти-фри,
 * Pexels) фоном + мягкий разгон/зум, поверх — текст, оффер и кнопки.
 */
export default function LogisticsHero({ onRequest }: LogisticsHeroProps) {
  return (
    <section className="relative h-[640px] w-full overflow-hidden md:h-[720px]">
      {/* Фото-фон с медленным зумом */}
      <img
        src="/logistics-hero.jpg"
        alt="Грузовая фура на трассе на закате"
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ animation: 'logiZoom 22s ease-in-out infinite alternate' }}
      />
      {/* Тёплый тон под закат */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#7c2d12]/25 via-transparent to-[#0E3A44]/15 mix-blend-multiply" />
      {/* Скрим слева для читаемости текста */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b2b33]/85 via-[#0b2b33]/45 to-transparent" />
      {/* Плавный переход низа фото в кремовый фон следующей секции */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-b from-transparent via-[#FBF7F0]/40 to-[#FBF7F0]" />

      {/* Контент */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="inline-block rounded-full bg-[#FFC61A] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#0E3A44]">
            Habibi Logistics
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[0.98] tracking-tight text-white md:text-6xl">
            За пределами
            <br />
            <span className="text-[#FFC61A]">границ и ограничений</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm font-medium text-white/85 md:text-base">
            B2B SaaS-экосистема цифровизации грузоперевозок и автопарков в СНГ. TMS, GPS-телематика,
            учёт топлива и P&amp;L-аналитика — в единой облачной платформе.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
            Pre-Seed раунд · <span className="text-[#FFC61A]">$200,000</span> за 10% доли
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onRequest}
              className="inline-flex items-center gap-2 rounded-full bg-[#FFC61A] px-7 py-3.5 text-sm font-semibold text-[#0E3A44] shadow-lg transition-transform hover:scale-[1.03]"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Скачать фин модель
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
