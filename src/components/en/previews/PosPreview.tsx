import { RefreshCw, MoreHorizontal, Plus, Filter } from 'lucide-react'
import AppShell from './AppShell'

/* Retail (POS) module preview in English (LTR). */

const STATS: { label: string; value: string; delta: string; up?: boolean; plain?: boolean }[] = [
  { label: 'Total sales', value: 'SAR 1,785,250', delta: '18.7% vs last month', up: true },
  { label: 'Transactions', value: '2,458', delta: '16.2% vs last month', up: true },
  { label: 'Average ticket', value: 'SAR 726.98', delta: '2.8% vs last month', up: true },
  { label: 'Returns', value: 'SAR 45,250', delta: '9.4% vs last month', up: false },
  { label: 'Gross profit', value: 'SAR 612,340', delta: '15.6% vs last month', up: true },
  { label: 'Active registers', value: '6', delta: 'of 8 registers', plain: true },
]

const ROWS: {
  id: string
  dt: string
  reg: string
  store: string
  cashier: string
  amount: string
  pay: string
  done: boolean
}[] = [
  { id: 'POS-2025-00789', dt: '31.07.2025 19:45', reg: 'Register 1', store: 'Al Rawda Store', cashier: 'A. Smirnova', amount: 'SAR 2,450', pay: 'Card', done: true },
  { id: 'POS-2025-00788', dt: '31.07.2025 19:12', reg: 'Register 2', store: 'Rainbow Center', cashier: 'B. Ivanov', amount: 'SAR 1,200', pay: 'Cash', done: true },
  { id: 'POS-2025-00787', dt: '31.07.2025 18:33', reg: 'Register 3', store: 'Al Rawda Store', cashier: 'A. Smirnova', amount: 'SAR 850', pay: 'Card', done: true },
  { id: 'POS-2025-00786', dt: '31.07.2025 18:05', reg: 'Register 1', store: 'Al Rawda Store', cashier: 'A. Smirnova', amount: 'SAR 3,150', pay: 'Mixed', done: true },
  { id: 'POS-2025-00785', dt: '31.07.2025 17:41', reg: 'Register 4', store: 'Mega Center', cashier: 'A. Kuznetsova', amount: 'SAR 1,750', pay: 'Card', done: true },
  { id: 'POS-2025-00784', dt: '31.07.2025 17:21', reg: 'Register 2', store: 'Rainbow Center', cashier: 'B. Ivanov', amount: 'SAR 980', pay: 'Cash', done: true },
  { id: 'POS-2025-00783', dt: '31.07.2025 16:58', reg: 'Register 3', store: 'Al Rawda Store', cashier: 'A. Smirnova', amount: 'SAR 2,200', pay: 'Card', done: false },
  { id: 'POS-2025-00782', dt: '31.07.2025 16:30', reg: 'Register 1', store: 'Al Rawda Store', cashier: 'A. Smirnova', amount: 'SAR 1,450', pay: 'Cash', done: true },
]

const BY_STORE = [
  { label: 'Al Rawda Store', value: 'SAR 825,450 (46.2%)', color: '#3b82f6' },
  { label: 'Rainbow Center', value: 'SAR 567,300 (31.8%)', color: '#10b981' },
  { label: 'Mega Center', value: 'SAR 312,500 (17.5%)', color: '#f59e0b' },
  { label: 'Al Salam Store', value: 'SAR 80,000 (4.5%)', color: '#cbd5e1' },
]
const BY_PAY = [
  { label: 'Card', value: 'SAR 1,048,250 (58.7%)', color: '#3b82f6' },
  { label: 'Cash', value: 'SAR 562,800 (31.5%)', color: '#10b981' },
  { label: 'Mixed', value: 'SAR 174,200 (9.8%)', color: '#f59e0b' },
]
const TOP_PRODUCTS: [string, string, string][] = [
  ['Samsung Galaxy A54 phone', '58 units', 'SAR 348,000'],
  ['JBL wireless headphones', '97 units', 'SAR 242,500'],
  ['Philips EP2231 coffee machine', '31 units', 'SAR 155,000'],
  ['CASIO watch', '74 units', 'SAR 111,000'],
  ['Xiaomi portable speaker', '66 units', 'SAR 99,000'],
]
const REGISTERS: [string, string, string, boolean][] = [
  ['Register 1', 'Al Rawda Store', 'A. Smirnova', true],
  ['Register 2', 'Rainbow Center', 'B. Ivanov', true],
  ['Register 3', 'Al Rawda Store', 'A. Smirnova', true],
  ['Register 4', 'Mega Center', 'A. Kuznetsova', true],
  ['Register 5', 'Al Salam Store', 'E. Petrova', false],
  ['Register 6', 'Al Salam Store', 'E. Petrova', false],
  ['Register 7', 'Warehouse Store', 'S. Andreev', false],
  ['Register 8', 'Warehouse Store', 'S. Andreev', false],
]
const HOURS = [30, 45, 70, 95, 60, 120, 150, 175, 130, 110, 90, 70, 100, 140]

