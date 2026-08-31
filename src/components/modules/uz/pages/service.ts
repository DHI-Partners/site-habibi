import { Wrench } from 'lucide-react'
import ServicePreview from '../../../uz/previews/ServicePreview'
import type { ModulePageData } from '../../types'

/* Модуль «Sotuvdan keyingi mijozlar» (сервис) — страница /uz/modules/service. */

export const SERVICE: ModulePageData = {
  slug: 'service',
  icon: Wrench,
  title: 'Sotuvdan keyingi mijozlar',
  lead: 'Kafolat murojaatlari, takroriy savdolar va mijoz sharhlari nazorat ostida.',
  pills: ['Barcha kanallardan murojaatlar', 'SLA va muddatlar', 'Bilimlar bazasi', 'Servis analitikasi'],
  pains: [
    {
      icon: '📥',
      title: 'Murojaatlar hamma joyda va hech qayerda',
      text: 'Mijozlar WhatsAppʼga yozadi, qoʻngʻiroq qiladi, izoh qoldiradi. Murojaatlarning bir qismi shunchaki yoʻqoladi.',
    },
    {
      icon: '⏳',
      title: 'Mijozlar kunlab kutadi',
      text: 'Savol notoʻgʻri odamga tushdi va toʻxtab qoldi. Mijoz oʻzi qayta yozadi — allaqachon asabiylashgan holda.',
    },
    {
      icon: '🤷',
      title: 'Masʼul yoʻq',
      text: 'Murojaat bilan kim shugʻullanishi noaniq. «Bu mening ishim emas» — ichkaridagi eng koʻp uchraydigan javob.',
    },
    {
      icon: '🔧',
      title: 'Kafolatda tartibsizlik',
      text: 'Kafolat holatlari hech qayerda qayd etilmaydi: nima kelgan, nima taʼmirlangan, nima qaytarilgan — hammasi xotiradan tiklanadi.',
    },
    {
      icon: '🔁',
      title: 'Takroriy savdolar qoʻldan ketadi',
      text: 'Siz yordam bergan mijoz yana xarid qilishga tayyor — lekin hech kim taklif qilmaydi.',
    },
    {
      icon: '⭐',
      title: 'Sharhlarni hech kim yigʻmaydi',
      text: 'Mamnun mijozlar jim turadi, noroziler esa internetga yozadi. Obroʻ oʻz-oʻzidan shakllanadi — sizning foydangizga emas.',
    },
  ],
  chaos: {
    lead: 'Yomon xizmat bitta mijozni emas — oʻsha mijoz gaplashadigan hammani yoʻqotadi.',
    stats: [
      { value: '×5', text: 'yangi mijozni jalb qilish mavjudini ushlab qolishdan shuncha qimmat' },
      { value: '~10', text: 'odam bitta norozi mijozdan yomon xizmat haqida eshitadi' },
      { value: '~30%', text: 'murojaatlar hisobga olinmagan kanallar orqali kelganda yoʻqoladi' },
      { value: '20% gacha', text: 'foydani yoʻqotilgan mijozlar va qoʻldan ketgan takroriy savdolar yeb qoʻyadi' },
    ],
    example: {
      before:
        'Hisoblab koʻring: bitta mijoz yiliga 13 mln soʻm keltirsa va yomon xizmat tufayli yiliga atigi 10 ta mijoz yoʻqolsa, bu ',
      accent: '130 mln soʻm qoʻldan ketgan tushum',
      after: ' — obroʻga yetkazilgan zararni hisobga olmaganda.',
    },
  },
  about: {
    lead: 'Mijozlarning barcha murojaatlari — pochta, chatlar, portal va telefondan — masʼuli, ustuvorligi va muddati bor murojaatlarga aylanadi. Hech bir soʻrov yoʻqolmaydi, hech bir mijoz javobsiz qolmaydi.',
    cards: [
      {
        title: '🎫 Har bir soʻrov — murojaat',
        text: 'Istalgan kanaldan — raqami, statusi va masʼuli bor yagona navbatga tushadi.',
      },
      {
        title: '⏱️ Muddatlar nazorat ostida',
        text: 'Har bir murojaatda SLA taymeri: javob muddatigacha qancha vaqt qolganini koʻrasiz.',
      },
      {
        title: '📚 Bilimlar bazasi',
        text: 'Standart yechimlar jamoaning qoʻl ostida — va mijozlar uchun oʻz-oʻziga xizmat koʻrsatishda.',
      },
      {
        title: '📊 Servis raqamlarda',
        text: 'Javob tezligi, xodimlar yuklamasi va mijozlar mamnunligi — bitta ekranda.',
      },
    ],
  },
  capabilities: [
    {
      title: 'Barcha kanallardan murojaatlar',
      lead: 'Pochta, portal, chat, telefon — har bir soʻrov yagona navbatga tushadi.',
      flow: ['Yangi murojaat', 'Masʼul tayinlandi', 'Jarayonda', 'Mijoz javobi kutilmoqda', 'Hal qilindi'],
      cards: [
        {
          title: 'Ustuvorliklar',
          text: 'Shoshilinchi birinchi: har bir murojaatning ustuvorligi bor va jamoa hozir nima bilan shugʻullanishni koʻradi.',
        },
        {
          title: 'Har bir murojaatga masʼul',
          text: 'Murojaat aniq bir xodimga biriktiriladi. «Bu mening ishim emas» degan javob ishlamay qoladi.',
        },
        {
          title: 'Butun yozishma ichida',
          text: 'Muloqot tarixi murojaatning oʻzida saqlanadi — istalgan hamkasb uni davom ettirib, yordam bera oladi.',
        },
      ],
    },
    {
      title: 'SLA: vaʼda qilingan muddatlar bajariladi',
      lead: 'Har bir murojaat turi uchun javob va hal qilish vaqti belgilanadi — tizim uning bajarilishini kuzatadi.',
      cards: [
        {
          title: 'Har murojaatda SLA shkalasi',
          text: 'Muddatgacha qancha vaqt qolgani har bir soʻrovda koʻrinadi. Xavf ostidagi murojaatlar oldindan ajratiladi.',
        },
        {
          title: 'Kechikkanlarni koʻtarish',
          text: 'Muddati oʻtgan murojaatlar avtomatik ravishda rahbarga koʻtariladi — ularning birortasi jimgina toʻxtab qolmaydi.',
        },
        {
          title: 'Kafolat murojaatlari',
          text: 'Qabul qilindi, tashxis qoʻyildi, taʼmirlandi, qaytarildi — kafolat holatining har bir bosqichi hisobda.',
        },
      ],
    },
    {
      title: 'Bilimlar bazasi va mijoz tarixi',
      lead: 'Standart savollar bir necha daqiqada hal boʻladi, har bir mijozning tarixi esa qoʻl ostida.',
      cards: [
        {
          title: 'Bilimlar bazasi',
          text: 'Koʻp beriladigan savollarga tayyor javoblar va koʻrsatmalar. Yangi xodim birinchi kunidanoq tajribali xodimdek javob beradi.',
        },
        {
          title: 'Oʻz-oʻziga xizmat',
          text: 'Mijozlar javoblarni portalda oʻzlari topadi. Takrorlanuvchi murojaatlar kamayadi, murakkablariga koʻproq vaqt qoladi.',
        },
        {
          title: 'Mijoz murojaatlari tarixi',
          text: 'Mijozning barcha murojaatlari uning kartochkasida. Nima sotib olgani, nima soʻragani va qanchalik mamnunligini koʻrasiz.',
        },
      ],
      note: 'Natija: mijoz oʻz muammosini har bir yangi xodimga qaytadan tushuntirishga majbur boʻlmaydi — bu ularni eng koʻp asabiylashtiradigan narsa.',
    },
    {
      title: 'Servis analitikasi',
      lead: 'Boshqaruv ekrani: qoʻllab-quvvatlash sifati shikoyatlarda emas, raqamlarda.',
      cards: [
        {
          title: 'Murojaatlar oqimi',
          text: 'Nechta murojaat ochiq, hal qilingan va muddati oʻtgan — bir qarashda, kunlik dinamikasi bilan.',
        },
        {
          title: 'Hal qilish tezligi',
          text: 'Oʻrtacha javob va hal qilish vaqti — butun jamoa va har bir xodim boʻyicha.',
        },
        {
          title: 'Kanallar va ijrochilar',
          text: 'Kanal, ustuvorlik va eng samarali xodimlar kesimida — kim qoʻllab-quvvatlashni tortayotganini va kimga yordam kerakligini koʻrasiz.',
        },
      ],
    },
  ],
  Preview: ServicePreview,
  previewTitle: 'Habibiʼda «Sotuvdan keyingi mijozlar» ana shunday koʻrinadi',
  solve: [
    {
      was: 'Murojaatlar WhatsApp, pochta va qoʻngʻiroqlar orasida yoʻqoladi',
      now: 'Har bir kanal yagona murojaatlar navbatiga tushadi',
    },
    {
      was: 'Mijozlar kunlab kutadi va oʻzlari qayta soʻraydi',
      now: 'Har bir murojaatda SLA muddati, kechikkanlari rahbarga koʻtariladi',
    },
    {
      was: '«Bu mening ishim emas» — murojaat esa toʻxtab qoladi',
      now: 'Har bir murojaatning masʼuli va muddati bor',
    },
    {
      was: 'Kafolat holatlari xotiradan tiklanadi',
      now: 'Kafolat murojaatining har bir bosqichi hisobda',
    },
    {
      was: 'Takroriy savdolar va sharhlar qoʻldan ketadi',
      now: 'Mijoz tarixi kimga nima taklif qilishni aytib turadi',
    },
  ],
  money: [
    {
      title: 'Mijozlar sizda qoladi',
      text: 'Tez javob va hal qilingan muammolar mijozni ushlab qoladi — ushlab qolish jalb qilishdan 5 barobar arzon.',
    },
    {
      title: 'Takroriy savdolar oʻsadi',
      text: 'Tarixi maʼlum mamnun mijoz — keyingi xarid uchun eng yaxshi nomzod. Tizim qulay paytni aytib turadi.',
    },
    {
      title: 'Obroʻ yangi mijozlar keltiradi',
      text: 'Yaxshi xizmat mijozlarni tavsiya qiluvchilarga aylantiradi — bu eng arzon jalb qilish kanali.',
    },
    {
      title: 'Qoʻllab-quvvatlash koʻproq ish bajaradi',
      text: 'Bilimlar bazasi va oʻz-oʻziga xizmat bir xil savollarni oʻziga oladi — oʻsha jamoaning oʻzi koʻproq mijozga xizmat koʻrsatadi.',
    },
  ],
  ai: {
    title: 'AI-agentlar qoʻllab-quvvatlashdagi kundalik ishni oʻz zimmasiga oladi',
    lead: 'Habibiʼda tez orada AI-agentlar paydo boʻladi — murojaatni qabul qilishdan muddatlarni nazorat qilishgacha boʻlgan bir xil ishlarni avtomatlashtiradi.',
    flow: ['Murojaatni qabul qilish', 'Bilimlar bazasidan javob', 'Mutaxassisga yoʻnaltirish', 'SLA nazorati'],
    cards: [
      {
        title: '🤖 Darhol javob beradi, 24/7',
        text: 'AI-agent standart savollarga bilimlar bazasidan javob beradi — kechasi ham, dam olish kunlari ham, navbatsiz.',
      },
      {
        title: '🧭 Murakkabini odamga uzatadi',
        text: 'Nostandart murojaat tasniflanadi va toʻliq kontekst bilan kerakli mutaxassisga topshiriladi.',
      },
      {
        title: '⚠️ Muddatlarni kuzatadi',
        text: 'Agent har bir murojaatda SLAʼni kuzatadi va vaqt tugashidan oldin ijrochilarga eslatadi.',
      },
    ],
  },
  together: [
    {
      title: 'Sotuvdan keyingi mijozlar + Mijozlar va savdo',
      text: 'Murojaatlar tarixi mijoz kartochkasida. Savdo boʻlimi kim mamnunligini va kim yana xaridga tayyorligini koʻradi.',
    },
    {
      title: 'Sotuvdan keyingi mijozlar + Mahsulotlar va qoldiqlar',
      text: 'Taʼmirlash uchun ehtiyot qismlar va materiallar real qoldiqlar bilan. Kafolat ishi «qachondir yetkazilishi»ni kutmaydi.',
    },
    {
      title: 'Sotuvdan keyingi mijozlar + Ishlar va vazifalar',
      text: 'Murakkab murojaatlar jamoa uchun vazifaga aylanadi — masʼuli va muddati bilan.',
    },
    {
      title: 'Sotuvdan keyingi mijozlar + Saytdan kelgan mijozlar',
      text: 'Saytdagi forma va chat — toʻgʻridan-toʻgʻri murojaatlar navbatiga tushadigan yana bitta kanal.',
    },
  ],
  industries: {
    list: [
      'Servis markazlari',
      'Avtoservislar',
      'Elektronika va maishiy texnika',
      'IT va dasturlash',
      'Onlayn savdo',
      'Tibbiyot va klinikalar',
      'Koʻchmas mulkni boshqarish',
      'B2B xizmatlar',
      'Mebel va interyer',
      'Uskunalar',
    ],
    note: '«Sotuvdan keyingi mijozlar» moduli CRM bilan birga eng kuchli ishlaydi — ular birgalikda mijozning birinchi soʻrovidan takroriy xaridigacha boʻlgan butun yoʻlini qamrab oladi.',
  },
  tariff: { headline: '«Sotuvdan keyingi mijozlar» Habibi Pro tarifiga kiradi', baseIncludes: false },
  cta: {
    title: 'Servisni savdo kanaliga aylantiring',
    text: 'CRMʼdan bepul boshlang — har bir mijozga oʻz vaqtida javob berishga tayyor boʻlganingizda «Servis va qoʻllab-quvvatlash»ni qoʻshing.',
  },
}
