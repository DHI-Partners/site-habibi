import { RefreshCw, MoreHorizontal, Plus, Filter } from 'lucide-react'
import AppShell from './AppShell'

/* معاينة وحدة التجزئة (POS) باللغة العربية (RTL). */

const STATS: { label: string; value: string; delta: string; up?: boolean; plain?: boolean }[] = [
  { label: 'إجمالي المبيعات', value: '1,785,250 ر.س', delta: '18.7% عن الشهر الماضي', up: true },
  { label: 'عدد العمليات', value: '2,458', delta: '16.2% عن الشهر الماضي', up: true },
  { label: 'متوسط الفاتورة', value: '726.98 ر.س', delta: '2.8% عن الشهر الماضي', up: true },
  { label: 'المرتجعات', value: '45,250 ر.س', delta: '9.4% عن الشهر الماضي', up: false },
  { label: 'الربح (الإجمالي)', value: '612,340 ر.س', delta: '15.6% عن الشهر الماضي', up: true },
  { label: 'صناديق نشطة', value: '6', delta: 'من 8 صناديق', plain: true },
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
  { id: 'POS-2025-00789', dt: '31.07.2025 19:45', reg: 'صندوق 1', store: 'متجر الروضة', cashier: 'أ. سميرنوفا', amount: '2,450 ر.س', pay: 'بطاقة', done: true },
  { id: 'POS-2025-00788', dt: '31.07.2025 19:12', reg: 'صندوق 2', store: 'مركز قوس قزح', cashier: 'ب. إيفانوف', amount: '1,200 ر.س', pay: 'نقدًا', done: true },
  { id: 'POS-2025-00787', dt: '31.07.2025 18:33', reg: 'صندوق 3', store: 'متجر الروضة', cashier: 'أ. سميرنوفا', amount: '850 ر.س', pay: 'بطاقة', done: true },
  { id: 'POS-2025-00786', dt: '31.07.2025 18:05', reg: 'صندوق 1', store: 'متجر الروضة', cashier: 'أ. سميرنوفا', amount: '3,150 ر.س', pay: 'مختلط', done: true },
  { id: 'POS-2025-00785', dt: '31.07.2025 17:41', reg: 'صندوق 4', store: 'مركز ميغا', cashier: 'أ. كوزنيتسوفا', amount: '1,750 ر.س', pay: 'بطاقة', done: true },
  { id: 'POS-2025-00784', dt: '31.07.2025 17:21', reg: 'صندوق 2', store: 'مركز قوس قزح', cashier: 'ب. إيفانوف', amount: '980 ر.س', pay: 'نقدًا', done: true },
  { id: 'POS-2025-00783', dt: '31.07.2025 16:58', reg: 'صندوق 3', store: 'متجر الروضة', cashier: 'أ. سميرنوفا', amount: '2,200 ر.س', pay: 'بطاقة', done: false },
  { id: 'POS-2025-00782', dt: '31.07.2025 16:30', reg: 'صندوق 1', store: 'متجر الروضة', cashier: 'أ. سميرنوفا', amount: '1,450 ر.س', pay: 'نقدًا', done: true },
]

