import {
  Stethoscope,
  Store,
  UtensilsCrossed,
  Scissors,
  HardHat,
  Factory,
  Boxes,
  Truck,
  Wrench,
  Dumbbell,
  GraduationCap,
  Building2,
  Code,
  Scale,
  Sprout,
  BedDouble,
  Pill,
  PartyPopper,
  SprayCan,
  ShoppingCart,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from './Reveal'

interface Business {
  Icon: LucideIcon
  name: string
  text: string
}

const BUSINESSES: Business[] = [
  { Icon: Stethoscope, name: 'Медицина и клиники', text: 'Запись пациентов, история приёмов и учёт услуг — в одной системе.' },
  { Icon: Store, name: 'Розничная торговля', text: 'Касса, склад и остатки в реальном времени — без пересортицы.' },
  { Icon: UtensilsCrossed, name: 'Рестораны и кафе', text: 'Заказы, склад продуктов и себестоимость блюд под контролем.' },
  { Icon: Scissors, name: 'Салоны красоты', text: 'Онлайн-запись, клиентская база и учёт мастеров и расходников.' },
  { Icon: HardHat, name: 'Строительство', text: 'Сметы, закупки материалов и контроль этапов на каждом объекте.' },
  { Icon: Factory, name: 'Производство', text: 'Планирование, себестоимость и контроль качества по всей цепочке.' },
  { Icon: Boxes, name: 'Оптовая торговля', text: 'Прайсы, отгрузки, дебиторка и остатки складов в одном месте.' },
  { Icon: Truck, name: 'Логистика и доставка', text: 'Заявки, маршруты и статусы доставки — прозрачно для клиента.' },
  { Icon: Wrench, name: 'Автосервис', text: 'Заказ-наряды, запчасти на складе и история обслуживания авто.' },
  { Icon: Dumbbell, name: 'Фитнес-клубы', text: 'Абонементы, расписание и учёт посещений и тренеров.' },
  { Icon: GraduationCap, name: 'Образование и курсы', text: 'Группы, расписание, оплаты и прогресс учеников.' },
  { Icon: Building2, name: 'Недвижимость', text: 'База объектов и воронка сделок — от заявки до продажи.' },
  { Icon: Code, name: 'IT и digital-агентства', text: 'Проекты, задачи, тайм-трекинг и финансы по каждому клиенту.' },
  { Icon: Scale, name: 'Юридические услуги', text: 'Дела, документы, дедлайны и биллинг клиентов под контролем.' },
  { Icon: Sprout, name: 'Сельское хозяйство', text: 'Учёт урожая, склад, техника и продажи в единой системе.' },
  { Icon: BedDouble, name: 'Отели и гостиницы', text: 'Бронирования, загрузка номеров и услуги гостей в одном окне.' },
  { Icon: Pill, name: 'Аптеки', text: 'Остатки препаратов, сроки годности и продажи в реальном времени.' },
  { Icon: PartyPopper, name: 'Организация мероприятий', text: 'Проекты, подрядчики, бюджеты и задачи по каждому событию.' },
  { Icon: SprayCan, name: 'Клининг и услуги', text: 'Заявки, графики бригад и повторные заказы клиентов.' },
  { Icon: ShoppingCart, name: 'Интернет-магазины', text: 'Заявки с сайта, склад и финансы — связаны автоматически.' },
]

export default function BusinessTypes() {
  return (
    <section
      id="biznes"
      className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-16"
    >
      {/* Мягкое свечение + края в чёрный для бесшовного стыка */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/40">Отрасли</p>
          <h2 className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            В каких бизнесах полезна система Habibi
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            Habibi закрывает операционные задачи в самых разных сферах — от розницы до производства.
            Единая экосистема подстраивается под процессы вашего бизнеса.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {BUSINESSES.map((b, i) => (
            <Reveal key={b.name} delay={(i % 4) * 0.05}>
              <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06]">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-transform duration-300 group-hover:scale-105">
                  <b.Icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="mb-2 text-base font-medium text-white">{b.name}</h3>
                <p className="text-sm leading-relaxed text-white/55">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
