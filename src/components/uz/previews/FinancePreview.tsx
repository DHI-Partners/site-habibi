import { RefreshCw, MoreHorizontal, Plus, Filter, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import AppShell from './AppShell'

/* Превью модуля «Финансы» — дашборд «Moliya» на узбекском (LTR). */

const STATS: { label: string; value: string; delta?: string; up?: boolean; color: string; sub: string }[] = [
  { label: 'Pul qoldigʻi', value: '318 450 000 soʻm', delta: '12,5% oʻtgan oyga nisbatan', up: true, color: 'text-emerald-600', sub: 'Yangilangan: 30.07.2025' },
  { label: 'Tushum (shu oy)', value: '245 800 000 soʻm', delta: '18,3% oʻtgan oyga nisbatan', up: true, color: 'text-blue-600', sub: 'Iyul 2025' },
  { label: 'Xarajatlar (shu oy)', value: '152 300 000 soʻm', delta: '8,7% oʻtgan oyga nisbatan', up: true, color: 'text-rose-500', sub: 'Iyul 2025' },
  { label: 'Foyda (shu oy)', value: '93 500 000 soʻm', delta: '35,2% oʻtgan oyga nisbatan', up: true, color: 'text-emerald-600', sub: 'Iyul 2025' },
  { label: 'Muddati oʻtgan hisob-fakturalar', value: '36 200 000 soʻm', color: 'text-orange-500', sub: '7 ta hisob-faktura · Yangilangan: 30.07.2025' },
]

const CATEGORIES = [
  { label: 'Ijara', value: '33 700 000 soʻm (22,1%)', color: '#3b82f6' },
  { label: 'Oylik fond', value: '51 900 000 soʻm (34,1%)', color: '#10b981' },
  { label: 'Marketing', value: '24 100 000 soʻm (15,8%)', color: '#f59e0b' },
  { label: 'Xaridlar', value: '25 900 000 soʻm (17,0%)', color: '#a78bfa' },
  { label: 'Kommunal toʻlovlar', value: '9 900 000 soʻm (6,5%)', color: '#06b6d4' },
  { label: 'Boshqalar', value: '6 400 000 soʻm (4,2%)', color: '#cbd5e1' },
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
  { date: '30.07.2025', ty: 'in', num: 'ACC-REC-2025-0078', party: 'Samarqand Trade', desc: 'INV-2025-045 hisob-fakturasi uchun toʻlov', amount: '38 500 000 soʻm', bank: 'Kapitalbank hisobi' },
  { date: '30.07.2025', ty: 'out', num: 'ACC-PAY-2025-0091', party: 'Toshkent Biznes Markazi', desc: 'Ofis ijarasi uchun toʻlov', amount: '18 000 000 soʻm', bank: 'Kapitalbank hisobi' },
  { date: '29.07.2025', ty: 'in', num: 'ACC-REC-2025-0077', party: 'Olma Market', desc: 'INV-2025-044 hisob-fakturasi uchun toʻlov', amount: '29 700 000 soʻm', bank: 'Ipoteka Bank hisobi' },
  { date: '29.07.2025', ty: 'out', num: 'ACC-PAY-2025-0090', party: 'Reklama Servis MChJ', desc: 'Reklama xizmatlari', amount: '8 600 000 soʻm', bank: 'Ipoteka Bank hisobi' },
  { date: '28.07.2025', ty: 'out', num: 'ACC-PAY-2025-0089', party: 'Hosting Markazi MChJ', desc: 'Hosting va domen', amount: '1 250 000 soʻm', bank: 'Kapitalbank hisobi' },
  { date: '28.07.2025', ty: 'in', num: 'ACC-REC-2025-0076', party: 'Buxoro Foods', desc: 'INV-2025-043 hisob-fakturasi uchun toʻlov', amount: '21 400 000 soʻm', bank: 'Milliy bank hisobi' },
  { date: '27.07.2025', ty: 'out', num: 'ACC-PAY-2025-0088', party: 'Chirchiq Metall', desc: 'Xomashyo uchun toʻlov', amount: '14 750 000 soʻm', bank: 'Kapitalbank hisobi' },
  { date: '27.07.2025', ty: 'out', num: 'ACC-PAY-2025-0087', party: 'Hududiy elektr tarmoqlari', desc: 'Elektr energiyasi', amount: '2 850 000 soʻm', bank: 'Ipoteka Bank hisobi' },
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
      breadcrumb={['Moliya', 'Bosh sahifa']}
      reports={['Bosh sahifa', 'Buxgalteriya', 'Toʻlovlar', 'Bank hisoblari', 'Hisobotlar', 'Soliq hisobi', 'Sozlamalar']}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">Moliya</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] text-slate-600">Sozlash</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <RefreshCw size={14} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <MoreHorizontal size={14} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-[13px] font-semibold text-white">
            <Plus size={14} /> Yangi hujjat
          </span>
        </div>
      </div>

      {/* Карточки показателей */}
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

      {/* Графики */}
      <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Pul oqimi</h4>
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
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Kirim</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-500" /> Chiqim</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Balans</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Kategoriyalar boʻyicha xarajatlar (shu oy)</h4>
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

      {/* Таблица */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-4">
          <div className="text-sm font-semibold text-slate-900">Soʻnggi moliyaviy operatsiyalar</div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] text-slate-600">
              <Filter size={13} /> Filtr
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] text-slate-600">
              <Calendar size={13} /> Oxirgi 30 kun
            </span>
          </div>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-[12px]">
            <thead>
              <tr className="border-y border-slate-100 text-slate-400">
                <th className="p-3 font-medium">Sana</th>
                <th className="p-3 font-medium">Hujjat turi</th>
                <th className="p-3 font-medium">Raqam</th>
                <th className="p-3 font-medium">Kontragent</th>
                <th className="p-3 font-medium">Tavsif</th>
                <th className="p-3 font-medium">Summa</th>
                <th className="p-3 font-medium">Holat</th>
                <th className="p-3 font-medium">Toʻlov manbai</th>
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
                      {r.ty === 'in' ? 'Kirim' : 'Chiqim'}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500">{r.num}</td>
                  <td className="p-3 text-slate-700">{r.party}</td>
                  <td className="p-3 text-slate-600">{r.desc}</td>
                  <td className="p-3 font-medium text-slate-800">{r.amount}</td>
                  <td className="p-3">
                    <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
                      Toʻlangan
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">{r.bank}</td>
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
    </AppShell>
  )
}
