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
    q: 'Is Habibi hard to implement?',
    a: [
      "No. You can start with the processes that matter most to your business and gradually add more modules. You don't have to move your whole business into the system in a single day. Start with CRM, sales and finance, then add inventory, purchasing, manufacturing, HR and other processes as needed.",
      "Habibi Premium users get dedicated onboarding that helps adapt the system to the company's needs faster.",
    ],
  },
  {
    q: 'Do I need to migrate data from other systems?',
    a: [
      'Not necessarily. You can start with Habibi from scratch or migrate the data you need from systems you used before.',
      'If you already have a customer database, products, financial information or other data, the migration options depend on the format and source of the data. If needed, the Habibi team will help determine the best way to migrate.',
    ],
  },
  {
    q: 'What happens to my data?',
    a: [
      'Your data stays in your Habibi workspace and is used to run your business. Access to information is controlled according to user permissions.',
      'Habibi Premium offers flexible access rights that let you define more precisely what information different employees can see and which features they can use.',
    ],
  },
  {
    q: 'Can I add employees?',
    a: [
      'Yes. You can add employees to the system depending on your chosen plan.',
      '**Habibi** supports up to 10 users, **Habibi Pro** — up to 50, and **Habibi Premium** — up to 100 users.',
      'Each employee can work on their own tasks and business processes, and on Premium you can flexibly manage access rights.',
    ],
  },
  {
    q: 'Can I try it for free?',
    a: [
      'Yes. Every plan comes with a **free 14-day demo period** — you get full access to all the features of your chosen plan and can explore the system at no cost. No credit card required to start.',
      'Two weeks is enough to move your real processes over, bring your team on board and see whether the system fits your business.',
      'When the demo period ends, you pick the plan that suits you: **Habibi** from €19 per month, **Habibi Pro** or **Habibi Premium** — depending on your team size and the capabilities you need.',
    ],
  },
  {
    q: 'What happens if my business grows?',
    a: [
      'Habibi grows with your business. You can start on the entry plan and then move up to a more capable one as your number of employees, processes and integrations increases.',
      'On Habibi Pro you get access to all 10 modules, AI agents, up to 50 users and up to 5 integrations. For companies that need dedicated onboarding, advanced analytics, flexible access rights and priority support, there is Habibi Premium.',
      'You can grow your business without changing your management system or rebuilding processes from dozens of disconnected services.',
    ],
  },
]

// Simple render of **bold** inside a paragraph.
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
      {/* Animated background — copperplate hatching with an "engraver's light" */}
      <CopperplateHatch
        className="pointer-events-none absolute inset-0"
        density={1}
        intensity={1.2}
        speed={0.8}
        seed={7}
        interactive
        safeArea={{ x: 0.05, y: 0.1, w: 0.9, h: 0.8 }}
      />
      {/* Light dimming for readability + edges fading to black for a seamless join */}
      <div className="pointer-events-none absolute inset-0 bg-black/25" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/40">FAQ</p>
          <h2 className="max-w-2xl text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-stretch">
          {/* Interactive CTA with a kinetic grid */}
          <KineticGrid
            globalColor="monochrome"
            className="min-h-[340px] rounded-[24px] border border-white/10"
          >
            <div className="flex h-full flex-col items-center justify-center px-8 py-14 text-center text-white">
              <h3
                className="mb-3 font-medium leading-[1.1]"
                style={{ fontSize: '2.4rem', letterSpacing: '-0.03em' }}
              >
                Still have
                <br />
                questions?
              </h3>
              <p className="mb-7 max-w-xs text-sm font-normal text-white/70">
                Message us — we'll answer and help you pick the right plan for your business.
              </p>
              <button
                type="button"
                onClick={() => open('Habibi')}
                className="cursor-pointer rounded-xl border-none bg-white px-8 py-3.5 text-sm font-semibold text-black transition-transform duration-200 hover:-translate-y-0.5"
                style={{ boxShadow: '0 10px 24px rgba(0,0,0,0.45)' }}
              >
                Request a demo
              </button>
            </div>
          </KineticGrid>

          {/* Accordion */}
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
