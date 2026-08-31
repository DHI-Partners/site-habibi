import { RefreshCw, MoreHorizontal, Plus, Filter } from 'lucide-react'
import AppShell from './AppShell'

/* Превью модуля «Розница (POS)» на узбекской латинице (LTR). */

const STATS: { label: string; value: string; delta: string; up?: boolean; plain?: boolean }[] = [
  { label: 'Jami savdo', value: '448,6 mln soʻm', delta: '18,7% oʻtgan oyga nisbatan', up: true },
  { label: 'Cheklar soni', value: '2 458', delta: '16,2% oʻtgan oyga nisbatan', up: true },
  { label: 'Oʻrtacha chek', value: '182 500 soʻm', delta: '2,8% oʻtgan oyga nisbatan', up: true },
  { label: 'Qaytarishlar', value: '11,2 mln soʻm', delta: '9,4% oʻtgan oyga nisbatan', up: false },
  { label: 'Yalpi foyda', value: '153,8 mln soʻm', delta: '15,6% oʻtgan oyga nisbatan', up: true },
  { label: 'Faol kassalar', value: '6', delta: 'jami 8 kassadan', plain: true },
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
  { id: 'POS-2025-00789', dt: '31.07.2025 19:45', reg: 'Kassa 1', store: 'Chilonzor doʻkoni', cashier: 'G. Sattorova', amount: '245 000 soʻm', pay: 'Karta', done: true },
  { id: 'POS-2025-00788', dt: '31.07.2025 19:12', reg: 'Kassa 2', store: 'Yunusobod doʻkoni', cashier: 'B. Olimov', amount: '120 000 soʻm', pay: 'Naqd', done: true },
  { id: 'POS-2025-00787', dt: '31.07.2025 18:33', reg: 'Kassa 3', store: 'Chilonzor doʻkoni', cashier: 'G. Sattorova', amount: '85 000 soʻm', pay: 'Click', done: true },
  { id: 'POS-2025-00786', dt: '31.07.2025 18:05', reg: 'Kassa 1', store: 'Chilonzor doʻkoni', cashier: 'G. Sattorova', amount: '315 000 soʻm', pay: 'Payme', done: true },
  { id: 'POS-2025-00785', dt: '31.07.2025 17:41', reg: 'Kassa 4', store: 'Samarqand filiali', cashier: 'N. Sharipova', amount: '175 000 soʻm', pay: 'Karta', done: true },
  { id: 'POS-2025-00784', dt: '31.07.2025 17:21', reg: 'Kassa 2', store: 'Yunusobod doʻkoni', cashier: 'B. Olimov', amount: '98 000 soʻm', pay: 'Naqd', done: true },
  { id: 'POS-2025-00783', dt: '31.07.2025 16:58', reg: 'Kassa 3', store: 'Chilonzor doʻkoni', cashier: 'G. Sattorova', amount: '220 000 soʻm', pay: 'Karta', done: false },
  { id: 'POS-2025-00782', dt: '31.07.2025 16:30', reg: 'Kassa 1', store: 'Chilonzor doʻkoni', cashier: 'G. Sattorova', amount: '145 000 soʻm', pay: 'Naqd', done: true },
]

