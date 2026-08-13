import { RefreshCw, MoreHorizontal, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import AppShell from './AppShell'

/* Manufacturing module preview — a "Production Overview" dashboard in English (LTR). */

const STATS: { label: string; value: string; delta: string; up: boolean }[] = [
  { label: 'Total work orders', value: '124', delta: '15.3% vs last month', up: true },
  { label: 'In progress', value: '38', delta: '8.6% vs last month', up: true },
  { label: 'Completed', value: '72', delta: '22.1% vs last month', up: true },
  { label: 'Overdue', value: '6', delta: '14.3% vs last month', up: false },
  { label: 'Total produced', value: 'SAR 1,458,350', delta: '17.8% vs last month', up: true },
  { label: 'Production efficiency', value: '89.4%', delta: '5.7% vs last month', up: true },
]

type St = 'work' | 'done' | 'planned' | 'late'
const ST_LABEL: Record<St, string> = {
  work: 'In progress',
  done: 'Completed',
  planned: 'Scheduled',
  late: 'Overdue',
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
  { id: 'MO-2025-00124', product: 'X1 Device Chassis', qty: '500', planned: '30 Jul 2025', st: 'work', progress: 65, center: 'Assembly Shop 1', owner: 'Marat Akhmedov' },
  { id: 'MO-2025-00123', product: 'A3 Control Board', qty: '1,000', planned: '28 Jul 2025', st: 'work', progress: 40, center: 'Electronics Shop', owner: 'Svetlana Ivanova' },
  { id: 'MO-2025-00122', product: '500W Power Unit', qty: '800', planned: '25 Jul 2025', st: 'done', progress: 100, center: 'Assembly Shop 2', owner: 'Konstantin Petrov' },
  { id: 'MO-2025-00121', product: 'X1 Device Chassis', qty: '300', planned: '24 Jul 2025', st: 'done', progress: 100, center: 'Assembly Shop 1', owner: 'Maria Yermakova' },
  { id: 'MO-2025-00120', product: 'A3 Control Board', qty: '500', planned: '26 Jul 2025', st: 'work', progress: 70, center: 'Electronics Shop', owner: 'Sergey Nikolaev' },
  { id: 'MO-2025-00119', product: 'Power Cable 1.5 m', qty: '2,000', planned: '23 Jul 2025', st: 'done', progress: 100, center: 'Cable Shop', owner: 'Denis Alimov' },
  { id: 'MO-2025-00118', product: 'WiFi Module', qty: '700', planned: '31 Jul 2025', st: 'work', progress: 20, center: 'Electronics Shop', owner: 'Galina Olkhovskaya' },
  { id: 'MO-2025-00117', product: '7-inch Display', qty: '600', planned: '05 Aug 2025', st: 'planned', progress: 0, center: 'Assembly Shop 2', owner: 'Mohammed Sharipov' },
  { id: 'MO-2025-00116', product: '3000mAh Battery', qty: '1,200', planned: '02 Aug 2025', st: 'planned', progress: 0, center: 'Battery Shop', owner: 'Marat Akhmedov' },
  { id: 'MO-2025-00115', product: 'X1 Device Chassis', qty: '400', planned: '29 Jul 2025', st: 'late', progress: 10, center: 'Assembly Shop 1', owner: 'Svetlana Ivanova' },
]

const STATUS_DIST = [
  { label: 'In progress', value: '38 (30.6%)', color: '#3b82f6' },
  { label: 'Completed', value: '72 (58.1%)', color: '#10b981' },
  { label: 'Scheduled', value: '8 (6.5%)', color: '#cbd5e1' },
  { label: 'Overdue', value: '6 (4.8%)', color: '#ef4444' },
]

const BY_CENTER = [
  { label: 'Assembly Shop 1', value: 'SAR 545,230 (37.4%)', color: '#3b82f6' },
  { label: 'Electronics Shop', value: 'SAR 420,600 (28.8%)', color: '#10b981' },
  { label: 'Assembly Shop 2', value: 'SAR 258,750 (17.7%)', color: '#f59e0b' },
  { label: 'Cable Shop', value: 'SAR 123,600 (8.5%)', color: '#a78bfa' },
  { label: 'Other', value: 'SAR 110,170 (7.6%)', color: '#cbd5e1' },
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
      breadcrumb={['Manufacturing', 'Production Overview']}
      reports={['Work Orders', 'Production Planning', 'Materials', 'Work Centers', 'Routings', 'Production Reports', 'Analytics']}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">Production Overview</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] text-slate-600">Actions</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <RefreshCw size={14} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <MoreHorizontal size={14} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-[13px] font-semibold text-white">
            <Plus size={14} /> New Work Order
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
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Work Center</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Status</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Product</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">From date</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">To date</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-600">
          <Filter size={13} /> Filter
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="mb-1 px-4 pt-4 text-sm font-semibold text-slate-900">Work Orders</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="p-3 font-medium">Order No.</th>
                <th className="p-3 font-medium">Product</th>
                <th className="p-3 font-medium">Quantity</th>
                <th className="p-3 font-medium">Scheduled</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Progress</th>
                <th className="p-3 font-medium">Work Center</th>
                <th className="p-3 font-medium">Owner</th>
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
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] text-slate-500">20 per page</span>
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
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Production over the period</h4>
          <svg viewBox="0 0 300 120" className="h-32 w-full">
            <polyline points="10,80 45,70 80,66 115,58 150,50 185,44 220,38 255,30 290,24" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <polyline points="10,100 45,96 80,92 115,88 150,82 185,78 220,72 255,66 290,60" fill="none" stroke="#10b981" strokeWidth="2" />
          </svg>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Planned</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Completed</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Work order status</h4>
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
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Output by work center</h4>
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
