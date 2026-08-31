import { RefreshCw, MoreHorizontal, Plus, Filter } from 'lucide-react'
import AppShell from './AppShell'

/* Превью модуля «Проекты и задачи» на узбекском (латиница, LTR). */

const STATS: { label: string; value: string; delta: string; up: boolean }[] = [
  { label: 'Jami loyihalar', value: '24', delta: '20% oʻtgan oyga nisbatan', up: true },
  { label: 'Faol loyihalar', value: '16', delta: '14,3% oʻtgan oyga nisbatan', up: true },
  { label: 'Yakunlangan loyihalar', value: '5', delta: '25% oʻtgan oyga nisbatan', up: true },
  { label: 'Muddati oʻtgan loyihalar', value: '3', delta: '25% oʻtgan oyga nisbatan', up: false },
  { label: 'Jami vazifalar', value: '328', delta: '18,7% oʻtgan oyga nisbatan', up: true },
  { label: 'Bajarilgan vazifalar', value: '212', delta: '22% oʻtgan oyga nisbatan', up: true },
]

type St = 'work' | 'done' | 'planned' | 'late'
const ST_LABEL: Record<St, string> = { work: 'Jarayonda', done: 'Yakunlangan', planned: 'Rejada', late: 'Muddati oʻtgan' }
const ST_CLASS: Record<St, string> = {
  work: 'bg-sky-50 text-sky-600',
  done: 'bg-emerald-50 text-emerald-600',
  planned: 'bg-slate-100 text-slate-500',
  late: 'bg-rose-50 text-rose-600',
}
const BAR: Record<St, string> = { work: 'bg-sky-500', done: 'bg-emerald-500', planned: 'bg-slate-300', late: 'bg-rose-500' }

const ROWS: {
  name: string
  client: string
  owner: string
  st: St
  progress: number
  start: string
  end: string
  budget: string
  tasks: string
}[] = [
  { name: 'Olma Market filialini ochish', client: 'Olma Market', owner: 'A. Karimov', st: 'work', progress: 65, start: '01.06.2025', end: '30.08.2025', budget: '850 000 000 soʻm', tasks: '18 / 28' },
  { name: 'CRM joriy etish', client: 'Baraka Savdo', owner: 'J. Toshmatov', st: 'work', progress: 40, start: '15.05.2025', end: '15.07.2025', budget: '120 000 000 soʻm', tasks: '12 / 30' },
  { name: 'Sayt yangilash', client: 'Turon Teks', owner: 'M. Yusupova', st: 'done', progress: 100, start: '10.04.2025', end: '20.05.2025', budget: '45 000 000 soʻm', tasks: '22 / 22' },
  { name: 'Marketing kampaniyasi (3-chorak)', client: 'Anhor Kafe', owner: 'D. Rahimova', st: 'work', progress: 70, start: '01.07.2025', end: '30.09.2025', budget: '80 000 000 soʻm', tasks: '9 / 14' },
  { name: 'Ombor koʻchirish', client: 'Zamin Agro', owner: 'B. Aliyev', st: 'work', progress: 25, start: '20.06.2025', end: '20.09.2025', budget: '150 000 000 soʻm', tasks: '7 / 26' },
  { name: 'Onlayn doʻkon ochish', client: 'Chinor Mebel', owner: 'K. Nazarova', st: 'planned', progress: 10, start: '01.08.2025', end: '31.10.2025', budget: '95 000 000 soʻm', tasks: '3 / 20' },
  { name: 'Yangi mahsulot chiqarish', client: 'Navroʻz Savdo', owner: 'T. Ismoilov', st: 'late', progress: 15, start: '01.05.2025', end: '30.06.2025', budget: '260 000 000 soʻm', tasks: '4 / 16' },
]

type Pr = 'high' | 'mid' | 'low'
const PR_LABEL: Record<Pr, string> = { high: 'Yuqori', mid: 'Oʻrta', low: 'Past' }
const PR_CLASS: Record<Pr, string> = {
  high: 'bg-rose-50 text-rose-600',
  mid: 'bg-amber-50 text-amber-600',
  low: 'bg-emerald-50 text-emerald-600',
}

