import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useContact } from './ContactProvider'
import { CopperplateHatch } from '../ui/copperplate-hatch'
import KineticGrid from '../ui/kinetic-grid'

interface FaqItem {
  q: string
  a: string[]
}

const FAQ: FaqItem[] = [
  {
    q: 'Habibiʼni joriy etish qiyinmi?',
    a: [
      'Yoʻq. Biznesingiz uchun eng muhim jarayonlardan boshlab, keyin asta-sekin boshqa modullarni qoʻshib borishingiz mumkin. Butun biznesni bir kunda tizimga koʻchirish shart emas. CRM, savdo va moliyadan boshlang, keyin ehtiyojga qarab ombor, xaridlar, ishlab chiqarish, HR va boshqa jarayonlarni ulang.',
      'Habibi Premium foydalanuvchilari shaxsiy onboarding oladi — bu tizimni kompaniya ehtiyojlariga tezroq moslashtirishga yordam beradi.',
    ],
  },
  {
    q: 'Boshqa tizimlardan maʼlumotlarni koʻchirish kerakmi?',
    a: [
      'Shart emas. Habibiʼni noldan boshlashingiz yoki avval ishlatgan tizimlardan kerakli maʼlumotlarni koʻchirishingiz mumkin.',
      'Agar sizda mijozlar bazasi, mahsulotlar, moliyaviy maʼlumotlar yoki boshqa maʼlumotlar boʻlsa, koʻchirish imkoniyatlari ularning formati va manbasiga bogʻliq. Kerak boʻlsa, Habibi jamoasi eng qulay koʻchirish usulini aniqlashga yordam beradi.',
    ],
  },
  {
    q: 'Maʼlumotlarim nima boʻladi?',
    a: [
      'Maʼlumotlaringiz sizning Habibi ish maydoningizda qoladi va biznesingizni yuritish uchun ishlatiladi. Maʼlumotlarga kirish foydalanuvchi huquqlariga muvofiq boshqariladi.',
      'Habibi Premiumʼda moslashuvchan kirish huquqlari bor — turli xodimlar qaysi maʼlumotni koʻrishi va qaysi imkoniyatlardan foydalanishini aniqroq belgilash mumkin.',
    ],
  },
  {
    q: 'Xodimlarni qoʻsha olamanmi?',
    a: [
      'Ha. Tanlangan tarifga qarab tizimga xodimlarni qoʻshishingiz mumkin.',
      '**Habibi** — 10 tagacha foydalanuvchi, **Habibi Pro** — 50 tagacha, **Habibi Premium** — 100 tagacha foydalanuvchi.',
      'Har bir xodim oʻz vazifalari va biznes-jarayonlari ustida ishlaydi, Premiumʼda esa kirish huquqlarini moslashuvchan boshqarish mumkin.',
    ],
  },
  {
    q: 'Bepul sinab koʻrsa boʻladimi?',
    a: [
      'Ha. Har bir tarifda **14 kunlik bepul demo-davr** bor — tanlangan tarifning barcha imkoniyatlariga toʻliq kirish olasiz va tizimni bepul oʻrganasiz. Boshlash uchun bank kartasi talab qilinmaydi.',
      'Ikki hafta real jarayonlaringizni koʻchirish, jamoani ulash va tizim biznesingizga mos kelishini tekshirish uchun yetarli.',
      'Demo-davr tugagach, oʻzingizga mos tarifni tanlaysiz: **Habibi** oyiga €19 dan (taxminan 260 000 soʻm), **Habibi Pro** yoki **Habibi Premium** — jamoangiz hajmi va kerakli imkoniyatlarga qarab.',
    ],
  },
  {
    q: 'Toʻlovni soʻmda amalga oshirsa boʻladimi?',
    a: [
      'Tariflar boʻlimida valyutani almashtirib, narxlarni soʻmda koʻrishingiz mumkin — hisob-kitob evroda yuritiladi, soʻmdagi summa esa joriy kurs boʻyicha taxminiy koʻrsatiladi.',
      'Aniq summani va toʻlov usulini menejer toʻlov kunidagi kursga qarab tasdiqlaydi. Soʻrov qoldiring — biz siz uchun qulay variantni aytamiz.',
    ],
  },
  {
    q: 'Biznesim oʻssa nima boʻladi?',
    a: [
      'Habibi biznesingiz bilan birga oʻsadi. Boshlangʻich tarifdan boshlab, xodimlar, jarayonlar va integratsiyalar soni ortishi bilan kengroq tarifga oʻtishingiz mumkin.',
      'Habibi Proʼda barcha 10 modul, AI-agentlar, 50 tagacha foydalanuvchi va 5 tagacha integratsiya bor. Shaxsiy onboarding, kengaytirilgan analitika, moslashuvchan kirish huquqlari va ustuvor yordam kerak boʻlgan kompaniyalar uchun Habibi Premium mavjud.',
      'Boshqaruv tizimini almashtirmasdan va jarayonlarni oʻnlab bogʻlanmagan xizmatlardan qayta qurmasdan biznesingizni oʻstirasiz.',
    ],
  },
]