const BY_STORE = [
  { label: 'Chilonzor doʻkoni', value: '207,3 mln soʻm (46,2%)', color: '#3b82f6' },
  { label: 'Yunusobod doʻkoni', value: '142,7 mln soʻm (31,8%)', color: '#10b981' },
  { label: 'Samarqand filiali', value: '78,5 mln soʻm (17,5%)', color: '#f59e0b' },
  { label: 'Sergeli doʻkoni', value: '20,1 mln soʻm (4,5%)', color: '#cbd5e1' },
]
const BY_PAY = [
  { label: 'Karta', value: '263,3 mln soʻm (58,7%)', color: '#3b82f6' },
  { label: 'Naqd', value: '141,3 mln soʻm (31,5%)', color: '#10b981' },
  { label: 'Click / Payme', value: '44,0 mln soʻm (9,8%)', color: '#f59e0b' },
]
const TOP_PRODUCTS: [string, string, string][] = [
  ['Yogʻ 1 L', '1 850 dona', '51,8 mln soʻm'],
  ['Guruch 1 kg', '1 620 dona', '42,1 mln soʻm'],
  ['Sut 1 L', '2 150 dona', '25,8 mln soʻm'],
  ['Non', '5 200 dona', '20,8 mln soʻm'],
  ['Choy koʻk 100 g', '1 300 dona', '19,5 mln soʻm'],
]
const REGISTERS: [string, string, string, boolean][] = [
  ['Kassa 1', 'Chilonzor doʻkoni', 'G. Sattorova', true],
  ['Kassa 2', 'Yunusobod doʻkoni', 'B. Olimov', true],
  ['Kassa 3', 'Chilonzor doʻkoni', 'G. Sattorova', true],
  ['Kassa 4', 'Samarqand filiali', 'N. Sharipova', true],
  ['Kassa 5', 'Sergeli doʻkoni', 'D. Xolmatova', false],
  ['Kassa 6', 'Sergeli doʻkoni', 'D. Xolmatova', false],
  ['Kassa 7', 'Ombor doʻkoni', 'S. Anvarov', false],
  ['Kassa 8', 'Ombor doʻkoni', 'S. Anvarov', false],
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
      breadcrumb={['Chakana savdo (POS)', 'Umumiy koʻrinish']}
      reports={['POS savdolari', 'Kassa smenalari', 'Mahsulotlar', 'Mijozlar', 'Chakana savdo hisobotlari']}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">Chakana savdo (POS)</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] text-slate-600">Amallar</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <RefreshCw size={14} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <MoreHorizontal size={14} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-[13px] font-semibold text-white">
            <Plus size={14} /> Yangi savdo (POS)
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
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Doʻkon</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Kassa</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Smena holati</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">01.07.2025 - 31.07.2025</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-600">
          <Filter size={13} /> Filtr
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="mb-1 px-4 pt-4 text-sm font-semibold text-slate-900">Savdolar (POS)</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="p-3 font-medium">Chek raqami</th>
                <th className="p-3 font-medium">Sana va vaqt</th>
                <th className="p-3 font-medium">Kassa</th>
                <th className="p-3 font-medium">Doʻkon</th>
                <th className="p-3 font-medium">Kassir</th>
                <th className="p-3 font-medium">Summa</th>
                <th className="p-3 font-medium">Toʻlov</th>
                <th className="p-3 font-medium">Holat</th>
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
                      {r.done ? 'Yakunlangan' : 'Qaytarish'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Диаграммы */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Kunlik savdo (soʻm)</h4>
          <svg viewBox="0 0 300 120" className="h-32 w-full">
            <polyline
              points="10,90 30,70 50,80 70,55 90,75 110,60 130,85 150,50 170,68 190,58 210,72 230,45 250,66 270,40 290,60"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
            />
          </svg>
          <div className="text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Savdo (soʻm)</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Doʻkonlar boʻyicha savdo</h4>
          <div className="flex items-center gap-4">
            <Donut segments={['#3b82f6 0 46.2%', '#10b981 46.2% 78%', '#f59e0b 78% 95.5%', '#cbd5e1 95.5% 100%']} />
            <div className="min-w-0 flex-1"><Legend items={BY_STORE} /></div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Toʻlov usullari</h4>
          <div className="flex items-center gap-4">
            <Donut segments={['#3b82f6 0 58.7%', '#10b981 58.7% 90.2%', '#f59e0b 90.2% 100%']} />
            <div className="min-w-0 flex-1"><Legend items={BY_PAY} /></div>
          </div>
        </div>
      </div>

      {/* Топ товаров + продажи по часам + кассы */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Eng koʻp sotilgan mahsulotlar</h4>
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="py-2 font-medium">Mahsulot</th>
                <th className="py-2 font-medium">Sotilgan</th>
                <th className="py-2 font-medium">Summa</th>
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
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Soatlik savdo</h4>
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
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Faol kassalar</h4>
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="py-2 font-medium">Kassa</th>
                <th className="py-2 font-medium">Doʻkon</th>
                <th className="py-2 font-medium">Holat</th>
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
                      {open ? 'Ochiq' : 'Yopilgan'}
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
