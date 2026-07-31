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
import Starfield from './Starfield'

interface Business {
  Icon: LucideIcon
  name: string
  text: string
  img: string
}

// Тематические фото Unsplash (проверены — грузятся, в т.ч. конкурентно).
const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=640&h=480&fit=crop&q=60`

const BUSINESSES: Business[] = [
  { Icon: Stethoscope, name: 'Медицина и клиники', text: 'Запись пациентов, история приёмов и учёт услуг — в одной системе.', img: u('1519494026892-80bbd2d6fd0d') },
  { Icon: Store, name: 'Розничная торговля', text: 'Касса, склад и остатки в реальном времени — без пересортицы.', img: u('1481437156560-3205f6a55735') },
  { Icon: UtensilsCrossed, name: 'Рестораны и кафе', text: 'Заказы, склад продуктов и себестоимость блюд под контролем.', img: u('1517248135467-4c7edcad34c4') },
  { Icon: Scissors, name: 'Салоны красоты', text: 'Онлайн-запись, клиентская база и учёт мастеров и расходников.', img: u('1634449571010-02389ed0f9b0') },
  { Icon: HardHat, name: 'Строительство', text: 'Сметы, закупки материалов и контроль этапов на каждом объекте.', img: u('1541888946425-d81bb19240f5') },
  { Icon: Factory, name: 'Производство', text: 'Планирование, себестоимость и контроль качества по всей цепочке.', img: u('1610891015188-5369212db097') },
  { Icon: Boxes, name: 'Оптовая торговля', text: 'Прайсы, отгрузки, дебиторка и остатки складов в одном месте.', img: u('1587293852726-70cdb56c2866') },
  { Icon: Truck, name: 'Логистика и доставка', text: 'Заявки, маршруты и статусы доставки — прозрачно для клиента.', img: u('1616432043562-3671ea2e5242') },
  { Icon: Wrench, name: 'Автосервис', text: 'Заказ-наряды, запчасти на складе и история обслуживания авто.', img: u('1492144534655-ae79c964c9d7') },
  { Icon: Dumbbell, name: 'Фитнес-клубы', text: 'Абонементы, расписание и учёт посещений и тренеров.', img: u('1534438327276-14e5300c3a48') },
  { Icon: GraduationCap, name: 'Образование и курсы', text: 'Группы, расписание, оплаты и прогресс учеников.', img: u('1580582932707-520aed937b7b') },
  { Icon: Building2, name: 'Недвижимость', text: 'База объектов и воронка сделок — от заявки до продажи.', img: u('1580587771525-78b9dba3b914') },
  { Icon: Code, name: 'IT и digital-агентства', text: 'Проекты, задачи, тайм-трекинг и финансы по каждому клиенту.', img: u('1498050108023-c5249f4df085') },
  { Icon: Scale, name: 'Юридические услуги', text: 'Дела, документы, дедлайны и биллинг клиентов под контролем.', img: u('1497366754035-f200968a6e72') },
  { Icon: Sprout, name: 'Сельское хозяйство', text: 'Учёт урожая, склад, техника и продажи в единой системе.', img: u('1560493676-04071c5f467b') },
  { Icon: BedDouble, name: 'Отели и гостиницы', text: 'Бронирования, загрузка номеров и услуги гостей в одном окне.', img: u('1618773928121-c32242e63f39') },
  { Icon: Pill, name: 'Аптеки', text: 'Остатки препаратов, сроки годности и продажи в реальном времени.', img: u('1631549916768-4119b2e5f926') },
  { Icon: PartyPopper, name: 'Организация мероприятий', text: 'Проекты, подрядчики, бюджеты и задачи по каждому событию.', img: u('1492684223066-81342ee5ff30') },
  { Icon: SprayCan, name: 'Клининг и услуги', text: 'Заявки, графики бригад и повторные заказы клиентов.', img: u('1740657254989-42fe9c3b8cce') },
  { Icon: ShoppingCart, name: 'Интернет-магазины', text: 'Заявки с сайта, склад и финансы — связаны автоматически.', img: u('1483985988355-763728e1935b') },
]

export default function BusinessTypes() {
  return (
    <section
      id="biznes"
      className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-16"
    >
      {/* Звёздный фон */}
      <Starfield className="pointer-events-none absolute inset-0" />
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
              <div className="group relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25">
                {/* Фото-фон */}
                <img
                  src={b.img}
                  alt={b.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {/* Затемнение для читаемости */}
                <div className="absolute inset-0 bg-black/[0.62] transition-colors duration-300 group-hover:bg-black/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/35" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                    <b.Icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-2 text-base font-medium text-white">{b.name}</h3>
                  <p className="text-sm leading-relaxed text-white/70">{b.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
