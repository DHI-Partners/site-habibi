import { Fragment, useState } from 'react'
import {
  // Иконки вкладок (типов бизнеса)
  ShoppingCart,
  Utensils,
  Wrench,
  Hotel,
  Building2,
  // Иконки блоков (отельный бизнес)
  Globe,
  BedDouble,
  KeyRound,
  SprayCan,
  ConciergeBell,
  // Иконки блоков (недвижимость)
  MapPin,
  FileText,
  Landmark,
  // Иконки блоков процессов
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
  // Иконки «хаоса» и служебные
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
  ChevronRight,
  ChevronDown,
  ArrowDown,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '../Reveal'
import Starfield from '../Starfield'

/* ─── Разрозненные инструменты «как сейчас» ─── */

interface Tool {
  icon: LucideIcon
  label: string
  rot: number
}

const CHAOS: Tool[] = [
  { icon: MessageCircle, label: 'Lidlar WhatsAppʼda', rot: -3 },
  { icon: Table2, label: 'Ombor hisobi Excelʼda', rot: 2 },
  { icon: NotebookPen, label: 'Moliya daftarda', rot: -1.5 },
  { icon: Instagram, label: 'Buyurtmalar Instagram Directʼda', rot: 2.5 },
  { icon: Phone, label: 'Hisobga olinmagan qoʻngʻiroqlar', rot: -2 },
  { icon: Boxes, label: 'Qoldiqlar chamalab hisoblanadi', rot: 1.5 },
  { icon: Files, label: 'Shartnomalar papkalarda', rot: -2.5 },
  { icon: Calculator, label: 'Foyda kalkulyatorda', rot: 3 },
]

/* ─── Во что обходится хаос (средние оценки для МСБ) ─── */

interface Stat {
  value: string
  label: string
}

const STATS: Stat[] = [
  { value: '20% gacha', label: 'foyda xatolar va qoʻlda yuritilgan hisob tufayli yoʻqoladi' },
  { value: '~30%', label: 'lidlar javobsiz qoladi yoki yoʻqoladi' },
  { value: '×2', label: 'har bir buyurtmani qayta ishlash shuncha koʻp vaqt oladi' },
  { value: '15% gacha', label: 'tovarlar — saralash xatolari va hisobdan chiqarishlar' },
]

/* ─── Процессы по типам бизнеса ─── */

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
    label: 'Savdo va yetkazib berish',
    icon: ShoppingCart,
    groups: [
      {
        label: 'Buyurtma va qayta ishlash',
        blocks: [
          { icon: PhoneCall, title: 'Buyurtma kanallari', points: ['Qoʻngʻiroq va sayt', 'Telegram, Instagram', 'Reklama', 'Takroriy buyurtma'] },
          { icon: Users, title: 'CRM: lid va mijoz', points: ['Lid avtomatik yaratiladi', 'Mijozni aniqlash', 'Telefon boʻyicha qidiruv', 'Tarix va qarzlar'] },
          { icon: Headphones, title: 'Call-markaz', points: ['Mahsulot tanlash', 'Manzil va vaqt', 'Toʻlov usuli', 'Tasdiqlash'] },
          { icon: ListChecks, title: 'Buyurtma statuslari', points: ['Yangi, tasdiqlangan', 'Omborda yigʻilgan', 'Kuryerda', 'Yetkazildi'] },
        ],
      },
      {
        label: 'Ombor va yetkazib berish',
        blocks: [
          { icon: Warehouse, title: 'Ombor / WMS', points: ['Qabul va yigʻish', 'QR orqali tekshirish', 'Qadoqlash', 'Aniq qoldiqlar'] },
          { icon: Route, title: 'Dispetcher va marshrut', points: ['Kuryerga biriktirish', 'Hudud boʻyicha guruhlash', 'Optimal marshrut', 'Yuklama nazorati'] },
          { icon: Truck, title: 'Kuryer', points: ['Kunlik buyurtmalar', 'Navigatsiya va GPS', 'Foto va imzo', 'Oflayn rejim'] },
          { icon: CheckCircle2, title: 'Yetkazish natijasi', points: ['Yetkazildi / qaytarildi', 'Mijoz bahosi', 'Toʻlov qabul qilindi', 'Buyurtma yopildi'] },
        ],
      },
      {
        label: 'Pul va nazorat',
        blocks: [
          { icon: CreditCard, title: 'Toʻlovlar', points: ['Naqd, karta', 'Click / Payme', 'Boʻlib toʻlash', 'Qaytarishlar'] },
          { icon: Wallet, title: 'Moliya', points: ['Tushum va xarajatlar', 'Tannarx', 'Sof foyda', 'Debitor qarzlar'] },
          { icon: BarChart3, title: 'Analitika va KPI', points: ['Kunlik savdo', 'Xodimlar KPIsi', 'Top mahsulotlar', 'Hisobotlar'] },
          { icon: Shield, title: 'Integratsiya va xavfsizlik', points: ['Bitrix24, 1C', 'SMS-xizmat', 'Kirish huquqlari', '2FA va audit-jurnal'] },
        ],
      },
    ],
  },
  {
    key: 'food',
    label: 'Restoran / ovqat yetkazish',
    icon: Utensils,
    groups: [
      {
        label: 'Buyurtma',
        blocks: [
          { icon: Smartphone, title: 'Buyurtma kanallari', points: ['Sayt va ilova', 'Telefon qoʻngʻiroq', 'Agregatorlar', 'Zaldagi stol'] },
          { icon: Users, title: 'CRMʼda qabul', points: ['Buyurtma yaratish', 'Mijoz va tarix', 'Bonus ballari', 'Izohlar'] },
          { icon: Utensils, title: 'Menyu va pozitsiyalar', points: ['Taomlar va modifikatorlar', 'Stop-list', 'Tannarx', 'Taomga izoh'] },
          { icon: ListChecks, title: 'Statuslar', points: ['Qabul qilindi', 'Tayyorlanmoqda', 'Qadoqlandi', 'Yoʻlda / yetkazildi'] },
        ],
      },
      {
        label: 'Oshxona va yetkazish',
        blocks: [
          { icon: ChefHat, title: 'Oshxona', points: ['Sexlar boʻyicha cheklar', 'Taom statusi', 'Vaqt nazorati', 'Buyurtmalar navbati'] },
          { icon: PackageCheck, title: 'Yigʻish', points: ['Komplektlash', 'Qadoqlash', 'Tarkibni tekshirish', 'Olib ketishga tayyor'] },
          { icon: Bike, title: 'Kuryer va marshrut', points: ['Kuryerga biriktirish', 'GPS-marshrut', 'Mijozga status', 'Yetkazish vaqti'] },
          { icon: CheckCircle2, title: 'Natija', points: ['Yetkazildi', 'Baho', 'Qaytarish / shikoyat', 'Buyurtma yopildi'] },
        ],
      },
      {
        label: 'Pul va nazorat',
        blocks: [
          { icon: CreditCard, title: 'Toʻlovlar', points: ['Onlayn va karta', 'Naqd', 'Choypuli', 'Qaytarish'] },
          { icon: Wallet, title: 'Moliya', points: ['Tushum', 'Food cost', 'Taom tannarxi', 'Foyda'] },
          { icon: BarChart3, title: 'Analitika va KPI', points: ['Top taomlar', 'Oʻrtacha chek', 'Smena KPIsi', 'Hisobotlar'] },
          { icon: Shield, title: 'POS va integratsiyalar', points: ['Sayt va agregatorlar', 'POS / fiskal', 'SMS', 'Masalliqlar hisobi'] },
        ],
      },
    ],
  },
  {
    key: 'services',
    label: 'Xizmatlar',
    icon: Wrench,
    groups: [
      {
        label: 'Soʻrov',
        blocks: [
          { icon: MessageSquare, title: 'Soʻrov kanallari', points: ['Sayt va qoʻngʻiroq', 'Messenjerlar', 'Reklama', 'Doimiy mijoz'] },
          { icon: Users, title: 'CRM', points: ['Avtomatik lid', 'Mijozni aniqlash', 'Soʻrovlar tarixi', 'Lid manbasi'] },
          { icon: CalendarCheck, title: 'Yozilish', points: ['Onlayn kalendar', 'Mutaxassis tanlash', 'Boʻsh vaqt', 'Eslatma'] },
          { icon: ListChecks, title: 'Statuslar', points: ['Yangi', 'Tasdiqlangan', 'Bajarilmoqda', 'Yakunlangan'] },
        ],
      },
      {
        label: 'Bajarish',
        blocks: [
          { icon: ClipboardList, title: 'Ish topshirigʻi', points: ['Vazifalar va bosqichlar', 'Materiallar', 'Cheklist', 'Masʼul'] },
          { icon: HardHat, title: 'Mutaxassis / brigada', points: ['Ish jadvali', 'Mobil ilova', 'Status', 'Ish fotolari'] },
          { icon: Wrench, title: 'Ijro', points: ['Ish bosqichlari', 'Sifat nazorati', 'Vaqt hisobi', 'Qoʻshimcha ishlar'] },
          { icon: ClipboardCheck, title: 'Topshirish', points: ['Natija fotolari', 'Mijoz imzosi', 'Kafolat', 'Bajarilgan ish dalolatnomasi'] },
        ],
      },
      {
        label: 'Pul va nazorat',
        blocks: [
          { icon: CreditCard, title: 'Toʻlovlar', points: ['Karta va naqd', 'Boʻlib toʻlash', 'Oldindan toʻlov', 'Chek'] },
          { icon: Wallet, title: 'Moliya', points: ['Tushum', 'Mutaxassislar oyligi', 'Sarf materiallari', 'Foyda'] },
          { icon: BarChart3, title: 'Analitika va KPI', points: ['Soʻrovlar va konversiya', 'Mutaxassislar KPIsi', 'Sharhlar', 'Hisobotlar'] },
          { icon: Repeat, title: 'Sadoqat va xavfsizlik', points: ['Eslatmalar', 'Takroriy tashrif', 'SMS', 'Kirish huquqlari'] },
        ],
      },
    ],
  },
  {
    key: 'hotel',
    label: 'Mehmonxona biznesi',
    icon: Hotel,
    groups: [
      {
        label: 'Bron va joylashtirish',
        blocks: [
          { icon: Globe, title: 'Bron kanallari', points: ['Sayt va telefon', 'Booking, Expedia', 'Messenjerlar', 'Doimiy mehmonlar'] },
          { icon: Users, title: 'CRM va bron', points: ['Bron yaratish', 'Mehmon profili', 'Tashriflar tarixi', 'Oldindan toʻlov'] },
          { icon: BedDouble, title: 'Tariflar va xonalar', points: ['Xona turlari', 'Bandlik', 'Dinamik narxlar', 'Qoʻshimcha xizmatlar'] },
          { icon: KeyRound, title: 'Kirish / chiqish', points: ['Onlayn roʻyxatdan oʻtish', 'Kalit berish', 'Depozit', 'Erta / kech chiqish'] },
        ],
      },
      {
        label: 'Yashash va xizmat',
        blocks: [
          { icon: Hotel, title: 'Xonalarni boshqarish', points: ['Bandlik jadvali', 'Xona statuslari', 'Xona almashtirish', 'Muddatni uzaytirish'] },
          { icon: SprayCan, title: 'Housekeeping', points: ['Tozalash jadvali', 'Xona holati', 'Cheklist', 'Minibar'] },
          { icon: ConciergeBell, title: 'Mehmon xizmatlari', points: ['Room service', 'Spa va restoran', 'Transfer', 'Soʻrov va shikoyatlar'] },
          { icon: Wrench, title: 'Texnik xizmat', points: ['Taʼmir soʻrovlari', 'Inventar', 'Masʼul', 'Muddat nazorati'] },
        ],
      },
      {
        label: 'Pul va nazorat',
        blocks: [
          { icon: CreditCard, title: 'Toʻlovlar va mehmon hisobi', points: ['Karta va naqd', 'Onlayn toʻlov', 'Yagona hisob', 'Qaytarishlar'] },
          { icon: Wallet, title: 'Moliya', points: ['Xonalar boʻyicha tushum', 'ADR va RevPAR', 'Xarajatlar', 'Foyda'] },
          { icon: BarChart3, title: 'Analitika va KPI', points: ['Bandlik darajasi', 'Bron manbalari', 'Xodimlar KPIsi', 'Hisobotlar'] },
          { icon: Shield, title: 'Integratsiya va xavfsizlik', points: ['Booking / Expedia', 'Onlayn kassa', 'Qulflar va Wi-Fi', 'Kirish huquqlari'] },
        ],
      },
    ],
  },
  {
    key: 'realty',
    label: 'Koʻchmas mulk',
    icon: Building2,
    groups: [
      {
        label: 'Lid va tanlov',
        blocks: [
          { icon: Globe, title: 'Lid kanallari', points: ['Sayt va qoʻngʻiroq', 'Eʼlon portallari', 'Reklama', 'Tavsiyalar'] },
          { icon: Users, title: 'CRM: lid', points: ['Lid avtomatik yaratiladi', 'Kvalifikatsiya', 'Lid manbasi', 'Aloqa tarixi'] },
          { icon: Building2, title: 'Obyektlar bazasi', points: ['Obyektlar katalogi', 'Foto va planirovkalar', 'Narx va status', 'Egasi'] },
          { icon: MapPin, title: 'Tanlov va koʻrik', points: ['Soʻrovga mos tanlash', 'Koʻrikka yozish', 'Koʻrik marshruti', 'Fikr-mulohaza'] },
        ],
      },
      {
        label: 'Bitim va hujjatlar',
        blocks: [
          { icon: ListChecks, title: 'Bitim voronkasi', points: ['Bitim bosqichlari', 'Obyektni bron qilish', 'Narx kelishuvi', 'Ehtimollik'] },
          { icon: FileText, title: 'Hujjatlar va shartnoma', points: ['Shartnoma va ilovalar', 'Yuridik tekshiruv', 'Elektron imzo', 'Shablonlar'] },
          { icon: Landmark, title: 'Ipoteka / boʻlib toʻlash', points: ['Bank arizalari', 'Tasdiqlash', 'Boshlangʻich toʻlov', 'Toʻlov jadvali'] },
          { icon: KeyRound, title: 'Yakunlash va topshirish', points: ['Roʻyxatdan oʻtkazish', 'Topshirish dalolatnomasi', 'Kalitlarni berish', 'Koʻchib kirish'] },
        ],
      },
      {
        label: 'Pul va nazorat',
        blocks: [
          { icon: CreditCard, title: 'Toʻlovlar va hisob-kitob', points: ['Toʻlov va komissiya', 'Bank oʻtkazmasi va eskrou', 'Qaytarishlar', 'Daromad jadvali'] },
          { icon: Wallet, title: 'Moliya', points: ['Tushum va komissiyalar', 'Reklama xarajatlari', 'Har bitimdan foyda', 'Debitor qarzlar'] },
          { icon: BarChart3, title: 'Analitika va KPI', points: ['Voronka va konversiya', 'Agentlar KPIsi', 'Lid manbalari', 'Hisobotlar'] },
          { icon: Shield, title: 'Integratsiya va xavfsizlik', points: ['Eʼlon portallari', 'Banklar va kadastr', 'SMS', 'Kirish huquqlari'] },
        ],
      },
    ],
  },
]

