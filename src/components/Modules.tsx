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
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from './Reveal'

interface Module {
  icon: LucideIcon
  title: string
  text: string
}

const MODULES: Module[] = [
  {
    icon: Target,
    title: 'CRM и продажи',
    text: 'Все заявки, клиенты и сделки — в одной системе. Ничего не теряется, каждый шаг клиента виден в реальном времени.',
  },
  {
    icon: Package,
    title: 'Закупки',
    text: 'Прозрачный выбор поставщиков, контроль цен и сроков — без ручных сверок.',
  },
  {
    icon: Warehouse,
    title: 'Склад',
    text: 'Точные остатки в реальном времени и понятная история движения товара.',
  },
  {
    icon: Factory,
    title: 'Производство',
    text: 'Ясная себестоимость, планирование и контроль качества на каждом этапе.',
  },
  {
    icon: Wallet,
    title: 'Финансы',
    text: 'Актуальная картина по деньгам: отчёты, дебиторка, прогноз денежного потока — без ожидания конца месяца.',
  },
  {
    icon: Users,
    title: 'HR и зарплата',
    text: 'Учёт сотрудников, расчёт зарплат и понятные KPI команды.',
  },
  {
    icon: BarChart3,
    title: 'Проекты и задачи',
    text: 'Сроки, ответственные и статусы — всё в одном экране.',
  },
  {
    icon: Wrench,
    title: 'Сервис и поддержка',
    text: 'Гарантийные обращения, повторные продажи и отзывы клиентов под контролем.',
  },
  {
    icon: ShoppingCart,
    title: 'Розница (POS)',
    text: 'Касса, склад и финансы работают как единое целое.',
  },
  {
    icon: Globe,
    title: 'Сайт и заявки',
    text: 'Каждое обращение с сайта сразу становится задачей в работе.',
  },
]

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260419_065931_e3ca7b53-d32e-4ad5-81de-dc9d6fcfda6d.mp4'

export default function Modules() {
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

      {/* Затемнение: яркое небо приглушено; края уходят в чёрный для бесшовного стыка */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/25 to-black" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/40">
            Модули
          </p>
          <h2 className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            Всё в одном месте — просто, наглядно и без лишней сложности
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            Растущему бизнесу сложно держать всё под контролем, когда продажи, склад, финансы и
            команда живут в разных таблицах и чатах. Habibi собирает всё это в одном месте.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((mod, i) => (
            <Reveal key={mod.title} delay={(i % 3) * 0.06}>
              <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-black/50">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-transform group-hover:scale-105">
                  <mod.icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="mb-2 text-lg font-medium text-white">{mod.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{mod.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
