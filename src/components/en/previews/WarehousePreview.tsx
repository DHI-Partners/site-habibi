import { RefreshCw, MoreHorizontal, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import AppShell from './AppShell'

/* Inventory module preview — a "Stock Overview" dashboard in English (LTR). */

const STATS: { label: string; value: string; delta: string; up: boolean; sub?: string }[] = [
  { label: 'Total inventory value', value: 'SAR 2,458,750', delta: '12.5% vs last month', up: true },
  { label: 'Total items', value: '1,245', delta: '8.3% vs last month', up: true },
  { label: 'Low-stock items', value: '28', delta: '16.7% vs last month', up: true },
  { label: 'Non-moving items', value: '34', delta: '9.1% vs last month', up: true },
  { label: 'Warehouses', value: '7', delta: 'Active warehouses', up: true, sub: 'plain' },
]

type St = 'in' | 'low' | 'out'
const ST_LABEL: Record<St, string> = { in: 'In stock', low: 'Low stock', out: 'Out of stock' }
const ST_CLASS: Record<St, string> = {
  in: 'bg-emerald-50 text-emerald-600',
  low: 'bg-amber-50 text-amber-600',
  out: 'bg-rose-50 text-rose-600',
}

const ROWS: {
  name: string
  code: string
  wh: string
  group: string
  qty: number
  unit: string
  cost: string
  st: St
}[] = [
  { name: 'Samsung Galaxy S23 Phone', code: 'TG-0001', wh: 'Main Warehouse', group: 'Electronics', qty: 45, unit: 'unit', cost: 'SAR 337,500', st: 'in' },
  { name: 'Acer Aspire 5 Laptop', code: 'TG-0002', wh: 'Main Warehouse', group: 'Electronics', qty: 18, unit: 'unit', cost: 'SAR 540,000', st: 'in' },
  { name: 'Arabica Coffee Beans 1 kg', code: 'TG-0003', wh: 'Cafe Warehouse', group: 'Food', qty: 120, unit: 'unit', cost: 'SAR 18,000', st: 'in' },
  { name: 'A4 Office Paper (500 sheets)', code: 'TG-0004', wh: 'Main Warehouse', group: 'Stationery', qty: 200, unit: 'ream', cost: 'SAR 20,000', st: 'in' },
  { name: 'Canon PIXMA G3411 Printer', code: 'TG-0005', wh: 'Main Warehouse', group: 'Electronics', qty: 7, unit: 'unit', cost: 'SAR 98,000', st: 'low' },
  { name: 'Comfort Office Chair', code: 'TG-0006', wh: 'Furniture Warehouse', group: 'Furniture', qty: 15, unit: 'unit', cost: 'SAR 37,500', st: 'low' },
  { name: 'Wheat Bread', code: 'TG-0007', wh: 'Store Warehouse', group: 'Food', qty: 0, unit: 'unit', cost: 'SAR 0', st: 'out' },
  { name: 'Mineral Water 0.5 L', code: 'TG-0008', wh: 'Store Warehouse', group: 'Beverages', qty: 320, unit: 'unit', cost: 'SAR 12,800', st: 'in' },
  { name: 'LG 24MP59G-P Monitor', code: 'TG-0009', wh: 'Main Warehouse', group: 'Electronics', qty: 5, unit: 'unit', cost: 'SAR 59,500', st: 'low' },
  { name: 'Notebook 96 sheets', code: 'TG-0010', wh: 'Main Warehouse', group: 'Stationery', qty: 150, unit: 'unit', cost: 'SAR 11,250', st: 'in' },
]

const BY_WAREHOUSE = [
  { label: 'Main Warehouse', value: 'SAR 1,245,000 (50.6%)', color: '#3b82f6' },
  { label: 'Store Warehouse', value: 'SAR 645,000 (26.2%)', color: '#10b981' },
  { label: 'Cafe Warehouse', value: 'SAR 280,000 (11.4%)', color: '#f59e0b' },
  { label: 'Furniture Warehouse', value: 'SAR 210,000 (8.5%)', color: '#ef4444' },
  { label: 'In-Transit Warehouse', value: 'SAR 78,750 (3.3%)', color: '#cbd5e1' },
]

const BY_STATUS = [
  { label: 'In stock', value: '923 (74.1%)', color: '#10b981' },
  { label: 'Low stock', value: '156 (12.5%)', color: '#f59e0b' },
  { label: 'Out of stock', value: '78 (6.3%)', color: '#ef4444' },
  { label: 'Non-moving', value: '88 (7.1%)', color: '#cbd5e1' },
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

export default function WarehousePreview() {
  return (
    <AppShell
      active="stock"
      breadcrumb={['Inventory', 'Stock Overview']}
      reports={['Inventory', 'Stock Ledger', 'Stock Reports', 'Stock Valuation', 'Expiry', 'Serial Numbers']}
    >
      {/* Page header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">Stock Overview</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] text-slate-600">Actions</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <RefreshCw size={14} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <MoreHorizontal size={14} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-[13px] font-semibold text-white">
            <Plus size={14} /> New Stock Entry
          </span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-[12px] text-slate-500">{s.label}</div>
            <div className="mt-1 text-xl font-bold text-slate-900">{s.value}</div>
            <div
              className={`mt-1 text-[11px] ${
                s.sub === 'plain' ? 'text-slate-400' : s.up ? 'text-emerald-600' : 'text-rose-500'
              }`}
            >
              {s.sub === 'plain' ? '' : s.up ? '▲ ' : '▼ '}
              {s.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Filter row */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Warehouse</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Item Group</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Item</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Status</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-600">
          <Filter size={13} /> Filter
        </span>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="mb-1 px-4 pt-4 text-sm font-semibold text-slate-900">Items in stock</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="p-3 font-medium">Item</th>
                <th className="p-3 font-medium">Item Code</th>
                <th className="p-3 font-medium">Warehouse</th>
                <th className="p-3 font-medium">Group</th>
                <th className="p-3 font-medium">Quantity</th>
                <th className="p-3 font-medium">Unit</th>
                <th className="p-3 font-medium">Value</th>
                <th className="p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.code} className="border-b border-slate-50 last:border-0">
                  <td className="p-3 text-slate-700">{r.name}</td>
                  <td className="p-3 text-slate-500">{r.code}</td>
                  <td className="p-3 text-slate-600">{r.wh}</td>
                  <td className="p-3 text-slate-600">{r.group}</td>
                  <td className="p-3 text-slate-700">{r.qty}</td>
                  <td className="p-3 text-slate-500">{r.unit}</td>
                  <td className="p-3 font-medium text-slate-800">{r.cost}</td>
                  <td className="p-3">
                    <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${ST_CLASS[r.st]}`}>
                      {ST_LABEL[r.st]}
                    </span>
                  </td>
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

      {/* Charts */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Stock movement (last 30 days)</h4>
          <svg viewBox="0 0 300 120" className="h-32 w-full">
            <polyline points="10,80 45,72 80,74 115,60 150,58 185,45 220,48 255,35 290,30" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <polyline points="10,95 45,90 80,88 115,85 150,80 185,82 220,78 255,76 290,72" fill="none" stroke="#10b981" strokeWidth="2" />
            <polyline points="10,105 45,102 80,104 115,100 150,101 185,98 220,99 255,96 290,97" fill="none" stroke="#ef4444" strokeWidth="2" />
          </svg>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Inbound</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-500" /> Outbound</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Balance</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Inventory value by warehouse</h4>
          <div className="flex items-center gap-4">
            <Donut
              segments={[
                '#3b82f6 0 50.6%',
                '#10b981 50.6% 76.8%',
                '#f59e0b 76.8% 88.2%',
                '#ef4444 88.2% 96.7%',
                '#cbd5e1 96.7% 100%',
              ]}
            />
            <div className="min-w-0 flex-1"><Legend items={BY_WAREHOUSE} /></div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Items by status</h4>
          <div className="flex items-center gap-4">
            <Donut
              segments={[
                '#10b981 0 74.1%',
                '#f59e0b 74.1% 86.6%',
                '#ef4444 86.6% 92.9%',
                '#cbd5e1 92.9% 100%',
              ]}
            />
            <div className="min-w-0 flex-1"><Legend items={BY_STATUS} /></div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
