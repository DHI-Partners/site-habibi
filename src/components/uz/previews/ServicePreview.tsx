import { RefreshCw, MoreHorizontal, Plus, Filter } from 'lucide-react'
import AppShell from './AppShell'

/* Превью модуля «Сервис и поддержка» — дашборд заявок на узбекской латинице (LTR). */

const STATS: { label: string; value: string; delta: string; up: boolean }[] = [
  { label: 'Jami murojaatlar', value: '623', delta: '18,6% oʻtgan oyga nisbatan', up: true },
  { label: 'Ochiq murojaatlar', value: '128', delta: '12,4% oʻtgan oyga nisbatan', up: true },
  { label: 'Mijoz javobi kutilmoqda', value: '74', delta: '8,7% oʻtgan oyga nisbatan', up: true },
  { label: 'Yakunlangan murojaatlar', value: '392', delta: '21,3% oʻtgan oyga nisbatan', up: true },
  { label: 'Muddati oʻtgan murojaatlar', value: '29', delta: '9,4% oʻtgan oyga nisbatan', up: false },
  { label: 'Oʻrtacha hal qilish vaqti', value: '4 soat 32 daq.', delta: '15,7% oʻtgan oyga nisbatan', up: true },
]

type St = 'open' | 'work' | 'wait' | 'solved'
const ST: Record<St, { l: string; c: string }> = {
  open: { l: 'Ochiq', c: 'bg-sky-50 text-sky-600' },
  work: { l: 'Jarayonda', c: 'bg-blue-50 text-blue-600' },
  wait: { l: 'Mijoz javobi kutilmoqda', c: 'bg-amber-50 text-amber-600' },
  solved: { l: 'Yakunlangan', c: 'bg-emerald-50 text-emerald-600' },
}
type Pr = 'high' | 'mid' | 'low'
const PR: Record<Pr, { l: string; c: string }> = {
  high: { l: 'Yuqori', c: 'bg-rose-50 text-rose-600' },
  mid: { l: 'Oʻrta', c: 'bg-amber-50 text-amber-600' },
  low: { l: 'Past', c: 'bg-emerald-50 text-emerald-600' },
}

const ROWS: {
  id: string
  subject: string
  client: string
  channel: string
  pr: Pr
  st: St
  owner: string
  created: string
  due: string
  sla: number
}[] = [
  { id: 'TK-2025-0623', subject: 'Konditsioner taʼmiri', client: 'Aziz Karimov', channel: 'Email', pr: 'high', st: 'open', owner: 'S. Rustamov', created: '01.07.2025 10:15', due: '03.07.2025 18:00', sla: 66 },
  { id: 'TK-2025-0622', subject: 'Telefon ekranini almashtirish', client: 'Jasur Toshmatov', channel: 'Portal', pr: 'mid', st: 'work', owner: 'N. Ergasheva', created: '01.07.2025 09:45', due: '03.07.2025 17:00', sla: 55 },
  { id: 'TK-2025-0621', subject: 'Muzlatgichga ehtiyot qism kerak', client: 'Malika Yusupova', channel: 'Chat', pr: 'low', st: 'wait', owner: 'M. Tursunova', created: '30.06.2025 16:30', due: '02.07.2025 16:30', sla: 40 },
  { id: 'TK-2025-0620', subject: 'Kir yuvish mashinasi suv oqizmoqda', client: 'Dilnoza Rahimova', channel: 'Telefon', pr: 'high', st: 'work', owner: 'J. Abdullayev', created: '30.06.2025 14:20', due: '02.07.2025 14:20', sla: 75 },
  { id: 'TK-2025-0619', subject: 'Changyutgich diagnostikasi', client: 'Bobur Aliyev', channel: 'Portal', pr: 'low', st: 'solved', owner: 'D. Ismoilov', created: '29.06.2025 11:05', due: '29.06.2025 18:00', sla: 100 },
  { id: 'TK-2025-0618', subject: 'Televizor ekranida dogʻ bor', client: 'Kamola Nazarova', channel: 'Email', pr: 'mid', st: 'open', owner: 'Z. Qodirova', created: '28.06.2025 17:50', due: '30.06.2025 17:50', sla: 30 },
  { id: 'TK-2025-0617', subject: 'Noutbuk qizib ketmoqda', client: 'Aziz Karimov', channel: 'Chat', pr: 'mid', st: 'work', owner: 'B. Yoʻldoshev', created: '28.06.2025 13:40', due: '30.06.2025 13:40', sla: 50 },
  { id: 'TK-2025-0616', subject: 'Printer kartrijini almashtirish', client: 'Malika Yusupova', channel: 'Email', pr: 'low', st: 'solved', owner: 'G. Hamidova', created: '27.06.2025 10:10', due: '27.06.2025 16:00', sla: 100 },
]

const slaColor = (v: number) => (v >= 100 ? 'bg-emerald-500' : v >= 60 ? 'bg-blue-500' : v >= 45 ? 'bg-amber-500' : 'bg-rose-500')

