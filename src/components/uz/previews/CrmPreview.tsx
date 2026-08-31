import {
  ChevronDown,
  ChevronRight,
  Printer,
  MoreHorizontal,
  Bell,
  Search,
  Phone,
  Mail,
  MessageCircle,
} from 'lucide-react'

/* Макет CRM-интерфейса на узбекской латинице (LTR) — насыщенная альтернатива скриншоту crm-preview.png.
   Светлая тема, как в реальном продукте. */

const FIELDS_CLIENT: [string, string][] = [
  ['Ism', 'Jasur Toshmatov'],
  ['Davlat', '🇺🇿 Oʻzbekiston'],
  ['Til', 'Oʻzbek / Rus'],
  ['WhatsApp', '+998 90 123 45 67'],
  ['Telefon', '+998 90 123 45 67'],
  ['Email', 'jasur@email.uz'],
  ['Oilaviy holati', 'Oilali'],
  ['Oila aʼzolari', '4'],
  ['Yashash shahri', 'Andijon'],
  ['Mijoz menejeri', 'Aziz'],
]

const FIELDS_INTEREST: [string, string][] = [
  ['Xarid maqsadi', 'Yashash uchun'],
  ['Shahar', 'Toshkent'],
  ['Tuman', 'Yunusobod / Toshkent City'],
  ['Uy-joy turi', 'Kvartira'],
  ['Xonalar', '3 xona'],
  ['Byudjet', '$80 000 – 120 000'],
  ['Toʻlov usuli', 'Naqd'],
  ['Xaridga tayyorlik', '1–3 oy'],
  ['Qiziqtirgan obyekt', 'Toshkent Residence #245'],
]

const QUALIFICATION: [string, string, string][] = [
  ['Byudjet tasdiqlangan', 'Ha', 'yes'],
  ['Mablagʻ mavjud', 'Ha', 'yes'],
  ['Xaridor qaror qabul qiladi', 'Ha', 'yes'],
  ['Koʻrikka kelishga tayyor', 'Balki', 'maybe'],
  ['Moliyalashtirish kerak', 'Yoʻq', 'no'],
  ['Hujjatlarda yordam kerak', 'Ha', 'yes'],
]

const SOURCE: [string, string][] = [
  ['Asosiy manba', 'Instagram'],
  ['Kampaniya', 'Toshkent Uy-joy Iyul 2026'],
  ['Eʼlon', 'Yunusobodda 3 xonali kvartira'],
  ['UTM', 'toshkent_iyul_3xona'],
  ['Lid narxi', '$18.50'],
  ['Kvalifikatsiyalangan lid narxi', '$32.10'],
]

const FUNNEL: [string, 'done' | 'active' | 'todo'][] = [
  ['Yangi lid', 'done'],
  ['Bogʻlanildi', 'done'],
  ['Kvalifikatsiya', 'active'],
  ['Uy-joy tanlash', 'todo'],
  ['Koʻrik / tashrif', 'todo'],
  ['Muzokaralar', 'todo'],
  ['Bron', 'todo'],
  ['Shartnoma', 'todo'],
  ['Toʻlov', 'todo'],
  ['Bitim yakunlandi', 'todo'],
]

const SIDEBAR: [string, string][] = [
  ['Manba', 'Instagram Ads'],
  ['Ustuvorlik', 'Yuqori'],
  ['Hudud', 'Toshkent'],
  ['Keyingi aloqa', '31.07.2026 15:00'],
  ['Oxirgi aloqa', '30.07.2026 12:30'],
  ['Yaratilgan', '30.07.2026 10:15'],
  ['Oʻzgartirilgan', '30.07.2026 12:30'],
]

const HISTORY: { date: string; channel: string; text: string; by: string }[] = [
  {
    date: '30.07.2026 12:30',
    channel: 'WhatsApp',
    text: 'Mijoz Yunusobod tumanida 3 xonali kvartiraga qiziqmoqda. Byudjet $120 000 gacha. 5 ta variant yuborildi.',
    by: 'Aziz',
  },
  {
    date: '29.07.2026 16:45',
    channel: 'WhatsApp',
    text: 'Mijoz avgust oyida koʻrik uchun Toshkentga kelmoqchi ekanini aytdi.',
    by: 'Aziz',
  },
  {
    date: '28.07.2026 11:20',
    channel: 'Qoʻngʻiroq',
    text: 'Aniqlandi: oila yashashi uchun sotib olinmoqda. 3 xonali kvartira kerak.',
    by: 'Aziz',
  },
]

