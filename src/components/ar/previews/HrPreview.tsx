import { RefreshCw, MoreHorizontal, Plus, Filter, ChevronRight, ChevronLeft } from 'lucide-react'
import AppShell from './AppShell'

/* معاينة وحدة الموارد البشرية والرواتب باللغة العربية (RTL). */

const STATS: { label: string; value: string; delta: string; up?: boolean; plain?: boolean; color?: string }[] = [
  { label: 'إجمالي الموظفين', value: '48', delta: '8.9% عن الشهر الماضي', up: true },
  { label: 'الحاضرون اليوم', value: '42', delta: '87.5% من الإجمالي', plain: true },
  { label: 'موظفون جدد', value: '5', delta: '25% عن الشهر الماضي', up: true },
  { label: 'إجمالي الرواتب', value: '1,245,750 ر.س', delta: '12.3% عن الشهر الماضي', up: true },
  { label: 'المدفوع هذا الشهر', value: '985,340 ر.س', delta: '79.1% من إجمالي الرواتب', plain: true, color: 'text-blue-600' },
  { label: 'متوسط الراتب', value: '25,953 ر.س', delta: '7.2% عن الشهر الماضي', up: true },
]

const ROWS: {
  name: string
  ini: string
  ic: string
  role: string
  dept: string
  hired: string
  active: boolean
  salary: string
  schedule: string
}[] = [
  { name: 'مارات أحمدوف', ini: 'م أ', ic: 'bg-blue-100 text-blue-700', role: 'مدير مبيعات', dept: 'قسم المبيعات', hired: '15.03.2024', active: true, salary: '35,000 ر.س', schedule: 'دوام كامل' },
  { name: 'سفيتلانا إيفانوفا', ini: 'س إ', ic: 'bg-emerald-100 text-emerald-700', role: 'محاسِبة', dept: 'القسم المالي', hired: '10.01.2023', active: true, salary: '42,000 ر.س', schedule: 'دوام كامل' },
  { name: 'قسطنطين بيتروف', ini: 'ق ب', ic: 'bg-amber-100 text-amber-700', role: 'رئيس قسم', dept: 'قسم المبيعات', hired: '05.07.2022', active: true, salary: '75,000 ر.س', schedule: 'دوام كامل' },
  { name: 'ماريا يرماكوفا', ini: 'م ي', ic: 'bg-violet-100 text-violet-700', role: 'مدير موارد بشرية', dept: 'قسم الموارد البشرية', hired: '01.02.2024', active: true, salary: '45,000 ر.س', schedule: 'دوام كامل' },
  { name: 'سيرجي نيكولايف', ini: 'س ن', ic: 'bg-rose-100 text-rose-700', role: 'مسؤول أنظمة', dept: 'قسم تقنية المعلومات', hired: '20.08.2023', active: true, salary: '50,000 ر.س', schedule: 'دوام كامل' },
  { name: 'دينيس عليموف', ini: 'د ع', ic: 'bg-sky-100 text-sky-700', role: 'مصمّم', dept: 'التسويق', hired: '12.04.2024', active: false, salary: '40,000 ر.س', schedule: 'دوام كامل' },
  { name: 'غالينا أولخوفسكايا', ini: 'غ أ', ic: 'bg-teal-100 text-teal-700', role: 'مدير مشتريات', dept: 'قسم المشتريات', hired: '18.11.2023', active: true, salary: '38,000 ر.س', schedule: 'دوام كامل' },
  { name: 'محمد شاريبوف', ini: 'م ش', ic: 'bg-orange-100 text-orange-700', role: 'عامل مخزن', dept: 'المخزن', hired: '25.02.2024', active: true, salary: '28,000 ر.س', schedule: 'نظام ورديات' },
]

const BY_DEPT = [
  { label: 'قسم المبيعات', value: '425,000 ر.س (34.1%)', color: '#3b82f6' },
  { label: 'القسم المالي', value: '210,000 ر.س (16.8%)', color: '#10b981' },
  { label: 'قسم تقنية المعلومات', value: '180,000 ر.س (14.4%)', color: '#f59e0b' },
  { label: 'التسويق', value: '145,000 ر.س (11.6%)', color: '#a78bfa' },
  { label: 'قسم المشتريات', value: '95,000 ر.س (7.6%)', color: '#06b6d4' },
  { label: 'أخرى', value: '190,750 ر.س (15.5%)', color: '#cbd5e1' },
]