const TASKS: { task: string; project: string; owner: string; st: St | 'wait'; pr: Pr; due: string }[] = [
  { task: 'Kassa uskunalarini oʻrnatish', project: 'Olma Market filialini ochish', owner: 'A. Karimov', st: 'work', pr: 'high', due: '15.07.2025' },
  { task: 'Texnik topshiriq tayyorlash', project: 'CRM joriy etish', owner: 'J. Toshmatov', st: 'done', pr: 'mid', due: '05.07.2025' },
  { task: 'Bosh sahifa dizaynini yangilash', project: 'Sayt yangilash', owner: 'M. Yusupova', st: 'done', pr: 'mid', due: '30.06.2025' },
  { task: 'Kalit soʻzlar roʻyxatini tuzish', project: 'Marketing kampaniyasi (3-chorak)', owner: 'D. Rahimova', st: 'work', pr: 'high', due: '20.07.2025' },
  { task: 'Koʻchirish jadvalini tuzish', project: 'Ombor koʻchirish', owner: 'B. Aliyev', st: 'wait', pr: 'mid', due: '25.07.2025' },
]
const TASK_ST: Record<St | 'wait', { l: string; c: string }> = {
  work: { l: 'Jarayonda', c: 'bg-sky-50 text-sky-600' },
  done: { l: 'Bajarildi', c: 'bg-emerald-50 text-emerald-600' },
  planned: { l: 'Rejada', c: 'bg-slate-100 text-slate-500' },
  late: { l: 'Muddati oʻtgan', c: 'bg-rose-50 text-rose-600' },
  wait: { l: 'Kutilmoqda', c: 'bg-amber-50 text-amber-600' },
}

const BY_STATUS = [
  { label: 'Jarayonda', value: '16 (66,7%)', color: '#3b82f6' },
  { label: 'Yakunlangan', value: '5 (20,8%)', color: '#10b981' },
  { label: 'Rejada', value: '3 (12,5%)', color: '#cbd5e1' },
  { label: 'Muddati oʻtgan', value: '3 (12,5%)', color: '#ef4444' },
]

const BY_PRIORITY = [
  { label: 'Yuqori', value: '98 (29,9%)', color: '#ef4444' },
  { label: 'Oʻrta', value: '142 (43,3%)', color: '#f59e0b' },
  { label: 'Past', value: '88 (26,8%)', color: '#10b981' },
]

