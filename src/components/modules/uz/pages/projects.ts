import { BarChart3 } from 'lucide-react'
import ProjectsPreview from '../../../uz/previews/ProjectsPreview'
import type { ModulePageData } from '../../types'

/* Модуль «Ishlar va vazifalar» — узбекская версия страницы /uz/modules/projects. */

export const PROJECTS: ModulePageData = {
  slug: 'projects',
  icon: BarChart3,
  title: 'Ishlar va vazifalar',
  lead: 'Muddatlar, masʼullar va statuslar — hammasi bitta ekranda.',
  pills: ['Loyihalar', 'Vazifalar va ustuvorliklar', 'Gantt diagrammasi', 'Vaqt va byudjet'],
  pains: [
    {
      icon: '💬',
      title: 'Vazifalar chatlarda va qogʻoz varaqlarda',
      text: 'Topshiriqlar ogʻzaki va messenjerlarda beriladi. Bir hafta oʻtib kim nima vaʼda qilganini hech kim eslay olmaydi.',
    },
    {
      icon: '🤷',
      title: '«Men uni qilyapti deb oʻylagandim»',
      text: 'Masʼuli yoʻq vazifa — hech kim bajarmaydigan vazifa. Buni muddat tugagan kuni bilib qolasiz.',
    },
    {
      icon: '⏰',
      title: 'Muddatlar sezdirmay oʻtib ketadi',
      text: 'Kechikish haqida sana oʻtganidan keyin bilasiz. Mijoz norozi, jamoa esa «bizga hech kim aytmadi» deydi.',
    },
    {
      icon: '🗣️',
      title: 'Holat faqat yigʻilishda maʼlum boʻladi',
      text: 'Loyiha qanday ketayotganini bilish uchun hammani yigʻib, bir soat vaqt sarflaysiz. Va bu har hafta takrorlanadi.',
    },
    {
      icon: '💸',
      title: 'Loyiha byudjeti hisoblanmaydi',
      text: 'Qancha soat va qancha pul sarflanganini hech kim bilmaydi. Loyiha foydali boʻldimi — buni topshirgandan keyin bilasiz.',
    },
    {
      icon: '📞',
      title: 'Mijoz soʻraydi — javob yoʻq',
      text: '«Loyihamiz qay ahvolda?» — menejer esa bitta ekranga qarash oʻrniga jamoani soʻroqqa tutadi.',
    },
  ],
  chaos: {
    lead: 'Har bir oʻtkazib yuborilgan muddat va hisobga olinmagan soat pulga, obroʻga va asabga tushadi.',
    stats: [
      { value: '20% gacha', text: 'foydani buzilgan muddatlar, qayta ishlash va hisobga olinmagan ish yeb qoʻyadi' },
      { value: '×2', text: 'vazifalar ogʻzaki berilib yoʻqolsa, loyihalar shuncha uzoq choʻziladi' },
      { value: '5–10', text: 'soat haftasiga egasi «loyiha qay ahvolda?» deb soʻrashga sarflaydi' },
      { value: '−1', text: 'mijoz har bir buzilgan muddat uchun — va uning tavsiyalari ham qoʻshimcha' },
    ],
    example: {
      before:
        'Hisoblab koʻring: tartibsizlik tufayli 5 kishilik jamoa kim nima qilishini aniqlashga kuniga atigi 1 soat yoʻqotsa, bu ',
      accent: 'oyiga 100 dan ortiq toʻlangan ish soati',
      after: ' — behuda sarflangan vaqt.',
    },
  },
  about: {
    lead: 'Kompaniyaning barcha loyihalari va vazifalari yagona tizimda. Har bir vazifaning masʼuli, muddati va ustuvorligi bor; har bir loyihaning statusi, byudjeti va bajarilish darajasi — yigʻilishlarsiz koʻrinadi.',
    cards: [
      {
        title: '📋 Hech narsa yoʻqolmaydi',
        text: 'Har bir topshiriq — chatdagi xabar emas, masʼuli va muddati bor vazifa.',
      },
      {
        title: '👤 Masʼul har doim bor',
        text: '«Men uni qilyapti deb oʻylagandim» degan holat imkonsiz: vazifaning bitta masʼuli bor va uni hamma koʻradi.',
      },
      {
        title: '📊 Yigʻilishsiz holat',
        text: 'Barcha loyiha va vazifalarning bajarilishi istalgan paytda bitta ekranda koʻrinadi.',
      },
      {
        title: '💰 Byudjet nazorat ostida',
        text: 'Har bir loyiha boʻyicha vaqt va xarajatlar — byudjet ichida qolayotganingizni koʻrasiz.',
      },
    ],
  },
  capabilities: [
    {
      title: 'Loyihalar nazorat ostida',
      lead: 'Har bir loyiha boʻyicha toʻliq manzara: mijoz va byudjetdan tortib foizlardagi bajarilishgacha.',
      cards: [
        {
          title: 'Loyiha kartochkasi',
          text: 'Mijoz, masʼul, boshlanish va tugash sanalari, byudjet va status — hammasi bir joyda.',
        },
        {
          title: 'Foizlardagi bajarilish',
          text: 'Bajarilish vazifalardan hisoblanadi — masalan, 40 tadan 28 tasi bajarildi. «Deyarli tayyor» oʻrniga halol raqamlar.',
        },
        {
          title: 'Kechikishlar darhol koʻrinadi',
          text: 'Xavf ostidagi loyihalar ajratib koʻrsatiladi — muddat yonib ketishidan oldin jamoani kuchaytirasiz.',
        },
      ],
      note: 'Natija: mijoz «loyihamiz qay ahvolda?» deb soʻraganda, menejer 10 soniyada javob beradi — «hozir aniqlab beraman» emas, raqamlar bilan.',
    },
    {
      title: 'Ustuvorliklari bor vazifalar',
      lead: 'Har bir vazifa aniq yoʻldan oʻtadi — va avval nima qilish kerakligi doim ravshan.',
      flow: ['Rejada', 'Jarayonda', 'Kutilmoqda', 'Bajarildi'],
      cards: [
        {
          title: 'Ustuvorliklar',
          text: 'Yuqori, oʻrta, past — jamoa eng baland ovoz bilan aytilganini emas, eng muhimini qiladi.',
        },
        {
          title: 'Muddat va masʼul',
          text: 'Har bir vazifaning bitta masʼuli va bajarilish sanasi bor. Muddati oʻtgan vazifalar avtomatik ajratiladi.',
        },
        {
          title: 'Butun tarix ichida',
          text: 'Izohlar, fayllar va qarorlar vazifaning oʻzida saqlanadi — kelishuvlarni chatlardan qidirish shart emas.',
        },
      ],
    },
    {
      title: 'Gantt diagrammasi, vaqt va xarajatlar',
      lead: 'Loyiha rejasi koʻrgazmali vaqt shkalasida, xarajatlar esa raqamlarda.',
      cards: [
        {
          title: 'Gantt diagrammasi',
          text: 'Loyihaning barcha bosqichlari bitta vaqt shkalasida. Bogʻliqliklar koʻrinadi, bitta bosqichni surganingizda topshirish sanasiga taʼsiri darhol maʼlum boʻladi.',
        },
        {
          title: 'Ish vaqti hisobi',
          text: 'Soatlar vazifa va loyiha boʻyicha qayd etiladi — jamoaning vaqti aslida qayerga ketayotganini koʻrasiz.',
        },
        {
          title: 'Byudjet va fakt',
          text: 'Har bir loyiha boʻyicha rejadagi byudjet va haqiqiy xarajatlar. Byudjetdan chiqish topshirgandan keyin emas, ish jarayonida koʻrinadi.',
        },
      ],
    },
    {
      title: 'Loyiha va vazifalar hisobotlari',
      lead: 'Boshqaruv ekrani: kompaniyaning barcha loyihalari raqamlarda.',
      cards: [
        {
          title: 'Barcha loyiha va vazifalar',
          text: 'Nechta loyiha faol, nechtasi yakunlangan va nechtasi kechikish xavfi ostida — bir qarashda.',
        },
        {
          title: 'Jamoa yuklamasi',
          text: 'Kim haddan tashqari band, kim boʻsh — vazifalar tekis taqsimlanadi, charchash ham, boʻsh turish ham boʻlmaydi.',
        },
        {
          title: 'Loyiha rentabelligi',
          text: 'Har bir loyiha boʻyicha vaqt va pul qaysi mijoz va qaysi ish haqiqatan daromad keltirayotganini koʻrsatadi.',
        },
      ],
    },
  ],
  Preview: ProjectsPreview,
  previewTitle: 'Habibiʼda «Ishlar va vazifalar» ana shunday koʻrinadi',
  solve: [
    {
      was: 'Vazifalar chatlarda, qogʻozlarda va «boshda»',
      now: 'Har bir topshiriq — masʼuli, muddati va ustuvorligi bor vazifa',
    },
    {
      was: '«Men uni qilyapti deb oʻylagandim» — vazifa esa bajarilmagan',
      now: 'Har bir vazifaning bitta masʼuli bor va uni butun jamoa koʻradi',
    },
    {
      was: 'Buzilgan muddatlar fakt boʻlgandan keyin maʼlum boʻladi',
      now: 'Muddati oʻtayotgan vazifa va loyihalar oldindan ajratib koʻrsatiladi',
    },
    {
      was: 'Loyiha holatini bilish uchun bir soatlik yigʻilish kerak',
      now: 'Barcha loyihalarning bajarilishi istalgan paytda bitta ekranda',
    },
    {
      was: 'Loyiha rentabelligi — topshirgandan keyingi kutilmagan xabar',
      now: 'Vaqt va xarajatlar byudjetga nisbatan ish jarayonida koʻrinadi',
    },
  ],
  money: [
    {
      title: 'Loyihalar oʻz vaqtida topshiriladi',
      text: 'Ishini oʻz vaqtida olgan mijozlar qaytib keladi va tavsiya qiladi. Ishonchli ijrochi obroʻsi yangi buyurtmalar keltiradi.',
    },
    {
      title: 'Har bir loyihaning rentabelligi',
      text: 'Byudjetga nisbatan vaqt va xarajatlar qaysi loyiha va mijoz daromad keltirayotganini — qaysinisidan voz kechish kerakligini koʻrsatadi.',
    },
    {
      title: 'Jamoa koʻproq ish bajaradi',
      text: 'Yigʻilishlar, aniqlashtirishlar va yoʻqolgan vazifalar kamayadi — oʻsha odamlarning oʻzi yangi xodimsiz koʻproq loyiha yopadi.',
    },
    {
      title: 'Egasi oʻsish bilan shugʻullanadi',
      text: '«Loyiha qay ahvolda?» degan savolga ketadigan haftasiga 5–10 soat biznesni oʻstirishga qaytadi.',
    },
  ],
  ai: {
    title: 'AI-agentlar loyiha ustidagi kundalik ishni oʻz zimmasiga oladi',
    lead: 'Habibiʼda tez orada AI-agentlar paydo boʻladi — vazifa yaratishdan holat hisobotlarigacha boʻlgan loyiha menejerining bir xil ishlarini avtomatlashtiradi.',
    flow: ['Kelishuvlar', 'Vazifalar va muddatlar', 'Eslatmalar', 'Holat hisoboti'],
    cards: [
      {
        title: '🤖 Vazifalarni oʻzi yaratadi',
        text: 'AI-agent xat va uchrashuvlardagi kelishuvlarni masʼuli va muddati bor vazifalarga aylantiradi.',
      },
      {
        title: '🔔 Muddatlarni kuzatadi',
        text: 'Agent ijrochilarga muddatlarni eslatadi va vazifa toʻxtab qolish xavfi tugʻilganda rahbarga xabar beradi.',
      },
      {
        title: '📄 Tayyor holat hisobotlari',
        text: 'Agent mijoz yoki egasi uchun loyiha hisobotini oʻzi yigʻadi — real maʼlumotlardan, bir necha daqiqada.',
      },
    ],
  },
  together: [
    {
      title: 'Ishlar va vazifalar + Mijozlar va savdo',
      text: 'Yutilgan bitim loyihaga aylanadi — mijoz, byudjet va muddatlar avtomatik oʻtadi.',
    },
    {
      title: 'Ishlar va vazifalar + Pul nazorat ostida',
      text: 'Loyiha xarajatlari va toʻlovlar moliyaviy hisobotlarga tushadi. Rentabellik halol hisoblanadi.',
    },
    {
      title: 'Ishlar va vazifalar + Mening jamoam',
      text: 'Har kimning yuklamasi va loyihalarga qoʻshgan hissasi — adolatli bonuslar uchun asos.',
    },
    {
      title: 'Ishlar va vazifalar + Sotuvdan keyingi mijozlar',
      text: 'Mijoz murojaatlari jamoa uchun vazifaga aylanadi — boʻlimlar orasida hech narsa yoʻqolmaydi.',
    },
  ],
  industries: {
    list: [
      'Agentliklar va marketing',
      'IT va dasturlash',
      'Qurilish va taʼmirlash',
      'Dizayn studiyalari',
      'Yuridik xizmatlar',
      'Konsalting',
      'Muhandislik',
      'Arxitektura',
      'Tadbirlar tashkil etish',
      'Buyurtma asosida ishlab chiqarish',
    ],
    note: '«Ishlar va vazifalar» bazaviy Habibi tarifiga kiradi — jamoalar Habibiʼda ishni koʻpincha shu moduldan boshlaydi.',
  },
  tariff: { headline: '«Ishlar va vazifalar» Habibi tarifida allaqachon bor', baseIncludes: true },
  cta: {
    title: 'Loyihalaringizni bugunoq tartibga soling',
    text: '«Ishlar va vazifalar» bazaviy Habibi tarifiga kiradi — birinchi loyihangizni bugun boshlang va navbatdagi yigʻilishni bir soat oʻrniga 10 daqiqada oʻtkazing.',
  },
}