const BY_STATUS = [
  { label: 'نشِط', value: '40 (83.3%)', color: '#10b981' },
  { label: 'في إجازة', value: '3 (6.2%)', color: '#f59e0b' },
  { label: 'إجازة مرضية', value: '1 (2.1%)', color: '#ef4444' },
  { label: 'منتهية خدمته', value: '4 (8.4%)', color: '#3b82f6' },
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

export default function HrPreview() {
  return (
    <AppShell
      active="hr"
      breadcrumb={['الموارد البشرية والرواتب', 'نظرة عامة']}
      reports={['الموظفون', 'الرواتب', 'الحضور', 'الإجازات', 'الإجازات المرضية', 'الأداء', 'تقارير الموارد البشرية']}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">الموارد البشرية والرواتب</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] text-slate-600">إجراءات</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <RefreshCw size={14} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <MoreHorizontal size={14} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-[13px] font-semibold text-white">
            <Plus size={14} /> موظف جديد
          </span>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-[12px] text-slate-500">{s.label}</div>
            <div className={`mt-1 text-lg font-bold ${s.color ?? 'text-slate-900'}`}>{s.value}</div>
            <div
              className={`mt-1 text-[11px] ${
                s.plain ? 'text-slate-400' : s.up ? 'text-emerald-600' : 'text-rose-500'
              }`}
            >
              {s.plain ? '' : s.up ? '▲ ' : '▼ '}
              {s.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">القسم</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">المنصب</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">الحالة</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">يوليو 2025</span>
        <span className="mr-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-600">
          <Filter size={13} /> تصفية
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="mb-1 px-4 pt-4 text-sm font-semibold text-slate-900">الموظفون</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-right text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="p-3 font-medium">الاسم</th>
                <th className="p-3 font-medium">المنصب</th>
                <th className="p-3 font-medium">القسم</th>
                <th className="p-3 font-medium">تاريخ التعيين</th>
                <th className="p-3 font-medium">الحالة</th>
                <th className="p-3 font-medium">الراتب (شهريًا)</th>
                <th className="p-3 font-medium">نظام العمل</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.name} className="border-b border-slate-50 last:border-0">
                  <td className="p-3">
                    <span className="flex items-center gap-2">
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${r.ic}`}>
                        {r.ini}
                      </span>
                      <span className="text-slate-700">{r.name}</span>
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">{r.role}</td>
                  <td className="p-3 text-slate-600">{r.dept}</td>
                  <td className="p-3 text-slate-600">{r.hired}</td>
                  <td className="p-3">
                    <span
                      className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                        r.active ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}
                    >
                      {r.active ? 'نشِط' : 'في إجازة'}
                    </span>
                  </td>
                  <td className="p-3 font-medium text-slate-800">{r.salary}</td>
                  <td className="p-3 text-slate-600">{r.schedule}</td>
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
            {['1', '2', '3'].map((n) => (
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
          <h4 className="mb-3 text-sm font-semibold text-slate-900">تطوّر إجمالي الرواتب</h4>
          <svg viewBox="0 0 300 120" className="h-32 w-full">
            <polyline points="10,80 60,72 110,58 160,52 210,42 260,36 290,30" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <polyline points="10,98 60,92 110,84 160,78 210,70 260,62 290,56" fill="none" stroke="#10b981" strokeWidth="2" />
          </svg>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> إجمالي الرواتب</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> المدفوع</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">الرواتب حسب الأقسام</h4>
          <div className="flex items-center gap-4">
            <Donut
              segments={[
                '#3b82f6 0 34.1%',
                '#10b981 34.1% 50.9%',
                '#f59e0b 50.9% 65.3%',
                '#a78bfa 65.3% 76.9%',
                '#06b6d4 76.9% 84.5%',
                '#cbd5e1 84.5% 100%',
              ]}
            />
            <div className="min-w-0 flex-1"><Legend items={BY_DEPT} /></div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">حالة الموظفين</h4>
          <div className="flex items-center gap-4">
            <Donut
              segments={[
                '#10b981 0 83.3%',
                '#f59e0b 83.3% 89.5%',
                '#ef4444 89.5% 91.6%',
                '#3b82f6 91.6% 100%',
              ]}
            />
            <div className="min-w-0 flex-1"><Legend items={BY_STATUS} /></div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