function Donut({ segments }: { segments: string[] }) {
  return (
    <div
      className="h-28 w-28 shrink-0 rounded-full"
      style={{
        background: `conic-gradient(${segments.join(',')})`,
        WebkitMask: 'radial-gradient(circle 30px at center, transparent 98%, #000 100%)',
        mask: 'radial-gradient(circle 30px at center, transparent 98%, #000 100%)',
      }}
    />
  )
}
function Legend({ items }: { items: { label: string; value: string; color: string }[] }) {
  return (
    <div className="space-y-1.5">
      {items.map((it) => (
        <div key={it.label} className="flex items-center justify-between gap-3 text-[11px]">
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

export default function PosPreview() {
  return (
    <AppShell
      active="pos"
      breadcrumb={['Retail (POS)', 'Overview']}
      reports={['POS sales', 'Register shifts', 'Products', 'Customers', 'Retail reports']}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">Retail (POS)</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] text-slate-600">Actions</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <RefreshCw size={14} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <MoreHorizontal size={14} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-[13px] font-semibold text-white">
            <Plus size={14} /> New sale (POS)
          </span>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-[12px] text-slate-500">{s.label}</div>
            <div className="mt-1 text-lg font-bold text-slate-900">{s.value}</div>
            <div className={`mt-1 text-[11px] ${s.plain ? 'text-slate-400' : s.up ? 'text-emerald-600' : 'text-rose-500'}`}>
              {s.plain ? '' : s.up ? '▲ ' : '▼ '}
              {s.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Store</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Register</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Shift status</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">01.07.2025 - 31.07.2025</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-600">
          <Filter size={13} /> Filter
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="mb-1 px-4 pt-4 text-sm font-semibold text-slate-900">Sales (POS)</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="p-3 font-medium">Transaction ID</th>
                <th className="p-3 font-medium">Date &amp; time</th>
                <th className="p-3 font-medium">Register</th>
                <th className="p-3 font-medium">Store</th>
                <th className="p-3 font-medium">Cashier</th>
                <th className="p-3 font-medium">Amount</th>
                <th className="p-3 font-medium">Payment</th>
                <th className="p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.id} className="border-b border-slate-50 last:border-0">
                  <td className="p-3 font-medium text-blue-600">{r.id}</td>
                  <td className="p-3 text-slate-600">{r.dt}</td>
                  <td className="p-3 text-slate-600">{r.reg}</td>
                  <td className="p-3 text-slate-600">{r.store}</td>
                  <td className="p-3 text-slate-600">{r.cashier}</td>
                  <td className="p-3 font-medium text-slate-800">{r.amount}</td>
                  <td className="p-3 text-slate-600">{r.pay}</td>
                  <td className="p-3">
                    <span
                      className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                        r.done ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                      }`}
                    >
                      {r.done ? 'Completed' : 'Return'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Sales by day (SAR)</h4>
          <svg viewBox="0 0 300 120" className="h-32 w-full">
            <polyline
              points="10,90 30,70 50,80 70,55 90,75 110,60 130,85 150,50 170,68 190,58 210,72 230,45 250,66 270,40 290,60"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
            />
          </svg>
          <div className="text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Sales (SAR)</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Sales by store</h4>
          <div className="flex items-center gap-4">
            <Donut segments={['#3b82f6 0 46.2%', '#10b981 46.2% 78%', '#f59e0b 78% 95.5%', '#cbd5e1 95.5% 100%']} />
            <div className="min-w-0 flex-1"><Legend items={BY_STORE} /></div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Payment methods</h4>
          <div className="flex items-center gap-4">
            <Donut segments={['#3b82f6 0 58.7%', '#10b981 58.7% 90.2%', '#f59e0b 90.2% 100%']} />
            <div className="min-w-0 flex-1"><Legend items={BY_PAY} /></div>
          </div>
        </div>
      </div>

      {/* Top products + sales by hour + registers */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Top selling products</h4>
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="py-2 font-medium">Product</th>
                <th className="py-2 font-medium">Sold</th>
                <th className="py-2 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {TOP_PRODUCTS.map(([n, q, s]) => (
                <tr key={n} className="border-b border-slate-50 last:border-0">
                  <td className="py-2 text-slate-700">{n}</td>
                  <td className="py-2 text-slate-500">{q}</td>
                  <td className="py-2 font-medium text-slate-800">{s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Sales by hour</h4>
          <div className="flex h-32 items-end gap-1">
            {HOURS.map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-t bg-blue-500/80"
                style={{ height: `${(h / 175) * 100}%` }}
              />
            ))}
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-slate-400">
            <span>08:00</span>
            <span>14:00</span>
            <span>22:00</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Active registers</h4>
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="py-2 font-medium">Register</th>
                <th className="py-2 font-medium">Store</th>
                <th className="py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {REGISTERS.map(([reg, store, , open]) => (
                <tr key={reg} className="border-b border-slate-50 last:border-0">
                  <td className="py-2 text-slate-700">{reg}</td>
                  <td className="py-2 text-slate-500">{store}</td>
                  <td className="py-2">
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                        open ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {open ? 'Open' : 'Closed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  )
}
