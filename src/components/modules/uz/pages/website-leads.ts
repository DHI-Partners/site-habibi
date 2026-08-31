import { Globe } from 'lucide-react'
import SiteLeadsPreview from '../../../uz/previews/SiteLeadsPreview'
import type { ModulePageData } from '../../types'

/* Модуль «Saytdan kelgan mijozlar» — страница /uz/modules/website-leads. */

export const WEBSITE_LEADS: ModulePageData = {
  slug: 'website-leads',
  icon: Globe,
  title: 'Saytdan kelgan mijozlar',
  lead: 'Saytdagi har bir soʻrov darhol ishdagi vazifaga aylanadi.',
  pills: ['Barcha kanallardan soʻrovlar', 'Statuslar va masʼullar', 'CRMʼga oʻtkazish', 'Manbalar analitikasi'],
  pains: [
    {
      icon: '📧',
      title: 'Soʻrovlar pochtaga tushib ketadi',
      text: 'Saytdagi forma umumiy pochtaga xat yuboradi. U axborotnomalar orasida gʻarq boʻladi — butunlay.',
    },
    {
      icon: '🐢',
      title: 'Javob bir kundan keyin keladi',
      text: 'Soʻrov payqalib, «kerakli odamga» uzatilgunicha mijoz raqobatchidan sotib olib boʻlgan edi.',
    },
    {
      icon: '🧩',
      title: 'Kanallar tarqoq',
      text: 'Forma pochtaga tushadi, chat alohida oynada, WhatsApp va Instagram esa shaxsiy telefonlarda. Yagona manzara yoʻq.',
    },
    {
      icon: '🤷',
      title: 'Soʻrovning egasi yoʻq',
      text: 'Murojaatni hamma koʻrdi — hech kim olmadi. Bir hafta oʻtib: «bu mijoz bilan kim ishlayotgan edi?»',
    },
    {
      icon: '🎯',
      title: 'Manbalar nomaʼlum',
      text: 'Soʻrov qayerdan kelgani — reklamadanmi, qidiruvdanmi yoki Instagramdanmi — hech kim qayd qilmaydi. Byudjet koʻr-koʻrona sarflanadi.',
    },
    {
      icon: '📉',
      title: 'Sayt konversiyasi — jumboq',
      text: 'Qancha tashrifchi, qancha soʻrov, qanchasi savdoga aylandi — raqamlar yoʻq, faqat taxminlar.',
    },
  ],
  chaos: {
    lead: 'Har bir bosish va har bir tashrifchi uchun pul toʻlaysiz — soʻng tayyor mijozlarni eng oxirgi qadamda yoʻqotasiz.',
    stats: [
      { value: '~30%', text: 'soʻrovlar saytdan menejergacha boʻlgan yoʻlda yoʻqoladi' },
      { value: '5 daqiqa', text: '— shu vaqtdan keyin lidni yopish imkoniyati keskin pasayadi' },
      { value: '1-chi', text: 'mijozga birinchi javob bergan odam sotadi. Tezlik hal qiladi' },
      { value: '×2', text: 'soʻrovlarning uchdan biri javobsiz yoʻqolsa, lid narxi shuncha qimmatlashadi' },
    ],
    example: {
      before:
        'Hisoblab koʻring: oyiga 26 mln soʻmlik reklama byudjetida soʻrovlarning 30% yoʻqolishi ',
      accent: 'oyiga 7,8 mln soʻm toʻgʻridan-toʻgʻri chiqindiga ketishi',
      after: ' degani — u olib kelgan mijozlar bilan birga.',
    },
  },
  about: {
    lead: 'Sayt va ijtimoiy tarmoqlardagi barcha murojaatlar — formalar, chat, messenjerlar, reklama — yagona navbatga yigʻiladi. Har bir soʻrovning statusi, manbasi va masʼuli bor.',
    cards: [
      {
        title: '📥 Hech bir soʻrov yoʻqolmaydi',
        text: 'Har bir murojaat yuborilgan zahoti tizimda qayd etiladi — pochta qutisida yoki menejerning telefonida emas.',
      },
      {
        title: '⚡ Darhol ishga tushadi',
        text: 'Yangi soʻrov darhol masʼulga biriktiriladi — mijoz hali «qizigan» holida javob oladi.',
      },
      {
        title: '🔗 Bir bosishda CRMʼda lid',
        text: 'Soʻrov toʻliq tarixi bilan lidga aylanadi: ismi, manbasi, yozishmasi.',
      },
      {
        title: '📊 Manbalar raqamlarda',
        text: 'Qaysi kanal soʻrov keltirayotganini va qaysi biri faqat reklama xarajati ekanini koʻrasiz.',
      },
    ],
  },
  capabilities: [
    {
      title: 'Barcha murojaatlar bir joyda',
      lead: 'Mijoz qayerdan yozmasin — soʻrov yagona navbatga tushadi.',
      flow: ['Saytdagi forma', 'Saytdagi chat', 'WhatsApp', 'Telegram', 'Instagram', 'Reklama'],
      cards: [
        {
          title: 'Turli formalar — turli soʻrovlar',
          text: 'Aloqa, konsultatsiya, demo soʻrovi — forma turi qayd etiladi, shuning uchun jamoa mijoz nima istayotganini darhol biladi.',
        },
        {
          title: 'Har bir soʻrovda manba',
          text: 'Sayt, kampaniya va kanal avtomatik saqlanadi — bu halol reklama analitikasi uchun asos.',
        },
        {
          title: 'Murojaat vaqti',
          text: 'Soʻrov qachon kelganini va qancha vaqt kutayotganini koʻrasiz — javob tezligi oʻlchanadigan boʻladi.',
        },
      ],
    },
    {
      title: 'Statuslar va masʼullar',
      lead: 'Har bir soʻrov aniq yoʻldan oʻtadi — va u bilan kim ishlayotgani doim koʻrinadi.',
      flow: ['Yangi', 'Jarayonda', 'Lidga aylantirildi', 'Rad etildi'],
      cards: [
        {
          title: 'Yangi soʻrovlar navbati',
          text: 'Barcha ishlov berilmagan murojaatlar koʻz oldingizda, pochta qutisida emas. Hech narsa sezilmay osilib qolmaydi.',
        },
        {
          title: 'Har biriga masʼul',
          text: 'Soʻrov aniq bir xodimga biriktiriladi — «hamma koʻrdi, hech kim olmadi» degan holat tugaydi.',
        },
        {
          title: 'Jamoa izohlari',
          text: 'Muhokama soʻrovning ichida boʻladi — kelishuv va tafsilotlar chatlarda yoʻqolmaydi.',
        },
      ],
    },
    {
      title: 'Soʻrov → lid → bitim',
      lead: 'Mijoz yoʻli uzilmaydi: saytdagi soʻrov bitta harakat bilan CRM lidiga aylanadi.',
      cards: [
        {
          title: 'Bir bosishda oʻtkazish',
          text: 'Soʻrov tekshirildi — menejer uni lidga aylantiradi. Ism, kontaktlar, manba va yozishma avtomatik oʻtadi.',
        },
        {
          title: 'Hech narsa ikki marta kiritilmaydi',
          text: 'Pochtadan jadvalga, jadvaldan CRMʼga koʻchirish yoʻq — maʼlumot oʻzi harakatlanadi.',
        },
        {
          title: 'Uzluksiz tarix',
          text: 'Saytga birinchi tashrifdan toʻlovgacha — mijozning butun yoʻli yagona tizimda.',
        },
      ],
    },
    {
      title: 'Sayt va manbalar analitikasi',
      lead: 'Boshqaruv ekrani: soʻrovlar bilan nima boʻlayotgani va qaysi kanallar ishlayotgani.',
      cards: [
        {
          title: 'Soʻrovlar oqimi',
          text: 'Qancha soʻrov kelgani, qanchasi ishda va qanchasi lidga aylangani — bir qarashda.',
        },
        {
          title: 'Shovqinni filtrlash',
          text: 'Spam va mavzuga aloqasiz murojaatlar sababi koʻrsatilgan holda rad etiladi — statistika halol qoladi.',
        },
        {
          title: 'Sahifalar konversiyasi',
          text: 'Tashrifchilar, sahifalar va soʻrovlar — qaysi sahifa sotayotganini va qaysi biri shunchaki reklama byudjetini yoqayotganini koʻrasiz.',
        },
      ],
    },
  ],
  Preview: SiteLeadsPreview,
  previewTitle: 'Habibiʼda «Saytdan kelgan mijozlar» ana shunday koʻrinadi',
  solve: [
    {
      was: 'Saytdagi soʻrovlar umumiy pochtada gʻarq boʻladi',
      now: 'Har bir murojaat raqami va statusi bilan yagona navbatda',
    },
    {
      was: 'Mijozlar bir kun kutadi va raqobatchiga ketadi',
      now: 'Soʻrov darhol biriktiriladi — javob bir necha daqiqada',
    },
    {
      was: 'Formalar, chatlar va messenjerlar alohida yashaydi',
      now: 'Barcha kanallar bir joyga yigʻilgan',
    },
    {
      was: 'Manbalar nomaʼlum — reklama koʻr-koʻrona ishlaydi',
      now: 'Har bir soʻrovda kanal va kampaniya qayd etiladi',
    },
    {
      was: 'Soʻrovlar CRMʼga qoʻlda, yoʻqotishlar bilan koʻchiriladi',
      now: 'Bir bosishda toʻliq tarixi bilan lidga aylantiriladi',
    },
  ],
  money: [
    {
      title: 'Reklama toʻliq oʻzini oqlaydi',
      text: 'Puli toʻlangan har bir soʻrov menejergacha yetib boradi — reklama byudjeti teshik chelakka quyilishdan toʻxtaydi.',
    },
    {
      title: 'Javob tezligi sotadi',
      text: 'Bir kun oʻrniga bir necha daqiqadagi javob konversiyani bir necha barobar oshiradi — mijozlar birinchi javob berganidan sotib oladi.',
    },
    {
      title: 'Byudjet ishlaydigan kanallarga oqadi',
      text: 'Qaysi manba lid va bitim keltirayotganini koʻrasiz — pul sotadigan joyga koʻchadi.',
    },
    {
      title: 'Sayt oʻlchanadigan boʻladi',
      text: 'Sahifa va formalar konversiyasi raqamlarda — sayt taxminlar emas, maʼlumotlar asosida yaxshilanadi.',
    },
  ],
  ai: {
    title: 'AI-agentlar soʻrovlar bilan ishlashni oʻz zimmasiga oladi',
    lead: 'Habibiʼda tez orada AI-agentlar paydo boʻladi — darhol javobdan qizigan lidni menejerga uzatishgacha boʻlgan butun yoʻlni avtomatlashtiradi.',
    flow: ['Saytdagi soʻrov', 'Darhol javob', 'Aniqlashtiruvchi savollar', 'Qizigan lid menejerga'],
    cards: [
      {
        title: '🤖 Bir necha soniyada javob beradi, 24/7',
        text: 'AI-agent forma yuborilgandan soʻng darhol mijoz bilan salomlashadi — kechasi ham, dam olish kunlari ham, bayramlarda ham.',
      },
      {
        title: '💬 Oʻzi kvalifikatsiya qiladi',
        text: 'Agent aniqlashtiruvchi savollar beradi, spamni filtrlaydi va kartochkani toʻldiradi — menejer tayyor lid oladi.',
      },
      {
        title: '🎯 Kerakli paytda uzatadi',
        text: 'Qizigan mijoz toʻliq kontekst bilan toʻgʻridan-toʻgʻri menejerga oʻtadi. Iliqi esa yetishtirishga tushadi. Hech narsa yoʻqolmaydi.',
      },
    ],
  },
  together: [
    {
      title: 'Saytdan kelgan mijozlar + Mijozlar va savdo',
      text: 'Soʻrov voronkadagi lidga aylanadi — va toʻliq tarixi bilan bitimga olib boriladi.',
    },
    {
      title: 'Saytdan kelgan mijozlar + Sotuvdan keyingi mijozlar',
      text: 'Mavjud mijozlarning murojaatlari qoʻllab-quvvatlash navbatiga tushadi — har bir kanalning oʻz navbati bor.',
    },
    {
      title: 'Saytdan kelgan mijozlar + Pul nazorat ostida',
      text: 'Uzluksiz analitika: saytga tashrifdan hisobdagi pulgacha — har bir kanalning hissasi koʻrinadi.',
    },
    {
      title: 'Saytdan kelgan mijozlar + Ishlar va vazifalar',
      text: 'Hisob-kitob yoki oʻlchov soʻrovi jamoa uchun vazifaga aylanadi — masʼuli va muddati bilan.',
    },
  ],
  industries: {
    list: [
      'Xizmatlar va agentliklar',
      'Onlayn savdo',
      'Koʻchmas mulk',
      'Tibbiyot va klinikalar',
      'Taʼlim',
      'Goʻzallik salonlari',
      'Turizm',
      'Avtoservislar',
      'IT kompaniyalar',
      'Qurilish va taʼmirlash',
    ],
    note: '«Saytdan kelgan mijozlar» bazaviy Habibi tarifiga kiradi va CRM bilan birga eng kuchli ishlaydi — ular birgalikda mijozning bosishdan bitimgacha boʻlgan yoʻlini qamrab oladi.',
  },
  tariff: { headline: '«Saytdan kelgan mijozlar» Habibi tarifida allaqachon bor', baseIncludes: true },
  cta: {
    title: 'Soʻrovlarni yoʻqotishni bugunoq toʻxtating',
    text: '«Sayt va soʻrovlar» bazaviy Habibi tarifining bir qismi — modulni CRM bilan birga ulang va reklamaga sarflangan har bir soʻm savdogacha yetib bora boshlaydi.',
  },
}
