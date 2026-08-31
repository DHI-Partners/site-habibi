import { Factory } from 'lucide-react'
import ProductionPreview from '../../../uz/previews/ProductionPreview'
import type { ModulePageData } from '../../types'

/* Модуль «Ishlab chiqarish» — узбекская версия страницы /uz/modules/manufacturing. */

export const MANUFACTURING: ModulePageData = {
  slug: 'manufacturing',
  icon: Factory,
  title: 'Ishlab chiqarish',
  lead: 'Aniq tannarx, rejalashtirish va har bir bosqichda sifat nazorati.',
  pills: ['Ishlab chiqarish buyurtmalari', 'Rejalashtirish', 'Sexlar yuklamasi', 'Tannarx'],
  pains: [
    {
      icon: '🧮',
      title: 'Tannarx «chamalab» hisoblanadi',
      text: 'Mahsulot aslida qanchaga tushayotganini hech kim bilmaydi. Narx sezgi bilan qoʻyiladi, marja esa lotereyaga aylanadi.',
    },
    {
      icon: '📓',
      title: 'Reja usta daftarida yashaydi',
      text: 'Nima, qachon va qaysi sexda ishlab chiqarilishini faqat bitta odam biladi. U taʼtilga chiqsa, ishlab chiqarish koʻr-koʻrona ishlaydi.',
    },
    {
      icon: '🏭',
      title: 'Sexlar yuklamasi nomaʼlum',
      text: 'Bitta sex ortiqcha yuklangan va muddatlarni oʻtkazib yuboradi, boshqasi boʻsh turadi — buni esa faqat «ish oʻtib ketgach» koʻrasiz.',
    },
    {
      icon: '📦',
      title: 'Xomashyo kutilmaganda tugaydi',
      text: 'Materiallar buyurtmaning oʻrtasida tugaydi. Sex toʻxtaydi, muddatlar yonadi, xaridchi vahima rejimiga oʻtadi.',
    },
    {
      icon: '⏰',
      title: 'Buyurtma muddatlari surilib ketadi',
      text: 'Mijozga ikki hafta vaʼda qilingandi, olti hafta ketdi. Kechikish haqida u oʻzi — qoʻngʻiroq qilganida bildi.',
    },
    {
      icon: '🧯',
      title: 'Chiqindi va brak koʻrinmaydi',
      text: 'Normadan ortiq qancha material sarflangani va sifat qayerda yoʻqolgani — hech kim hisoblamaydi.',
    },
  ],
  chaos: {
    lead: 'Har bir boʻsh soat, oʻtkazib yuborilgan muddat va «koʻr» hisoblangan tannarx — ishlab chiqarish jimgina yoʻqotayotgan pul.',
    stats: [
      { value: '20% gacha', text: 'foydani boʻsh turish, materialning ortiqcha sarfi va rejalashtirishdagi tartibsizlik yeb qoʻyadi' },
      { value: '×2', text: 'qoʻlda rejalashtirilsa va sexlar orasida qoʻldan-qoʻlga oʻtkazilsa, buyurtma shuncha uzoq bajariladi' },
      { value: '15% gacha', text: 'hisobdan chiqarish qayd etilmasa, materiallar ortiqcha sarf va chalkashliklarda yoʻqoladi' },
      { value: '−1', text: 'oʻtkazib yuborilgan har bir muddat uchun mijoz — va u bu haqda boshqalarga ham aytadi' },
    ],
    example: {
      before:
        'Hisoblab koʻring: sexning oylik ish haqi fondi 130 mln soʻm boʻlsa va u vaqtining atigi 10% ida boʻsh tursa, faqat ish haqi boʻyicha ',
      accent: 'yiliga 156 mln soʻm yoʻqotasiz',
      after: ' — qoʻldan ketgan buyurtmalarni hisobga olmaganda.',
    },
  },
  about: {
    lead: 'Toʻliq ishlab chiqarish sikli yagona tizimda: buyurtmalar, reja, materiallar, sexlar yuklamasi va tannarx. Har bir buyurtmaning marshruti, muddatlari, masʼuli va foizdagi progressi bor.',
    cards: [
      {
        title: '🏭 Buyurtmalar nazorat ostida',
        text: 'Har bir ishlab chiqarish buyurtmasining statusi, progressi, sexi va rejadagi yakunlash sanasi bor.',
      },
      {
        title: '📅 Daftar oʻrniga reja',
        text: 'Ishlab chiqarish rejasi hammaga koʻrinadi: bugun nima ishlab chiqaramiz, ertaga nima va grafikdan ortda qolmayapmizmi.',
      },
      {
        title: '🧾 Materiallar hisoblab chiqiladi',
        text: 'Mahsulotning texnologik kartasi xomashyoga boʻlgan ehtiyojni hisoblaydi, hisobdan chiqarish esa aniq buyurtmalarga bogʻlanadi.',
      },
      {
        title: '💰 Aniq tannarx',
        text: 'Materiallar, ish haqi va ustama xarajatlar har bir mahsulotning aniq tannarxini beradi.',
      },
    ],
  },
  capabilities: [
    {
      title: 'Ishlab chiqarish buyurtmalari',
      lead: 'Har bir buyurtma aniq yoʻldan oʻtadi — va u qaysi bosqichda ekanini hamda grafikka ulgurayotganini doim koʻrasiz.',
      flow: ['Rejalashtirilgan', 'Jarayonda', 'Sifat nazorati', 'Yakunlangan'],
      cards: [
        {
          title: 'Foizdagi progress',
          text: 'Har bir buyurtma boʻyicha: mahsulot, miqdor, rejadagi sana va necha foiz bajarilgani.',
        },
        {
          title: 'Sex va masʼul',
          text: 'Har bir buyurtmaning sexi va masʼul ustasi bor. «Bu kimning ishi?» degan savol boshqa tugʻilmaydi.',
        },
        {
          title: 'Kechikishlar darhol koʻrinadi',
          text: 'Muddatni oʻtkazib yuborish xavfi bor buyurtmalar oldindan ajratib koʻrsatiladi — mijozdan uzr soʻrash oʻrniga quvvatni qayta taqsimlaysiz.',
        },
      ],
    },
    {
      title: 'Rejalashtirish va sexlar yuklamasi',
      lead: 'Har bir sex nima qilayotganini, torlik qayerda ekanini va yangi buyurtmani qayerga joylash mumkinligini koʻring.',
      cards: [
        {
          title: 'Ishlab chiqarish marshrutlari',
          text: 'Har bir mahsulot sexlar va operatsiyalar boʻyicha oʻz marshrutidan oʻtadi: toʻqish, tikish, qadoqlash. Muddatlar ishga tushirishdan oldin hisoblanadi.',
        },
        {
          title: 'Har bir sex boʻyicha yuklama',
          text: 'Har bir sexning ishlab chiqarish hajmi va yuklamasi diagrammada. Ortiqcha yuklangan uchastka grafikni buzib yuborishidan oldin koʻrinadi.',
        },
        {
          title: 'Mijozlarga halol vaʼdalar',
          text: 'Menejerlar muddatlarni «ehtimol ulguramiz» degan umid emas, ishlab chiqarishning real yuklamasi asosida aytadi.',
        },
      ],
    },
    {
      title: 'Materiallar va tannarx',
      lead: 'Tizim qancha xomashyo kerakligini va har bir mahsulot aslida qanchaga tushayotganini hisoblab beradi.',
      cards: [
        {
          title: 'Texnologik karta',
          text: 'Har bir mahsulotning tarkibi: materiallar, miqdorlar, sarf normalari. Xomashyoga boʻlgan ehtiyoj rejaga qarab avtomatik hisoblanadi.',
        },
        {
          title: 'Buyurtma boʻyicha hisobdan chiqarish',
          text: 'Materiallar aniq buyurtmaga hisobdan chiqariladi. Ortiqcha sarf va brak «sex boʻyicha oʻrtacha» emas, har bir mahsulot kesimida koʻrinadi.',
        },
        {
          title: 'Aniq tannarx',
          text: 'Xomashyo, ish haqi va ustama xarajatlar mahsulot tannarxini tashkil qiladi — toʻgʻri narx aynan shundan boshlanadi.',
        },
      ],
      note: 'Natija: har bir mahsulotning marjasini bilasiz — va zarariga sotiladiganini ishlab chiqarishni toʻxtatasiz.',
    },
    {
      title: 'Ishlab chiqarish analitikasi',
      lead: 'Boshqaruv ekrani: buyurtmalar, ishlab chiqarish hajmi va samaradorlik real vaqtda.',
      cards: [
        {
          title: 'Buyurtmalar va statuslar',
          text: 'Nechta buyurtma jarayonda, nechtasi yakunlangan va nechtasida kechikish xavfi bor — bir qarashda.',
        },
        {
          title: 'Ishlab chiqarish samaradorligi',
          text: 'Ishlab chiqarish hajmi va foizdagi samaradorlik — oydan oyga dinamikasi bilan.',
        },
        {
          title: 'Sexlar boʻyicha ishlab chiqarish',
          text: 'Buyurtma statuslari va har bir sexning hajmi boʻyicha diagrammalar — quvvat va yollash boʻyicha qarorlar raqamlarga tayanadi.',
        },
      ],
    },
  ],
  Preview: ProductionPreview,
  previewTitle: 'Habibiʼda «Ishlab chiqarish» ana shunday koʻrinadi',
  solve: [
    {
      was: 'Tannarx «chamalab» hisoblanadi',
      now: 'Har bir mahsulot boʻyicha aniq tannarx: materiallar, ish haqi, ustama xarajatlar',
    },
    {
      was: 'Ishlab chiqarish rejasi usta daftarida yashaydi',
      now: 'Yagona reja: buyurtmalar, muddatlar, sexlar va progress hammaga koʻrinadi',
    },
    {
      was: 'Sexlar yuklamasi nomaʼlum, torliklar kutilmaganda chiqadi',
      now: 'Har bir sexning yuklamasi va hajmi real vaqt diagrammasida',
    },
    {
      was: 'Xomashyo buyurtma oʻrtasida tugaydi, sex toʻxtaydi',
      now: 'Materialga ehtiyoj ishlab chiqarish rejasiga qarab oldindan hisoblanadi',
    },
    {
      was: 'Muddatlar suriladi, mijozlar ketadi',
      now: 'Kechikish xavfi oldindan koʻrinadi — quvvat oʻz vaqtida qayta taqsimlanadi',
    },
  ],
  money: [
    {
      title: 'Toʻgʻri narx va marja',
      text: 'Aniq tannarx nima pul keltirayotganini va nima zarariga ishlab chiqarilayotganini koʻrsatadi. Narxlar raqamlarga tayanib qoʻyiladi.',
    },
    {
      title: 'Boʻsh turish kamayadi',
      text: 'Materiallar rejaga qarab buyurtma qilinadi, sexlar yuklamasi esa muvozanatlanadi — dastgohlar va odamlar kutib emas, ishlab turadi.',
    },
    {
      title: 'Muddatlar bajariladi',
      text: 'Buyurtmasini oʻz vaqtida olgan mijozlar qaytib keladi va sizni tavsiya qiladi. Ishonchli ishlab chiqaruvchi obroʻsi oʻzi sotadi.',
    },
    {
      title: 'Chiqindi va brak kamayadi',
      text: 'Buyurtma boʻyicha hisobdan chiqarish va sarf normalari yoʻqotishlarni koʻrinadigan qiladi — koʻringan yoʻqotish esa tez qisqaradi.',
    },
  ],
  ai: {
    title: 'AI-agentlar rejalashtirishdagi kundalik ishni oʻz zimmasiga oladi',
    lead: 'Habibiʼda tez orada AI-agentlar paydo boʻladi — buyurtmadan muddat nazoratigacha boʻlgan ishlab chiqarishni rejalashtirish ishlarini avtomatlashtiradi.',
    flow: ['Mijoz buyurtmalari', 'Ishlab chiqarish rejasi', 'Materialga ehtiyoj', 'Muddat nazorati'],
    cards: [
      {
        title: '🤖 Rejani oʻzi tuzadi',
        text: 'AI-agent joriy buyurtmalar boʻyicha ishlab chiqarish rejasini sexlar yuklamasi va ustuvorliklarni hisobga olib tayyorlaydi.',
      },
      {
        title: '📦 Materiallarni oʻzi hisoblaydi',
        text: 'Agent rejaga qarab xomashyoga boʻlgan ehtiyojni hisoblaydi va xarid soʻrovlarini tayyorlaydi — sexlar toʻxtamaydi.',
      },
      {
        title: '⚠️ Kechikish haqida ogohlantiradi',
        text: 'Buyurtma grafikdan ortda qolyaptimi — agent bu haqda oldindan xabar beradi va quvvatni qanday qayta taqsimlashni taklif qiladi.',
      },
    ],
  },
  together: [
    {
      title: 'Ishlab chiqarish + Xaridlar',
      text: 'Materialga ehtiyoj yetkazib beruvchiga buyurtmaga aylanadi — xomashyo «kimdir esiga tushganda» emas, rejaga qarab keladi.',
    },
    {
      title: 'Ishlab chiqarish + Mahsulotlar va qoldiqlar',
      text: 'Xomashyo hisobdan chiqariladi, tayyor mahsulot kirim qilinadi — qoldiqlar har bir bosqichda aniq.',
    },
    {
      title: 'Ishlab chiqarish + Mijozlar va savdo',
      text: 'Menejerlar ishlab chiqarishning real yuklamasini koʻradi va mijozlarga halol muddat aytadi.',
    },
    {
      title: 'Ishlab chiqarish + Pul nazorat ostida',
      text: 'Ishlab chiqarish xarajatlari moliyaviy hisobotlarga tushadi — foyda toʻgʻri hisoblanadi.',
    },
  ],
  industries: {
    list: [
      'Mebel ishlab chiqarish',
      'Oziq-ovqat ishlab chiqarish',
      'Tikuvchilik ishlab chiqarish',
      'Metallga ishlov berish',
      'Elektronika va yigʻuv',
      'Qurilish materiallari',
      'Poligrafiya',
      'Qandolat sexlari',
      'Kosmetika va maishiy kimyo',
      'Qadoqlash',
    ],
    note: '«Ishlab chiqarish» moduli «Ombor» va «Xaridlar» bilan birga eng kuchli ishlaydi — ular birgalikda toʻliq siklni qamrab oladi: xomashyo → ishlab chiqarish → tayyor mahsulot.',
  },
  tariff: { headline: '«Ishlab chiqarish» Habibi Pro tarifiga kiradi', baseIncludes: false },
  cta: {
    title: 'Mahsulotlaringizning real tannarxini biling',
    text: 'Bepul boshlang — sexlarni rejalashtirishga va tannarxni raqamlar asosida hisoblashga tayyor boʻlganingizda «Ishlab chiqarish»ni qoʻshing.',
  },
}
