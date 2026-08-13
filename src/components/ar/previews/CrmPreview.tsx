import {
  ChevronDown,
  ChevronLeft,
  Printer,
  MoreHorizontal,
  Bell,
  Search,
  Phone,
  Mail,
  MessageCircle,
} from 'lucide-react'

/* نموذج واجهة CRM باللغة العربية (RTL) — بديل عن لقطة الشاشة crm-preview.png.
   ثيم فاتح مطابق لواجهة المنتج الحقيقية. */

const FIELDS_CLIENT: [string, string][] = [
  ['الاسم', 'Ahmed Mohammed Al-Sayed'],
  ['الدولة', '🇪🇬 مصر'],
  ['اللغة', 'العربية / الإنجليزية'],
  ['واتساب', '+20 100 123 4567'],
  ['الهاتف', '+20 100 123 4567'],
  ['البريد', 'ahmed@email.com'],
  ['الحالة العائلية', 'عائلة'],
  ['أفراد الأسرة', '4'],
  ['مدينة الإقامة', 'القاهرة'],
  ['مدير الحساب', 'عبدالله'],
]

const FIELDS_INTEREST: [string, string][] = [
  ['هدف الشراء', 'للسكن'],
  ['المدينة', 'المدينة المنوّرة'],
  ['الحي', 'المركز / قرب الحرم'],
  ['نوع العقار', 'شقة'],
  ['عدد الغرف', '3 غرف'],
  ['الميزانية', 'SAR 1,500,000 – 2,000,000'],
  ['طريقة الدفع', 'نقدًا'],
  ['جاهزية الشراء', '1–3 أشهر'],
  ['العقار المهتمّ به', 'Madinah Residence #245'],
]

const QUALIFICATION: [string, string, string][] = [
  ['الميزانية مؤكَّدة', 'نعم', 'yes'],
  ['الأموال متاحة', 'نعم', 'yes'],
  ['المشتري صاحب القرار', 'نعم', 'yes'],
  ['مستعدّ للقدوم إلى السعودية', 'ربما', 'maybe'],
  ['يحتاج تمويلاً', 'لا', 'no'],
  ['يحتاج مساعدة في الإجراءات', 'نعم', 'yes'],
]

const SOURCE: [string, string][] = [
  ['المصدر الأساسي', 'Instagram'],
  ['الحملة', 'Medina Property July 2026'],
  ['الإعلان', '3BR Apartment Near Haram'],
  ['UTM', 'medina_july_3br'],
  ['تكلفة العميل', '$18.50'],
  ['تكلفة العميل المؤهَّل', '$32.10'],
]

const FUNNEL: [string, 'done' | 'active' | 'todo'][] = [
  ['عميل جديد', 'done'],
  ['تمّ التواصل', 'done'],
  ['مؤهَّل', 'active'],
  ['اختيار العقار', 'todo'],
  ['المعاينة / الزيارة', 'todo'],
  ['التفاوض', 'todo'],
  ['الحجز', 'todo'],
  ['العقد', 'todo'],
  ['الدفع', 'todo'],
  ['صفقة ناجحة', 'todo'],
]

const SIDEBAR: [string, string][] = [
  ['المصدر', 'Instagram Ads'],
  ['الأولوية', 'عالية'],
  ['المنطقة', 'المدينة المنوّرة'],
  ['التواصل القادم', '31.07.2026 15:00'],
  ['آخر تواصل', '30.07.2026 12:30'],
  ['أُنشئ', '30.07.2026 10:15'],
  ['عُدّل', '30.07.2026 12:30'],
]

const HISTORY: { date: string; channel: string; text: string; by: string }[] = [
  {
    date: '30.07.2026 12:30',
    channel: 'واتساب',
    text: 'العميل مهتمّ بشقة من 3 غرف قرب المسجد النبوي. الميزانية حتى SAR 2M. أُرسلت 5 خيارات.',
    by: 'عبدالله',
  },
  {
    date: '29.07.2026 16:45',
    channel: 'واتساب',
    text: 'أبلغ العميل أنه ينوي القدوم إلى المدينة في أغسطس.',
    by: 'عبدالله',
  },
  {
    date: '28.07.2026 11:20',
    channel: 'مكالمة',
    text: 'تبيّن: الشراء لسكن العائلة. يحتاج شقة من 3 غرف.',
    by: 'عبدالله',
  },
]

const TABS = [
  'نظرة عامة',
  'العميل',
  'الطلب',
  'العقارات',
  'التواصل',
  'الصفقة',
  'المهام',
  'المستندات',
  'الملاحظات',
]

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 py-1.5">
      <span className="shrink-0 text-[13px] text-slate-500">{label}</span>
      <span className="text-left text-[13px] font-medium text-slate-800">{value}</span>
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h4 className="mb-2 text-sm font-semibold text-slate-900">{title}</h4>
      {children}
    </div>
  )
}

const yesNoColor = (t: string) =>
  t === 'yes'
    ? 'bg-emerald-50 text-emerald-600'
    : t === 'no'
      ? 'bg-rose-50 text-rose-600'
      : 'bg-amber-50 text-amber-600'