// Простой рендер **жирного** внутри абзаца.
function renderRich(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-white/85">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )
}

export default function Faq() {
  const { open } = useContact()
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  const toggle = (i: number) => setActiveIndex((prev) => (prev === i ? null : i))

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-16"
    >
      {/* Анимированный фон — гравюрная штриховка со «светом гравёра» */}
      <CopperplateHatch
        className="pointer-events-none absolute inset-0"
        density={1}
        intensity={1.2}
        speed={0.8}
        seed={7}
        interactive
        safeArea={{ x: 0.05, y: 0.1, w: 0.9, h: 0.8 }}
      />
      {/* Лёгкое затемнение для читаемости + края в чёрный для бесшовного стыка */}
      <div className="pointer-events-none absolute inset-0 bg-black/25" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/40">FAQ</p>
          <h2 className="max-w-2xl text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            Koʻp beriladigan savollar
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-stretch">
          {/* Интерактивный CTA с кинетической сеткой */}
          <KineticGrid
            globalColor="monochrome"
            className="min-h-[340px] rounded-[24px] border border-white/10"
          >
            <div className="flex h-full flex-col items-center justify-center px-8 py-14 text-center text-white">
              <h3
                className="mb-3 font-medium leading-[1.1]"
                style={{ fontSize: '2.4rem', letterSpacing: '-0.03em' }}
              >
                Savollaringiz
                <br />
                qoldimi?
              </h3>
              <p className="mb-7 max-w-xs text-sm font-normal text-white/70">
                Yozing — javob beramiz va biznesingizga mos tarifni tanlashga yordam beramiz.
              </p>
              <button
                type="button"
                onClick={() => open('Habibi')}
                className="cursor-pointer rounded-xl border-none bg-white px-8 py-3.5 text-sm font-semibold text-black transition-transform duration-200 hover:-translate-y-0.5"
                style={{ boxShadow: '0 10px 24px rgba(0,0,0,0.45)' }}
              >
                Demo soʻrash
              </button>
            </div>
          </KineticGrid>

          {/* Аккордеон */}
          <div className="flex flex-col justify-center gap-3">
            {FAQ.map((item, i) => {
              const active = activeIndex === i
              return (
                <div
                  key={i}
                  role="button"
                  tabIndex={0}
                  onClick={() => toggle(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggle(i)
                    }
                  }}
                  className={`cursor-pointer rounded-2xl border p-5 outline-none backdrop-blur-md transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white/30 ${
                    active
                      ? 'border-white/25 bg-white/[0.06]'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-white sm:text-base">{item.q}</span>
                    {active ? (
                      <ChevronUp size={20} className="shrink-0 text-white/60" />
                    ) : (
                      <ChevronDown size={20} className="shrink-0 text-white/45" />
                    )}
                  </div>
                  {active && (
                    <div className="mt-3 space-y-2.5">
                      {item.a.map((p, pi) => (
                        <p key={pi} className="text-sm leading-relaxed text-white/60">
                          {renderRich(p)}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
