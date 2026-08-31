import { RefreshCw, MoreHorizontal, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import AppShell from './AppShell'

/* Превью модуля «Закупки» — дашборд «Xarid buyurtmalari» на узбекском (латиница, LTR). */

const STATS: { label: string; value: string; delta: string; up: boolean }[] = [
  { label: 'Jami xarid buyurtmalari', value: '156', delta: 'oʻtgan oyga nisbatan 18%', up: true },
  { label: 'Buyurtma qilingan jami summa', value: '2,46 mlrd soʻm', delta: 'oʻtgan oyga nisbatan 22%', up: true },
  { label: 'Qabul qilingan jami summa', value: '1,98 mlrd soʻm', delta: 'oʻtgan oyga nisbatan 16%', up: true },
  { label: 'Kutilayotgan jami summa', value: '472,6 mln soʻm', delta: 'oʻtgan oyga nisbatan 5%', up: false },
  { label: 'Yetkazib beruvchilar', value: '87', delta: 'oʻtgan oyga nisbatan 8%', up: true },
]

type St = 'done' | 'partial' | 'submitted' | 'pending' | 'cancelled'
const ST_LABEL: Record<St, string> = {
  done: 'Yakunlangan',
  partial: 'Qisman qabul qilingan',
  submitted: 'Oʻtkazilgan',
  pending: 'Kutilmoqda',
  cancelled: 'Bekor qilingan',
}
const ST_CLASS: Record<St, string> = {
  done: 'bg-emerald-50 text-emerald-600',
  partial: 'bg-amber-50 text-amber-600',
  submitted: 'bg-sky-50 text-sky-600',
  pending: 'bg-orange-50 text-orange-600',
  cancelled: 'bg-rose-50 text-rose-600',
}

const ROWS: {
  id: string
  supplier: string
  st: St
  order: string
  schedule: string
  total: string
  items: number
  received: number
}[] = [
  { id: 'PO-2025-00078', supplier: 'Toshkent Textile MChJ', st: 'done', order: '30.07.2025', schedule: '05.08.2025', total: '45 600 000 soʻm', items: 8, received: 8 },
  { id: 'PO-2025-00077', supplier: 'Samarqand Trade', st: 'partial', order: '29.07.2025', schedule: '04.08.2025', total: '28 400 000 soʻm', items: 5, received: 3 },
  { id: 'PO-2025-00076', supplier: 'Buxoro Foods', st: 'submitted', order: '29.07.2025', schedule: '03.08.2025', total: '16 800 000 soʻm', items: 4, received: 0 },
  { id: 'PO-2025-00075', supplier: 'Chirchiq Metall', st: 'done', order: '28.07.2025', schedule: '02.08.2025', total: '72 300 000 soʻm', items: 10, received: 10 },
  { id: 'PO-2025-00074', supplier: 'Olma Market', st: 'pending', order: '28.07.2025', schedule: '01.08.2025', total: '34 500 000 soʻm', items: 6, received: 0 },
  { id: 'PO-2025-00073', supplier: 'Toshkent Textile MChJ', st: 'partial', order: '27.07.2025', schedule: '31.07.2025', total: '25 700 000 soʻm', items: 7, received: 2 },
  { id: 'PO-2025-00072', supplier: 'Buxoro Foods', st: 'submitted', order: '27.07.2025', schedule: '30.07.2025', total: '12 900 000 soʻm', items: 3, received: 0 },
  { id: 'PO-2025-00071', supplier: 'Chirchiq Metall', st: 'cancelled', order: '26.07.2025', schedule: '29.07.2025', total: '18 200 000 soʻm', items: 5, received: 0 },
  { id: 'PO-2025-00070', supplier: 'Samarqand Trade', st: 'done', order: '26.07.2025', schedule: '28.07.2025', total: '56 400 000 soʻm', items: 9, received: 9 },
  { id: 'PO-2025-00069', supplier: 'Olma Market', st: 'pending', order: '25.07.2025', schedule: '27.07.2025', total: '21 350 000 soʻm', items: 6, received: 0 },
]

const TOP_SUPPLIERS: { label: string; value: string; color: string }[] = [
  { label: 'Toshkent Textile MChJ', value: '524,5 mln soʻm (21,3%)', color: '#3b82f6' },
  { label: 'Samarqand Trade', value: '482,3 mln soʻm (19,6%)', color: '#10b981' },
  { label: 'Chirchiq Metall', value: '351,2 mln soʻm (14,3%)', color: '#f59e0b' },
  { label: 'Olma Market', value: '289 mln soʻm (11,7%)', color: '#06b6d4' },
  { label: 'Buxoro Foods', value: '226,8 mln soʻm (9,2%)', color: '#ef4444' },
  { label: 'Boshqalar', value: '583 mln soʻm (23,7%)', color: '#cbd5e1' },
]

const STATUS_DIST: { label: string; value: string; color: string }[] = [
  { label: 'Yakunlangan', value: '56 (35,9%)', color: '#10b981' },
  { label: 'Qisman qabul qilingan', value: '32 (20,5%)', color: '#f59e0b' },
  { label: 'Oʻtkazilgan', value: '24 (15,4%)', color: '#3b82f6' },
  { label: 'Kutilmoqda', value: '26 (16,7%)', color: '#f97316' },
  { label: 'Bekor qilingan', value: '18 (11,5%)', color: '#ef4444' },
]

function Donut({ segments }: { segments: string[] }) {
  return (
    <div
      className="h-32 w-32 shrink-0 rounded-full"
      style={{
        background: `conic-gradient(${segments.join(',')})`,
        WebkitMask: 'radial-gradient(circle 34px at center, transparent 98%, #000 100%)',
        mask: 'radial-gradient(circle 34px at center, transparent 98%, #000 100%)',
      }}
    />
  )
}

function Legend({ items }: { items: { label: string; value: string; color: string }[] }) {
  return (
    <div className="space-y-1.5">
      {items.map((it) => (
        <div key={it.label} className="flex items-center justify-between gap-4 text-[12px]">
          <span className="flex items-center gap-2 text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: it.color }} />
            {it.label}
          </span>
          <span className="text-slate-400">{it.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function PurchasesPreview() {
  return (
    <AppShell
      active="purchases"
      breadcrumb={['Xaridlar', 'Xarid buyurtmalari']}
      reports={['Xarid buyurtmalari', 'Kirimlar', 'Yetkazib beruvchilar', 'Mahsulotlar', 'Narx takliflari', 'Hisobotlar']}
    >
      {/* Шапка страницы */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">Xarid buyurtmalari</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] text-slate-600">Roʻyxat</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <RefreshCw size={14} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <MoreHorizontal size={14} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-[13px] font-semibold text-white">
            <Plus size={14} /> Yangi xarid buyurtmasi
          </span>
        </div>
      </div>

      {/* Карточки метрик */}
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-[12px] text-slate-500">{s.label}</div>
            <div className="mt-1 text-xl font-bold text-slate-900">{s.value}</div>
            <div className={`mt-1 text-[11px] ${s.up ? 'text-emerald-600' : 'text-rose-500'}`}>
              {s.up ? '▲' : '▼'} {s.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Строка фильтров */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {['ID', 'Yetkazib beruvchi'].map((p) => (
          <span key={p} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">
            {p}
          </span>
        ))}
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Status</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Sanadan</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Sanagacha</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-600">
          <Filter size={13} /> Filtr
        </span>
      </div>

      {/* Таблица */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="p-3 font-medium">ID</th>
                <th className="p-3 font-medium">Yetkazib beruvchi</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Buyurtma sanasi</th>
                <th className="p-3 font-medium">Rejadagi sana</th>
                <th className="p-3 font-medium">Jami</th>
                <th className="p-3 font-medium">Mahsulotlar</th>
                <th className="p-3 font-medium">Qabul qilingan</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.id} className="border-b border-slate-50 last:border-0">
                  <td className="p-3 font-medium text-blue-600">{r.id}</td>
                  <td className="p-3 text-slate-700">{r.supplier}</td>
                  <td className="p-3">
                    <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${ST_CLASS[r.st]}`}>
                      {ST_LABEL[r.st]}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">{r.order}</td>
                  <td className="p-3 text-slate-600">{r.schedule}</td>
                  <td className="p-3 font-medium text-slate-800">{r.total}</td>
                  <td className="p-3 text-slate-600">{r.items}</td>
                  <td className="p-3 text-slate-600">{r.received}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Пагинация */}
        <div className="flex items-center justify-between gap-3 border-t border-slate-100 p-3">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] text-slate-500">
            Sahifada 20 ta
          </span>
          <div className="flex items-center gap-1 text-[12px]">
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400">
              <ChevronLeft size={14} />
            </span>
            {['1', '2', '3', '4', '5'].map((n) => (
              <span
                key={n}
                className={`flex h-7 w-7 items-center justify-center rounded-md ${
                  n === '1' ? 'bg-blue-600 text-white' : 'border border-slate-200 text-slate-500'
                }`}
              >
                {n}
              </span>
            ))}
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400">
              <ChevronRight size={14} />
            </span>
          </div>
        </div>
      </div>

      {/* Графики */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Xarid buyurtmalari dinamikasi</h4>
          <svg viewBox="0 0 300 120" className="h-32 w-full">
            <polyline
              points="10,95 45,80 80,82 115,60 150,55 185,40 220,45 255,28 290,25"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <polyline
              points="10,100 45,95 80,88 115,90 150,78 185,80 220,70 255,72 290,60"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            />
          </svg>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500" /> Joriy oy
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Oʻtgan oy
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Eng yirik yetkazib beruvchilar</h4>
          <div className="flex items-center gap-4">
            <Donut
              segments={[
                '#3b82f6 0 21.3%',
                '#10b981 21.3% 40.9%',
                '#f59e0b 40.9% 55.2%',
                '#06b6d4 55.2% 66.9%',
                '#ef4444 66.9% 76.1%',
                '#cbd5e1 76.1% 100%',
              ]}
            />
            <div className="min-w-0 flex-1">
              <Legend items={TOP_SUPPLIERS} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Xarid buyurtmalari statusi</h4>
          <div className="flex items-center gap-4">
            <Donut
              segments={[
                '#10b981 0 35.9%',
                '#f59e0b 35.9% 56.4%',
                '#3b82f6 56.4% 71.8%',
                '#f97316 71.8% 88.5%',
                '#ef4444 88.5% 100%',
              ]}
            />
            <div className="min-w-0 flex-1">
              <Legend items={STATUS_DIST} />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