const BY_OWNER = [
  { label: 'A. Karimov', n: 5, w: '100%' },
  { label: 'J. Toshmatov', n: 4, w: '80%' },
  { label: 'M. Yusupova', n: 4, w: '80%' },
  { label: 'D. Rahimova', n: 3, w: '60%' },
  { label: 'B. Aliyev', n: 3, w: '60%' },
  { label: 'Boshqa', n: 5, w: '100%' },
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

export default function ProjectsPreview() {
  return (
    <AppShell
      active="projects"
      breadcrumb={['Loyihalar va vazifalar', 'Umumiy koʻrinish']}
      reports={['Loyihalar', 'Vazifalar', 'Vaqt va xarajatlar', 'Gant diagrammasi', 'Loyiha hisobotlari', 'Vazifa hisobotlari']}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">Loyihalar va vazifalar — umumiy koʻrinish</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] text-slate-600">Amallar</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <RefreshCw size={14} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <MoreHorizontal size={14} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-[13px] font-semibold text-white">
            <Plus size={14} /> Yangi loyiha
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
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Loyiha holati</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Masʼul</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Mijoz</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Davr</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-600">
          <Filter size={13} /> Filtr
        </span>
      </div>

      {/* Таблица проектов */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="mb-1 px-4 pt-4 text-sm font-semibold text-slate-900">Loyihalar</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1040px] text-left text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="p-3 font-medium">Loyiha nomi</th>
                <th className="p-3 font-medium">Mijoz</th>
                <th className="p-3 font-medium">Masʼul</th>
                <th className="p-3 font-medium">Holat</th>
                <th className="p-3 font-medium">Bajarilishi</th>
                <th className="p-3 font-medium">Boshlanish sanasi</th>
                <th className="p-3 font-medium">Tugash sanasi</th>
                <th className="p-3 font-medium">Byudjet</th>
                <th className="p-3 font-medium">Vazifalar</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.name} className="border-b border-slate-50 last:border-0">
                  <td className="p-3 font-medium text-slate-800">{r.name}</td>
                  <td className="p-3 text-slate-600">{r.client}</td>
                  <td className="p-3 text-slate-600">{r.owner}</td>
                  <td className="p-3">
                    <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${ST_CLASS[r.st]}`}>
                      {ST_LABEL[r.st]}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 shrink-0 text-slate-500">{r.progress}%</span>
                      <span className="h-1.5 w-16 rounded-full bg-slate-100">
                        <span className={`block h-1.5 rounded-full ${BAR[r.st]}`} style={{ width: `${r.progress}%` }} />
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-slate-600">{r.start}</td>
                  <td className="p-3 text-slate-600">{r.end}</td>
                  <td className="p-3 font-medium text-slate-800">{r.budget}</td>
                  <td className="p-3 text-slate-600">{r.tasks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Последние задачи + круговые диаграммы */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Soʻnggi vazifalar</h4>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[460px] text-left text-[12px]">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400">
                  <th className="p-2 font-medium">Vazifa</th>
                  <th className="p-2 font-medium">Holat</th>
                  <th className="p-2 font-medium">Ustuvorlik</th>
                  <th className="p-2 font-medium">Muddat</th>
                </tr>
              </thead>
              <tbody>
                {TASKS.map((t) => (
                  <tr key={t.task} className="border-b border-slate-50 last:border-0">
                    <td className="p-2 text-slate-700">
                      {t.task}
                      <div className="text-[10px] text-slate-400">{t.project}</div>
                    </td>
                    <td className="p-2">
                      <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${TASK_ST[t.st].c}`}>
                        {TASK_ST[t.st].l}
                      </span>
                    </td>
                    <td className="p-2">
                      <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${PR_CLASS[t.pr]}`}>
                        {PR_LABEL[t.pr]}
                      </span>
                    </td>
                    <td className="p-2 text-slate-500">{t.due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">328 vazifadan 5 tasi</span>
            <span className="font-medium text-blue-600">Barcha vazifalarni koʻrish</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="mb-3 text-sm font-semibold text-slate-900">Holat boʻyicha loyihalar</h4>
            <div className="flex flex-col items-center gap-3">
              <Donut segments={['#3b82f6 0 62%', '#10b981 62% 82%', '#cbd5e1 82% 91%', '#ef4444 91% 100%']} />
              <div className="w-full"><Legend items={BY_STATUS} /></div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="mb-3 text-sm font-semibold text-slate-900">Ustuvorlik boʻyicha vazifalar</h4>
            <div className="flex flex-col items-center gap-3">
              <Donut segments={['#ef4444 0 29.9%', '#f59e0b 29.9% 73.2%', '#10b981 73.2% 100%']} />
              <div className="w-full"><Legend items={BY_PRIORITY} /></div>
            </div>
          </div>
        </div>
      </div>

      {/* Линейный график + горизонтальные бары */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Vazifalar bajarilishi dinamikasi</h4>
          <svg viewBox="0 0 300 120" className="h-32 w-full">
            <polyline points="10,90 45,60 80,52 115,44 150,40 185,36 220,34 255,30 290,28" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <polyline points="10,105 45,92 80,84 115,78 150,72 185,66 220,60 255,56 290,52" fill="none" stroke="#10b981" strokeWidth="2" />
          </svg>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Jami vazifalar</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Bajarilgan vazifalar</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Masʼullar boʻyicha loyihalar</h4>
          <div className="space-y-2">
            {BY_OWNER.map((o) => (
              <div key={o.label} className="flex items-center gap-3 text-[12px]">
                <span className="w-24 shrink-0 text-slate-600">{o.label}</span>
                <span className="h-2.5 flex-1 rounded-full bg-slate-100">
                  <span className="block h-2.5 rounded-full bg-blue-500" style={{ width: o.w }} />
                </span>
                <span className="w-16 shrink-0 text-slate-400">{o.n} ta loyiha</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
