import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Target,
  Package,
  Warehouse,
  Factory,
  Wallet,
  Users,
  BarChart3,
  Wrench,
  ShoppingCart,
  Globe,
  Maximize2,
  X,
} from 'lucide-react'
import type { ComponentType } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '../Reveal'
import CrmPreview from './previews/CrmPreview'
import PurchasesPreview from './previews/PurchasesPreview'
import WarehousePreview from './previews/WarehousePreview'
import ProductionPreview from './previews/ProductionPreview'
import FinancePreview from './previews/FinancePreview'
import HrPreview from './previews/HrPreview'
import ProjectsPreview from './previews/ProjectsPreview'
import ServicePreview from './previews/ServicePreview'
import PosPreview from './previews/PosPreview'
import SiteLeadsPreview from './previews/SiteLeadsPreview'

interface Module {
  icon: LucideIcon
  title: string
  text: string
  /** Если задано — карточка открывает полноэкранную картинку. */
  preview?: string
  /** Богатое (HTML) превью вместо картинки. */
  Preview?: ComponentType
  /** Если задано — «Namunani koʻring» ведёт на страницу модуля (приоритетнее модалки). */
  page?: string
}

const MODULES: Module[] = [
  {
    icon: Target,
    title: 'Mijozlar va savdo',
    text: 'Barcha lidlar, mijozlar va bitimlar yagona tizimda. Hech narsa yoʻqolmaydi, mijoz yoʻlining har bir qadami real vaqtda koʻrinadi.',
    Preview: CrmPreview,
    page: '/uz/modules/crm',
  },
  {
    icon: Package,
    title: 'Xaridlar',
    text: 'Yetkazib beruvchini shaffof tanlash, narx va muddatlar nazorati — qoʻlda solishtirishlarsiz.',
    Preview: PurchasesPreview,
    page: '/uz/modules/purchases',
  },
  {
    icon: Warehouse,
    title: 'Mahsulotlar va qoldiqlar',
    text: 'Real vaqtdagi aniq qoldiqlar va tovar harakatining tushunarli tarixi.',
    Preview: WarehousePreview,
    page: '/uz/modules/inventory',
  },
  {
    icon: Factory,
    title: 'Ishlab chiqarish',
    text: 'Aniq tannarx, rejalashtirish va har bosqichda sifat nazorati.',
    Preview: ProductionPreview,
    page: '/uz/modules/manufacturing',
  },
  {
    icon: Wallet,
    title: 'Pul nazorat ostida',
    text: 'Pulingizning jonli manzarasi: hisobotlar, debitor qarzlar, pul oqimi prognozi — oy yakunini kutmasdan.',
    Preview: FinancePreview,
    page: '/uz/modules/finance',
  },
  {
    icon: Users,
    title: 'Mening jamoam',
    text: 'Xodimlar hisobi, oylik hisoblash va jamoaning tushunarli KPI koʻrsatkichlari.',
    Preview: HrPreview,
    page: '/uz/modules/hr',
  },
  {
    icon: BarChart3,
    title: 'Ishlar va vazifalar',
    text: 'Muddatlar, masʼullar va statuslar — hammasi bitta ekranda.',
    Preview: ProjectsPreview,
    page: '/uz/modules/projects',
  },
  {
    icon: Wrench,
    title: 'Sotuvdan keyingi mijozlar',
    text: 'Kafolat soʻrovlari, takroriy savdolar va mijoz sharhlari nazorat ostida.',
    Preview: ServicePreview,
    page: '/uz/modules/service',
  },
  {
    icon: ShoppingCart,
    title: 'Chakana savdo (POS)',
    text: 'Kassa, ombor va moliya yaxlit bir butun sifatida ishlaydi.',
    Preview: PosPreview,
    page: '/uz/modules/pos',
  },
  {
    icon: Globe,
    title: 'Saytdan kelgan mijozlar',
    text: 'Saytdagi har bir soʻrov darhol ishdagi vazifaga aylanadi.',
    Preview: SiteLeadsPreview,
    page: '/uz/modules/website-leads',
  },
]

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260419_065931_e3ca7b53-d32e-4ad5-81de-dc9d6fcfda6d.mp4'

export default function Modules() {
  const navigate = useNavigate()
  const [active, setActive] = useState<Module | null>(null)
  const [imgError, setImgError] = useState(false)

  /** Отдельная страница модуля приоритетнее модалки с превью. */
  const openPreview = (mod: Module) => {
    if (mod.page) {
      navigate(mod.page)
      return
    }
    setImgError(false)
    setActive(mod)
  }

  // Закрытие модалки по Esc + блокировка скролла фона.
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [active])

  return (
    <section
      id="moduli"
      className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-16"
    >
      {/* Фоновое видео */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Затемнение: яркое небо приглушено; края в чёрный для бесшовного стыка */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/25 to-black" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/40">
            Modullar
          </p>
          <h2 className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            Hammasi bir joyda — sodda, tushunarli va ortiqcha murakkabliksiz
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            Savdo, ombor, moliya va jamoa alohida jadvallar va chatlarda yashasa, oʻsayotgan
            biznesga hammasini nazoratda tutish qiyin. Habibi barchasini bir joyga jamlaydi.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((mod, i) => {
            const clickable = Boolean(mod.preview || mod.Preview)
            return (
              <Reveal key={mod.title} delay={(i % 3) * 0.06}>
                <div
                  role={clickable ? 'button' : undefined}
                  tabIndex={clickable ? 0 : undefined}
                  onClick={clickable ? () => openPreview(mod) : undefined}
                  onKeyDown={
                    clickable
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            openPreview(mod)
                          }
                        }
                      : undefined
                  }
                  className={`group flex h-full flex-col rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-black/50 ${
                    clickable
                      ? 'cursor-pointer outline-none ring-white/30 focus-visible:ring-2 hover:border-white/30'
                      : ''
                  }`}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-transform group-hover:scale-105">
                      <mod.icon size={20} strokeWidth={1.75} />
                    </div>
                    {clickable && (
                      <span className="badge-glow inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-black">
                        <Maximize2 size={13} strokeWidth={2.5} />
                        Namunani koʻring
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-white">{mod.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{mod.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>

      {/* Полноэкранная модалка превью */}
      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/85 p-4 backdrop-blur-md [animation:fadeSlideUp_0.25s_ease_both] sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Habibi interfeysi namunasi"
        >
          <button
            type="button"
            aria-label="Yopish"
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition-transform hover:scale-105 active:scale-95 sm:right-6 sm:top-6"
          >
            <X size={20} />
          </button>
          {active.Preview ? (
            <div onClick={(e) => e.stopPropagation()} className="my-auto">
              <active.Preview />
            </div>
          ) : imgError ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-md rounded-xl border border-white/15 bg-white/5 p-8 text-center backdrop-blur"
            >
              <p className="text-base font-medium text-white">Skrinshot hali qoʻshilmagan</p>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Rasmni{' '}
                <code className="rounded bg-white/10 px-1.5 py-0.5 text-white/80">
                  public/crm-preview.png
                </code>{' '}
                sifatida saqlang — u shu yerda toʻliq ekranda ochiladi.
              </p>
            </div>
          ) : (
            <img
              src={active.preview}
              alt="Habibi interfeysi namunasi"
              onClick={(e) => e.stopPropagation()}
              onError={() => setImgError(true)}
              className="max-h-[90vh] max-w-[92vw] rounded-xl border border-white/10 object-contain shadow-2xl"
            />
          )}
        </div>
      )}
    </section>
  )
}