/* Стрелка между блоками в ряду: вниз на мобильном, вправо на десктопе. */
function StepArrow() {
  return (
    <div
      className="flex shrink-0 items-center justify-center self-center py-1 lg:py-0"
      aria-hidden="true"
    >
      {/* Соединительная линия (десктоп) */}
      <span className="hidden h-px w-3 bg-gradient-to-r from-transparent to-white/30 lg:block" />
      {/* Узел со стрелкой */}
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/[0.12] text-white shadow-[0_0_16px_-2px_rgba(255,255,255,0.45)] backdrop-blur-sm">
        <ChevronDown size={16} strokeWidth={2.75} className="lg:hidden" />
        <ChevronRight size={16} strokeWidth={2.75} className="hidden lg:block" />
      </span>
      <span className="hidden h-px w-3 bg-gradient-to-l from-transparent to-white/30 lg:block" />
    </div>
  )
}

export default function BusinessFlows() {
  const [active, setActive] = useState(0)
  const flow = FLOWS[active]
  // Сквозная нумерация блоков 01…12 по всему процессу
  let counter = 0

  return (
    <section
      id="kak-rabotaet"
      className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-16"
    >
      {/* Яркое звёздное небо с падающими звёздами */}
      <Starfield bright shootingStars className="pointer-events-none absolute inset-0" />
      {/* Мягкое свечение + края в чёрный для бесшовного стыка */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Заголовок */}
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/40">
            Qanday ishlaydi
          </p>
          <h2 className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            Tarqoq vositalardan yagona jarayonga
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            Kichik va oʻrta biznes oʻnlab bogʻlanmagan dasturlarda yashaydi: lidlar
            messenjerlarda, ombor hisobi Excelʼda, moliya daftarda. Habibi butun jarayonni bitta
            tizimga jamlaydi — har qanday biznes turi uchun.
          </p>
        </Reveal>

        {/* ── ЧАСТЬ A: «как сейчас» (хаос) — подсвечено красным как реальная проблема ── */}
        <Reveal delay={0.05}>
          <div className="relative mt-14 overflow-hidden rounded-3xl border border-red-500/30 bg-red-950/[0.12] p-6 shadow-[0_0_50px_-10px_rgba(239,68,68,0.35)] backdrop-blur-md sm:p-8">
            {/* Красное свечение — визуальный сигнал проблемы */}
            <div className="pointer-events-none absolute -left-12 -top-12 h-52 w-52 rounded-full bg-red-500/25 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-10 -right-8 h-44 w-44 rounded-full bg-rose-500/15 blur-[80px]" />

            <div className="relative mb-5 flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-400/40 bg-red-500/15 text-red-300">
                <Unlink size={17} strokeWidth={2} />
              </span>
              <div>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-white">Tanishmi?</h3>
                  <span className="rounded-full border border-red-400/40 bg-red-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-300">
                    Muammo
                  </span>
                </div>
                <p className="text-sm text-white/65">
                  Har bir vosita oʻz holicha ishlaydi — maʼlumotlar qoʻlda koʻchiriladi, lidlarning
                  bir qismi yoʻqoladi.
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

            {/* Цена хаоса — утечка прибыли и эффективности */}
            <div className="relative mt-6 border-t border-red-400/20 pt-5">
              <p className="mb-3 flex items-center gap-2 text-sm font-medium text-red-200">
                <TrendingDown size={16} strokeWidth={2} className="shrink-0" />
                Tartibsizlik narxi — foyda va samaradorlik oqib ketmoqda
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
                *kichik va oʻrta biznes uchun oʻrtacha yoʻqotish baholari
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── Переход ── */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center text-center">
            <p className="text-base text-white/70 md:text-lg">
              <span className="font-medium text-white">Habibi</span> bilan bularning barchasi{' '}
              <span className="text-white">yagona bogʻlangan jarayonga</span> aylanadi
            </p>
            <ArrowDown size={22} strokeWidth={2} className="mt-3 animate-bounce text-white/30" />
          </div>
        </Reveal>

        {/* ── ЧАСТЬ B: вкладки + детальный процесс ── */}
        <Reveal delay={0.15}>
          {/* Вкладки-переключатели типа бизнеса */}
          <div role="tablist" aria-label="Biznes turlari" className="mt-8 flex flex-wrap gap-2.5">
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

          {/* Процесс выбранного типа (перемонтирование по key → повтор fadeSlideUp) */}
          <div
            key={active}
            role="tabpanel"
            className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5 backdrop-blur-md [animation:fadeSlideUp_0.4s_ease_both] sm:p-7"
          >
            {flow.groups.map((group, gi) => (
              <div key={group.label}>
                {/* Стрелка между рядами групп */}
                {gi > 0 && (
                  <div className="flex flex-col items-center py-2" aria-hidden="true">
                    <span className="h-4 w-px bg-white/25" />
                    <span className="my-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/[0.12] text-white shadow-[0_0_20px_-2px_rgba(255,255,255,0.5)] backdrop-blur-sm">
                      <ChevronDown size={20} strokeWidth={2.75} />
                    </span>
                    <span className="h-4 w-px bg-white/25" />
                  </div>
                )}

                {/* Заголовок ряда-этапа */}
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    {group.label}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/25 to-transparent" />
                </div>

                {/* Ряд блоков */}
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

            {/* Легенда — единый сквозной процесс */}
            <p className="mx-auto mt-6 max-w-3xl rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.08] px-5 py-3.5 text-center text-sm font-medium leading-relaxed text-white sm:text-base">
              ⚡ Barcha 12 blok yagona uzluksiz jarayonga bogʻlangan — maʼlumotlar bosqichlar
              orasida avtomatik oʻtadi,{' '}
              <span className="text-emerald-300">qoʻlda koʻchirishsiz va yoʻqotishlarsiz</span>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
