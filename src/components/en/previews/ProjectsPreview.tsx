import { RefreshCw, MoreHorizontal, Plus, Filter } from 'lucide-react'
import AppShell from './AppShell'

/* Projects & Tasks module preview in English (LTR). */

const STATS: { label: string; value: string; delta: string; up: boolean }[] = [
  { label: 'Total projects', value: '24', delta: '20% vs last month', up: true },
  { label: 'Active projects', value: '16', delta: '14.3% vs last month', up: true },
  { label: 'Completed projects', value: '5', delta: '25% vs last month', up: true },
  { label: 'Overdue projects', value: '3', delta: '25% vs last month', up: false },
  { label: 'Total tasks', value: '328', delta: '18.7% vs last month', up: true },
  { label: 'Completed tasks', value: '212', delta: '22% vs last month', up: true },
]

type St = 'work' | 'done' | 'planned' | 'late'
const ST_LABEL: Record<St, string> = { work: 'In progress', done: 'Completed', planned: 'Planning', late: 'Overdue' }
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
  { name: 'Mobile app development', client: 'TechnoSoft', owner: 'S. Ivanova', st: 'work', progress: 65, start: '01.06.2025', end: '30.08.2025', budget: '750,000 SAR', tasks: '18 / 28' },
  { name: 'CRM system implementation', client: 'Business Partner', owner: 'K. Petrov', st: 'work', progress: 40, start: '15.05.2025', end: '15.07.2025', budget: '420,000 SAR', tasks: '12 / 30' },
  { name: 'Corporate website redesign', client: 'Smirnov Group', owner: 'M. Yermakova', st: 'done', progress: 100, start: '10.04.2025', end: '20.05.2025', budget: '180,000 SAR', tasks: '22 / 22' },
  { name: 'Q3 marketing campaign', client: 'MarketPro', owner: 'S. Nikolaev', st: 'work', progress: 70, start: '01.07.2025', end: '30.09.2025', budget: '300,000 SAR', tasks: '9 / 14' },
  { name: 'Warehouse automation', client: 'Sklad Komplekt', owner: 'D. Alimov', st: 'work', progress: 25, start: '20.06.2025', end: '20.09.2025', budget: '560,000 SAR', tasks: '7 / 26' },
  { name: 'Training portal', client: 'E-Learning Co.', owner: 'G. Olkhovskaya', st: 'planned', progress: 10, start: '01.08.2025', end: '31.10.2025', budget: '270,000 SAR', tasks: '3 / 20' },
  { name: 'New product launch', client: 'InnoTech', owner: 'M. Sharipov', st: 'late', progress: 15, start: '01.05.2025', end: '30.06.2025', budget: '900,000 SAR', tasks: '4 / 16' },
]

type Pr = 'high' | 'mid' | 'low'
const PR_LABEL: Record<Pr, string> = { high: 'High', mid: 'Medium', low: 'Low' }
const PR_CLASS: Record<Pr, string> = {
  high: 'bg-rose-50 text-rose-600',
  mid: 'bg-amber-50 text-amber-600',
  low: 'bg-emerald-50 text-emerald-600',
}

const TASKS: { task: string; project: string; owner: string; st: St | 'wait'; pr: Pr; due: string }[] = [
  { task: 'Configure payment gateway integration', project: 'Mobile app development', owner: 'S. Ivanova', st: 'work', pr: 'high', due: '15.07.2025' },
  { task: 'Prepare requirements specification', project: 'CRM system implementation', owner: 'K. Petrov', st: 'done', pr: 'mid', due: '05.07.2025' },
  { task: 'Design homepage UI', project: 'Corporate website redesign', owner: 'M. Yermakova', st: 'done', pr: 'mid', due: '30.06.2025' },
  { task: 'Build keyword list', project: 'Q3 marketing campaign', owner: 'S. Nikolaev', st: 'work', pr: 'high', due: '20.07.2025' },
  { task: 'Configure warehouse operations', project: 'Warehouse automation', owner: 'D. Alimov', st: 'wait', pr: 'mid', due: '25.07.2025' },
]
const TASK_ST: Record<St | 'wait', { l: string; c: string }> = {
  work: { l: 'In progress', c: 'bg-sky-50 text-sky-600' },
  done: { l: 'Completed', c: 'bg-emerald-50 text-emerald-600' },
  planned: { l: 'Planning', c: 'bg-slate-100 text-slate-500' },
  late: { l: 'Overdue', c: 'bg-rose-50 text-rose-600' },
  wait: { l: 'Waiting', c: 'bg-amber-50 text-amber-600' },
}

