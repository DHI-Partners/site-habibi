import { RefreshCw, MoreHorizontal, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import AppShell from './AppShell'

/* Превью модуля «Склад» — дашборд «Qoldiqlar holati» на узбекском (латиница, LTR). */

const STATS: { label: string; value: string; delta: string; up: boolean; sub?: string }[] = [
  { label: 'Jami qoldiq qiymati', value: '2,46 mlrd soʻm', delta: 'oʻtgan oyga nisbatan 12,5%', up: true },
  { label: 'Jami mahsulotlar', value: '1 245', delta: 'oʻtgan oyga nisbatan 8,3%', up: true },
  { label: 'Kam qoldiqli mahsulotlar', value: '28', delta: 'oʻtgan oyga nisbatan 16,7%', up: true },
  { label: 'Harakatsiz mahsulotlar', value: '34', delta: 'oʻtgan oyga nisbatan 9,1%', up: true },
  { label: 'Omborlar', value: '7', delta: 'Faol omborlar', up: true, sub: 'plain' },
]

type St = 'in' | 'low' | 'out'
const ST_LABEL: Record<St, string> = { in: 'Mavjud', low: 'Kam qoldiq', out: 'Tugagan' }
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
  { name: 'Paxta mato, oq (en 220 sm)', code: 'TG-0001', wh: 'Asosiy ombor', group: 'Mato', qty: 1450, unit: 'metr', cost: '43 500 000 soʻm', st: 'in' },
  { name: 'Bugʻdoy uni, 1-nav (50 kg)', code: 'TG-0002', wh: 'Oziq-ovqat ombori', group: 'Oziq-ovqat', qty: 260, unit: 'qop', cost: '91 000 000 soʻm', st: 'in' },
  { name: 'Shakar (50 kg qop)', code: 'TG-0003', wh: 'Oziq-ovqat ombori', group: 'Oziq-ovqat', qty: 180, unit: 'qop', cost: '108 000 000 soʻm', st: 'in' },
  { name: 'Sement M400 (50 kg)', code: 'TG-0004', wh: 'Qurilish ombori', group: 'Qurilish mollari', qty: 520, unit: 'qop', cost: '31 200 000 soʻm', st: 'in' },
  { name: 'Metall profil 40×40 (6 m)', code: 'TG-0005', wh: 'Qurilish ombori', group: 'Qurilish mollari', qty: 34, unit: 'dona', cost: '5 100 000 soʻm', st: 'low' },
  { name: 'Qadoq plyonkasi (rulon)', code: 'TG-0006', wh: 'Asosiy ombor', group: 'Qadoq materiallari', qty: 26, unit: 'rulon', cost: '3 900 000 soʻm', st: 'low' },
  { name: 'Gʻisht, qizil (M100)', code: 'TG-0007', wh: 'Qurilish ombori', group: 'Qurilish mollari', qty: 0, unit: 'dona', cost: '0 soʻm', st: 'out' },
  { name: 'Kungaboqar yogʻi 5 L', code: 'TG-0008', wh: 'Doʻkon ombori', group: 'Oziq-ovqat', qty: 340, unit: 'dona', cost: '25 500 000 soʻm', st: 'in' },
  { name: 'Ip kalava (polyester)', code: 'TG-0009', wh: 'Asosiy ombor', group: 'Mato', qty: 12, unit: 'quti', cost: '4 200 000 soʻm', st: 'low' },
  { name: 'Karton quti 60×40×40', code: 'TG-0010', wh: 'Asosiy ombor', group: 'Qadoq materiallari', qty: 850, unit: 'dona', cost: '10 200 000 soʻm', st: 'in' },
]

const BY_WAREHOUSE = [
  { label: 'Asosiy ombor', value: '1,25 mlrd soʻm (50,6%)', color: '#3b82f6' },
  { label: 'Doʻkon ombori', value: '645 mln soʻm (26,2%)', color: '#10b981' },
  { label: 'Oziq-ovqat ombori', value: '280 mln soʻm (11,4%)', color: '#f59e0b' },
  { label: 'Qurilish ombori', value: '210 mln soʻm (8,5%)', color: '#ef4444' },
  { label: 'Yoʻldagi ombor', value: '78,8 mln soʻm (3,3%)', color: '#cbd5e1' },
]

const BY_STATUS = [
  { label: 'Mavjud', value: '923 (74,1%)', color: '#10b981' },
  { label: 'Kam qoldiq', value: '156 (12,5%)', color: '#f59e0b' },
  { label: 'Tugagan', value: '78 (6,3%)', color: '#ef4444' },
  { label: 'Harakatsiz', value: '88 (7,1%)', color: '#cbd5e1' },
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
      breadcrumb={['Ombor', 'Qoldiqlar holati']}
      reports={['Ombor', 'Ombor daftari', 'Ombor hisobotlari', 'Qoldiq qiymati', 'Yaroqlilik muddati', 'Seriya raqamlari']}
    >
      {/* Шапка страницы */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">Qoldiqlar holati</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] text-slate-600">Amallar</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <RefreshCw size={14} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <MoreHorizontal size={14} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-[13px] font-semibold text-white">
            <Plus size={14} /> Yangi ombor hujjati
          </span>
        </div>
      </div>

      {/* Карточки метрик */}
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

      {/* Строка фильтров */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Ombor</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Mahsulot guruhi</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Mahsulot</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Status</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-600">
          <Filter size={13} /> Filtr
        </span>
      </div>

      {/* Таблица */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="mb-1 px-4 pt-4 text-sm font-semibold text-slate-900">Ombordagi mahsulotlar</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="p-3 font-medium">Mahsulot</th>
                <th className="p-3 font-medium">Mahsulot kodi</th>
                <th className="p-3 font-medium">Ombor</th>
                <th className="p-3 font-medium">Guruh</th>
                <th className="p-3 font-medium">Miqdor</th>
                <th className="p-3 font-medium">Birlik</th>
                <th className="p-3 font-medium">Qiymat</th>
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

      {/* Графики */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Ombor harakati (oxirgi 30 kun)</h4>
          <svg viewBox="0 0 300 120" className="h-32 w-full">
            <polyline points="10,80 45,72 80,74 115,60 150,58 185,45 220,48 255,35 290,30" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <polyline points="10,95 45,90 80,88 115,85 150,80 185,82 220,78 255,76 290,72" fill="none" stroke="#10b981" strokeWidth="2" />
            <polyline points="10,105 45,102 80,104 115,100 150,101 185,98 220,99 255,96 290,97" fill="none" stroke="#ef4444" strokeWidth="2" />
          </svg>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Kirim</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-500" /> Chiqim</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Qoldiq</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Omborlar boʻyicha qoldiq qiymati</h4>
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
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Status boʻyicha mahsulotlar</h4>
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
