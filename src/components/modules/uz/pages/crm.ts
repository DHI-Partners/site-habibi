import { Target } from 'lucide-react'
import CrmPreview from '../../../uz/previews/CrmPreview'
import type { ModulePageData } from '../../types'

/* Модуль «Mijozlar va savdo» (CRM) — узбекская версия страницы /uz/modules/crm. */

export const CRM: ModulePageData = {
  slug: 'crm',
  icon: Target,
  title: 'Mijozlar va savdo',
  lead: 'Barcha lidlar, mijozlar va bitimlar yagona tizimda. Hech narsa yoʻqolmaydi, mijoz bilan ishlashning har bir qadami real vaqtda koʻrinib turadi.',
  pills: [
    'Yagona mijozlar bazasi',
    'Savdo voronkasi',
    'Reklama xarajatlari nazorati',
    'Jamoa samaradorligi',
  ],
  pains: [
    {
      icon: '💬',
      title: 'Lidlar WhatsApp va Directʼda qolib ketadi',
      text: 'Soʻrovlar messenjerlarga, shaxsiy telefonlarga va izohlarga tushadi. Ularning bir qismi shunchaki chatlar ichida yoʻqoladi.',
    },
    {
      icon: '🗂️',
      title: 'Mijozlar bazasi xodimlarning boshida',
      text: 'Har bir menejer «oʻz» mijozlarini bloknot va Excelʼda saqlaydi. Menejer ishdan ketsa, mijozlar ham u bilan birga ketadi.',
    },
    {
      icon: '❓',
      title: 'Bitimlarning statusi yoʻq',
      text: 'Mijoz qaysi bosqichda, unga kim qayta qoʻngʻiroq qilishi kerak, bitim nega toʻxtab qolgan — hech kim bilmaydi.',
    },
    {
      icon: '📞',
      title: 'Qoʻngʻiroqlar hech qayerda qayd etilmaydi',
      text: 'Telefonda kelishilgan shartlar hech qayerda yozilmaydi. «Men unga aytgandim» — qoladigan yagona dalil.',
    },
    {
      icon: '📣',
      title: 'Reklama koʻr-koʻrona ishlaydi',
      text: 'Pul Instagram va Google Adsʼga ketadi, ammo nechta lid savdoga aylangani — nomaʼlum.',
    },
    {
      icon: '⏰',
      title: 'Sekin javoblar',
      text: 'Menejer soʻrovga «yetib borguncha», mijoz allaqachon birinchi javob bergan raqobatchidan sotib olgan boʻladi.',
    },
  ],
  chaos: {
    lead: 'Savdodagi tartibsizlik — bu «noqulaylik» emas. Bu har oy toʻgʻridan-toʻgʻri pul yoʻqotish.',
    stats: [
      {
        value: '~30%',
        text: 'soʻrovlar yagona tizimda qayd etilmasa, lidlarning shuncha qismi yoʻqoladi',
      },
      {
        value: '×2',
        text: 'buyurtma xodimdan xodimga qoʻlda uzatilsa, uni rasmiylashtirish shuncha uzoq davom etadi',
      },
      {
        value: '20% gacha',
        text: 'foydani jarayonlardagi tartibsizlik, xatolar va yoʻqotilgan mijozlar yeb qoʻyadi',
      },
      {
        value: '1-chi',
        text: 'mijozga birinchi javob bergan odam sotadi. Tezlik hal qiladi',
      },
    ],
    example: {
      before:
        'Hisoblab koʻring: oyiga 100 ta lid kelsa va oʻrtacha chek 6,5 mln soʻm boʻlsa, ularning 30% yoʻqolishi — ',
      accent: 'har oyda 195 mln soʻm boy berilgan tushum',
      after: '.',
    },
  },
  about: {
    lead: 'Kompaniyaning barcha lidlari, mijozlari va bitimlari saqlanadigan yagona joy. Har bir soʻrov avtomatik qayd etiladi, har bir bitimda esa bosqich, masʼul va keyingi amal boʻladi.',
    cards: [
      {
        title: '🎯 Birorta lid yoʻqolmaydi',
        text: 'Saytdan, messenjerlardan va reklamadan kelgan soʻrovlar tizimga bir zumda tushadi va menejerga biriktiriladi.',
      },
      {
        title: '👤 Mijoz bir qarashda toʻliq koʻrinadi',
        text: 'Toʻliq tarix: kontaktlar, qiziqishlar, yozishmalar, qoʻngʻiroqlar, hisob-fakturalar va xaridlar — bitta kartochkada.',
      },
      {
        title: '📊 Savdo nazorat ostida',
        text: 'Voronka har bir bosqichda nechta bitim borligini, ular qayerda toʻxtab qolganini va masʼuli kimligini koʻrsatadi.',
      },
      {
        title: '💰 Reklama pulda oʻlchanadi',
        text: 'Har bir lidda uning manbasi va narxi koʻrinadi — qaysi reklama savdo keltirayotganini aniq bilasiz.',
      },
    ],
  },
  capabilities: [
    {
      title: '360° mijoz kartochkasi',
      lead: 'Mijoz haqidagi hamma narsa bitta ekranda. Istalgan menejer bitimni bir daqiqada davom ettira oladi.',
      cards: [
        {
          title: 'Kontaktlar va profil',
          text: 'Ism, davlat va til, WhatsApp, telefon, email, shahar, oilaviy holati — va mijoz menejeri.',
        },
        {
          title: 'Mijozning soʻrovi',
          text: 'U aynan nima sotib olmoqchi: xarid maqsadi, shahar va tuman, uy-joy yoki mahsulot turi, byudjet, toʻlov usuli, xaridga tayyorlik.',
        },
        {
          title: 'Aloqa jurnali',
          text: 'Har bir muloqot qayd etiladi: qoʻngʻiroqlar, xabarlar, uchrashuvlar. Va albatta «keyingi amal» — masalan, «Mijozga qoʻngʻiroq qilish».',
        },
      ],
      note: 'Natija: mijozlar bazasi alohida menejerlarga emas, kompaniyaga tegishli boʻladi. Xodim almashishi endi mijozlarni yoʻqotish degani emas.',
    },
    {
      title: 'Savdo voronkasi',
      lead: 'Har bir bitim aniq bosqichlardan oʻtadi — yangi liddan toʻlovgacha. Bitimlar qayerda toʻxtab qolayotganini aniq koʻrasiz.',
      flow: [
        'Yangi lid',
        'Bogʻlanildi',
        'Kvalifikatsiya',
        'Taklif / tanlov',
        'Koʻrik / uchrashuv',
        'Bitim yakunlandi',
      ],
      cards: [
        {
          title: 'Bitim ehtimoli',
          text: 'Har bir bitimda ehtimol foizi va kutilayotgan summa boʻladi. Savdo prognozi tuygʻuga emas, raqamlarga quriladi.',
        },
        {
          title: 'Keyingi amal',
          text: 'Har bir bitimda doim keyingi qadam va masʼul boʻladi. «Qayta qoʻngʻiroq qilishni unutibman» degani boshqa takrorlanmaydi.',
        },
        {
          title: 'Yoʻqotish sabablari',
          text: 'Yoʻqotilgan bitimlar sababi bilan qayd etiladi. Mijozlar nega ketayotganini koʻrasiz — va aynan shuni tuzatasiz.',
        },
      ],
    },
    {
      title: 'Lidlarni kvalifikatsiyalash',
      lead: 'Menejerlar vaqtini hammaga birdek emas, «qaynoq» mijozlarga sarflaydi.',
      cards: [
        {
          title: 'Kvalifikatsiya chek-listi',
          text: 'Byudjet tasdiqlangan, mablagʻ mavjud, xaridor qaror qabul qiladi, xaridga tayyor, moliyalashtirish yoki hujjatlarda yordam kerakmi.',
        },
        {
          title: 'Lid balli',
          text: 'Tizim har bir lidning «haroratini» koʻrsatadi. Qaynoqlari birinchi navbatda ishga olinadi, sovuqlari esa «isitish» uchun qoladi.',
        },
        {
          title: 'Aniq ustuvorliklar',
          text: 'Menejer hozir kimga qoʻngʻiroq qilish kerakligini doim biladi. Jamoaning kuchi savdo ehtimoli eng yuqori boʻlgan joyga yoʻnaltiriladi.',
        },
      ],
    },
    {
      title: 'Manbalar va reklama ROIʼsi',
      lead: 'Har bir lidda u qayerdan kelgani va qanchaga tushgani koʻrinadi. Reklama byudjeti «qora quti» boʻlishdan toʻxtaydi.',
      cards: [
        {
          title: 'Har bir lidning manbasi',
          text: 'Instagram, Google Ads, sayt, WhatsApp, tavsiyalar. Kampaniya, eʼlon va UTM teglar qayd etiladi — aniq kreativgacha.',
        },
        {
          title: 'Narxi haqiqiy pulda',
          text: 'Tizim bitta lid narxini (masalan, 240 000 soʻm) va kvalifikatsiyalangan lid narxini (415 000 soʻm) hisoblaydi. Qaysi kanal mijoz keltirayotganini koʻrasiz.',
        },
        {
          title: 'Ishlaydigan byudjet',
          text: 'Sotmaydigan kanallarni oʻchirasiz, sotadiganlariga koʻproq yoʻnaltirasiz — oʻsha byudjetning oʻzi koʻproq mijoz keltira boshlaydi.',
        },
      ],
    },
  ],
  Preview: CrmPreview,
  previewTitle: 'Habibiʼda «Mijozlar va savdo» shunday koʻrinadi',
  solve: [
    {
      was: 'Lidlar WhatsApp, Direct va qogʻoz varaqlarda yoʻqoladi',
      now: 'Har bir soʻrov avtomatik ravishda masʼuli bor lidga aylanadi',
    },
    {
      was: 'Mijozlar bazasi menejerlarning telefonida',
      now: 'Yagona baza kompaniyaga tegishli, toʻliq tarix saqlanadi',
    },
    {
      was: 'Bitimlar qaysi bosqichda va nega toʻxtaganini hech kim bilmaydi',
      now: 'Bosqichlar, ehtimol va har bir bitim uchun keyingi amali bor voronka',
    },
    {
      was: 'Reklama puli koʻr-koʻrona sarflanadi',
      now: 'Lid narxi va kanal boʻyicha savdo — aniq raqamlarda',
    },
    {
      was: 'Rahbar muammolarni ish oʻtib ketganidan keyin biladi',
      now: 'Har bir menejerning va butun jamoaning savdosi real vaqtda koʻrinadi',
    },
  ],
  money: [
    {
      title: 'Koʻproq lid savdogacha yetib boradi',
      text: 'Yoʻqolayotgan ~30% lidning bir qismini qaytarishning oʻzi reklamaga bir soʻm ham qoʻshimcha sarflamay tushum oʻsishini beradi.',
    },
    {
      title: 'Bitimlarga konversiya yuqori',
      text: 'Tezkor birinchi javob, bosqichlar nazorati va har bir bitimdagi keyingi amal — soʻrovlarning koʻproq qismi pulga aylanadi.',
    },
    {
      title: 'Bazadan takroriy savdolar',
      text: 'Mijoz segmentlari, xaridlar tarixi va qiziqishlari — takroriy savdo va qoʻshimcha sotuvlar uchun asos, yaʼni biznesdagi eng arzon pul.',
    },
    {
      title: 'Samaraliroq reklama byudjeti',
      text: 'Pul haqiqatan sotadigan kanallarga qayta taqsimlanadi. Bitta mijozni jalb qilish narxi tushadi.',
    },
  ],
  ai: {
    title: 'AI-agentlar menejerning kundalik ishini oʻz zimmasiga oladi',
    lead: 'Habibiʼda AI-agentlar tez orada ishga tushadi — savdo menejerining butun kundalik ishini, lidni qabul qilishdan tijorat taklifini yuborishgacha avtomatlashtiradi.',
    flow: [
      'Lidni qabul qilish',
      'Kvalifikatsiya',
      'Mijozga javoblar',
      'Variant tanlash',
      'Tijorat taklifi',
    ],
    cards: [
      {
        title: '🤖 Lid bir zumda qayta ishlanadi',
        text: 'AI-agent soʻrovni qabul qiladi, mijoz kartochkasini toʻldiradi va aniqlovchi savollarni beradi — kecha-yu kunduz, dam olish kunlarisiz.',
      },
      {
        title: '📝 Tayyor taklif bir necha daqiqada',
        text: 'Agent mijozning soʻrovi va byudjetiga mos tijorat taklifini yigʻadi — menejer faqat tekshirib yuboradi.',
      },
      {
        title: '🎯 Menejerlar faqat sotadi',
        text: 'Kundalik ish AI zimmasiga oʻtadi, jamoada esa muzokara va bitimni yopish qoladi. Bitta menejer bir necha barobar koʻp mijoz bilan ishlaydi.',
      },
    ],
  },
  together: [
    {
      title: 'Mijozlar va savdo + Sayt va soʻrovlar',
      text: 'Saytdan kelgan har bir soʻrov bir zumda CRMʼda lidga aylanadi — qoʻlda koʻchirish shart emas.',
    },
    {
      title: 'Mijozlar va savdo + Ombor',
      text: 'Menejerlar haqiqiy qoldiqlarni koʻradi va omborda yoʻq narsani sotmaydi.',
    },
    {
      title: 'Mijozlar va savdo + Moliya',
      text: 'Hisob-fakturalar, toʻlovlar va mijoz qarzi — toʻgʻridan-toʻgʻri mijoz kartochkasida. Qarzlar nazorat ostida.',
    },
    {
      title: 'Mijozlar va savdo + Servis va qoʻllab-quvvatlash',
      text: 'Mijozning murojaatlari tarixi savdo boʻlimiga ham koʻrinadi — mamnun mijoz yana sotib oladi.',
    },
  ],
  industries: {
    list: [
      'Xizmatlar va agentliklar',
      'Chakana savdo',
      'Ulgurji savdo',
      'Ishlab chiqarish',
      'Koʻchmas mulk',
      'Tibbiyot va klinikalar',
      'Goʻzallik salonlari',
      'Avtoservislar',
      'Taʼlim',
      'IT kompaniyalar',
      'Turizm va mehmonxonalar',
      'Onlayn savdo',
    ],
    note: 'Habibi tavsiyasi: CRM, savdo va moliyadan boshlang — soʻng oʻsish bilan birga ombor, xaridlar, ishlab chiqarish va HR modullarini qoʻshing.',
  },
  tariff: { headline: 'CRM Habibi tarifida mavjud', baseIncludes: true },
  cta: {
    title: 'Bugunoq bepul boshlang',
    text: 'CRMʼni bir kunda sozlang — bir hafta ichida esa har bir lidni, har bir bitimni va reklamaga ketgan har bir soʻmni koʻrasiz.',
  },
}
