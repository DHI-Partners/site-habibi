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
    q: 'هل تطبيق Habibi صعب؟',
    a: [
      'لا. يمكنك البدء بالعمليات الأهمّ لأعمالك ثم إضافة وحدات أخرى تدريجيًا. لست مضطرًا لنقل عملك كله إلى النظام في يوم واحد. ابدأ بـ CRM والمبيعات والمالية، ثم أضِف المخزون والمشتريات والإنتاج والموارد البشرية وغيرها عند الحاجة.',
      'في باقة Habibi Premium تتوفّر مرافقة شخصية تساعدك على تكييف النظام مع مهام شركتك بسرعة أكبر.',
    ],
  },
  {
    q: 'هل يلزم نقل البيانات من أنظمة أخرى؟',
    a: [
      'ليس بالضرورة. يمكنك البدء مع Habibi من الصفر أو نقل البيانات اللازمة من الأنظمة التي كنت تستخدمها.',
      'إن كان لديك قاعدة عملاء أو أصناف أو بيانات مالية أو غيرها، فإمكانية نقلها تعتمد على صيغة البيانات ومصدرها. وعند الحاجة يساعدك فريق Habibi في تحديد أفضل طريقة للترحيل.',
    ],
  },
  {
    q: 'ماذا يحدث لبياناتي؟',
    a: [
      'تبقى بياناتك في نظام عملك على Habibi وتُستخدم لإدارة أعمالك. والوصول إلى المعلومات مضبوط وفق صلاحيات المستخدمين.',
      'تتيح صلاحيات الوصول المرنة تحديد ما يمكن لكل موظف رؤيته والوظائف التي يعمل بها بدقّة أكبر.',
    ],
  },
  {
    q: 'هل يمكنني إضافة موظفين؟',
    a: [
      'نعم. يمكنك إضافة الموظفين إلى النظام بحسب الباقة المختارة.',
      'تتيح باقة **Habibi** حتى 10 مستخدمين، و**Habibi Pro** حتى 50 مستخدمًا، و**Habibi Premium** حتى 100 مستخدم.',
      'يعمل كل موظف على مهامه وعملياته، ويمكنك إدارة صلاحيات الوصول بمرونة.',
    ],
  },
  {
    q: 'كم تكلفة Habibi؟',
    a: [
      'باقة **Habibi** بـ 19$ شهريًا للفِرق الصغيرة، وتشمل إدارة علاقات العملاء والمبيعات والمشاريع والمالية حتى 10 مستخدمين.',
      'باقة **Habibi Pro** بـ 290$ شهريًا، وتشمل جميع وحدات النظام العشر ووكلاء الذكاء الاصطناعي وحتى 50 مستخدمًا والتحليلات المتقدّمة والدعم ذا الأولوية.',
      '**Habibi Premium** حلّ مخصّص تُحدَّد تكلفته بعد تدقيق أعمالك، ويشمل حتى 100 مستخدم والإعداد المخصّص وتنفيذ وحدة مخصّصة ابتداءً من 300$ ومرافقة كاملة ودعم 24/7.',
    ],
  },
  {
    q: 'هل يمكنني التجربة مجانًا؟',
    a: [
      'نعم. لكل الباقات **فترة تجريبية مجانية مدّتها 14 يومًا** — تحصل خلالها على وصول كامل إلى جميع إمكانيات الباقة المختارة وتستكشف النظام دون أي دفع. ولا حاجة إلى بطاقة بنكية للبدء.',
      'أسبوعان يكفيان لنقل عملياتك الفعلية وإضافة فريقك ومعرفة ما إذا كان النظام مناسبًا لأعمالك.',
      'وبعد انتهاء الفترة التجريبية تختار الباقة المناسبة: **Habibi** ابتداءً من 19$ شهريًا، أو **Habibi Pro**، أو **Habibi Premium** — بحسب عدد الموظفين والإمكانيات التي تحتاجها.',
    ],
  },
  {
    q: 'ماذا يحدث إذا نمَت أعمالي؟',
    a: [
      'ينمو Habibi مع أعمالك. تبدأ بباقة Habibi الأساسية، ثم تنتقل إلى Habibi Pro التي تمنحك كل وحدات النظام العشر ووكلاء الذكاء الاصطناعي وحتى 50 مستخدمًا.',
      'وعندما تحتاج إلى تدقيق وإعداد مخصّص ومرافقة كاملة ودعم 24/7، تنتقل إلى Habibi Premium بحلّ مصمَّم خصيصًا لأعمالك.',
      'يمكنك تطوير أعمالك دون تغيير نظام الإدارة ودون تجميع عمليات جديدة من عشرات الأدوات المتفرّقة.',
    ],
  },
]

// عرض بسيط للنص **الغامق** داخل الفقرة.
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
      {/* خلفية متحرّكة — تظليل حفري مع «ضوء النقّاش» */}
      <CopperplateHatch
        className="pointer-events-none absolute inset-0"
        density={1}
        intensity={1.2}
        speed={0.8}
        seed={7}
        interactive
        safeArea={{ x: 0.05, y: 0.1, w: 0.9, h: 0.8 }}
      />
      {/* تخفيف طفيف لسهولة القراءة + أطراف تتلاشى إلى الأسود لوصل سلس */}
      <div className="pointer-events-none absolute inset-0 bg-black/25" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/40">الأسئلة الشائعة</p>
          <h2 className="max-w-2xl text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            إجابات عن أكثر الأسئلة تكرارًا
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-stretch">
          {/* بطاقة تفاعلية بشبكة حركية */}
          <KineticGrid
            globalColor="monochrome"
            className="min-h-[340px] rounded-[24px] border border-white/10"
          >
            <div className="flex h-full flex-col items-center justify-center px-8 py-14 text-center text-white">
              <h3
                className="mb-3 font-medium leading-[1.1]"
                style={{ fontSize: '2.4rem', letterSpacing: '-0.03em' }}
              >
                هل بقيت
                <br />
                لديك أسئلة؟
              </h3>
              <p className="mb-7 max-w-xs text-sm font-normal text-white/70">
                اكتب لنا — نجيبك ونساعدك في اختيار الباقة المناسبة لأعمالك.
              </p>
              <button
                type="button"
                onClick={() => open('Habibi')}
                className="cursor-pointer rounded-xl border-none bg-white px-8 py-3.5 text-sm font-semibold text-black transition-transform duration-200 hover:-translate-y-0.5"
                style={{ boxShadow: '0 10px 24px rgba(0,0,0,0.45)' }}
              >
                اترك طلبًا
              </button>
            </div>
          </KineticGrid>

          {/* الأكورديون */}
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
