import { RefreshCw, MoreHorizontal, Plus, Filter, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import AppShell from './AppShell'

/* Finance module preview — a "Finance" dashboard in English (LTR). */

const STATS: { label: string; value: string; delta?: string; up?: boolean; color: string; sub: string }[] = [
  { label: 'Cash balance', value: 'SAR 1,245,750', delta: '12.5% vs last month', up: true, color: 'text-emerald-600', sub: 'Updated 30 Jul 2025' },
  { label: 'Revenue (this month)', value: 'SAR 870,200', delta: '18.3% vs last month', up: true, color: 'text-blue-600', sub: 'Jul 2025' },
  { label: 'Expenses (this month)', value: 'SAR 542,430', delta: '8.7% vs last month', up: true, color: 'text-rose-500', sub: 'Jul 2025' },
  { label: 'Profit (this month)', value: 'SAR 327,770', delta: '35.2% vs last month', up: true, color: 'text-emerald-600', sub: 'Jul 2025' },
  { label: 'Overdue invoices', value: 'SAR 128,900', color: 'text-orange-500', sub: '7 invoices · Updated 30 Jul 2025' },
]

const CATEGORIES = [
  { label: 'Rent', value: 'SAR 120,000 (22.1%)', color: '#3b82f6' },
  { label: 'Salaries', value: 'SAR 185,000 (34.1%)', color: '#10b981' },
  { label: 'Marketing', value: 'SAR 85,600 (15.8%)', color: '#f59e0b' },
  { label: 'Purchases', value: 'SAR 92,430 (17.0%)', color: '#a78bfa' },
  { label: 'Utilities', value: 'SAR 35,400 (6.5%)', color: '#06b6d4' },
  { label: 'Other', value: 'SAR 23,000 (4.2%)', color: '#cbd5e1' },
]

type Ty = 'in' | 'out'
const ROWS: {
  date: string
  ty: Ty
  num: string
  party: string
  desc: string
  amount: string
  bank: string
}[] = [
  { date: '30 Jul 2025', ty: 'in', num: 'ACC-REC-2025-0078', party: 'Alpha Company', desc: 'Payment for invoice INV-2025-045', amount: 'SAR 125,000', bank: 'Al Rajhi Bank account' },
  { date: '30 Jul 2025', ty: 'out', num: 'ACC-PAY-2025-0091', party: 'Elite Establishment', desc: 'Office rent payment', amount: 'SAR 60,000', bank: 'Al Rajhi Bank account' },
  { date: '29 Jul 2025', ty: 'in', num: 'ACC-REC-2025-0077', party: 'Beta Company', desc: 'Payment for invoice INV-2025-044', amount: 'SAR 98,500', bank: 'Riyad Bank account' },
  { date: '29 Jul 2025', ty: 'out', num: 'ACC-PAY-2025-0090', party: 'Market Pro Company', desc: 'Advertising services', amount: 'SAR 28,900', bank: 'Riyad Bank account' },
  { date: '28 Jul 2025', ty: 'out', num: 'ACC-PAY-2025-0089', party: 'Hosting Center', desc: 'Hosting and domain', amount: 'SAR 4,200', bank: 'Al Rajhi Bank account' },
  { date: '28 Jul 2025', ty: 'in', num: 'ACC-REC-2025-0076', party: 'Al Wafa Establishment', desc: 'Payment for invoice INV-2025-043', amount: 'SAR 72,300', bank: 'National Bank account' },
  { date: '27 Jul 2025', ty: 'out', num: 'ACC-PAY-2025-0088', party: 'Logistics Company', desc: 'Goods delivery', amount: 'SAR 15,750', bank: 'Al Rajhi Bank account' },
  { date: '27 Jul 2025', ty: 'out', num: 'ACC-PAY-2025-0087', party: 'Power Supply Company', desc: 'Electricity', amount: 'SAR 9,850', bank: 'Riyad Bank account' },
]

function Donut({ segments }: { segments: string[] }) {
  return (
    <div
      className="h-36 w-36 shrink-0 rounded-full"
      style={{
        background: `conic-gradient(${segments.join(',')})`,
        WebkitMask: 'radial-gradient(circle 40px at center, transparent 98%, #000 100%)',
        mask: 'radial-gradient(circle 40px at center, transparent 98%, #000 100%)',
      }}
    />
  )
}

export default function FinancePreview() {
  return (
    <AppShell
      active="finance"
      breadcrumb={['Finance', 'Home']}
      reports={['Home', 'Accounting', 'Payments', 'Bank Accounts', 'Reports', 'Tax Accounting', 'Settings']}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">Finance</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] text-slate-600">Customize</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <RefreshCw size={14} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <MoreHorizontal size={14} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-[13px] font-semibold text-white">
            <Plus size={14} /> New Document
          </span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-[12px] text-slate-500">{s.label}</div>
            <div className={`mt-1 text-lg font-bold ${s.color}`}>{s.value}</div>
            {s.delta && (
              <div className={`mt-1 text-[11px] ${s.up ? 'text-emerald-600' : 'text-rose-500'}`}>
                {s.up ? '▲' : '▼'} {s.delta}
              </div>
            )}
            <div className="mt-1 text-[11px] text-slate-400">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Cash flow</h4>
          <svg viewBox="0 0 480 160" className="h-40 w-full">
            <polyline
              points="10,120 50,110 90,95 130,92 170,80 210,78 250,66 290,60 330,52 370,48 410,44 470,40"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <polyline
              points="10,130 50,122 90,116 130,118 170,108 210,110 250,102 290,98 330,94 370,92 410,88 470,86"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            />
            <polyline
              points="10,140 50,138 90,136 130,137 170,132 210,133 250,130 290,131 330,128 370,129 410,127 470,126"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
            />
          </svg>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Inflow</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-500" /> Outflow</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Balance</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Expenses by category (this month)</h4>
          <div className="flex items-center gap-4">
            <Donut
              segments={[
                '#3b82f6 0 22.1%',
                '#10b981 22.1% 56.2%',
                '#f59e0b 56.2% 72.0%',
                '#a78bfa 72.0% 89.0%',
                '#06b6d4 89.0% 95.5%',
                '#cbd5e1 95.5% 100%',
              ]}
            />
            <div className="min-w-0 flex-1 space-y-1.5">
              {CATEGORIES.map((c) => (
                <div key={c.label} className="flex items-center justify-between gap-4 text-[12px]">
                  <span className="flex items-center gap-2 text-slate-600">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                    {c.label}
                  </span>
                  <span className="text-slate-400">{c.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-4">
          <div className="text-sm font-semibold text-slate-900">Recent financial transactions</div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] text-slate-600">
              <Filter size={13} /> Filter
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] text-slate-600">
              <Calendar size={13} /> Last 30 days
            </span>
          </div>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-[12px]">
            <thead>
              <tr className="border-y border-slate-100 text-slate-400">
                <th className="p-3 font-medium">Date</th>
                <th className="p-3 font-medium">Document type</th>
                <th className="p-3 font-medium">Number</th>
                <th className="p-3 font-medium">Counterparty</th>
                <th className="p-3 font-medium">Description</th>
                <th className="p-3 font-medium">Amount</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Paid from</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.num} className="border-b border-slate-50 last:border-0">
                  <td className="p-3 text-slate-600">{r.date}</td>
                  <td className="p-3">
                    <span
                      className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                        r.ty === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {r.ty === 'in' ? 'Receipt' : 'Payment'}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500">{r.num}</td>
                  <td className="p-3 text-slate-700">{r.party}</td>
                  <td className="p-3 text-slate-600">{r.desc}</td>
                  <td className="p-3 font-medium text-slate-800">{r.amount}</td>
                  <td className="p-3">
                    <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
                      Paid
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">{r.bank}</td>
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
    </AppShell>
  )
}
