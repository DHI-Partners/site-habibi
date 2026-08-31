import { useEffect, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Check, Sparkles, TrendingUp } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactProvider } from '../../uz/ContactProvider'
import { Reveal } from '../../Reveal'
import { LiquidButton } from '../../ui/liquid-glass-button'
import DigitalHeart from '../../DigitalHeart'
import { TIERS } from '../../uz/Pricing'
import EarningsCalculator from './EarningsCalculator'
import Banknotes from '../Banknotes'
import GoldRain from '../GoldRain'
import PartnerFooter from './PartnerFooter'
import AiChatWidget from '../../uz/AiChatWidget'
import {
  AUDIENCES,
  COMMISSION_LEVELS,
  CONDITIONS,
  DASHBOARD_METRICS,
  EXAMPLES,
  EXCLUSIVE_FEATURES,
  FINAL_CHAIN,
  GROWTH_STEPS,
  OPPORTUNITIES,
  PRICE_PRO,
  RATE_HIGH,
  RATE_LOW,
  RATE_THRESHOLD,
  STEPS,
  TIER_EARNINGS,
  WIN_SIDES,
  formatMoney,
} from './data'

// Те же фоновые видео, что уже используются на лендинге — новых ассетов нет.
// (В герое видео нет: фон — поле банкнот, см. Banknotes.)
const EARNINGS_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4'
const CLOSING_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4'

/* ─────────────────────────── Примитивы ─────────────────────────── */

/** Простой рендер **жирного** внутри абзаца (как в Faq.tsx). */
function renderRich(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-white/90">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )
}

/** Цена внутри пункта тарифа: {{500}} → «€500» (узбекские TIERS хранят плейсхолдер). */
function featureText(text: string) {
  return text.replace(/\{\{(\d+(?:\.\d+)?)\}\}/g, (_, raw: string) => `€${raw}`)
}

/**
 * Маркер секции: линия во всю ширину и подпись под ней.
 * Читается как «здесь начинается новая секция» ещё до заголовка.
 * Намеренно без номеров — они спорили бы с карточками шагов 01–05.
 */
function SectionTag({
  children,
  divider = true,
}: {
  children: string
  /** Линия-разделитель над подписью (в герое не нужна). */
  divider?: boolean
}) {
  return (
    <div className="mb-5">
      {divider && (
        <div className="mb-6 flex items-center gap-3">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.95)]" />
          <span className="h-px flex-1 bg-gradient-to-r from-emerald-400/55 via-white/15 to-transparent" />
        </div>
      )}
      <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/35 bg-emerald-400/[0.1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm">
        {children}
      </span>
    </div>
  )
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/85">
      {children}
    </span>
  )
}

