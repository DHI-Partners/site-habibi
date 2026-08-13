import { RefreshCw, MoreHorizontal, Plus, Filter, MessageSquare, ChevronRight, ChevronLeft } from 'lucide-react'
import AppShell from './AppShell'

/* معاينة وحدة الموقع والطلبات — لوحة «الطلبات» باللغة العربية (RTL). */

const STATS: { label: string; value: string; delta: string; up: boolean }[] = [
  { label: 'إجمالي الطلبات', value: '128', delta: '18% عن الشهر الماضي', up: true },
  { label: 'طلبات جديدة', value: '32', delta: '10% عن الشهر الماضي', up: true },
  { label: 'قيد المعالجة', value: '45', delta: '5% عن الشهر الماضي', up: true },
  { label: 'محوّلة إلى عملاء محتملين', value: '28', delta: '12% عن الشهر الماضي', up: true },
  { label: 'مرفوضة', value: '23', delta: '8% عن الشهر الماضي', up: false },
]

type St = 'new' | 'work' | 'conv' | 'rej'
const ST: Record<St, { l: string; c: string }> = {
  new: { l: 'جديد', c: 'bg-sky-50 text-sky-600' },
  work: { l: 'قيد المعالجة', c: 'bg-amber-50 text-amber-600' },
  conv: { l: 'محوّل', c: 'bg-emerald-50 text-emerald-600' },
  rej: { l: 'مرفوض', c: 'bg-rose-50 text-rose-600' },
}

const ROWS: {
  id: string
  st: St
  site: string
  source: string
  form: string
  created: string
  comments: number
}[] = [
  { id: 'طلب-000128', st: 'new', site: 'habibi-system.com', source: 'نموذج على الموقع', form: 'النموذج: تواصل', created: '30.07.2025 14:35', comments: 0 },
  { id: 'طلب-000127', st: 'work', site: 'habibi-system.com', source: 'دردشة الموقع', form: 'النموذج: استشارة', created: '30.07.2025 12:18', comments: 0 },
  { id: 'طلب-000126', st: 'conv', site: 'habibi-system.com', source: 'نموذج على الموقع', form: 'النموذج: طلب عرض توضيحي', created: '30.07.2025 11:05', comments: 2 },
  { id: 'طلب-000125', st: 'new', site: 'habibi-system.com', source: 'Instagram', form: 'النموذج: تواصل', created: '29.07.2025 18:42', comments: 0 },
  { id: 'طلب-000124', st: 'work', site: 'habibi-system.com', source: 'نموذج على الموقع', form: 'النموذج: استشارة', created: '29.07.2025 16:30', comments: 1 },
  { id: 'طلب-000123', st: 'rej', site: 'habibi-system.com', source: 'إعلان Google', form: 'النموذج: طلب عرض توضيحي', created: '29.07.2025 15:10', comments: 0 },
  { id: 'طلب-000122', st: 'conv', site: 'habibi-system.com', source: 'WhatsApp', form: 'النموذج: تواصل', created: '29.07.2025 13:47', comments: 3 },
  { id: 'طلب-000121', st: 'work', site: 'habibi-system.com', source: 'نموذج على الموقع', form: 'النموذج: استشارة', created: '28.07.2025 17:55', comments: 0 },
  { id: 'طلب-000120', st: 'new', site: 'habibi-system.com', source: 'Telegram', form: 'النموذج: طلب عرض توضيحي', created: '28.07.2025 16:20', comments: 0 },
  { id: 'طلب-000119', st: 'rej', site: 'habibi-system.com', source: 'إعلان Facebook', form: 'النموذج: تواصل', created: '28.07.2025 14:05', comments: 0 },
]

export default function SiteLeadsPreview() {
  return (
    <AppShell
      active="website"
      breadcrumb={['الموقع', 'الطلبات']}
      reports={['الطلبات', 'زوّار الموقع', 'صفحات الموقع', 'العملاء المحتملون', 'جهات الاتصال']}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">الطلبات</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] text-slate-600">عرض</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <RefreshCw size={14} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <MoreHorizontal size={14} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-[13px] font-semibold text-white">
            <Plus size={14} /> إضافة طلب
          </span>
        </div>
      </div>

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

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">الاسم</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">الحالة</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">المصدر</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">النموذج</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">من تاريخ</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">إلى تاريخ</span>
        <span className="mr-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-600">
          <Filter size={13} /> تصفية
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-right text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="p-3 font-medium">الاسم</th>
                <th className="p-3 font-medium">الحالة</th>
                <th className="p-3 font-medium">اسم الموقع</th>
                <th className="p-3 font-medium">المصدر</th>
                <th className="p-3 font-medium">النموذج</th>
                <th className="p-3 font-medium">تاريخ الإنشاء</th>
                <th className="p-3 font-medium">تعليقات</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.id} className="border-b border-slate-50 last:border-0">
                  <td className="p-3 font-medium text-slate-800">{r.id}</td>
                  <td className="p-3">
                    <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${ST[r.st].c}`}>{ST[r.st].l}</span>
                  </td>
                  <td className="p-3 text-slate-500">{r.site}</td>
                  <td className="p-3 text-slate-600">{r.source}</td>
                  <td className="p-3 text-slate-600">{r.form}</td>
                  <td className="p-3 text-slate-500">{r.created}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 text-slate-400">
                      <MessageSquare size={13} /> {r.comments}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-slate-100 p-3">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] text-slate-500">20 لكل صفحة</span>
          <div className="flex items-center gap-1 text-[12px]">
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400">
              <ChevronRight size={14} />
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
              <ChevronLeft size={14} />
            </span>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