export default function CrmPreview() {
  return (
    <div
      dir="rtl"
      className="w-[1180px] max-w-full overflow-hidden rounded-xl bg-slate-50 font-arabic text-slate-800 shadow-2xl"
    >
      {/* الشريط العلوي */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-blue-600">Habibi</span>
          <span className="hidden items-center gap-1.5 text-[13px] text-slate-400 sm:flex">
            <span>CRM</span>
            <ChevronLeft size={13} />
            <span>عميل محتمل</span>
            <ChevronLeft size={13} />
            <span className="text-slate-600">LEAD-2026-0237</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[13px] text-slate-400 md:flex">
            <Search size={14} />
            <span>ابحث أو اكتب أمرًا (⌘ + G)</span>
          </div>
          <span className="hidden text-[13px] text-slate-500 sm:inline">مساعدة</span>
          <Bell size={16} className="text-slate-400" />
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
            A
          </span>
        </div>
      </div>

      {/* رأس السجلّ */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-3">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-slate-900">Ahmed Mohammed Al-Sayed</h3>
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
            مؤهَّل <ChevronDown size={12} />
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] font-medium text-slate-600">
            إنشاء <ChevronDown size={12} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <Printer size={15} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <MoreHorizontal size={15} />
          </span>
          <span className="rounded-lg bg-blue-600 px-4 py-1.5 text-[13px] font-semibold text-white">
            حفظ
          </span>
        </div>
      </div>

      {/* التبويبات */}
      <div className="flex flex-wrap gap-4 border-b border-slate-200 bg-white px-5">
        {TABS.map((t, i) => (
          <span
            key={t}
            className={`border-b-2 py-2.5 text-[13px] ${
              i === 0
                ? 'border-blue-600 font-semibold text-blue-600'
                : 'border-transparent text-slate-500'
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      {/* الجسم: 3 أعمدة */}
      <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-[200px_1fr_220px]">
        {/* العمود الجانبي */}
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-1 text-[11px] uppercase tracking-wide text-slate-400">مُسنَد إلى</div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600">
                AB
              </span>
              <span className="text-[13px] font-medium text-slate-800">عبدالله</span>
            </div>
            <div className="mt-3 border-t border-slate-100 pt-3">
              <div className="mb-1 text-[11px] uppercase tracking-wide text-slate-400">الحالة</div>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-amber-600">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> مؤهَّل
              </span>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            {SIDEBAR.map(([l, v]) => (
              <div key={l} className="border-b border-slate-50 py-1.5 last:border-0">
                <div className="text-[11px] text-slate-400">{l}</div>
                <div className="text-[13px] font-medium text-slate-700">{v}</div>
              </div>
            ))}
            <div className="mt-2 border-t border-slate-100 pt-3">
              <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                <span>درجة العميل</span>
                <span className="font-semibold text-slate-600">87 / 100</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100">
                <div className="h-1.5 w-[87%] rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </div>

        {/* العمود الأوسط */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card title="معلومات العميل">
            {FIELDS_CLIENT.map(([l, v]) => (
              <Field key={l} label={l} value={v} />
            ))}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white">
                <MessageCircle size={13} /> واتساب
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600">
                <Phone size={13} /> اتصال
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600">
                <Mail size={13} /> بريد
              </span>
            </div>
          </Card>

          <Card title="الاهتمام العقاري">
            {FIELDS_INTEREST.map(([l, v]) => (
              <Field key={l} label={l} value={v} />
            ))}
            <span className="mt-3 inline-block rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600">
              عرض العقارات (5)
            </span>
          </Card>

          <Card title="تأهيل العميل">
            {QUALIFICATION.map(([l, v, t]) => (
              <div key={l} className="flex items-center justify-between py-1.5">
                <span className="text-[13px] text-slate-500">{l}</span>
                <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${yesNoColor(t)}`}>
                  {v}
                </span>
              </div>
            ))}
          </Card>

          <Card title="مصدر العميل">
            {SOURCE.map(([l, v]) => (
              <Field key={l} label={l} value={v} />
            ))}
          </Card>
        </div>

        {/* العمود الأيسر */}
        <div className="space-y-4">
          <Card title="مرحلة المسار">
            <div className="space-y-2">
              {FUNNEL.map(([label, state]) => (
                <div key={label} className="flex items-center gap-2 text-[13px]">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      state === 'active'
                        ? 'bg-blue-600'
                        : state === 'done'
                          ? 'bg-slate-300'
                          : 'border border-slate-300'
                    }`}
                  />
                  <span
                    className={
                      state === 'active'
                        ? 'font-semibold text-blue-600'
                        : state === 'done'
                          ? 'text-slate-500'
                          : 'text-slate-400'
                    }
                  >
                    {label}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-2 border-t border-slate-100 pt-2 text-[13px]">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                <span className="text-slate-400">خاسرة</span>
              </div>
            </div>
          </Card>

          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
            <div className="mb-2 text-[11px] text-slate-400">احتمالية الصفقة</div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-amber-400 border-l-slate-100">
              <div>
                <div className="text-lg font-bold text-slate-800">65%</div>
                <div className="text-[10px] text-slate-400">متوسّطة</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-1 text-[11px] text-slate-400">القيمة المتوقّعة للصفقة</div>
            <div className="text-lg font-bold text-emerald-600">SAR 1,750,000</div>
          </div>
        </div>
      </div>

      {/* سجلّ التواصل + الإجراء القادم */}
      <div className="px-5 pb-5">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">سجلّ التواصل</h4>
          <div className="space-y-3">
            {HISTORY.map((h) => (
              <div key={h.date} className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-[11px] text-slate-400">{h.channel}</span>
                  <div>
                    <div className="text-[11px] text-slate-400">{h.date}</div>
                    <div className="text-[13px] text-slate-700">{h.text}</div>
                  </div>
                </div>
                <span className="shrink-0 text-[12px] text-slate-500">{h.by}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-amber-50 p-3">
            <div className="flex items-center gap-2 text-[13px]">
              <span className="font-semibold text-slate-700">الإجراء القادم:</span>
              <span className="text-slate-600">الاتصال بالعميل — 31.07.2026 15:00</span>
            </div>
            <div className="flex items-center gap-3 text-[12px]">
              <span className="text-slate-500">المسؤول: عبدالله</span>
              <span className="rounded-md border border-blue-200 bg-white px-3 py-1 font-medium text-blue-600">
                فتح المهمة
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