const BY_STATUS = [
  { label: 'In progress', value: '16 (66.7%)', color: '#3b82f6' },
  { label: 'Completed', value: '5 (20.8%)', color: '#10b981' },
  { label: 'Planning', value: '3 (12.5%)', color: '#cbd5e1' },
  { label: 'Overdue', value: '3 (12.5%)', color: '#ef4444' },
]

const BY_PRIORITY = [
  { label: 'High', value: '98 (29.9%)', color: '#ef4444' },
  { label: 'Medium', value: '142 (43.3%)', color: '#f59e0b' },
  { label: 'Low', value: '88 (26.8%)', color: '#10b981' },
]

const BY_OWNER = [
  { label: 'S. Ivanova', n: 5, w: '100%' },
  { label: 'K. Petrov', n: 4, w: '80%' },
  { label: 'M. Yermakova', n: 4, w: '80%' },
  { label: 'S. Nikolaev', n: 3, w: '60%' },
  { label: 'D. Alimov', n: 3, w: '60%' },
  { label: 'Other', n: 5, w: '100%' },
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
      breadcrumb={['Projects & Tasks', 'Overview']}
      reports={['Projects', 'Tasks', 'Time & Costs', 'Gantt Chart', 'Project Reports', 'Task Reports']}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">Projects & Tasks Overview</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] text-slate-600">Actions</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <RefreshCw size={14} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <MoreHorizontal size={14} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-[13px] font-semibold text-white">
            <Plus size={14} /> New Project
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
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Project status</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Owner</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Client</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">Period</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-600">
          <Filter size={13} /> Filter
        </span>
      </div>

      {/* Projects table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="mb-1 px-4 pt-4 text-sm font-semibold text-slate-900">Projects</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1040px] text-left text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="p-3 font-medium">Project name</th>
                <th className="p-3 font-medium">Client</th>
                <th className="p-3 font-medium">Owner</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Progress</th>
                <th className="p-3 font-medium">Start date</th>
                <th className="p-3 font-medium">End date</th>
                <th className="p-3 font-medium">Budget</th>
                <th className="p-3 font-medium">Tasks</th>
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

      {/* Recent tasks + donut charts */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Recent tasks</h4>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[460px] text-left text-[12px]">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400">
                  <th className="p-2 font-medium">Task</th>
                  <th className="p-2 font-medium">Status</th>
                  <th className="p-2 font-medium">Priority</th>
                  <th className="p-2 font-medium">Due date</th>
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
            <span className="text-slate-400">5 of 328 tasks</span>
            <span className="font-medium text-blue-600">View all tasks</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="mb-3 text-sm font-semibold text-slate-900">Projects by status</h4>
            <div className="flex flex-col items-center gap-3">
              <Donut segments={['#3b82f6 0 62%', '#10b981 62% 82%', '#cbd5e1 82% 91%', '#ef4444 91% 100%']} />
              <div className="w-full"><Legend items={BY_STATUS} /></div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="mb-3 text-sm font-semibold text-slate-900">Tasks by priority</h4>
            <div className="flex flex-col items-center gap-3">
              <Donut segments={['#ef4444 0 29.9%', '#f59e0b 29.9% 73.2%', '#10b981 73.2% 100%']} />
              <div className="w-full"><Legend items={BY_PRIORITY} /></div>
            </div>
          </div>
        </div>
      </div>

      {/* Line chart + horizontal bars */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Task completion trend</h4>
          <svg viewBox="0 0 300 120" className="h-32 w-full">
            <polyline points="10,90 45,60 80,52 115,44 150,40 185,36 220,34 255,30 290,28" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <polyline points="10,105 45,92 80,84 115,78 150,72 185,66 220,60 255,56 290,52" fill="none" stroke="#10b981" strokeWidth="2" />
          </svg>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Total tasks</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Completed tasks</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Projects by owner</h4>
          <div className="space-y-2">
            {BY_OWNER.map((o) => (
              <div key={o.label} className="flex items-center gap-3 text-[12px]">
                <span className="w-24 shrink-0 text-slate-600">{o.label}</span>
                <span className="h-2.5 flex-1 rounded-full bg-slate-100">
                  <span className="block h-2.5 rounded-full bg-blue-500" style={{ width: o.w }} />
                </span>
                <span className="w-16 shrink-0 text-slate-400">{o.n} projects</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
