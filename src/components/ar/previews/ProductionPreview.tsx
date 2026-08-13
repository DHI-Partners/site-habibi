import { RefreshCw, MoreHorizontal, Plus, Filter, ChevronRight, ChevronLeft } from 'lucide-react'
import AppShell from './AppShell'

/* معاينة وحدة الإنتاج — لوحة «نظرة عامة على الإنتاج» باللغة العربية (RTL). */

const STATS: { label: string; value: string; delta: string; up: boolean }[] = [
  { label: 'إجمالي أوامر الإنتاج', value: '124', delta: '15.3% عن الشهر الماضي', up: true },
  { label: 'قيد التنفيذ', value: '38', delta: '8.6% عن الشهر الماضي', up: true },
  { label: 'مكتمل', value: '72', delta: '22.1% عن الشهر الماضي', up: true },
  { label: 'متأخّر', value: '6', delta: '14.3% عن الشهر الماضي', up: false },
  { label: 'إجمالي المنتَج', value: '1,458,350 ر.س', delta: '17.8% عن الشهر الماضي', up: true },
  { label: 'كفاءة الإنتاج', value: '89.4%', delta: '5.7% عن الشهر الماضي', up: true },
]

type St = 'work' | 'done' | 'planned' | 'late'
const ST_LABEL: Record<St, string> = {
  work: 'قيد التنفيذ',
  done: 'مكتمل',
  planned: 'مجدوَل',
  late: 'متأخّر',
}
const ST_CLASS: Record<St, string> = {
  work: 'bg-sky-50 text-sky-600',
  done: 'bg-emerald-50 text-emerald-600',
  planned: 'bg-slate-100 text-slate-500',
  late: 'bg-rose-50 text-rose-600',
}
const BAR: Record<St, string> = {
  work: 'bg-sky-500',
  done: 'bg-emerald-500',
  planned: 'bg-slate-300',
  late: 'bg-rose-500',
}

const ROWS: {
  id: string
  product: string
  qty: string
  planned: string
  st: St
  progress: number
  center: string
  owner: string
}[] = [
  { id: 'MO-2025-00124', product: 'هيكل جهاز X1', qty: '500', planned: '30 يوليو 2025', st: 'work', progress: 65, center: 'ورشة التجميع 1', owner: 'مارات أحمدوف' },
  { id: 'MO-2025-00123', product: 'لوحة تحكّم A3', qty: '1,000', planned: '28 يوليو 2025', st: 'work', progress: 40, center: 'ورشة الإلكترونيات', owner: 'سفيتلانا إيفانوفا' },
  { id: 'MO-2025-00122', product: 'وحدة طاقة 500W', qty: '800', planned: '25 يوليو 2025', st: 'done', progress: 100, center: 'ورشة التجميع 2', owner: 'قسطنطين بيتروف' },
  { id: 'MO-2025-00121', product: 'هيكل جهاز X1', qty: '300', planned: '24 يوليو 2025', st: 'done', progress: 100, center: 'ورشة التجميع 1', owner: 'ماريا يرماكوفا' },
  { id: 'MO-2025-00120', product: 'لوحة تحكّم A3', qty: '500', planned: '26 يوليو 2025', st: 'work', progress: 70, center: 'ورشة الإلكترونيات', owner: 'سيرجي نيكولايف' },
  { id: 'MO-2025-00119', product: 'كابل طاقة 1.5م', qty: '2,000', planned: '23 يوليو 2025', st: 'done', progress: 100, center: 'ورشة الكابلات', owner: 'دينيس عليموف' },
  { id: 'MO-2025-00118', product: 'وحدة اتصال WiFi', qty: '700', planned: '31 يوليو 2025', st: 'work', progress: 20, center: 'ورشة الإلكترونيات', owner: 'غالينا أولخوفسكايا' },
  { id: 'MO-2025-00117', product: 'شاشة 7 بوصات', qty: '600', planned: '05 أغسطس 2025', st: 'planned', progress: 0, center: 'ورشة التجميع 2', owner: 'محمد شاريبوف' },
  { id: 'MO-2025-00116', product: 'بطارية 3000mAh', qty: '1,200', planned: '02 أغسطس 2025', st: 'planned', progress: 0, center: 'ورشة البطاريات', owner: 'مارات أحمدوف' },
  { id: 'MO-2025-00115', product: 'هيكل جهاز X1', qty: '400', planned: '29 يوليو 2025', st: 'late', progress: 10, center: 'ورشة التجميع 1', owner: 'سفيتلانا إيفانوفا' },
]

