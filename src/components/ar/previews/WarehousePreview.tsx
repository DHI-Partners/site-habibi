import { RefreshCw, MoreHorizontal, Plus, Filter, ChevronRight, ChevronLeft } from 'lucide-react'
import AppShell from './AppShell'

/* معاينة وحدة المخزون — لوحة «نظرة عامة على المخزون» باللغة العربية (RTL). */

const STATS: { label: string; value: string; delta: string; up: boolean; sub?: string }[] = [
  { label: 'إجمالي قيمة المخزون', value: '2,458,750 ر.س', delta: '12.5% عن الشهر الماضي', up: true },
  { label: 'إجمالي عدد الأصناف', value: '1,245', delta: '8.3% عن الشهر الماضي', up: true },
  { label: 'أصناف بمخزون منخفض', value: '28', delta: '16.7% عن الشهر الماضي', up: true },
  { label: 'أصناف بلا حركة', value: '34', delta: '9.1% عن الشهر الماضي', up: true },
  { label: 'المخازن', value: '7', delta: 'مخازن نشطة', up: true, sub: 'plain' },
]

type St = 'in' | 'low' | 'out'
const ST_LABEL: Record<St, string> = { in: 'متوفّر', low: 'مخزون منخفض', out: 'غير متوفّر' }
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
  { name: 'هاتف Samsung Galaxy S23', code: 'TG-0001', wh: 'المخزن الرئيسي', group: 'إلكترونيات', qty: 45, unit: 'قطعة', cost: '337,500 ر.س', st: 'in' },
  { name: 'لابتوب Acer Aspire 5', code: 'TG-0002', wh: 'المخزن الرئيسي', group: 'إلكترونيات', qty: 18, unit: 'قطعة', cost: '540,000 ر.س', st: 'in' },
  { name: 'قهوة حبوب Arabica 1 كجم', code: 'TG-0003', wh: 'مخزن المقهى', group: 'مواد غذائية', qty: 120, unit: 'قطعة', cost: '18,000 ر.س', st: 'in' },
  { name: 'ورق مكتبي A4 (500 ورقة)', code: 'TG-0004', wh: 'المخزن الرئيسي', group: 'قرطاسية', qty: 200, unit: 'رزمة', cost: '20,000 ر.س', st: 'in' },
  { name: 'طابعة Canon PIXMA G3411', code: 'TG-0005', wh: 'المخزن الرئيسي', group: 'إلكترونيات', qty: 7, unit: 'قطعة', cost: '98,000 ر.س', st: 'low' },
  { name: 'كرسي مكتبي Comfort', code: 'TG-0006', wh: 'مخزن الأثاث', group: 'أثاث', qty: 15, unit: 'قطعة', cost: '37,500 ر.س', st: 'low' },
  { name: 'خبز قمح', code: 'TG-0007', wh: 'مخزن المتجر', group: 'مواد غذائية', qty: 0, unit: 'قطعة', cost: '0 ر.س', st: 'out' },
  { name: 'مياه معدنية 0.5 لتر', code: 'TG-0008', wh: 'مخزن المتجر', group: 'مشروبات', qty: 320, unit: 'قطعة', cost: '12,800 ر.س', st: 'in' },
  { name: 'شاشة LG 24MP59G-P', code: 'TG-0009', wh: 'المخزن الرئيسي', group: 'إلكترونيات', qty: 5, unit: 'قطعة', cost: '59,500 ر.س', st: 'low' },
  { name: 'دفتر 96 ورقة', code: 'TG-0010', wh: 'المخزن الرئيسي', group: 'قرطاسية', qty: 150, unit: 'قطعة', cost: '11,250 ر.س', st: 'in' },
]

const BY_WAREHOUSE = [
  { label: 'المخزن الرئيسي', value: '1,245,000 ر.س (50.6%)', color: '#3b82f6' },
  { label: 'مخزن المتجر', value: '645,000 ر.س (26.2%)', color: '#10b981' },
  { label: 'مخزن المقهى', value: '280,000 ر.س (11.4%)', color: '#f59e0b' },
  { label: 'مخزن الأثاث', value: '210,000 ر.س (8.5%)', color: '#ef4444' },
  { label: 'مخزن قيد النقل', value: '78,750 ر.س (3.3%)', color: '#cbd5e1' },
]

const BY_STATUS = [
  { label: 'متوفّر', value: '923 (74.1%)', color: '#10b981' },
  { label: 'مخزون منخفض', value: '156 (12.5%)', color: '#f59e0b' },
  { label: 'غير متوفّر', value: '78 (6.3%)', color: '#ef4444' },
  { label: 'بلا حركة', value: '88 (7.1%)', color: '#cbd5e1' },
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
      breadcrumb={['المخزون', 'نظرة عامة على المخزون']}
      reports={['المخزون', 'حركة الأصناف', 'تقارير المخزون', 'تقييم المخزون', 'الصلاحية', 'الأرقام التسلسلية']}
    >
      {/* رأس الصفحة */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">نظرة عامة على المخزون</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] text-slate-600">إجراءات</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <RefreshCw size={14} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <MoreHorizontal size={14} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-[13px] font-semibold text-white">
            <Plus size={14} /> مستند مخزون جديد
          </span>
        </div>
      </div>

      {/* البطاقات الإحصائية */}
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

      {/* صف الفلاتر */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">المخزن</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">مجموعة الأصناف</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">الصنف</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">الحالة</span>
        <span className="mr-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-600">
          <Filter size={13} /> تصفية
        </span>
      </div>

      {/* الجدول */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="mb-1 px-4 pt-4 text-sm font-semibold text-slate-900">الأصناف في المخزون</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-right text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="p-3 font-medium">الصنف</th>
                <th className="p-3 font-medium">رمز الصنف</th>
                <th className="p-3 font-medium">المخزن</th>
                <th className="p-3 font-medium">المجموعة</th>
                <th className="p-3 font-medium">الكمية</th>
                <th className="p-3 font-medium">الوحدة</th>
                <th className="p-3 font-medium">القيمة</th>
                <th className="p-3 font-medium">الحالة</th>
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

      {/* الرسوم البيانية */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">حركة الأصناف (آخر 30 يومًا)</h4>
          <svg viewBox="0 0 300 120" className="h-32 w-full">
            <polyline points="10,80 45,72 80,74 115,60 150,58 185,45 220,48 255,35 290,30" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <polyline points="10,95 45,90 80,88 115,85 150,80 185,82 220,78 255,76 290,72" fill="none" stroke="#10b981" strokeWidth="2" />
            <polyline points="10,105 45,102 80,104 115,100 150,101 185,98 220,99 255,96 290,97" fill="none" stroke="#ef4444" strokeWidth="2" />
          </svg>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> وارد</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-500" /> صادر</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> الرصيد</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">قيمة المخزون حسب المخازن</h4>
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
          <h4 className="mb-3 text-sm font-semibold text-slate-900">الأصناف حسب الحالة</h4>
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
