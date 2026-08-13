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
  /** If set — the card opens a full-screen image. */
  preview?: string
  /** Rich (HTML) preview alternative instead of an image. */
  Preview?: ComponentType
  /** If set — “See example” navigates to the module page (takes priority). */
  page?: string
}

const MODULES: Module[] = [
  {
    icon: Target,
    title: 'CRM & sales',
    text: 'All leads, customers and deals in one system. Nothing gets lost, and every step of the customer journey is visible in real time.',
    Preview: CrmPreview,
    page: '/en/modules/crm',
  },
  {
    icon: Package,
    title: 'Purchases',
    text: 'Transparent supplier selection and control over prices and deadlines — without manual reconciliations.',
    Preview: PurchasesPreview,
    page: '/en/modules/purchases',
  },
  {
    icon: Warehouse,
    title: 'Inventory',
    text: 'Accurate stock in real time and a clear history of goods movement.',
    Preview: WarehousePreview,
    page: '/en/modules/inventory',
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    text: 'Clear cost of goods, planning and quality control at every stage.',
    Preview: ProductionPreview,
    page: '/en/modules/manufacturing',
  },
  {
    icon: Wallet,
    title: 'Finance',
    text: 'A live picture of your money: reports, receivables, cash-flow forecast — without waiting for month-end.',
    Preview: FinancePreview,
    page: '/en/modules/finance',
  },
  {
    icon: Users,
    title: 'HR & payroll',
    text: 'Employee records, payroll calculation and clear team KPIs.',
    Preview: HrPreview,
    page: '/en/modules/hr',
  },
  {
    icon: BarChart3,
    title: 'Projects & tasks',
    text: 'Deadlines, owners and statuses — all on one screen.',
    Preview: ProjectsPreview,
    page: '/en/modules/projects',
  },
  {
    icon: Wrench,
    title: 'Service & support',
    text: 'Warranty requests, repeat sales and customer reviews under control.',
    Preview: ServicePreview,
    page: '/en/modules/service',
  },
  {
    icon: ShoppingCart,
    title: 'Retail (POS)',
    text: 'Checkout, inventory and finance work as a single whole.',
    Preview: PosPreview,
    page: '/en/modules/pos',
  },
  {
    icon: Globe,
    title: 'Website & leads',
    text: 'Every request from your website instantly becomes a task in progress.',
    Preview: SiteLeadsPreview,
    page: '/en/modules/website-leads',
  },
]

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260419_065931_e3ca7b53-d32e-4ad5-81de-dc9d6fcfda6d.mp4'

export default function Modules() {
  const navigate = useNavigate()
  const [active, setActive] = useState<Module | null>(null)
  const [imgError, setImgError] = useState(false)

  /** A dedicated module page takes priority over the modal preview. */
  const openPreview = (mod: Module) => {
    if (mod.page) {
      navigate(mod.page)
      return
    }
    setImgError(false)
    setActive(mod)
  }

  // Close the modal on Esc + lock background scroll while open.
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
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Dimming: the bright sky is muted; edges fade to black for a seamless join */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/25 to-black" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/40">
            Modules
          </p>
          <h2 className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            Everything in one place — simple, clear and without extra complexity
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            Growing businesses struggle to keep everything under control when sales, inventory,
            finance and the team live in separate spreadsheets and chats. Habibi brings it all into
            one place.
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
                        See example
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

      {/* Full-screen preview modal */}
      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/85 p-4 backdrop-blur-md [animation:fadeSlideUp_0.25s_ease_both] sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Example of the Habibi interface"
        >
          <button
            type="button"
            aria-label="Close"
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
              <p className="text-base font-medium text-white">Screenshot not added yet</p>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Save the image as{' '}
                <code className="rounded bg-white/10 px-1.5 py-0.5 text-white/80">
                  public/crm-preview.png
                </code>{' '}
                — and it will open here full screen.
              </p>
            </div>
          ) : (
            <img
              src={active.preview}
              alt="Example of the Habibi interface"
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
