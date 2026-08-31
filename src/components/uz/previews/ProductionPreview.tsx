import { RefreshCw, MoreHorizontal, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import AppShell from './AppShell'

/* Превью модуля «Производство» — дашборд обзора производства на узбекском (LTR). */

const STATS: { label: string; value: string; delta: string; up: boolean }[] = [
  { label: 'Jami buyurtmalar', value: '124', delta: '15,3% oʻtgan oyga nisbatan', up: true },
  { label: 'Jarayonda', value: '38', delta: '8,6% oʻtgan oyga nisbatan', up: true },
  { label: 'Yakunlangan', value: '72', delta: '22,1% oʻtgan oyga nisbatan', up: true },
  { label: 'Muddati oʻtgan', value: '6', delta: '14,3% oʻtgan oyga nisbatan', up: false },
  { label: 'Jami ishlab chiqarilgan', value: '845,2 mln soʻm', delta: '17,8% oʻtgan oyga nisbatan', up: true },
  { label: 'Ishlab chiqarish samaradorligi', value: '89,4%', delta: '5,7% oʻtgan oyga nisbatan', up: true },
]

type St = 'work' | 'done' | 'planned' | 'late'
const ST_LABEL: Record<St, string> = {
  work: 'Jarayonda',
  done: 'Yakunlangan',
  planned: 'Rejalashtirilgan',
  late: 'Muddati oʻtgan',
}
const ST_CLASS: Record<St, string> = {
  work: 'bg-sky-50 text-sky-600',
  done: 'bg-emerald-50 text-emerald-600',
  planned: 'bg-slate-100 text-slate-500',
  late: 'bg-rose-50 text-rose-600',
}
const BAR: Record<St, string> = {
  work: 'bg-sky-500',
  done: 'bg-emerald-500',
  planned: 'bg-slate-300',
  late: 'bg-rose-500',
}

const ROWS: {
  id: string
  product: string
  qty: string
  planned: string
  st: St
  progress: number
  center: string
  owner: string
}[] = [
  { id: 'MO-2025-00124', product: 'Erkaklar koʻylagi', qty: '500', planned: '30.07.2025', st: 'work', progress: 65, center: 'Tikuv sexi 1', owner: 'Aziz Karimov' },
  { id: 'MO-2025-00123', product: 'Choyshab toʻplami', qty: '1 000', planned: '28.07.2025', st: 'work', progress: 40, center: 'Tikuv sexi 2', owner: 'Malika Yusupova' },
  { id: 'MO-2025-00122', product: 'Futbolka (paxta)', qty: '800', planned: '25.07.2025', st: 'done', progress: 100, center: 'Trikotaj sexi', owner: 'Jasur Toshmatov' },
  { id: 'MO-2025-00121', product: 'Erkaklar koʻylagi', qty: '300', planned: '24.07.2025', st: 'done', progress: 100, center: 'Tikuv sexi 1', owner: 'Dilnoza Rahimova' },
  { id: 'MO-2025-00120', product: 'Choyshab toʻplami', qty: '500', planned: '26.07.2025', st: 'work', progress: 70, center: 'Tikuv sexi 2', owner: 'Bobur Aliyev' },
  { id: 'MO-2025-00119', product: 'Paxta mato, eni 1,5 m', qty: '2 000', planned: '23.07.2025', st: 'done', progress: 100, center: 'Toʻquv sexi', owner: 'Sherzod Umarov' },
  { id: 'MO-2025-00118', product: 'Ayollar libosi', qty: '700', planned: '31.07.2025', st: 'work', progress: 20, center: 'Tikuv sexi 1', owner: 'Dilnoza Rahimova' },
  { id: 'MO-2025-00117', product: 'Sochiq toʻplami', qty: '600', planned: '05.08.2025', st: 'planned', progress: 0, center: 'Toʻquv sexi', owner: 'Jasur Toshmatov' },
  { id: 'MO-2025-00116', product: 'Trikotaj mato, eni 1,8 m', qty: '1 200', planned: '02.08.2025', st: 'planned', progress: 0, center: 'Trikotaj sexi', owner: 'Aziz Karimov' },
  { id: 'MO-2025-00115', product: 'Erkaklar koʻylagi', qty: '400', planned: '29.07.2025', st: 'late', progress: 10, center: 'Tikuv sexi 1', owner: 'Malika Yusupova' },
]

const STATUS_DIST = [
  { label: 'Jarayonda', value: '38 (30,6%)', color: '#3b82f6' },
  { label: 'Yakunlangan', value: '72 (58,1%)', color: '#10b981' },
  { label: 'Rejalashtirilgan', value: '8 (6,5%)', color: '#cbd5e1' },
  { label: 'Muddati oʻtgan', value: '6 (4,8%)', color: '#ef4444' },
]

const BY_CENTER = [
  { label: 'Tikuv sexi 1', value: '316,1 mln soʻm (37,4%)', color: '#3b82f6' },
  { label: 'Toʻquv sexi', value: '243,4 mln soʻm (28,8%)', color: '#10b981' },
  { label: 'Tikuv sexi 2', value: '149,6 mln soʻm (17,7%)', color: '#f59e0b' },
  { label: 'Trikotaj sexi', value: '71,8 mln soʻm (8,5%)', color: '#a78bfa' },
  { label: 'Boshqalar', value: '64,3 mln soʻm (7,6%)', color: '#cbd5e1' },
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

export default function ProductionPreview() {
  return (
    <AppShell
      active="manufacturing"
      breadcrumb={['Ishlab chiqarish', 'Umumiy koʻrinish']}
      reports={['Ishlab chiqarish buyurtmalari', 'Ishlab chiqarishni rejalashtirish', 'Materiallar', 'Sexlar', 'Texnologik marshrutlar', 'Ishlab chiqarish hisobotlari', 'Analitika']}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">Ishlab chiqarish — umumiy koʻrinish</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] text-slate-600">Amallar</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <RefreshCw size={14} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <MoreHorizontal size={14} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-[13px] font-semibold text-white">
            <Plus size={14} /> Yangi buyurtma
          </span>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-[12px] text-slate-500">{s.label}</div>
            <div className="mt-1 text-lg font-bold text-slate-900">{s.value}</div>
            <div className={`mt-1 text-[11px] ${s.up ? 'text-emerald-600' : 'text-rose-500'}`}>
              {s.up ? '▲' : '▼'} {s.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Sex</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Holat</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Mahsulot</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Sanadan</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Sanagacha</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-600">
          <Filter size={13} /> Filtr
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="mb-1 px-4 pt-4 text-sm font-semibold text-slate-900">Ishlab chiqarish buyurtmalari</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="p-3 font-medium">Buyurtma №</th>
                <th className="p-3 font-medium">Mahsulot</th>
                <th className="p-3 font-medium">Miqdor</th>
                <th className="p-3 font-medium">Reja sanasi</th>
                <th className="p-3 font-medium">Holat</th>
                <th className="p-3 font-medium">Bajarilishi</th>
                <th className="p-3 font-medium">Sex</th>
                <th className="p-3 font-medium">Masʼul</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.id} className="border-b border-slate-50 last:border-0">
                  <td className="p-3 font-medium text-blue-600">{r.id}</td>
                  <td className="p-3 text-slate-700">{r.product}</td>
                  <td className="p-3 text-slate-600">{r.qty}</td>
                  <td className="p-3 text-slate-600">{r.planned}</td>
                  <td className="p-3">
                    <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${ST_CLASS[r.st]}`}>
                      {ST_LABEL[r.st]}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 shrink-0 text-slate-500">{r.progress}%</span>
                      <span className="h-1.5 w-20 rounded-full bg-slate-100">
                        <span
                          className={`block h-1.5 rounded-full ${BAR[r.st]}`}
                          style={{ width: `${r.progress}%` }}
                        />
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-slate-600">{r.center}</td>
                  <td className="p-3 text-slate-600">{r.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-slate-100 p-3">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] text-slate-500">Sahifada 20 ta</span>
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

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Davr boʻyicha ishlab chiqarish</h4>
          <svg viewBox="0 0 300 120" className="h-32 w-full">
            <polyline points="10,80 45,70 80,66 115,58 150,50 185,44 220,38 255,30 290,24" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <polyline points="10,100 45,96 80,92 115,88 150,82 185,78 220,72 255,66 290,60" fill="none" stroke="#10b981" strokeWidth="2" />
          </svg>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Reja</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Fakt</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Buyurtmalar holati</h4>
          <div className="flex items-center gap-4">
            <Donut
              segments={[
                '#3b82f6 0 30.6%',
                '#10b981 30.6% 88.7%',
                '#cbd5e1 88.7% 95.2%',
                '#ef4444 95.2% 100%',
              ]}
            />
            <div className="min-w-0 flex-1"><Legend items={STATUS_DIST} /></div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Sexlar boʻyicha ishlab chiqarish</h4>
          <div className="flex items-center gap-4">
            <Donut
              segments={[
                '#3b82f6 0 37.4%',
                '#10b981 37.4% 66.2%',
                '#f59e0b 66.2% 83.9%',
                '#a78bfa 83.9% 92.4%',
                '#cbd5e1 92.4% 100%',
              ]}
            />
            <div className="min-w-0 flex-1"><Legend items={BY_CENTER} /></div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
