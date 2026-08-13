import { Fragment, useState } from 'react'
import {
  // أيقونات تبويبات المجالات
  ShoppingCart,
  Utensils,
  Wrench,
  Hotel,
  Building2,
  // أيقونات كتل (الفنادق)
  Globe,
  BedDouble,
  KeyRound,
  SprayCan,
  ConciergeBell,
  // أيقونات كتل (العقارات)
  MapPin,
  FileText,
  Landmark,
  // أيقونات كتل المخطّط
  PhoneCall,
  Users,
  Headphones,
  ListChecks,
  Warehouse,
  Route,
  Truck,
  CheckCircle2,
  CreditCard,
  Wallet,
  BarChart3,
  Shield,
  Smartphone,
  ChefHat,
  PackageCheck,
  Bike,
  MessageSquare,
  CalendarCheck,
  ClipboardList,
  HardHat,
  ClipboardCheck,
  Repeat,
  // أيقونات «الفوضى» + خدمية
  MessageCircle,
  Table2,
  NotebookPen,
  Calculator,
  Phone,
  Instagram,
  Files,
  Boxes,
  Unlink,
  TrendingDown,
  ChevronLeft,
  ChevronDown,
  ArrowDown,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '../Reveal'
import Starfield from '../Starfield'

/* ─── أدوات متفرّقة «كما هو الحال الآن» ─── */

interface Tool {
  icon: LucideIcon
  label: string
  rot: number
}

const CHAOS: Tool[] = [
  { icon: MessageCircle, label: 'طلبات في WhatsApp', rot: -3 },
  { icon: Table2, label: 'مخزون في Excel', rot: 2 },
  { icon: NotebookPen, label: 'حسابات في دفتر', rot: -1.5 },
  { icon: Instagram, label: 'طلبات في Instagram Direct', rot: 2.5 },
  { icon: Phone, label: 'مكالمات بلا تسجيل', rot: -2 },
  { icon: Boxes, label: 'أرصدة بالتقدير', rot: 1.5 },
  { icon: Files, label: 'عقود في مجلدات', rot: -2.5 },
  { icon: Calculator, label: 'الأرباح على الآلة الحاسبة', rot: 3 },
]

/* ─── كم تكلّف الفوضى (تقديرات متوسطة للمشاريع الصغيرة والمتوسطة) ─── */

interface Stat {
  value: string
  label: string
}

const STATS: Stat[] = [
  { value: 'حتى 20%', label: 'من الأرباح تُفقد بسبب الأخطاء والتسجيل اليدوي' },
  { value: '~30%', label: 'من الطلبات تبقى بلا ردّ أو تضيع' },
  { value: '×2', label: 'أطول في معالجة كل طلب' },
  { value: 'حتى 15%', label: 'من البضاعة — فرز خاطئ وإتلاف' },
]

/* ─── مخطّطات العمليات حسب المجالات ─── */

interface Block {
  icon: LucideIcon
  title: string
  points: string[]
}

interface Group {
  label: string
  blocks: Block[]
}

interface Flow {
  key: string
  label: string
  icon: LucideIcon
  groups: Group[]
}

const FLOWS: Flow[] = [
  {
    key: 'trade',
    label: 'التجارة والتوصيل',
    icon: ShoppingCart,
    groups: [
      {
        label: 'الطلب والمعالجة',
        blocks: [
          { icon: PhoneCall, title: 'قنوات الطلبات', points: ['الهاتف والموقع', 'Telegram و Instagram', 'الإعلانات', 'طلب متكرّر'] },
          { icon: Users, title: 'CRM: عميل محتمل وعميل', points: ['إنشاء تلقائي للعميل المحتمل', 'التحقق من العميل', 'بحث بالهاتف', 'السجل والمديونية'] },
          { icon: Headphones, title: 'مركز الاتصال', points: ['اختيار المنتج', 'العنوان والوقت', 'طريقة الدفع', 'التأكيد'] },
          { icon: ListChecks, title: 'حالات الطلب', points: ['جديد، مؤكَّد', 'مُجهَّز في المخزن', 'مع المندوب', 'تم التوصيل'] },
        ],
      },
      {
        label: 'المخزن والتوصيل',
        blocks: [
          { icon: Warehouse, title: 'المخزن / WMS', points: ['الاستلام والتجهيز', 'تحقّق عبر QR', 'التغليف', 'أرصدة دقيقة'] },
          { icon: Route, title: 'التوزيع والمسار', points: ['إسناد للمندوب', 'تجميع حسب المناطق', 'مسار أمثل', 'ضبط التحميل'] },
          { icon: Truck, title: 'المندوب', points: ['طلبات اليوم', 'الملاحة و GPS', 'صورة وتوقيع', 'وضع بلا اتصال'] },
          { icon: CheckCircle2, title: 'نتيجة التوصيل', points: ['تم التوصيل / إرجاع', 'تقييم العميل', 'تم استلام الدفع', 'اكتمل الطلب'] },
        ],
      },
      {
        label: 'المال والرقابة',
        blocks: [
          { icon: CreditCard, title: 'المدفوعات', points: ['نقدًا، بطاقة', 'Click / Payme', 'دفع مختلط', 'استرداد الأموال'] },
          { icon: Wallet, title: 'المالية', points: ['الإيرادات والمصروفات', 'التكلفة', 'صافي الربح', 'الذمم المدينة'] },
          { icon: BarChart3, title: 'التحليلات ومؤشرات الأداء', points: ['مبيعات اليوم', 'مؤشرات الموظفين', 'المنتجات الأكثر مبيعًا', 'التقارير'] },
          { icon: Shield, title: 'التكاملات والحماية', points: ['Bitrix24، 1C', 'خدمة SMS', 'صلاحيات الوصول', 'مصادقة ثنائية وسجل'] },
        ],
      },
    ],
  },
  {
    key: 'food',
    label: 'مطعم / توصيل طعام',
    icon: Utensils,
    groups: [
      {
        label: 'الطلب',
        blocks: [
          { icon: Smartphone, title: 'قنوات الطلبات', points: ['الموقع والتطبيق', 'الهاتف', 'منصّات التجميع', 'طاولة في الصالة'] },
          { icon: Users, title: 'الاستقبال في CRM', points: ['إنشاء الطلب', 'العميل والسجل', 'النقاط', 'الملاحظات'] },
          { icon: Utensils, title: 'القائمة والمكوّنات', points: ['الأصناف والإضافات', 'قائمة الإيقاف', 'التكلفة', 'ملاحظة على الطبق'] },
          { icon: ListChecks, title: 'الحالات', points: ['مقبول', 'قيد التحضير', 'مُجهَّز', 'في الطريق / تم التوصيل'] },
        ],
      },
      {
        label: 'المطبخ والتوصيل',
        blocks: [
          { icon: ChefHat, title: 'المطبخ', points: ['تذاكر حسب الأقسام', 'حالة الأطباق', 'ضبط الوقت', 'طابور الطلبات'] },
          { icon: PackageCheck, title: 'التجهيز', points: ['التجميع', 'التغليف', 'التحقق من المكوّنات', 'جاهز للتسليم'] },
          { icon: Bike, title: 'المندوب والمسار', points: ['إسناد للمندوب', 'مسار GPS', 'إشعار العميل', 'وقت التوصيل'] },
          { icon: CheckCircle2, title: 'النتيجة', points: ['تم التوصيل', 'التقييم', 'إرجاع / شكوى', 'اكتمل الطلب'] },
        ],
      },
      {
        label: 'المال والرقابة',
        blocks: [
          { icon: CreditCard, title: 'المدفوعات', points: ['إلكتروني وبطاقة', 'نقدًا', 'الإكرامية', 'الاسترداد'] },
          { icon: Wallet, title: 'المالية', points: ['الإيرادات', 'تكلفة الطعام', 'تكلفة الأطباق', 'الربح'] },
          { icon: BarChart3, title: 'التحليلات ومؤشرات الأداء', points: ['الأطباق الأكثر طلبًا', 'متوسط الفاتورة', 'مؤشرات الوردية', 'التقارير'] },
          { icon: Shield, title: 'الصندوق والتكاملات', points: ['الموقع والمنصّات', 'الصندوق / نظام الضرائب', 'SMS', 'مخزون المواد'] },
        ],
      },
    ],
  },
  {
    key: 'services',
    label: 'الخدمات',
    icon: Wrench,
    groups: [
      {
        label: 'الطلب',
        blocks: [
          { icon: MessageSquare, title: 'قنوات الطلبات', points: ['الموقع والهاتف', 'تطبيقات المراسلة', 'الإعلانات', 'عميل متكرّر'] },
          { icon: Users, title: 'CRM', points: ['عميل محتمل تلقائي', 'التحقق من العميل', 'سجل الطلبات', 'مصدر الطلب'] },
          { icon: CalendarCheck, title: 'الحجز / الموعد', points: ['تقويم إلكتروني', 'اختيار الفني', 'موعد متاح', 'تذكير'] },
          { icon: ListChecks, title: 'الحالات', points: ['جديد', 'مؤكَّد', 'قيد التنفيذ', 'مُنجَز'] },
        ],
      },
      {
        label: 'التنفيذ',
        blocks: [
          { icon: ClipboardList, title: 'أمر العمل', points: ['المهام والمراحل', 'المواد', 'قائمة تحقّق', 'المسؤول'] },
          { icon: HardHat, title: 'الفني / الفريق', points: ['الجدول', 'التطبيق', 'الحالة', 'صور العمل'] },
          { icon: Wrench, title: 'الإنجاز', points: ['مراحل العمل', 'ضبط الجودة', 'تسجيل الوقت', 'أعمال إضافية'] },
          { icon: ClipboardCheck, title: 'الاستلام / التسليم', points: ['صورة النتيجة', 'توقيع العميل', 'الضمان', 'محضر'] },
        ],
      },
      {
        label: 'المال والرقابة',
        blocks: [
          { icon: CreditCard, title: 'المدفوعات', points: ['بطاقة ونقدًا', 'تقسيط', 'دفعة مقدّمة', 'الإيصال'] },
          { icon: Wallet, title: 'المالية', points: ['الإيرادات', 'رواتب الفنيين', 'المستهلكات', 'الربح'] },
          { icon: BarChart3, title: 'التحليلات ومؤشرات الأداء', points: ['الطلبات والتحويل', 'مؤشرات الفنيين', 'التقييمات', 'التقارير'] },
          { icon: Repeat, title: 'الولاء والحماية', points: ['التذكيرات', 'زيارة متكرّرة', 'SMS', 'صلاحيات الوصول'] },
        ],
      },
    ],
  },
  {
    key: 'hotel',
    label: 'الفنادق',
    icon: Hotel,
    groups: [
      {
        label: 'الحجز والوصول',
        blocks: [
          { icon: Globe, title: 'قنوات الحجوزات', points: ['الموقع والهاتف', 'Booking، Ostrovok', 'تطبيقات المراسلة', 'النزلاء الدائمون'] },
          { icon: Users, title: 'CRM والحجز', points: ['إنشاء الحجز', 'ملف النزيل', 'سجل الزيارات', 'دفعة مقدّمة'] },
          { icon: BedDouble, title: 'الأسعار والغرف', points: ['أنواع الغرف', 'التوفّر', 'أسعار متغيّرة', 'خدمات إضافية'] },
          { icon: KeyRound, title: 'الوصول / المغادرة', points: ['تسجيل إلكتروني', 'تسليم المفتاح', 'تأمين', 'مغادرة مبكرة / متأخرة'] },
        ],
      },
      {
        label: 'الإقامة والخدمة',
        blocks: [
          { icon: Hotel, title: 'إدارة الغرف', points: ['لوحة الإشغال', 'حالات الغرف', 'تغيير الغرفة', 'التمديد'] },
          { icon: SprayCan, title: 'التدبير المنزلي / التنظيف', points: ['جدول التنظيف', 'حالة الغرفة', 'قائمة تحقّق', 'الميني بار'] },
          { icon: ConciergeBell, title: 'خدمات النزيل', points: ['خدمة الغرف', 'السبا والمطعم', 'التوصيل', 'الطلبات والشكاوى'] },
          { icon: Wrench, title: 'الصيانة', points: ['طلبات الإصلاح', 'العهدة', 'المسؤول', 'ضبط المواعيد'] },
        ],
      },
      {
        label: 'المال والرقابة',
        blocks: [
          { icon: CreditCard, title: 'المدفوعات وحساب النزيل', points: ['بطاقة ونقدًا', 'دفع إلكتروني', 'حساب موحّد', 'الاستردادات'] },
          { icon: Wallet, title: 'المالية', points: ['إيرادات الغرف', 'ADR و RevPAR', 'المصروفات', 'الربح'] },
          { icon: BarChart3, title: 'التحليلات ومؤشرات الأداء', points: ['إشغال الغرف', 'مصادر الحجوزات', 'مؤشرات الموظفين', 'التقارير'] },
          { icon: Shield, title: 'التكاملات والحماية', points: ['Booking / Ostrovok', 'صندوق إلكتروني', 'الأقفال و Wi-Fi', 'صلاحيات الوصول'] },
        ],
      },
    ],
  },
  {
    key: 'realty',
    label: 'العقارات',
    icon: Building2,
    groups: [
      {
        label: 'الطلب والاختيار',
        blocks: [
          { icon: Globe, title: 'قنوات الطلبات', points: ['الموقع والهاتف', 'منصّات العقارات', 'الإعلانات', 'التوصيات'] },
          { icon: Users, title: 'CRM: عميل محتمل', points: ['إنشاء تلقائي للعميل المحتمل', 'التأهيل', 'مصدر الطلب', 'سجل التواصل'] },
          { icon: Building2, title: 'قاعدة العقارات', points: ['كتالوج العقارات', 'صور ومخططات', 'السعر والحالة', 'المالك'] },
          { icon: MapPin, title: 'الاختيار والمعاينة', points: ['اختيار حسب الطلب', 'حجز معاينة', 'مسار المعاينات', 'التغذية الراجعة'] },
        ],
      },
      {
        label: 'الصفقة والمستندات',
        blocks: [
          { icon: ListChecks, title: 'مسار الصفقة', points: ['مراحل الصفقة', 'حجز العقار', 'الاتفاق على السعر', 'الاحتمالية'] },
          { icon: FileText, title: 'المستندات والعقد', points: ['العقد والملاحق', 'التحقق القانوني', 'توقيع إلكتروني', 'النماذج'] },
          { icon: Landmark, title: 'التمويل / التقسيط', points: ['طلبات البنوك', 'الموافقة', 'الدفعة الأولى', 'جدول الدفعات'] },
          { icon: KeyRound, title: 'الإتمام والتسليم', points: ['التسجيل', 'محضر التسليم', 'تسليم المفاتيح', 'الإشغال'] },
        ],
      },
      {
        label: 'المال والرقابة',
        blocks: [
          { icon: CreditCard, title: 'المدفوعات والتسويات', points: ['الدفع والعمولة', 'تحويل وحساب ضمان', 'الاستردادات', 'جدول المتحصّلات'] },
          { icon: Wallet, title: 'المالية', points: ['الإيرادات والعمولات', 'مصروفات الإعلان', 'ربح الصفقات', 'الذمم المدينة'] },
          { icon: BarChart3, title: 'التحليلات ومؤشرات الأداء', points: ['المسار والتحويل', 'مؤشرات الوسطاء', 'مصادر الطلبات', 'التقارير'] },
          { icon: Shield, title: 'التكاملات والحماية', points: ['منصّات العقارات', 'البنوك والسجل العقاري', 'SMS', 'صلاحيات الوصول'] },
        ],
      },
    ],
  },
]

/* السهم بين الكتل داخل الصف: للأسفل على الجوال، ولليسار على سطح المكتب (تدفّق RTL). */
function StepArrow() {
  return (
    <div
      className="flex shrink-0 items-center justify-center self-center py-1 lg:py-0"
      aria-hidden="true"
    >
      {/* خط الوصل (سطح المكتب) */}
      <span className="hidden h-px w-3 bg-gradient-to-r from-transparent to-white/30 lg:block" />
      {/* عقدة السهم */}
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/[0.12] text-white shadow-[0_0_16px_-2px_rgba(255,255,255,0.45)] backdrop-blur-sm">
        <ChevronDown size={16} strokeWidth={2.75} className="lg:hidden" />
        <ChevronLeft size={16} strokeWidth={2.75} className="hidden lg:block" />
      </span>
      <span className="hidden h-px w-3 bg-gradient-to-l from-transparent to-white/30 lg:block" />
    </div>
  )
}

export default function BusinessFlows() {
  const [active, setActive] = useState(0)
  const flow = FLOWS[active]
  // ترقيم متسلسل للكتل 01…12 عبر المخطّط كله
  let counter = 0

  return (
    <section
      id="kak-rabotaet"
      className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-16"
    >
      {/* سماء نجوم ساطعة مع شهب متساقطة */}
      <Starfield bright shootingStars className="pointer-events-none absolute inset-0" />
      {/* توهّج ناعم + أطراف تتلاشى إلى الأسود لوصل سلس */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* العنوان */}
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/40">
            كيف يعمل
          </p>
          <h2 className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            من أدوات متفرّقة إلى تدفّق واحد
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            تعيش المشاريع الصغيرة والمتوسطة في عشرات الأدوات غير المترابطة: طلبات في تطبيقات
            المراسلة، ومخزون في Excel، وحسابات في دفتر. يجمع Habibi العملية كاملة في نظام واحد —
            لأي نوع من الأعمال.
          </p>
        </Reveal>

        {/* ── الجزء A: كما هو الآن (الفوضى) — مُبرَز بالأحمر كمشكلة حقيقية ── */}
        <Reveal delay={0.05}>
          <div className="relative mt-14 overflow-hidden rounded-3xl border border-red-500/30 bg-red-950/[0.12] p-6 shadow-[0_0_50px_-10px_rgba(239,68,68,0.35)] backdrop-blur-md sm:p-8">
            {/* توهّج أحمر — إشارة بصرية للمشكلة */}
            <div className="pointer-events-none absolute -left-12 -top-12 h-52 w-52 rounded-full bg-red-500/25 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-10 -right-8 h-44 w-44 rounded-full bg-rose-500/15 blur-[80px]" />

            <div className="relative mb-5 flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-400/40 bg-red-500/15 text-red-300">
                <Unlink size={17} strokeWidth={2} />
              </span>
              <div>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-white">مشهد مألوف؟</h3>
                  <span className="rounded-full border border-red-400/40 bg-red-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-300">
                    مشكلة
                  </span>
                </div>
                <p className="text-sm text-white/65">
                  كل أداة تعمل وحدها — تُنقل البيانات يدويًا، وجزء من الطلبات يضيع.
                </p>
              </div>
            </div>

            <div className="relative flex flex-wrap items-center gap-2.5">
              {CHAOS.map((c) => (
                <span
                  key={c.label}
                  style={{ transform: `rotate(${c.rot}deg)` }}
                  className="inline-flex items-center gap-2 rounded-full border border-dashed border-red-400/35 bg-red-500/[0.07] px-3.5 py-2 text-sm text-red-50/85"
                >
                  <c.icon size={15} strokeWidth={1.75} className="text-red-300/80" />
                  {c.label}
                </span>
              ))}
            </div>

            {/* ثمن الفوضى — تسرّب الأرباح والمؤشرات */}
            <div className="relative mt-6 border-t border-red-400/20 pt-5">
              <p className="mb-3 flex items-center gap-2 text-sm font-medium text-red-200">
                <TrendingDown size={16} strokeWidth={2} className="shrink-0" />
                ثمن الفوضى — تتسرّب الأرباح والمؤشرات
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-red-400/20 bg-red-500/[0.06] p-3.5"
                  >
                    <div className="text-xl font-bold text-red-300 sm:text-2xl">{s.value}</div>
                    <div className="mt-1 text-xs leading-relaxed text-white/55">{s.label}</div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-white/30">
                *تقديرات متوسطة للخسائر لدى المشاريع الصغيرة والمتوسطة
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── الانتقال ── */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center text-center">
            <p className="text-base text-white/70 md:text-lg">
              مع <span className="font-medium text-white">Habibi</span> يصبح ذلك كله —{' '}
              <span className="text-white">تدفّقًا واحدًا مترابطًا</span>
            </p>
            <ArrowDown size={22} strokeWidth={2} className="mt-3 animate-bounce text-white/30" />
          </div>
        </Reveal>

        {/* ── الجزء B: تبويبات + مخطّط تفصيلي ── */}
        <Reveal delay={0.15}>
          {/* تبويبات تبديل المجالات */}
          <div role="tablist" aria-label="مجالات الأعمال" className="mt-8 flex flex-wrap gap-2.5">
            {FLOWS.map((f, i) => {
              const isActive = i === active
              return (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'border-white/40 bg-white/[0.1] text-white shadow-[0_0_22px_rgba(255,255,255,0.12)]'
                      : 'border-white/10 text-white/55 hover:border-white/25 hover:text-white'
                  }`}
                >
                  <f.icon size={16} strokeWidth={2} />
                  {f.label}
                </button>
              )
            })}
          </div>

          {/* مخطّط المجال المختار (يُعاد التركيب حسب key → إعادة fadeSlideUp) */}
          <div
            key={active}
            role="tabpanel"
            className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5 backdrop-blur-md [animation:fadeSlideUp_0.4s_ease_both] sm:p-7"
          >
            {flow.groups.map((group, gi) => (
              <div key={group.label}>
                {/* السهم بين الصفوف-المجموعات */}
                {gi > 0 && (
                  <div className="flex flex-col items-center py-2" aria-hidden="true">
                    <span className="h-4 w-px bg-white/25" />
                    <span className="my-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/[0.12] text-white shadow-[0_0_20px_-2px_rgba(255,255,255,0.5)] backdrop-blur-sm">
                      <ChevronDown size={20} strokeWidth={2.75} />
                    </span>
                    <span className="h-4 w-px bg-white/25" />
                  </div>
                )}

                {/* عنوان الصف-المرحلة */}
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    {group.label}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-l from-white/25 to-transparent" />
                </div>

                {/* صف الكتل */}
                <div className="flex flex-col gap-2.5 lg:flex-row lg:items-stretch">
                  {group.blocks.map((b, bi) => {
                    counter += 1
                    const nn = String(counter).padStart(2, '0')
                    return (
                      <Fragment key={b.title}>
                        <div className="group flex flex-1 flex-col rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_10px_30px_-18px_rgba(0,0,0,0.9)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:from-white/[0.14] hover:shadow-[0_0_26px_-6px_rgba(255,255,255,0.28)]">
                          <div className="mb-2.5 flex items-start gap-2">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/25 bg-white/[0.16] text-xs font-bold text-white shadow-[0_0_12px_-4px_rgba(255,255,255,0.5)]">
                              {nn}
                            </span>
                            <b.icon
                              size={16}
                              strokeWidth={1.9}
                              className="mt-1.5 shrink-0 text-white/90"
                            />
                            <h4 className="mt-1 text-sm font-semibold leading-tight text-white">
                              {b.title}
                            </h4>
                          </div>
                          <ul className="space-y-1">
                            {b.points.map((p) => (
                              <li
                                key={p}
                                className="flex gap-1.5 text-xs leading-relaxed text-white/55"
                              >
                                <span className="mt-1 block h-1 w-1 shrink-0 rounded-full bg-white/40" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {bi < group.blocks.length - 1 && <StepArrow />}
                      </Fragment>
                    )
                  })}
                </div>
              </div>
            ))}

            {/* الشرح — تدفّق واحد متصل */}
            <p className="mx-auto mt-6 max-w-3xl rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.08] px-5 py-3.5 text-center text-sm font-medium leading-relaxed text-white sm:text-base">
              ⚡ كل الكتل الاثنتي عشرة مترابطة في عملية واحدة متصلة — تنتقل البيانات بين المراحل
              تلقائيًا، <span className="text-emerald-300">دون نقل يدوي أو خسائر</span>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
