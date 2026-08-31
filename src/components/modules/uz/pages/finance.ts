import { Wallet } from 'lucide-react'
import FinancePreview from '../../../uz/previews/FinancePreview'
import type { ModulePageData } from '../../types'

/* Модуль «Pul nazorat ostida» (Moliya) — узбекская версия страницы /uz/modules/finance. */

export const FINANCE: ModulePageData = {
  slug: 'finance',
  icon: Wallet,
  title: 'Pul nazorat ostida',
  lead: 'Pulingizning jonli manzarasi: hisobotlar, debitor qarzlar, pul oqimi prognozi — oy yakunini kutmasdan.',
  pills: ['Real vaqtda pul', 'Foyda va xarajatlar', 'Debitor qarzlar', 'Hisobotlar va soliqlar'],
  pains: [
    {
      icon: '📓',
      title: 'Pul daftar va Excelʼda yashaydi',
      text: 'Kirim bitta jadvalga, chiqim boshqasiga, naqd pul esa daftarga yoziladi. Toʻliq manzara hech kimda yoʻq.',
    },
    {
      icon: '🌫️',
      title: 'Foyda — oyiga bir marta',
      text: 'Qancha ishlaganingiz oy oxirida, buxgalter ulgursa, maʼlum boʻladi. «Ish oʻtib ketgach» boshqarish esa kech.',
    },
    {
      icon: '🕳️',
      title: 'Kassa uzilishlari kutilmaganda',
      text: 'Pul «kelishi kerak», ammo yetkazib beruvchilarga va oyliklarga bugun toʻlash kerak. Har oy — kutilmagan hodisa.',
    },
    {
      icon: '🧾',
      title: 'Debitor qarzlar kuzatilmaydi',
      text: 'Mijozlar qarzdor, ammo kim, qancha va qachondan beri — chatlarni titish kerak. Baʼzi qarzlar shunchaki esdan chiqadi.',
    },
    {
      icon: '🛒',
      title: 'Xarajatlar sezilmay oqib ketadi',
      text: 'Obunalar, «mayda-chuydalar», ortiqcha xaridlar — bittalab tiyin, birgalikda esa foydaning katta ulushi.',
    },
    {
      icon: '⏳',
      title: 'Soliqlar eng soʻnggi daqiqada',
      text: 'Hujjatlar muddat oldidan vahima bilan yigʻiladi. Xatolar, jarimalar va asabbuzarlik — bepul qoʻshimcha.',
    },
  ],
  chaos: {
    lead: 'Moliyaviy manzarasi yoʻq biznes sezgi bilan boshqariladi — va buning evaziga pul toʻlaydi.',
    stats: [
      { value: '20% gacha', text: 'foydani hisobga olinmagan xarajatlar, xatolar va puldagi tartibsizlik yeb qoʻyadi' },
      { value: '30+', text: 'kun kechikish — hech kim eslatmaydigan odatiy muddati oʻtgan debitor qarz' },
      { value: '×2', text: 'kassa uzilishi kutilmaganda kelganda shoshilinch kreditlar shuncha qimmatga tushadi' },
      { value: '30', text: 'kun — foyda faqat oy oxirida koʻrinsa, shuncha vaqt «koʻr» boʻlib qolasiz' },
    ],
    example: {
      before:
        'Hisoblab koʻring: mijozlar sizga 650 mln soʻm qarzdor boʻlsa va nazorat yoʻqligi sababli debitor qarzlarning atigi 10% i umidsiz qarzga aylansa, bu ',
      accent: '65 mln soʻm shunchaki sovgʻa qilingani',
      after: ' degani.',
    },
  },
  about: {
    lead: 'Kompaniyaning barcha puli yagona tizimda: hisoblar, kassalar, toʻlovlar, qarzlar va hisobotlar. Manzara har bir operatsiyada yangilanadi — biznesni pulda oy oxirida emas, aynan hozir koʻrasiz.',
    cards: [
      {
        title: '💳 Barcha hisoblar birga',
        text: 'Bank hisoblari, kassalar va elektron hamyonlar — umumiy balans va har biridagi harakat.',
      },
      {
        title: '📈 Real vaqtda foyda',
        text: 'Tushum, xarajatlar va foyda har bir operatsiyada avtomatik hisoblanadi.',
      },
      {
        title: '🧾 Qarzlar nazorat ostida',
        text: 'Kim sizga qarzdor va siz kimga qarzdorsiz — summalari va toʻlov muddatlari bilan. Muddati oʻtganlari darhol ajratib koʻrsatiladi.',
      },
      {
        title: '📊 Buxgaltersiz hisobotlar',
        text: 'Foyda, pul oqimi va xarajatlar boʻyicha tushunarli hisobotlar — ikki bosishda, oy yakunini kutmasdan.',
      },
    ],
  },
  capabilities: [
    {
      title: 'Real vaqtda pul',
      lead: 'Bitta ekran — va kompaniyada hozir qancha pul borligini hamda u qayerda turganini bilasiz.',
      cards: [
        {
          title: 'Hisoblardagi qoldiqlar',
          text: 'Bank hisoblari, kassalar, hamyonlar — har birining qoldigʻi va kompaniya boʻyicha jami. Qoʻlda hech narsani yigʻish shart emas.',
        },
        {
          title: 'Toʻlovlar lentasi',
          text: 'Barcha kirim va chiqim toʻlovlari — kontragenti, maqsadi va hisobi bilan. Naqd, karta, Click yoki Payme — istalgan toʻlov bir necha soniyada topiladi.',
        },
        {
          title: 'Toʻlovlar kalendari',
          text: 'Yaqinlashib kelayotgan toʻlovlar va kutilayotgan tushumlar — oyliklar va yetkazib beruvchilarga yetadimi-yoʻqmi, oldindan koʻrasiz.',
        },
      ],
      note: 'Natija: «bizda qancha pul bor?» degan savolga bir qarashda javob topiladi, kassa uzilishi esa sodir boʻlishidan haftalar oldin koʻrinadi.',
    },
    {
      title: 'Kirim, chiqim va foyda',
      lead: 'Tizim foydani oʻzi hisoblaydi va xarajatlarni javonlarga terib qoʻyadi.',
      cards: [
        {
          title: 'Tushum va foyda',
          text: 'Oylik kirim, xarajat va foyda dinamikasi bilan — oy oxirida emas, har bir operatsiyada yangilanadi.',
        },
        {
          title: 'Kategoriyalar boʻyicha xarajatlar',
          text: 'Oylik fond, ijara, xaridlar, marketing, kommunal toʻlovlar — xarajatlar tuzilmasi diagrammada.',
        },
        {
          title: 'Tejash qayerdan topiladi',
          text: 'Qaysi kategoriya oydan oyga shishib ketganini darhol koʻrasiz — topilgan teshik toʻgʻridan-toʻgʻri tejamkorlikka aylanadi.',
        },
      ],
    },
    {
      title: 'Debitor qarzlar nazorat ostida',
      lead: 'Har bir mijoz qarzi koʻz oldingizda — summasi va toʻlov muddati bilan. Pul esdan chiqib ketish oʻrniga qaytib keladi.',
      cards: [
        {
          title: 'Muddati oʻtgan hisob-fakturalar koʻrinib turadi',
          text: 'Barcha toʻlanmagan hisob-fakturalar roʻyxati: mijoz, summa, toʻlov muddati. Muddati oʻtganlari bosh ekranda ajratib koʻrsatiladi.',
        },
        {
          title: 'Oʻz vaqtida eslatmalar',
          text: 'Tizim kimga toʻlov haqida eslatish kerakligini koʻrsatadi. Uchinchi kundagi xushmuomala eslatma bir oydan keyingi qoʻngʻiroqdan koʻra yaxshiroq ishlaydi.',
        },
        {
          title: 'Mijoz boʻyicha hisob-kitob tarixi',
          text: 'Barcha hisob-fakturalar, toʻlovlar va qarz — mijoz kartochkasida. Unga yana nasiyaga joʻnatish kerakmi — qaror raqamlar asosida qabul qilinadi.',
        },
      ],
    },
    {
      title: 'Hisobotlar va pul oqimi prognozi',
      lead: 'Ilgari buxgalterning bir necha kunini olgan hisobotlar — endi doim tayyor.',
      cards: [
        {
          title: 'Foyda hisoboti',
          text: 'Istalgan davr uchun kirim, xarajat va foyda — kompaniya, yoʻnalish va loyiha kesimida.',
        },
        {
          title: 'Pul oqimi',
          text: 'Pul qayerdan kelgani va qayerga ketgani — hisob, kategoriya va kontragent boʻyicha.',
        },
        {
          title: 'Pul oqimi prognozi',
          text: 'Kutilayotgan tushumlar va majburiy toʻlovlar — balansning bir necha hafta oldinga prognozi.',
        },
      ],
      note: 'Ustiga soliq hisobi: hujjatlar va summalar oy davomida oʻz-oʻzidan toʻplanadi — hisobot topshirish yongʻin oʻchirishga oʻxshamay qoladi.',
    },
  ],
  Preview: FinancePreview,
  previewTitle: 'Habibiʼda «Pul nazorat ostida» ana shunday koʻrinadi',
  solve: [
    {
      was: 'Pul daftarlarda, Excelʼda va «boshda»',
      now: 'Barcha hisoblar, kassalar va toʻlovlar yagona tizimda, umumiy balans bilan',
    },
    {
      was: 'Foyda omad kelsa, oyiga bir marta koʻrinadi',
      now: 'Tushum, xarajat va foyda har bir operatsiyada yangilanadi',
    },
    {
      was: 'Kassa uzilishlari kutilmaganda uradi',
      now: 'Toʻlovlar kalendari va prognoz uzilishni oldindan koʻrsatadi',
    },
    {
      was: 'Mijozlarning qarzlari esdan chiqadi',
      now: 'Muddati oʻtgan hisob-fakturalar bosh ekranda, eslatmalar oʻz vaqtida',
    },
    {
      was: 'Hisobotlar vahima bilan yigʻiladi',
      now: 'Hisobotlar va soliq maʼlumotlari istalgan daqiqada tayyor',
    },
  ],
  money: [
    {
      title: 'Debitor qarzlar tezroq qaytadi',
      text: 'Toʻlov muddatlari nazorati va eslatmalar muddati oʻtgan qarzni qisqartiradi — pul mijozlarda qolib ketish oʻrniga aylanmaga qaytadi.',
    },
    {
      title: 'Xarajatlar oqib ketmaydi',
      text: 'Kategoriyalar boʻyicha xarajatlar tuzilmasi qaysi modda shishganini koʻrsatadi. Topilgan teshik — toʻgʻridan-toʻgʻri tejamkorlik.',
    },
    {
      title: 'Qimmat kassa uzilishlari boʻlmaydi',
      text: 'Uzilish bir necha hafta oldin koʻrinadi — yuqori foizli shoshilinch kredit oʻrniga toʻlovni kechiktirishni oldindan kelishib olasiz.',
    },
    {
      title: 'Qarorlar raqamlar asosida',
      text: 'Qaysi yoʻnalish va qaysi mijoz foyda keltirayotganini koʻrasiz. Resurslar eng koʻp daromad beradigan joyga yoʻnaltiriladi.',
    },
  ],
  ai: {
    title: 'AI-agentlar moliyadagi kundalik ishni oʻz zimmasiga oladi',
    lead: 'Habibiʼda tez orada AI-agentlar paydo boʻladi — toʻlovlarni kategoriyalarga ajratishdan kassa uzilishi prognozigacha boʻlgan moliya ishlarini avtomatlashtiradi.',
    flow: ['Toʻlovlar', 'Kategoriyalar va qaydlar', 'Qarzdorlarga eslatma', 'Prognoz va ogohlantirish'],
    cards: [
      {
        title: '🤖 Toʻlovlarni oʻzi ajratadi',
        text: 'AI-agent toʻlovlarni taniydi va ularni kategoriya hamda kontragent boʻyicha tartiblaydi — qoʻlda kiritish shart emas.',
      },
      {
        title: '✉️ Toʻlov haqida eslatma yuboradi',
        text: 'Agent hisob-fakturalarning toʻlov muddatlarini kuzatadi va qarzdor mijozlarga xushmuomala eslatmalarni oʻz vaqtida tayyorlaydi.',
      },
      {
        title: '⚠️ Kassa uzilishidan ogohlantiradi',
        text: 'Agent pul oqimi prognozini kuzatib boradi va uzilish yaqinlashayotganini oldindan xabar qiladi.',
      },
    ],
  },
  together: [
    {
      title: 'Pul nazorat ostida + Mijozlar va savdo',
      text: 'Hisob-fakturalar, toʻlovlar va mijoz qarzi — mijoz kartochkasida. Menejerlar kimga tovarni nasiyaga bermaslik kerakligini koʻradi.',
    },
    {
      title: 'Pul nazorat ostida + Xaridlar',
      text: 'Yetkazib beruvchilarga toʻlovlar va kreditor qarzlar nazorat ostida, ikki marta kiritmasdan.',
    },
    {
      title: 'Pul nazorat ostida + Mahsulotlar, qoldiqlar va ishlab chiqarish',
      text: 'Tannarx va ishlab chiqarish hisobotlarga avtomatik tushadi — foyda halol hisoblanadi.',
    },
    {
      title: 'Pul nazorat ostida + Mening jamoam',
      text: 'Hisoblangan oyliklar darhol xarajatlarda koʻrinadi — eng katta xarajat moddasi doim dolzarb.',
    },
  ],
  industries: {
    list: [
      'Xizmatlar va agentliklar',
      'Chakana savdo',
      'Ulgurji savdo',
      'Ishlab chiqarish',
      'Qurilish',
      'IT kompaniyalar',
      'Restoran va kafelar',
      'Tibbiyot va klinikalar',
      'Koʻchmas mulk',
      'Logistika',
      'Mehmonxonalar',
      'Taʼlim',
    ],
    note: 'Habibi tavsiyasi: CRM, savdo va moliyadan boshlang — keyin oʻsish bilan birga ombor, xaridlar, ishlab chiqarish va HRʼni qoʻshing.',
  },
  tariff: { headline: '«Pul nazorat ostida» Habibi tarifida mavjud', baseIncludes: true },
  cta: {
    title: 'Foydangizni bugunning oʻzida biling',
    text: '«Pul nazorat ostida» moduli bazaviy Habibi tarifining bir qismi — uni CRM bilan birga ulang va biznesingizning pulini real vaqtda koʻra boshlang.',
  },
}