const BY_STORE = [
  { label: 'متجر الروضة', value: '825,450 ر.س (46.2%)', color: '#3b82f6' },
  { label: 'مركز قوس قزح', value: '567,300 ر.س (31.8%)', color: '#10b981' },
  { label: 'مركز ميغا', value: '312,500 ر.س (17.5%)', color: '#f59e0b' },
  { label: 'متجر السلام', value: '80,000 ر.س (4.5%)', color: '#cbd5e1' },
]
const BY_PAY = [
  { label: 'بطاقة', value: '1,048,250 ر.س (58.7%)', color: '#3b82f6' },
  { label: 'نقدًا', value: '562,800 ر.س (31.5%)', color: '#10b981' },
  { label: 'مختلط', value: '174,200 ر.س (9.8%)', color: '#f59e0b' },
]
const TOP_PRODUCTS: [string, string, string][] = [
  ['هاتف Samsung Galaxy A54', '58 قطعة', '348,000 ر.س'],
  ['سماعات JBL لاسلكية', '97 قطعة', '242,500 ر.س'],
  ['ماكينة قهوة Philips EP2231', '31 قطعة', '155,000 ر.س'],
  ['ساعة CASIO', '74 قطعة', '111,000 ر.س'],
  ['مكبر صوت Xiaomi محمول', '66 قطعة', '99,000 ر.س'],
]
const REGISTERS: [string, string, string, boolean][] = [
  ['صندوق 1', 'متجر الروضة', 'أ. سميرنوفا', true],
  ['صندوق 2', 'مركز قوس قزح', 'ب. إيفانوف', true],
  ['صندوق 3', 'متجر الروضة', 'أ. سميرنوفا', true],
  ['صندوق 4', 'مركز ميغا', 'أ. كوزنيتسوفا', true],
  ['صندوق 5', 'متجر السلام', 'إ. بتروفا', false],
  ['صندوق 6', 'متجر السلام', 'إ. بتروفا', false],
  ['صندوق 7', 'متجر المستودع', 'س. أندريف', false],
  ['صندوق 8', 'متجر المستودع', 'س. أندريف', false],
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
      breadcrumb={['التجزئة (POS)', 'نظرة عامة']}
      reports={['مبيعات POS', 'ورديات الصندوق', 'المنتجات', 'العملاء', 'تقارير التجزئة']}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">التجزئة (POS)</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] text-slate-600">إجراءات</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <RefreshCw size={14} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <MoreHorizontal size={14} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-[13px] font-semibold text-white">
            <Plus size={14} /> عملية بيع جديدة (POS)
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
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">المتجر</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">الصندوق</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">حالة الوردية</span>
        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-400">01.07.2025 - 31.07.2025</span>
        <span className="mr-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-600">
          <Filter size={13} /> تصفية
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="mb-1 px-4 pt-4 text-sm font-semibold text-slate-900">المبيعات (POS)</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-right text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="p-3 font-medium">رقم العملية</th>
                <th className="p-3 font-medium">التاريخ والوقت</th>
                <th className="p-3 font-medium">الصندوق</th>
                <th className="p-3 font-medium">المتجر</th>
                <th className="p-3 font-medium">أمين الصندوق</th>
                <th className="p-3 font-medium">المبلغ</th>
                <th className="p-3 font-medium">الدفع</th>
                <th className="p-3 font-medium">الحالة</th>
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
                      {r.done ? 'مكتملة' : 'مرتجع'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* الرسوم البيانية */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">المبيعات حسب اليوم (ر.س)</h4>
          <svg viewBox="0 0 300 120" className="h-32 w-full">
            <polyline
              points="10,90 30,70 50,80 70,55 90,75 110,60 130,85 150,50 170,68 190,58 210,72 230,45 250,66 270,40 290,60"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
            />
          </svg>
          <div className="text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> المبيعات (ر.س)</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">المبيعات حسب المتجر</h4>
          <div className="flex items-center gap-4">
            <Donut segments={['#3b82f6 0 46.2%', '#10b981 46.2% 78%', '#f59e0b 78% 95.5%', '#cbd5e1 95.5% 100%']} />
            <div className="min-w-0 flex-1"><Legend items={BY_STORE} /></div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">طرق الدفع</h4>
          <div className="flex items-center gap-4">
            <Donut segments={['#3b82f6 0 58.7%', '#10b981 58.7% 90.2%', '#f59e0b 90.2% 100%']} />
            <div className="min-w-0 flex-1"><Legend items={BY_PAY} /></div>
          </div>
        </div>
      </div>

      {/* أعلى المنتجات + المبيعات حسب الساعة + الصناديق */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">أعلى المنتجات مبيعًا</h4>
          <table className="w-full text-right text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="py-2 font-medium">المنتج</th>
                <th className="py-2 font-medium">المُباع</th>
                <th className="py-2 font-medium">المبلغ</th>
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
          <h4 className="mb-3 text-sm font-semibold text-slate-900">المبيعات حسب الساعة</h4>
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
          <h4 className="mb-3 text-sm font-semibold text-slate-900">الصناديق النشطة</h4>
          <table className="w-full text-right text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="py-2 font-medium">الصندوق</th>
                <th className="py-2 font-medium">المتجر</th>
                <th className="py-2 font-medium">الحالة</th>
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
                      {open ? 'مفتوح' : 'مغلق'}
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