const STATUS_DIST = [
  { label: 'قيد التنفيذ', value: '38 (30.6%)', color: '#3b82f6' },
  { label: 'مكتمل', value: '72 (58.1%)', color: '#10b981' },
  { label: 'مجدوَل', value: '8 (6.5%)', color: '#cbd5e1' },
  { label: 'متأخّر', value: '6 (4.8%)', color: '#ef4444' },
]

const BY_CENTER = [
  { label: 'ورشة التجميع 1', value: '545,230 ر.س (37.4%)', color: '#3b82f6' },
  { label: 'ورشة الإلكترونيات', value: '420,600 ر.س (28.8%)', color: '#10b981' },
  { label: 'ورشة التجميع 2', value: '258,750 ر.س (17.7%)', color: '#f59e0b' },
  { label: 'ورشة الكابلات', value: '123,600 ر.س (8.5%)', color: '#a78bfa' },
  { label: 'أخرى', value: '110,170 ر.س (7.6%)', color: '#cbd5e1' },
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

export default function ProductionPreview() {
  return (
    <AppShell
      active="manufacturing"
      breadcrumb={['الإنتاج', 'نظرة عامة على الإنتاج']}
      reports={['أوامر الإنتاج', 'تخطيط الإنتاج', 'المواد', 'مراكز العمل', 'المسارات', 'تقارير الإنتاج', 'التحليلات']}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">نظرة عامة على الإنتاج</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] text-slate-600">إجراءات</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <RefreshCw size={14} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <MoreHorizontal size={14} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-[13px] font-semibold text-white">
            <Plus size={14} /> أمر إنتاج جديد
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
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">مركز العمل</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">الحالة</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">المنتج</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">من تاريخ</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">إلى تاريخ</span>
        <span className="mr-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-600">
          <Filter size={13} /> تصفية
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="mb-1 px-4 pt-4 text-sm font-semibold text-slate-900">أوامر الإنتاج</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-right text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="p-3 font-medium">رقم الأمر</th>
                <th className="p-3 font-medium">المنتج</th>
                <th className="p-3 font-medium">الكمية</th>
                <th className="p-3 font-medium">المجدوَل</th>
                <th className="p-3 font-medium">الحالة</th>
                <th className="p-3 font-medium">التقدّم</th>
                <th className="p-3 font-medium">مركز العمل</th>
                <th className="p-3 font-medium">المسؤول</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.id} className="border-b border-slate-50 last:border-0">
                  <td className="p-3 font-medium text-blue-600">{r.id}</td>
                  <td className="p-3 text-slate-700">{r.product}</td>
                  <td className="p-3 text-slate-600">{r.qty}</td>
                  <td className="p-3 text-slate-600">{r.planned}</td>
                  <td className="p-3">
                    <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${ST_CLASS[r.st]}`}>
                      {ST_LABEL[r.st]}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 shrink-0 text-slate-500">{r.progress}%</span>
                      <span className="h-1.5 w-20 rounded-full bg-slate-100">
                        <span
                          className={`block h-1.5 rounded-full ${BAR[r.st]}`}
                          style={{ width: `${r.progress}%` }}
                        />
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-slate-600">{r.center}</td>
                  <td className="p-3 text-slate-600">{r.owner}</td>
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

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">الإنتاج خلال الفترة</h4>
          <svg viewBox="0 0 300 120" className="h-32 w-full">
            <polyline points="10,80 45,70 80,66 115,58 150,50 185,44 220,38 255,30 290,24" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <polyline points="10,100 45,96 80,92 115,88 150,82 185,78 220,72 255,66 290,60" fill="none" stroke="#10b981" strokeWidth="2" />
          </svg>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> مخطَّط</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> منجَز</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">حالة أوامر الإنتاج</h4>
          <div className="flex items-center gap-4">
            <Donut
              segments={[
                '#3b82f6 0 30.6%',
                '#10b981 30.6% 88.7%',
                '#cbd5e1 88.7% 95.2%',
                '#ef4444 95.2% 100%',
              ]}
            />
            <div className="min-w-0 flex-1"><Legend items={STATUS_DIST} /></div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">المنتَج حسب مراكز العمل</h4>
          <div className="flex items-center gap-4">
            <Donut
              segments={[
                '#3b82f6 0 37.4%',
                '#10b981 37.4% 66.2%',
                '#f59e0b 66.2% 83.9%',
                '#a78bfa 83.9% 92.4%',
                '#cbd5e1 92.4% 100%',
              ]}
            />
            <div className="min-w-0 flex-1"><Legend items={BY_CENTER} /></div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
