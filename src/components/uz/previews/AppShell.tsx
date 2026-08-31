import {
  Home,
  Users,
  TrendingUp,
  ShoppingCart,
  Warehouse,
  Factory,
  Wallet,
  UsersRound,
  FolderKanban,
  Wrench,
  Globe,
  Box,
  Store,
  Search,
  Bell,
  Menu,
  ChevronRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* Каркас приложения Habibi (сайдбар + верхняя панель), узбекская латиница, LTR.
   Общая рамка для превью модулей (Закупки, Склад, Финансы…). */

export type NavKey =
  | 'home'
  | 'crm'
  | 'sales'
  | 'purchases'
  | 'stock'
  | 'manufacturing'
  | 'finance'
  | 'hr'
  | 'projects'
  | 'service'
  | 'website'
  | 'pos'
  | 'assets'

const NAV: { key: NavKey; label: string; icon: LucideIcon }[] = [
  { key: 'home', label: 'Bosh sahifa', icon: Home },
  { key: 'crm', label: 'CRM', icon: Users },
  { key: 'sales', label: 'Savdo', icon: TrendingUp },
  { key: 'purchases', label: 'Xaridlar', icon: ShoppingCart },
  { key: 'stock', label: 'Ombor', icon: Warehouse },
  { key: 'manufacturing', label: 'Ishlab chiqarish', icon: Factory },
  { key: 'finance', label: 'Moliya', icon: Wallet },
  { key: 'hr', label: 'HR va oylik', icon: UsersRound },
  { key: 'projects', label: 'Loyihalar', icon: FolderKanban },
  { key: 'service', label: 'Servis va yordam', icon: Wrench },
  { key: 'website', label: 'Sayt va ilovalar', icon: Globe },
  { key: 'pos', label: 'Chakana savdo (POS)', icon: Store },
  { key: 'assets', label: 'Aktivlar', icon: Box },
]

export default function AppShell({
  active,
  breadcrumb,
  reports,
  children,
}: {
  active: NavKey
  breadcrumb: string[]
  reports?: string[]
  children: React.ReactNode
}) {
  return (
    <div
      dir="ltr"
      className="flex w-[1280px] max-w-full overflow-hidden rounded-xl bg-white font-geist text-slate-800 shadow-2xl"
    >
      {/* Сайдбар */}
      <aside className="hidden w-56 shrink-0 flex-col border-r border-slate-200 bg-white p-3 lg:flex">
        <div className="px-2 py-2 text-2xl font-bold text-slate-900">Habibi</div>
        <nav className="mt-2 space-y-0.5">
          {NAV.map((n) => {
            const on = n.key === active
            return (
              <div
                key={n.key}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] ${
                  on
                    ? 'bg-blue-50 font-semibold text-blue-600'
                    : 'text-slate-600'
                }`}
              >
                <n.icon size={16} strokeWidth={1.9} />
                <span>{n.label}</span>
              </div>
            )
          })}
        </nav>
        {reports && reports.length > 0 && (
          <div className="mt-4 border-t border-slate-100 pt-3">
            <div className="px-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Hisobotlar
            </div>
            {reports.map((r) => (
              <div key={r} className="px-2.5 py-1.5 text-[13px] text-slate-500">
                {r}
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Основная область */}
      <div className="flex min-w-0 flex-1 flex-col bg-slate-50">
        {/* Верхняя панель */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-3">
          <div className="flex items-center gap-3">
            <Menu size={18} className="text-slate-400" />
            <div className="flex items-center gap-1.5 text-[13px] text-slate-400">
              {breadcrumb.map((b, i) => (
                <span key={b} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight size={13} />}
                  <span className={i === breadcrumb.length - 1 ? 'text-slate-700' : ''}>{b}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[13px] text-slate-400 md:flex">
              <Search size={14} />
              <span>Qidiruv yoki buyruq kiriting (Ctrl + G)</span>
            </div>
            <Bell size={16} className="text-slate-400" />
            <span className="hidden text-[13px] text-slate-500 sm:inline">Yordam</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700">
              A
            </span>
          </div>
        </div>

        {/* Контент */}
        <div className="max-h-[82vh] overflow-auto p-5">{children}</div>
      </div>
    </div>
  )
}