const TABS = [
  'Umumiy koʻrinish',
  'Mijoz',
  'Soʻrov',
  'Obyektlar',
  'Aloqa',
  'Bitim',
  'Vazifalar',
  'Hujjatlar',
  'Izohlar',
]

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 py-1.5">
      <span className="shrink-0 text-[13px] text-slate-500">{label}</span>
      <span className="text-right text-[13px] font-medium text-slate-800">{value}</span>
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
      dir="ltr"
      className="w-[1180px] max-w-full overflow-hidden rounded-xl bg-slate-50 font-geist text-slate-800 shadow-2xl"
    >
      {/* Верхняя панель */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-blue-600">Habibi</span>
          <span className="hidden items-center gap-1.5 text-[13px] text-slate-400 sm:flex">
            <span>CRM</span>
            <ChevronRight size={13} />
            <span>Lid</span>
            <ChevronRight size={13} />
            <span className="text-slate-600">LEAD-2026-0237</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[13px] text-slate-400 md:flex">
            <Search size={14} />
            <span>Qidiruv yoki buyruq kiriting (⌘ + G)</span>
          </div>
          <span className="hidden text-[13px] text-slate-500 sm:inline">Yordam</span>
          <Bell size={16} className="text-slate-400" />
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
            A
          </span>
        </div>
      </div>

      {/* Шапка записи */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-3">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-slate-900">Jasur Toshmatov</h3>
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
            Kvalifikatsiyalangan <ChevronDown size={12} />
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] font-medium text-slate-600">
            Yaratish <ChevronDown size={12} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <Printer size={15} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
            <MoreHorizontal size={15} />
          </span>
          <span className="rounded-lg bg-blue-600 px-4 py-1.5 text-[13px] font-semibold text-white">
            Saqlash
          </span>
        </div>
      </div>

      {/* Табы */}
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

      {/* Тело: 3 колонки */}
      <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-[200px_1fr_220px]">
        {/* Боковая колонка */}
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-1 text-[11px] uppercase tracking-wide text-slate-400">Masʼul</div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600">
                AZ
              </span>
              <span className="text-[13px] font-medium text-slate-800">Aziz</span>
            </div>
            <div className="mt-3 border-t border-slate-100 pt-3">
              <div className="mb-1 text-[11px] uppercase tracking-wide text-slate-400">Status</div>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-amber-600">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> Kvalifikatsiyalangan
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
                <span>Lid balli</span>
                <span className="font-semibold text-slate-600">87 / 100</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100">
                <div className="h-1.5 w-[87%] rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Средняя колонка */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card title="Mijoz maʼlumotlari">
            {FIELDS_CLIENT.map(([l, v]) => (
              <Field key={l} label={l} value={v} />
            ))}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white">
                <MessageCircle size={13} /> WhatsApp
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600">
                <Phone size={13} /> Qoʻngʻiroq
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600">
                <Mail size={13} /> Email
              </span>
            </div>
          </Card>

          <Card title="Uy-joy talabi">
            {FIELDS_INTEREST.map(([l, v]) => (
              <Field key={l} label={l} value={v} />
            ))}
            <span className="mt-3 inline-block rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600">
              Obyektlarni koʻrish (5)
            </span>
          </Card>

          <Card title="Lid kvalifikatsiyasi">
            {QUALIFICATION.map(([l, v, t]) => (
              <div key={l} className="flex items-center justify-between py-1.5">
                <span className="text-[13px] text-slate-500">{l}</span>
                <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${yesNoColor(t)}`}>
                  {v}
                </span>
              </div>
            ))}
          </Card>

          <Card title="Lid manbasi">
            {SOURCE.map(([l, v]) => (
              <Field key={l} label={l} value={v} />
            ))}
          </Card>
        </div>

        {/* Правая колонка */}
        <div className="space-y-4">
          <Card title="Voronka bosqichi">
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
                <span className="text-slate-400">Yoʻqotilgan</span>
              </div>
            </div>
          </Card>

          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
            <div className="mb-2 text-[11px] text-slate-400">Bitim ehtimoli</div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-amber-400 border-l-slate-100">
              <div>
                <div className="text-lg font-bold text-slate-800">65%</div>
                <div className="text-[10px] text-slate-400">Oʻrta</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-1 text-[11px] text-slate-400">Kutilayotgan bitim summasi</div>
            <div className="text-lg font-bold text-emerald-600">$95 000</div>
          </div>
        </div>
      </div>

      {/* История общения + следующее действие */}
      <div className="px-5 pb-5">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Yozishmalar tarixi</h4>
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
              <span className="font-semibold text-slate-700">Keyingi amal:</span>
              <span className="text-slate-600">Mijozga qoʻngʻiroq qilish — 31.07.2026 15:00</span>
            </div>
            <div className="flex items-center gap-3 text-[12px]">
              <span className="text-slate-500">Masʼul: Aziz</span>
              <span className="rounded-md border border-blue-200 bg-white px-3 py-1 font-medium text-blue-600">
                Vazifani ochish
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
