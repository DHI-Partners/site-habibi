import { Warehouse } from 'lucide-react'
import WarehousePreview from '../../../uz/previews/WarehousePreview'
import type { ModulePageData } from '../../types'

/* Страница модуля «Товары и остатки» — узбекская версия (латиница, LTR).
   Суммы пересчитаны в сумы под местный МСБ, товары и компании локализованы. */

export const INVENTORY: ModulePageData = {
  slug: 'inventory',
  icon: Warehouse,
  title: 'Mahsulotlar va qoldiqlar',
  lead: 'Real vaqtdagi aniq qoldiqlar va har bir mahsulot harakatining tushunarli tarixi.',
  pills: ['Real vaqtdagi qoldiq', 'Harakatlar tarixi', 'Bir nechta ombor', 'Qoldiq pulda'],
  pains: [
    {
      icon: '📄',
      title: 'Qoldiq Excelʼda, «taxminan»',
      text: 'Jadval haftada bir marta yangilanadi, haqiqiy qoldiqni esa faqat omborchi biladi — u ham taxminan.',
    },
    {
      icon: '🚫',
      title: 'Yoʻq mahsulotni sotish',
      text: 'Menejer mijozga allaqachon tugab qolgan mahsulotni vaʼda qiladi. Mijoz kutadi, asabiylashadi va ketadi.',
    },
    {
      icon: '🔀',
      title: 'Notoʻgʻri joʻnatmalar va kamomad',
      text: 'Inventarizatsiya syurprizga aylanadi: nimadir yetishmaydi, nimadir ortiqcha — sababini esa hech kim bilmaydi.',
    },
    {
      icon: '🏢',
      title: 'Mahsulot omborlar orasida yoʻqoladi',
      text: 'Omborlar oʻrtasidagi koʻchirishlar hech qayerda qayd etilmaydi — mahsulot «qayerdadir», aniq qayerda ekani nomaʼlum.',
    },
    {
      icon: '⌛',
      title: 'Muddati oʻtgan mahsulot javonda',
      text: 'Yaroqlilik muddatini hech kim kuzatmaydi — zarar muddati oʻtgan mahsulot bilan birga topiladi.',
    },
    {
      icon: '🧊',
      title: 'Harakatsiz qoldiq yillab yigʻiladi',
      text: 'Hech kim sotib olmaydigan mahsulotlarda pul muzlab yotadi — buni esa hech kim payqamaydi.',
    },
  ],
  chaos: {
    lead: 'Hisobi yoʻlga qoʻyilmagan ombor — bu har kuni muzlab qolgan pul, kamomad va boy berilgan savdolar.',
    stats: [
      { value: '15% gacha', text: 'notoʻgʻri joʻnatma va kamomad, tovar harakati qayd etilmaganda' },
      { value: '20% gacha', text: 'foyda tartibsizlik, hisobdan chiqarish va yoʻqolgan mahsulotlarga ketadi' },
      { value: '~30%', text: 'soʻrovlar yoʻqoladi, chunki menejer mavjudlikni joyida tasdiqlay olmaydi' },
      { value: '×2', text: 'uzoqroq yigʻiladi buyurtma, agar mahsulotni omborda qidirishga toʻgʻri kelsa' },
    ],
    example: {
      before:
        'Hisoblab koʻring: agar omboringizda 600 mln soʻmlik mahsulot yotgan boʻlsa va uning atigi 20 foizi harakatsiz qoldiq boʻlsa, bu — ',
      accent: '120 mln soʻm muzlab qolgan pul',
      after: ', u esa biznesingizda ishlashi mumkin edi.',
    },
  },
  about: {
    lead: 'Har bir tovar birligi boʻyicha aniq hisob: qancha bor, qayerda turibdi, qanchaga tushgan va qayerga harakatlanadi. Qoldiq har bir savdo, xarid va koʻchirishdan keyin avtomatik yangilanadi.',
    cards: [
      {
        title: '📦 Qoldiq doim aniq',
        text: 'Savdo, kirim, koʻchirish yoki hisobdan chiqarish qoldiqni bir zumda oʻzgartiradi — qoʻlda qayta sanashning hojati yoʻq.',
      },
      {
        title: '🧾 Har bir harakat qayd etiladi',
        text: 'Kim, qachon va qayerga tovar koʻchirgani — hammasi jurnalda. Kamomad sirligini yoʻqotadi.',
      },
      {
        title: '🏬 Omborlar sizga qancha kerak boʻlsa',
        text: 'Asosiy ombor, doʻkonlar, olib ketish punktlari — qoldiq har bir joy boʻyicha va butun kompaniya boʻyicha.',
      },
      {
        title: '💰 Qoldiq pulda',
        text: 'Ombor qiymati, harakatsiz qoldiq va aylanma — egasi omborni «qutilar» emas, aktiv sifatida koʻradi.',
      },
    ],
  },
  capabilities: [
    {
      title: 'Real vaqtdagi qoldiq',
      lead: 'Bitta ekran — va siz hozir har bir omborda nima borligini bilasiz.',
      cards: [
        {
          title: 'Toʻliq katalog',
          text: 'Minglab mahsulot: kod, kategoriya va oʻlchov birligi bilan — donadan va qutidan tortib kilogramm va litrgacha.',
        },
        {
          title: 'Har bir mahsulot uchun status',
          text: '«Mavjud», «Kam qoldiq», «Tugagan» — rangli statuslar muammoli mahsulotlarni bir qarashda koʻrsatadi.',
        },
        {
          title: 'Omborlar kesimida koʻrinish',
          text: 'Har bir ombor va doʻkon boʻyicha alohida qoldiq: qayerda mahsulot bor va qayerdan koʻchirish kerakligini koʻrasiz.',
        },
      ],
      note: 'Natija: menejer mijozga mavjudlikni soniyalarda tasdiqlaydi — «tekshirib, qayta qoʻngʻiroq qilaman» emas.',
    },
    {
      title: 'Tovar harakati tarixi',
      lead: 'Jurnal har bir harakatni qayd etadi — kirimdan savdogacha. «Mahsulot qayerga ketdi?» degan savol doim javobli.',
      flow: ['Yetkazib beruvchidan kirim', 'Saqlash', 'Koʻchirish', 'Savdo / hisobdan chiqarish'],
      cards: [
        {
          title: 'Kim va qachon',
          text: 'Har bir amalning muallifi, sanasi va asos hujjati bor. Masʼuliyat «umumiy» boʻlishdan toʻxtaydi.',
        },
        {
          title: 'Seriya raqamlari va partiyalar',
          text: 'Seriya raqami va partiya boʻyicha kuzatuv — texnika, elektronika va kafolatli mahsulotlar uchun zarur.',
        },
        {
          title: 'Yaroqlilik muddatlari',
          text: 'Tizim qaysi partiyaning muddati tugayotganini oldindan koʻrsatadi — hisobdan chiqarish oʻrniga chegirma bilan sotasiz.',
        },
      ],
    },
    {
      title: 'Muammoli mahsulotlar nazorati',
      lead: 'Tizim eʼtibor talab qiladigan narsalarni ajratib koʻrsatadi — ular zararga aylanmasidan oldin.',
      cards: [
        {
          title: 'Minimal qoldiq darajasi',
          text: 'Har bir mahsulotga minimal daraja belgilanadi. Qoldiq undan pasaysa — xaridlarga toʻldirish soʻrovi oʻz vaqtida tushadi.',
        },
        {
          title: 'Harakatsiz qoldiq nazorat ostida',
          text: 'Harakatsiz mahsulotlar hisoboti pul qayerda muzlab qolganini koʻrsatadi. Chegirmali sotuv uni aylanmaga qaytaradi.',
        },
        {
          title: 'Syurprizsiz inventarizatsiya',
          text: 'Jismoniy sanoq hisob bilan tez solishtiriladi, tafovutlar esa harakatlar jurnali orqali oxirigacha izlanadi.',
        },
      ],
    },
    {
      title: 'Qoldiq pulda',
      lead: 'Rahbar ekrani: omboringiz qancha turadi va u bilan nima boʻlayotgani.',
      cards: [
        {
          title: 'Ombor qiymati',
          text: 'Qoldiqning umumiy qiymati va uning oydan oyga dinamikasi — butun kompaniya va har bir joy boʻyicha.',
        },
        {
          title: 'Muammoli mahsulotlar',
          text: 'Nechta mahsulot tugab borayotgani va nechtasi harakatsiz turgani — darhol, summalari bilan koʻrinadi.',
        },
        {
          title: 'Aniq tannarx',
          text: 'Qoldiqni baholash va mahsulot tannarxi — toʻgʻri narxlar va halol foyda uchun asos.',
        },
      ],
    },
  ],
  Preview: WarehousePreview,
  previewTitle: 'Habibiʼda «Mahsulotlar va qoldiqlar» ana shunday koʻrinadi',
  solve: [
    {
      was: 'Qoldiq Excelʼda «taxminan», haftada bir marta yangilanadi',
      now: 'Har bir ombor boʻyicha real vaqtdagi aniq qoldiq',
    },
    {
      was: 'Menejerlar omborda yoʻq mahsulotni sotadi',
      now: 'Mavjudlik savdo paytida koʻrinadi — vaʼdalar bajariladi',
    },
    {
      was: 'Kamomad va chalkashliklar inventarizatsiyada chiqadi',
      now: 'Har bir harakat qayd etilgan: kim, qachon, qayerga va qanday asosda',
    },
    {
      was: 'Harakatsiz qoldiq va muddat sezdirmay yigʻiladi',
      now: 'Harakatsiz mahsulotlar va muddati yaqin partiyalar oldindan ajratiladi',
    },
    {
      was: 'Ombor qanchaga turishi — jumboq',
      now: 'Qoldiq pulda baholangan: javonlaringizdagi kapitalni koʻrasiz',
    },
  ],
  money: [
    {
      title: 'Boy berilgan savdolar yoʻq',
      text: 'Minimal darajalar tufayli eng koʻp sotiladigan mahsulotlar doim omborda — mijozlar «tugab qolibdi» deb ketmaydi.',
    },
    {
      title: 'Pul aylanmaga qaytadi',
      text: 'Harakatsiz qoldiq topiladi va sotiladi, ortiqcha xarid toʻxtaydi — boʻshagan pul oʻsish uchun ishlaydi.',
    },
    {
      title: 'Zarar va kamomad kamayadi',
      text: 'Har bir harakatning masʼuli boʻlgan shaffof hisob kamomad, chalkashlik va «yoʻqolib qolishlarni» qisqartiradi.',
    },
    {
      title: 'Toʻgʻri narxlar',
      text: 'Har bir mahsulotning aniq tannarxi — real marjani koʻrasiz va hech qachon zararga sotmaysiz.',
    },
  ],
  ai: {
    title: 'AI-agentlar ombor rutinasini oʻz zimmasiga oladi',
    lead: 'AI-agentlar tez orada Habibiʼda — ular ombordagi kundalik rutinani avtomatlashtiradi: qoldiq nazoratidan tayyor toʻldirish soʻroviga qadar.',
    flow: ['Qoldiq nazorati', 'Talab prognozi', 'Toʻldirish soʻrovi', 'Xavf haqida ogohlantirish'],
    cards: [
      {
        title: '🤖 Qoldiqni 24/7 kuzatadi',
        text: 'AI-agent har bir mahsulotni kuzatib boradi va anomaliyalarni topadi: keskin sarf, shubhali hisobdan chiqarish, toʻxtab qolgan mahsulot.',
      },
      {
        title: '📈 Talabni prognoz qiladi',
        text: 'Agent mavsumiylik va savdo dinamikasini hisobga oladi — hamda ortiqcha pulni muzlatmasdan nimani va qancha olishni taklif qiladi.',
      },
      {
        title: '⚠️ Oldindan ogohlantiradi',
        text: 'Yaroqlilik muddati, harakatsiz qoldiq, mavsum oldidan mahsulotning tugashi — agent xavflar haqida ular zararga aylanmasidan xabar beradi.',
      },
    ],
  },
  together: [
    {
      title: 'Mahsulotlar va qoldiqlar + Xaridlar',
      text: 'Minimal qoldiq darajalari avtomatik ravishda yetkazib beruvchiga soʻrovga aylanadi — toʻldirish qoʻlda nazoratsiz ketadi.',
    },
    {
      title: 'Mahsulotlar va qoldiqlar + Mijozlar va savdo',
      text: 'Menejerlar savdo paytida real qoldiqni koʻradi va yoʻq narsani hech qachon vaʼda qilmaydi.',
    },
    {
      title: 'Mahsulotlar va qoldiqlar + Chakana savdo (POS)',
      text: 'Kassadagi har bir chek mahsulotni bir zumda hisobdan chiqaradi — doʻkon qoldigʻi doim dolzarb.',
    },
    {
      title: 'Mahsulotlar va qoldiqlar + Pul nazorat ostida',
      text: 'Ombor qiymati va sotilgan mahsulot tannarxi moliyaviy hisobotlarga avtomatik tushadi.',
    },
  ],
  industries: {
    list: [
      'Chakana savdo',
      'Ulgurji savdo',
      'Ishlab chiqarish',
      'Onlayn savdo',
      'Restoran va kafelar',
      'Dorixonalar',
      'Avtoservislar',
      'Qurilish',
      'Logistika',
      'Mehmonxonalar',
      'Servis markazlari',
      'Qishloq xoʻjaligi',
    ],
    note: '«Mahsulotlar va qoldiqlar» moduli Xaridlar va Chakana savdo (POS) bilan birgalikda eng kuchli ishlaydi — ular birga tovarning yetkazib beruvchidan mijozgacha boʻlgan butun yoʻlini qamrab oladi.',
  },
  tariff: { headline: '«Mahsulotlar va qoldiqlar» Habibi Pro tarifiga kiradi', baseIncludes: false },
  cta: {
    title: 'Shu hafta qoldiqlaringizni aniq biling',
    text: 'Demo-davrda bepul sinab koʻring — va qoldiqlarni tartibga solib, muzlab qolgan pulni aylanmaga qaytarishga tayyor boʻlganingizda «Mahsulotlar va qoldiqlar» modulini qoʻshing.',
  },
}