function Section({
  id,
  children,
  className = '',
  seed = 1,
}: {
  id?: string
  children: ReactNode
  className?: string
  /** Узор золотого дождя — уникальный для каждой секции. */
  seed?: number
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-black px-6 py-20 md:px-12 md:py-28 lg:px-16 ${className}`}
    >
      {/* Золотой дождь — фон для секций без видео */}
      <GoldRain className="pointer-events-none absolute inset-0" seed={seed} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="relative z-10 mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

function SectionHead({
  tag,
  title,
  lead,
}: {
  tag: string
  title: string
  lead?: string
}) {
  return (
    <Reveal>
      <div className="mb-12">
        <SectionTag>{tag}</SectionTag>
        <h2 className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
          {title}
        </h2>
        {lead && <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">{lead}</p>}
      </div>
    </Reveal>
  )
}

/**
 * Подсветка карточек: мягкий свет сверху внутри блока плюс тонкий светлый край,
 * со свечением на ховере. Три тона: нейтральный, изумрудный (акцент), янтарный (премиум).
 */
const CARD_BASE =
  'relative rounded-2xl border p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5'

const CARD_TONES = {
  plain:
    'border-white/12 bg-gradient-to-b from-white/[0.07] via-white/[0.025] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-white/25 hover:shadow-[0_18px_44px_-22px_rgba(0,0,0,0.95),0_0_32px_-14px_rgba(255,255,255,0.3),inset_0_1px_0_rgba(255,255,255,0.16)]',
  emerald:
    'border-emerald-400/30 bg-gradient-to-b from-emerald-400/[0.13] via-emerald-400/[0.04] to-transparent shadow-[inset_0_1px_0_rgba(52,211,153,0.2)] hover:border-emerald-400/50 hover:shadow-[0_18px_44px_-22px_rgba(0,0,0,0.95),0_0_36px_-12px_rgba(52,211,153,0.45),inset_0_1px_0_rgba(52,211,153,0.3)]',
  amber:
    'border-amber-300/30 bg-gradient-to-b from-amber-300/[0.12] via-amber-300/[0.04] to-transparent shadow-[inset_0_1px_0_rgba(252,211,77,0.2)] hover:border-amber-300/50 hover:shadow-[0_18px_44px_-22px_rgba(0,0,0,0.95),0_0_36px_-12px_rgba(252,211,77,0.42),inset_0_1px_0_rgba(252,211,77,0.3)]',
} as const

function card(tone: keyof typeof CARD_TONES = 'plain', extra = '') {
  return `${CARD_BASE} ${CARD_TONES[tone]} ${extra}`.trim()
}

const CARD = card()

/* ─────────────────────────── Страница ─────────────────────────── */

function UzPartnerPageContent() {
  const navigate = useNavigate()
  const apply = () => navigate('/uz/partners/register')

  useEffect(() => {
    const html = document.documentElement
    const prevLang = html.getAttribute('lang') ?? 'en'
    html.setAttribute('lang', 'uz')
    document.title = 'Habibi hamkorlik dasturi — tavsiyalaringizdan daromad oling'
    window.scrollTo(0, 0)
    return () => {
      html.setAttribute('lang', prevLang)
      document.title = 'Habibi — biznesingiz uchun raqamli ekotizim'
    }
  }, [])

  return (
    <div className="min-h-screen w-full bg-black font-geist text-white">
      {/* ─── 01. Герой ─── */}
      <section className="relative overflow-hidden bg-black">
        {/* Фон: банкноты мира плюс мягкое золотое свечение и монеты сверху */}
        <Banknotes className="pointer-events-none absolute inset-0" seed={7} />
        <GoldRain className="pointer-events-none absolute inset-0" seed={1} density={0.5} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_55%_at_50%_35%,rgba(226,190,116,0.09),transparent_72%)]" />
        {/* Вуаль под текстом: на мобильных по всей ширине,
            на десктопе смещена влево, чтобы банкноты справа дышали. */}
        <div className="pointer-events-none absolute inset-0 bg-black/45 md:hidden" />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-black/90 via-black/35 to-transparent md:block" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

        <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 pt-8 md:px-12">
          <a
            href="/uz"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Bosh sahifaga qaytish
          </a>
          <div className="flex items-center gap-5">
            <Link
              to="/uz/partners/login"
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/75 transition-colors hover:border-white/40 hover:text-white"
            >
              Kirish
            </Link>
            <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-white/70">
              Habibi
              <DigitalHeart className="heart-beat h-[12px] w-auto text-emerald-400" />
            </span>
          </div>
        </header>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-16 md:px-12 md:pb-32 md:pt-24 lg:px-16">
          <SectionTag divider={false}>Hamkorlik dasturi</SectionTag>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-white [animation:fadeSlideUp_0.8s_ease_0.1s_both] sm:text-5xl md:text-6xl">
            Habibi bilan birga daromad oling
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 [animation:fadeSlideUp_0.8s_ease_0.25s_both] md:text-xl">
            Habibiʼni bizneslarga tavsiya qiling va har bir pulli obunadan daromad oling.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5 [animation:fadeSlideUp_0.8s_ease_0.4s_both]">
            {[
              'Tanish tadbirkorlaringiz bormi?',
              'Biznes hamjamiyat quryapsizmi?',
              'Kompaniyalar bilan ishlaysizmi?',
              'Telegram kanal yoki blog yuritasizmi?',
            ].map((q) => (
              <Pill key={q}>{q}</Pill>
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/85 [animation:fadeSlideUp_0.8s_ease_0.5s_both] md:text-lg">
            Shaxsiy referal havolangizni oling va olib kelgan mijozlaringizning har bir pulli
            obunasidan{' '}
            <span className="font-semibold text-emerald-300">30%</span> gacha daromad qiling.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3.5 [animation:fadeSlideUp_0.8s_ease_0.6s_both]">
            <LiquidButton size="xl" onClick={apply} className="rounded-full text-white">
              Hamkor boʻlish
              <ArrowRight size={18} />
            </LiquidButton>
            <a
              href="#kak-rabotaet"
              className="rounded-full border border-white/25 px-8 py-3.5 text-base font-medium text-white transition-colors hover:border-white/50"
            >
              Qanday ishlashini koʻrish
            </a>
          </div>
        </div>
      </section>

      {/* ─── 02. Как это работает ─── */}
      <Section id="kak-rabotaet" seed={2}>
        <SectionHead
          tag="5 qadam"
          title="Hamkorlik dasturi qanday ishlaydi"
          lead="Hammasi oddiy: roʻyxatdan oʻtasiz, havolangizni ulashasiz va har bir pulli obunadan ulush olasiz."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={(i % 3) * 0.08}>
              <div className={`${CARD} h-full`}>
                <span className="text-4xl font-semibold leading-none text-white/15">
                  {step.num}
                </span>
                <h3 className="mt-4 text-lg font-medium text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{step.text}</p>

                {step.code && (
                  <div className="mt-4">
                    <p className="text-xs text-white/40">Masalan:</p>
                    <code className="mt-1.5 inline-block rounded-lg border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 font-mono text-sm text-emerald-300">
                      {step.code}
                    </code>
                  </div>
                )}

                {step.chips && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {step.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-xs text-white/65"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}

                {step.list && (
                  <ul className="mt-4 space-y-1.5">
                    {step.list.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                        <Check size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {step.note && (
                  <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white/75">
                    {step.note}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── 03. Ставки комиссии ─── */}
      <Section id="stavki" seed={3}>
        <SectionHead
          tag="Komissiya"
          title="Qancha koʻp mijoz olib kelsangiz, stavkangiz shuncha yuqori"
          lead="Dasturni imkon qadar sodda qildik: ikki daraja va yuqoriga koʻtarilishning bitta aniq qoidasi."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {COMMISSION_LEVELS.map((level, i) => (
            <Reveal key={level.rate} delay={i * 0.1}>
              <div
                className={card(level.top ? 'emerald' : 'plain', 'h-full !p-8')}
              >
                <p className="text-sm text-white/55">{level.clients}</p>
                <p
                  className={`mt-4 text-6xl font-semibold tracking-tighter ${
                    level.top ? 'text-emerald-300' : 'text-white'
                  }`}
                >
                  {level.rate}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{level.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className={card('amber', 'mt-4 flex items-start gap-4')}>
            <TrendingUp size={22} className="mt-0.5 shrink-0 text-amber-300" />
            <div>
              <h3 className="text-lg font-medium text-white">Asosiy afzallik</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {RATE_THRESHOLD} ta faol toʻlovchi mijozga yetganingizdan soʻng 30% li yuqori stavka
                faqat 11-mijozga emas, balki{' '}
                <strong className="font-semibold text-white/90">
                  butun faol mijozlar bazangizga
                </strong>{' '}
                qoʻllanadi. Har bir yangi mijoz nafaqat mijozlaringiz sonini, balki avval olib
                kelgan kompaniyalaringizdan tushadigan daromadni ham oshiradi.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ─── 04. Qancha daromad qilish mumkin ─── */}
      <section
        id="raschet"
        className="relative overflow-hidden bg-black px-6 py-20 md:px-12 md:py-28 lg:px-16"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={EARNINGS_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <SectionHead
            tag="Raqamlar"
            title="Qancha daromad qilishingiz mumkin?"
            lead="Habibiʼning haqiqiy tariflari boʻyicha hisoblab koʻramiz."
          />

          {/* Комиссия по тарифам */}
          <div className="grid gap-4 md:grid-cols-3">
            {TIER_EARNINGS.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.08}>
                <div className={`${CARD} h-full`}>
                  <h3 className="text-lg font-medium text-white">{tier.name}</h3>
                  <p className="mt-1 text-sm text-white/45">oyiga {formatMoney(tier.price)}</p>
                  <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm text-white/55">20% komissiyada</span>
                      <span className="text-lg font-semibold text-white">
                        {formatMoney(tier.price * RATE_LOW)}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm text-white/55">30% komissiyada</span>
                      <span className="text-lg font-semibold text-emerald-300">
                        {formatMoney(tier.price * RATE_HIGH)}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-white/40">har bir mijozdan, oyiga</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Интерактивный калькулятор */}
          <Reveal delay={0.1}>
            <div className="mt-10">
              <h3 className="mb-5 text-xl font-medium tracking-tight text-white">
                Daromadingizni hisoblang
              </h3>
              <EarningsCalculator />
            </div>
          </Reveal>

          {/* Разобранные примеры */}
          <Reveal delay={0.1}>
            <h3 className="mb-5 mt-14 text-xl font-medium tracking-tight text-white">Masalan</h3>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {EXAMPLES.map((ex, i) => (
              <Reveal key={ex.title} delay={(i % 2) * 0.08}>
                <div
                  className={card(ex.highlight ? 'emerald' : 'plain', 'h-full')}
                >
                  <h4 className="text-base font-medium text-white">{ex.title}</h4>
                  <ul className="mt-3 space-y-1.5">
                    {ex.rows.map((row) => (
                      <li key={row} className="text-sm leading-relaxed text-white/60">
                        {row}
                      </li>
                    ))}
                  </ul>
                  <p
                    className={`mt-5 text-3xl font-semibold tracking-tight ${
                      ex.highlight ? 'text-emerald-300' : 'text-white'
                    }`}
                  >
                    {ex.result}
                  </p>
                  <p className="mt-1 text-xs text-white/45">{ex.caption}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 05. Habibi Exclusive ─── */}
      <Section seed={5}>
        <SectionHead
          tag="Yirik korporativ mijozlar"
          title="Habibi Exclusive"
          lead="Individual yechim kerak boʻlgan kompaniyalar uchun. Narx biznes auditidan soʻng belgilanadi — bunday mijozlar uchun ham hamkor komissiya oladi."
        />
        <Reveal>
          <div className={card('amber', '!p-8')}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {EXCLUSIVE_FEATURES.map((f) => (
                <div key={f} className="flex items-start gap-2.5">
                  <Check size={16} className="mt-0.5 shrink-0 text-amber-300" />
                  <span className="text-sm text-white/75">{f}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-white/60">
              Habibi Exclusive boʻyicha komissiya hajmi va shartlari loyihaning koʻlami hamda
              tuzilishidan kelib chiqib, individual kelishiladi. Shu tariqa siz faqat kichik
              kompaniyalarni emas, yirik korporativ mijozlarni ham olib kelishingiz mumkin.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ─── 06. Что может делать партнёр ─── */}
      <Section seed={6}>
        <SectionHead
          tag="Tavsiyadan koʻra koʻproq"
          title="Imkoniyatlaringiz oddiy tavsiyadan ancha kengroq"
          lead="Habibi shunchaki SaaS mahsulot emas — bu biznes uchun raqamli ekotizim. Uning atrofida oʻz daromad manbangizni qurishingiz mumkin."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OPPORTUNITIES.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.08}>
              <div className={`${CARD} h-full`}>
                <item.icon size={22} className="text-emerald-400" />
                <h3 className="mt-4 text-lg font-medium text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── 07. Для кого ─── */}
      <Section seed={7}>
        <SectionHead
          tag="Auditoriya"
          title="Hamkorlik dasturi kimlar uchun?"
          lead="Marketolog, dasturchi yoki bloger boʻlish shart emas — Habibi yordam bera oladigan tadbirkorlarni tanishingiz kifoya."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) * 0.08}>
              <div className={`${CARD} h-full`}>
                <a.icon size={22} className="text-white/50" />
                <h3 className="mt-4 text-lg font-medium text-white">{a.title}</h3>
                <p className="mt-2 text-sm font-medium text-white/80">{a.question}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── 08. Реферальная ссылка ─── */}
      <Section seed={8}>
        <Reveal>
          <SectionTag>Hisobga olish</SectionTag>
        </Reveal>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <div>
              <h2 className="text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
                Shaxsiy referal havolangiz
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                Roʻyxatdan oʻtganingizdan soʻng oʻz havolangizni olasiz va uni potensial mijozga
                yuborasiz. Tizim bosishni qayd etadi va yangi foydalanuvchini hamkor hisobingizga
                bogʻlaydi.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/80">
                «Bu mijoz mendan keldi» deb aytib oʻtirishingiz shart emas. Hammasi avtomatik
                tarzda amalga oshadi.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className={CARD}>
              <p className="text-xs uppercase tracking-widest text-white/40">
                Havolangiz shunday koʻrinadi
              </p>
              <code className="mt-3 block overflow-x-auto rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-3 font-mono text-sm text-emerald-300">
                habibi-erp.com/ref/ismingiz
              </code>
              <ul className="mt-5 space-y-2.5">
                {[
                  'Mijoz havolangiz orqali oʻtadi va roʻyxatdan oʻtadi',
                  'Bosish va roʻyxatdan oʻtish sizning hisobingizga bogʻlanadi',
                  'Komissiya uning birinchi toʻlovidan boshlanadi',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-white/65">
                    <Check size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ─── 09. Кабинет ─── */}
      <Section id="kabinet" seed={9}>
        <SectionHead
          tag="Boshqaruv paneli"
          title="Sizning hamkor boshqaruv panelingiz"
          lead="Barcha raqamlar bir joyda — havolangizdagi bosishlardan tortib toʻlovga tayyor summagacha."
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {DASHBOARD_METRICS.map((m, i) => (
            <Reveal key={m.title} delay={(i % 4) * 0.06}>
              <div className={`${CARD} h-full !p-5`}>
                <m.icon size={20} className="text-emerald-400" />
                <h3 className="mt-3.5 text-base font-medium text-white">{m.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className={card('plain', 'mt-4 md:!p-8')}>
            <h3 className="text-lg font-medium text-white">Keyingi daraja doim koʻz oʻngingizda</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
              Panel yuqori stavkaga qanchalik yaqinlashganingizni koʻrsatadi. Masalan:
            </p>
            <div className="mt-6 max-w-md">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-white">7 / {RATE_THRESHOLD} mijoz</span>
                <span className="text-white/50">30% gacha yana 4 ta mijoz</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[63.6%] rounded-full bg-emerald-400" />
              </div>
              <p className="mt-4 text-xs text-white/40">
                Ushbu ekrandagi raqamlar — misol. {RATE_THRESHOLD} ta faol toʻlovchi mijozdan soʻng
                30% stavka butun faol bazangizga qoʻllanadi.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <LiquidButton size="xl" onClick={apply} className="rounded-full text-white">
              Shaxsiy kabinet yaratish
              <ArrowRight size={18} />
            </LiquidButton>
            <Link
              to="/uz/partners/login"
              className="rounded-full border border-white/25 px-8 py-3.5 text-base font-medium text-white transition-colors hover:border-white/50"
            >
              Allaqachon hamkormisiz? Kirish
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* ─── 10. Почему это выгодно ─── */}
      <Section seed={10}>
        <SectionHead
          tag="Takrorlanuvchi daromad"
          title="Nega bu foydali"
          lead="Koʻpchilik referal dasturlar bitta harakat bilan tugaydi: tavsiya qildingiz, bir martalik bonus oldingiz — tamom. Habibi boshqacha ishlaydi — siz sizga muntazam toʻlov keltiradigan mijozlar bazasini quryapsiz."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GROWTH_STEPS.map((s, i) => {
            const rate = s.clients >= RATE_THRESHOLD ? RATE_HIGH : RATE_LOW
            return (
              <Reveal key={s.label} delay={(i % 4) * 0.08}>
                <div className={`${CARD} h-full`}>
                  <p className="text-xs uppercase tracking-widest text-white/40">{s.label}</p>
                  <p className="mt-3 text-4xl font-semibold tracking-tight text-white">
                    {s.clients}
                    {i === GROWTH_STEPS.length - 1 && '+'}
                  </p>
                  <p className="mt-1 text-sm text-white/55">faol mijoz</p>
                  <p className="mt-5 border-t border-white/10 pt-4 text-sm text-white/70">
                    oyiga{' '}
                    <span className="font-semibold text-emerald-300">
                      {formatMoney(s.clients * PRICE_PRO * rate)}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-white/35">
                    agar hammasi Habibi Proʼda boʻlsa, {Math.round(rate * 100)}% stavkada
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* ─── 11. Вы не продаёте ERP ─── */}
      <Section seed={11}>
        <Reveal>
          <SectionTag>Sotish shart emas</SectionTag>
        </Reveal>
        <Reveal>
          <div className={card('plain', '!rounded-3xl !p-8 md:!p-12')}>
            <h2 className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
              Siz ERP sotmaysiz
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65">
              Professional dasturiy taʼminot sotuvchisiga aylanishingiz shart emas. Sizning
              vazifangiz — tadbirkorni Habibi bilan tanishtirish. Keyin mijoz mahsulotni oʻzi
              oʻrganadi.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-5 py-2.5 text-sm font-medium text-emerald-300">
                14 kun bepul
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/75">
                Bank kartasi talab qilinmaydi
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/75">
                Mos kelsa, mijoz tarif tanlaydi, siz esa komissiya olasiz
              </span>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ─── 12. Что получает клиент ─── */}
      <Section id="tarify-klienta" seed={12}>
        <SectionHead
          tag="Mijoz uchun foyda"
          title="Mijoz nima oladi?"
          lead="Hamkorlik dasturi tavsiya haqiqatan foydali boʻlgandagina ishlaydi. Mijozingiz butun Habibi ekotizimiga kirish imkonini oladi."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={(i % 4) * 0.08}>
              <div
                className={card(tier.isExclusive ? 'amber' : 'plain', 'flex h-full flex-col')}
              >
                <h3 className="text-lg font-medium text-white">{tier.name}</h3>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  {tier.priceLabel ?? `€${tier.priceMonthly}`}
                  {!tier.priceLabel && (
                    <span className="ml-1 text-sm font-normal text-white/45">/ oy</span>
                  )}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{tier.description}</p>
                <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/65">
                      <Check
                        size={15}
                        className={`mt-0.5 shrink-0 ${
                          tier.isExclusive ? 'text-amber-300' : 'text-emerald-400'
                        }`}
                      />
                      {featureText(f)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-6 text-sm text-white/45">
            Dastlabki 14 kun bepul, karta talab qilinmaydi. Habibi Exclusive narxi va shartlari
            biznes auditidan soʻng hisoblanadi.
          </p>
        </Reveal>
      </Section>

      {/* ─── 13. Выигрывают три стороны ─── */}
      <Section seed={13}>
        <SectionHead tag="Win-win-win" title="Uch tomon ham yutadi" />
        <div className="grid gap-4 md:grid-cols-3">
          {WIN_SIDES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className={`${CARD} h-full`}>
                <s.icon size={22} className="text-emerald-400" />
                <h3 className="mt-4 text-lg font-medium text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── 14. Условия ─── */}
      <Section id="usloviya" seed={14}>
        <SectionHead
          tag="Shaffof"
          title="Hamkorlik dasturi shartlari"
          lead="Asosiy qoidalar oldindan — keyinchalik kutilmagan holatlar boʻlmasligi uchun."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {CONDITIONS.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 0.06}>
              <div className={`${CARD} h-full !p-5`}>
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-semibold tabular-nums text-white/25">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-base font-medium text-white">{c.title}</h3>
                </div>
                <p className="mt-2 pl-8 text-sm leading-relaxed text-white/60">
                  {renderRich(c.text)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── 15. Финальный CTA ─── */}
      <section className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-16">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={CLOSING_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 className="text-3xl font-medium leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl">
              Habibi bilan daromad qilishni boshlang
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
              Bitta tadbirkorni tanishingiz yoki 10 000 obunachingiz borligi muhim emas. Agar
              biznesni Habibi bilan tanishtira olsangiz, bizning hamkorimiz boʻla olasiz.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
              {FINAL_CHAIN.map((step, i) => (
                <span key={step} className="flex items-center gap-2.5">
                  <span
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm ${
                      i === FINAL_CHAIN.length - 1
                        ? 'border-emerald-400/40 bg-emerald-400/10 font-semibold text-emerald-300'
                        : 'border-white/20 bg-white/5 text-white/85'
                    }`}
                  >
                    {step}
                  </span>
                  {i < FINAL_CHAIN.length - 1 && <span className="text-white/35">→</span>}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-2 text-base text-white/70">
              <Sparkles size={16} className="text-emerald-400" />
              Habibi texnologiyani yaratadi. Siz esa tavsiyalarni.
            </p>
            <LiquidButton size="xl" onClick={apply} className="mt-6 rounded-full text-white">
              Habibi hamkori boʻlish
              <ArrowRight size={18} />
            </LiquidButton>
          </Reveal>
        </div>
      </section>

      <PartnerFooter />
      <AiChatWidget page="partner" />
    </div>
  )
}

export default function UzPartnerPage() {
  return (
    <ContactProvider>
      <UzPartnerPageContent />
    </ContactProvider>
  )
}