const BY_STATUS = [
  { label: 'Ochiq', value: '128 (20,5%)', color: '#3b82f6' },
  { label: 'Jarayonda', value: '196 (31,4%)', color: '#f59e0b' },
  { label: 'Mijoz javobi kutilmoqda', value: '74 (11,9%)', color: '#eab308' },
  { label: 'Yakunlangan', value: '392 (30,7%)', color: '#10b981' },
  { label: 'Muddati oʻtgan', value: '29 (4,6%)', color: '#ef4444' },
]
const BY_PRIORITY = [
  { label: 'Yuqori', value: '143 (22,9%)', color: '#ef4444' },
  { label: 'Oʻrta', value: '261 (41,9%)', color: '#f59e0b' },
  { label: 'Past', value: '219 (35,2%)', color: '#10b981' },
]
const BY_CHANNEL = [
  { label: 'Email', value: '255 (40,9%)', color: '#3b82f6' },
  { label: 'Portal', value: '198 (31,8%)', color: '#f59e0b' },
  { label: 'Chat', value: '96 (15,4%)', color: '#10b981' },
  { label: 'Telefon', value: '74 (11,9%)', color: '#ef4444' },
]
const TOP = [
  { label: 'S. Rustamov', n: 98, w: '100%' },
  { label: 'N. Ergasheva', n: 85, w: '87%' },
  { label: 'M. Tursunova', n: 72, w: '73%' },
  { label: 'J. Abdullayev', n: 61, w: '62%' },
  { label: 'D. Ismoilov', n: 47, w: '48%' },
  { label: 'Boshqalar', n: 29, w: '30%' },
]

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

export default function ServicePreview() {
  return (
    <AppShell
      active="service"
      breadcrumb={['Servis va yordam', 'Umumiy koʻrinish']}
      reports={['Murojaatlar', 'Bilimlar bazasi', 'SLA shartnomalari', 'Mijozlar', 'Murojaat hisobotlari', 'Mijoz hisobotlari']}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">Servis va yordam</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] text-slate-600">Amallar</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <RefreshCw size={14} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <MoreHorizontal size={14} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-[13px] font-semibold text-white">
            <Plus size={14} /> Yangi murojaat
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
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Holat</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Ustuvorlik</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Masʼul</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Kanal</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Davr</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-600">
          <Filter size={13} /> Filtr
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="mb-1 px-4 pt-4 text-sm font-semibold text-slate-900">Murojaatlar</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] text-left text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="p-3 font-medium">Murojaat ID</th>
                <th className="p-3 font-medium">Mavzu</th>
                <th className="p-3 font-medium">Mijoz</th>
                <th className="p-3 font-medium">Kanal</th>
                <th className="p-3 font-medium">Ustuvorlik</th>
                <th className="p-3 font-medium">Holat</th>
                <th className="p-3 font-medium">Masʼul</th>
                <th className="p-3 font-medium">Yaratilgan</th>
                <th className="p-3 font-medium">SLA</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.id} className="border-b border-slate-50 last:border-0">
                  <td className="p-3 font-medium text-blue-600">{r.id}</td>
                  <td className="p-3 text-slate-700">{r.subject}</td>
                  <td className="p-3 text-slate-600">{r.client}</td>
                  <td className="p-3 text-slate-600">{r.channel}</td>
                  <td className="p-3">
                    <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${PR[r.pr].c}`}>{PR[r.pr].l}</span>
                  </td>
                  <td className="p-3">
                    <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${ST[r.st].c}`}>{ST[r.st].l}</span>
                  </td>
                  <td className="p-3 text-slate-600">{r.owner}</td>
                  <td className="p-3 text-slate-500">{r.created}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 shrink-0 text-slate-500">{r.sla}%</span>
                      <span className="h-1.5 w-16 rounded-full bg-slate-100">
                        <span className={`block h-1.5 rounded-full ${slaColor(r.sla)}`} style={{ width: `${r.sla}%` }} />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Кольцевые диаграммы */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Holat boʻyicha murojaatlar</h4>
          <div className="flex items-center gap-4">
            <Donut segments={['#3b82f6 0 20.5%', '#f59e0b 20.5% 51.9%', '#eab308 51.9% 63.8%', '#10b981 63.8% 95.4%', '#ef4444 95.4% 100%']} />
            <div className="min-w-0 flex-1"><Legend items={BY_STATUS} /></div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Ustuvorlik boʻyicha murojaatlar</h4>
          <div className="flex items-center gap-4">
            <Donut segments={['#ef4444 0 22.9%', '#f59e0b 22.9% 64.8%', '#10b981 64.8% 100%']} />
            <div className="min-w-0 flex-1"><Legend items={BY_PRIORITY} /></div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Kanal boʻyicha murojaatlar</h4>
          <div className="flex items-center gap-4">
            <Donut segments={['#3b82f6 0 40.9%', '#f59e0b 40.9% 72.7%', '#10b981 72.7% 88.1%', '#ef4444 88.1% 100%']} />
            <div className="min-w-0 flex-1"><Legend items={BY_CHANNEL} /></div>
          </div>
        </div>
      </div>

      {/* Динамика + топ сотрудников */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Murojaatlar dinamikasi</h4>
          <svg viewBox="0 0 300 120" className="h-32 w-full">
            <polyline points="10,55 45,48 80,50 115,44 150,52 185,42 220,40 255,36 290,44" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <polyline points="10,80 45,75 80,78 115,70 150,74 185,66 220,68 255,62 290,66" fill="none" stroke="#10b981" strokeWidth="2" />
            <polyline points="10,100 45,98 80,99 115,96 150,97 185,94 220,95 255,93 290,95" fill="none" stroke="#ef4444" strokeWidth="2" />
          </svg>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Yaratilgan</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Yakunlangan</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-500" /> Muddati oʻtgan</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Yakunlangan murojaatlar boʻyicha yetakchi xodimlar</h4>
          <div className="space-y-2">
            {TOP.map((o) => (
              <div key={o.label} className="flex items-center gap-3 text-[12px]">
                <span className="w-20 shrink-0 text-slate-600">{o.label}</span>
                <span className="h-2.5 flex-1 rounded-full bg-slate-100">
                  <span className="block h-2.5 rounded-full bg-blue-500" style={{ width: o.w }} />
                </span>
                <span className="w-8 shrink-0 text-slate-400">{o.n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
