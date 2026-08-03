import {
  Calendar,
  ClipboardList,
  Boxes,
  HeartHandshake,
  LineChart,
  CalendarCheck,
  CreditCard,
  FlaskConical,
  type LucideIcon,
} from 'lucide-react'

interface Module {
  label: string
  icon: LucideIcon
  gradient: string
}

// Честный контент вместо чужих брендов: модули платформы Habibi Medical.
const MODULES: Module[] = [
  { label: 'Расписание', icon: Calendar, gradient: 'from-sky-400 to-blue-600' },
  { label: 'Медкарты', icon: ClipboardList, gradient: 'from-violet-400 to-purple-600' },
  { label: 'Склад', icon: Boxes, gradient: 'from-amber-400 to-orange-500' },
  { label: 'Медицинская CRM', icon: HeartHandshake, gradient: 'from-rose-400 to-pink-600' },
  { label: 'Аналитика', icon: LineChart, gradient: 'from-emerald-400 to-teal-600' },
  { label: 'Онлайн-запись', icon: CalendarCheck, gradient: 'from-cyan-400 to-sky-600' },
  { label: 'Касса', icon: CreditCard, gradient: 'from-indigo-400 to-blue-600' },
  { label: 'Лаборатория', icon: FlaskConical, gradient: 'from-lime-400 to-green-600' },
]

function ModuleCard({ label, icon: Icon, gradient }: Module) {
  return (
    <div className="mr-4 shrink-0">
      <div className="group relative flex h-24 w-40 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200/60 bg-white shadow-sm transition-all hover:border-slate-300">
        {/* Градиент, проявляющийся на hover (по спецификации). */}
        <div
          className={`absolute inset-0 scale-150 bg-gradient-to-br opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 ${gradient}`}
        />
        <div className="relative z-10 flex flex-col items-center gap-1.5">
          <Icon className="h-6 w-6 text-slate-500 transition-colors group-hover:text-white" />
          <span className="text-xs font-semibold text-slate-600 transition-colors group-hover:text-white">
            {label}
          </span>
        </div>
      </div>
    </div>
  )
}

/**
 * Бесшовный лого-скроллер (marquee) на чистом CSS-@keyframes (pause on hover),
 * с масками по краям. Список рендерится дважды для бесшовного цикла.
 */
export default function Marquee() {
  const items = [...MODULES, ...MODULES]
  return (
    <div
      className="marquee-wrap relative mt-10 w-full overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div className="marquee-track flex w-max">
        {items.map((m, i) => (
          <ModuleCard key={i} {...m} />
        ))}
      </div>
    </div>
  )
}
