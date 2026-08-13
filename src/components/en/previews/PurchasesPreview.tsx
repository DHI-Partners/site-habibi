import { RefreshCw, MoreHorizontal, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import AppShell from './AppShell'

/* Purchases module preview — a "Purchase Orders" dashboard in English (LTR). */

const STATS: { label: string; value: string; delta: string; up: boolean }[] = [
  { label: 'Total purchase orders', value: '156', delta: '18% vs last month', up: true },
  { label: 'Total ordered amount', value: '$245,680.00', delta: '22% vs last month', up: true },
  { label: 'Total received amount', value: '$198,420.00', delta: '16% vs last month', up: true },
  { label: 'Total pending amount', value: '$47,260.00', delta: '5% vs last month', up: false },
  { label: 'Suppliers', value: '87', delta: '8% vs last month', up: true },
]

type St = 'done' | 'partial' | 'submitted' | 'pending' | 'cancelled'
const ST_LABEL: Record<St, string> = {
  done: 'Completed',
  partial: 'Partially received',
  submitted: 'Submitted',
  pending: 'Pending',
  cancelled: 'Cancelled',
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
  { id: 'PO-2025-00078', supplier: 'Al Madina Trading Co.', st: 'done', order: '30 Jul 2025', schedule: '05 Aug 2025', total: '$12,450.00', items: 8, received: 8 },
  { id: 'PO-2025-00077', supplier: 'Global Supplies LLC', st: 'partial', order: '29 Jul 2025', schedule: '04 Aug 2025', total: '$8,750.00', items: 5, received: 3 },
  { id: 'PO-2025-00076', supplier: 'Perfect Solutions', st: 'submitted', order: '29 Jul 2025', schedule: '03 Aug 2025', total: '$5,230.00', items: 4, received: 0 },
  { id: 'PO-2025-00075', supplier: 'TechnoParts Inc.', st: 'done', order: '28 Jul 2025', schedule: '02 Aug 2025', total: '$15,680.00', items: 10, received: 10 },
  { id: 'PO-2025-00074', supplier: 'Eastern Wholesale', st: 'pending', order: '28 Jul 2025', schedule: '01 Aug 2025', total: '$9,900.00', items: 6, received: 0 },
  { id: 'PO-2025-00073', supplier: 'Al Madina Trading Co.', st: 'partial', order: '27 Jul 2025', schedule: '31 Jul 2025', total: '$7,450.00', items: 7, received: 2 },
  { id: 'PO-2025-00072', supplier: 'DC Office Supplies', st: 'submitted', order: '27 Jul 2025', schedule: '30 Jul 2025', total: '$3,210.00', items: 3, received: 0 },
  { id: 'PO-2025-00071', supplier: 'Stellar Industries', st: 'cancelled', order: '26 Jul 2025', schedule: '29 Jul 2025', total: '$4,120.00', items: 5, received: 0 },
  { id: 'PO-2025-00070', supplier: 'Global Supplies LLC', st: 'done', order: '26 Jul 2025', schedule: '28 Jul 2025', total: '$11,670.00', items: 9, received: 9 },
  { id: 'PO-2025-00069', supplier: 'Perfect Solutions', st: 'pending', order: '25 Jul 2025', schedule: '27 Jul 2025', total: '$6,360.00', items: 6, received: 0 },
]

const TOP_SUPPLIERS: { label: string; value: string; color: string }[] = [
  { label: 'Al Madina Trading Co.', value: '$52,450.00 (21.3%)', color: '#3b82f6' },
  { label: 'Global Supplies LLC', value: '$48,230.00 (19.6%)', color: '#10b981' },
  { label: 'TechnoParts Inc.', value: '$35,120.00 (14.3%)', color: '#f59e0b' },
  { label: 'Eastern Wholesale', value: '$28,900.00 (11.7%)', color: '#06b6d4' },
  { label: 'Perfect Solutions', value: '$22,680.00 (9.2%)', color: '#ef4444' },
  { label: 'Other', value: '$58,300.00 (23.7%)', color: '#cbd5e1' },
]

const STATUS_DIST: { label: string; value: string; color: string }[] = [
  { label: 'Completed', value: '56 (35.9%)', color: '#10b981' },
  { label: 'Partially received', value: '32 (20.5%)', color: '#f59e0b' },
  { label: 'Submitted', value: '24 (15.4%)', color: '#3b82f6' },
  { label: 'Pending', value: '26 (16.7%)', color: '#f97316' },
  { label: 'Cancelled', value: '18 (11.5%)', color: '#ef4444' },
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
      breadcrumb={['Purchases', 'Purchase Orders']}
      reports={['Purchase Orders', 'Purchase Receipts', 'Suppliers', 'Items', 'Supplier Quotations', 'Reports']}
    >
      {/* Page header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">Purchase Orders</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] text-slate-600">List</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <RefreshCw size={14} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <MoreHorizontal size={14} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-[13px] font-semibold text-white">
            <Plus size={14} /> New Purchase Order
          </span>
        </div>
      </div>

      {/* Stat cards */}
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

      {/* Filter row */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {['ID', 'Supplier'].map((p) => (
          <span key={p} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">
            {p}
          </span>
        ))}
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Status</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">From date</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">To date</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-600">
          <Filter size={13} /> Filter
        </span>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="p-3 font-medium">ID</th>
                <th className="p-3 font-medium">Supplier</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Order date</th>
                <th className="p-3 font-medium">Scheduled date</th>
                <th className="p-3 font-medium">Total</th>
                <th className="p-3 font-medium">Items</th>
                <th className="p-3 font-medium">Received</th>
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
        {/* Pagination */}
        <div className="flex items-center justify-between gap-3 border-t border-slate-100 p-3">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] text-slate-500">
            20 per page
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

      {/* Charts */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Purchase order trends</h4>
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
              <span className="h-2 w-2 rounded-full bg-blue-500" /> This month
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Last month
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Top suppliers by amount</h4>
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
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Purchase order status</h4>
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
