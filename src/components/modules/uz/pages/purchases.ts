import { Package } from 'lucide-react'
import PurchasesPreview from '../../../uz/previews/PurchasesPreview'
import type { ModulePageData } from '../../types'

/* Модуль «Xaridlar» — узбекская версия страницы /uz/modules/purchases. */

export const PURCHASES: ModulePageData = {
  slug: 'purchases',
  icon: Package,
  title: 'Xaridlar',
  lead: 'Yetkazib beruvchini shaffof tanlash, narx va muddatlar nazorati — qoʻlda solishtirishlarsiz.',
  pills: ['Xarid buyurtmalari', 'Narxlarni solishtirish', 'Yetkazib berish nazorati', 'Xaridlar analitikasi'],
  pains: [
    {
      icon: '💬',
      title: 'Buyurtmalar WhatsApp va Excelʼda',
      text: 'Yetkazib beruvchilarga buyurtmalar chatlarda va jadvallarda beriladi. Nima buyurtma qilingani, kim bergani va qachon kelishini faqat bitta odam biladi.',
    },
    {
      icon: '💸',
      title: 'Narxlar solishtirilmaydi',
      text: '«Odatdagi» yetkazib beruvchidan olinaveradi. U narxni koʻtardimi yoki bozorda arzonrogʻi bormi — hech kim tekshirmaydi.',
    },
    {
      icon: '📦',
      title: 'Ortiqcha xarid yoki umuman esdan chiqqan xarid',
      text: 'Tovar «chamalab» buyurtma qilinadi: ombor sotilmaydigan mahsulotga toʻlib ketadi yoki mavsumda eng kerakli tovar yoʻq boʻlib qoladi.',
    },
    {
      icon: '🕐',
      title: 'Kechikishlar sezilmay oʻtib ketadi',
      text: 'Yetkazib beruvchi joʻnatmani ushlab qoldi — buni tovar kecha kerak boʻlganida bilib qolasiz.',
    },
    {
      icon: '🧾',
      title: 'Yetkazmalarni qoʻlda solishtirish',
      text: '100 ta buyurtma qilindi, 87 tasi keldi, 100 tasiga toʻlov qilindi. Farqlar oylar oʻtib chiqadi — yoki umuman chiqmaydi.',
    },
    {
      icon: '🕶️',
      title: 'Xaridlar shaffof emas',
      text: 'Egasi kompaniya qanday narxlarda va kimdan xarid qilayotganini koʻrmaydi. Xaridchining halolligini tekshirish imkonsiz.',
    },
  ],
  chaos: {
    lead: 'Xariddagi har bir xato — bu ortiqcha toʻlov, muzlab qolgan pul yoki qoʻldan ketgan savdo.',
    stats: [
      { value: '5–15%', text: 'narxlar solishtirilmasa va qayta kelishilmasa, yetkazib beruvchiga ortiqcha toʻlanadi' },
      { value: '15% gacha', text: 'buyurtma va qabul solishtirilmasa, notoʻgʻri joʻnatma va farqlar yuzaga keladi' },
      { value: '20% gacha', text: 'foydani jarayondagi tartibsizlik, xatolar va omborda muzlab qolgan pul yeb qoʻyadi' },
      { value: '×2', text: 'xaridlar qoʻlda tasdiqlansa, bitta buyurtmani rasmiylashtirish shuncha koʻp vaqt oladi' },
    ],
    example: {
      before:
        'Hisoblab koʻring: oyiga 260 mln soʻmlik xaridda narxlar va farqlar boʻyicha atigi 7% tejash ',
      accent: 'yiliga 218 mln soʻm kompaniyada qoladi',
      after: ' degani.',
    },
  },
  about: {
    lead: 'Butun xarid sikli yagona tizimda: soʻrov va yetkazib beruvchini tanlashdan tortib tovarni qabul qilish va toʻlovni solishtirishgacha. Har bir buyurtmaning statusi, masʼuli va yetkazish sanasi bor.',
    cards: [
      {
        title: '📋 Har bir buyurtma nazorat ostida',
        text: 'Yetkazib beruvchiga berilgan har bir buyurtma — statusi bor hujjat: oʻtkazilgan, yetkazish kutilmoqda, qisman qabul qilingan, yakunlangan.',
      },
      {
        title: '⚖️ Yetkazib beruvchini halol tanlash',
        text: 'Bir nechta yetkazib beruvchining takliflari yonma-yon solishtiriladi — narx, muddat va shartlar boʻyicha.',
      },
      {
        title: '📦 Solishtirish bilan qabul qilish',
        text: 'Tizim «buyurtma qilindi — qabul qilindi — toʻlandi» zanjirini oʻzi tekshiradi va farqlarni ajratib koʻrsatadi.',
      },
      {
        title: '📊 Xaridlar raqamlarda',
        text: 'Hajmlar, summalar, kreditor qarzlar va yetkazib beruvchilarning ishonchliligi — bitta boshqaruv ekranida.',
      },
    ],
  },
  capabilities: [
    {
      title: 'Xarid buyurtmalari',
      lead: 'Har bir buyurtma aniq yoʻldan oʻtadi — va u qaysi bosqichda ekanini istalgan payt koʻrasiz.',
      flow: ['Soʻrov', 'Buyurtma oʻtkazildi', 'Yetkazish kutilmoqda', 'Qisman qabul qilindi', 'Yakunlandi'],
      cards: [
        {
          title: 'Buyurtma va yetkazish sanalari',
          text: 'Har bir buyurtmaning berilgan sanasi va rejadagi yetkazish sanasi bor. Kechikish javon boʻshaganda emas, oldindan koʻrinadi.',
        },
        {
          title: 'Qisman yetkazmalar',
          text: 'Yetkazib beruvchi yarmini keltirdimi? Tizim nima qabul qilinganini va nima hali yoʻlda ekanini yozib qoʻyadi — hech narsa yoʻqolmaydi.',
        },
        {
          title: 'Yetkazib beruvchi boʻyicha tarix',
          text: 'Har bir yetkazib beruvchining barcha buyurtmalari, summalari va kechikishlari — uning kartochkasida. Kim ishonchli, kim qoqilayotgani koʻrinadi.',
        },
      ],
    },
    {
      title: 'Yetkazib beruvchilar va narxlarni solishtirish',
      lead: 'Takliflari bilan birga yetkazib beruvchilar bazasi — xarid qarori odat boʻyicha emas, raqamlar asosida qabul qilinadi.',
      cards: [
        {
          title: 'Narx taklifini soʻrash',
          text: 'Bitta soʻrov boʻyicha bir nechta yetkazib beruvchidan taklif soʻrang va ularni yonma-yon solishtiring: narx, muddat, toʻlov shartlari.',
        },
        {
          title: 'Yetkazib beruvchi kartochkasi',
          text: 'Kontaktlar, shartlar, buyurtmalar va narxlarning toʻliq tarixi. Doimiy yetkazib beruvchi narxni koʻtarsa — darhol sezasiz.',
        },
        {
          title: 'Egasi uchun shaffoflik',
          text: 'Barcha xaridlar, narxlar va tanlangan yetkazib beruvchilar koʻz oldingizda. Xaridlar «qora quti» boʻlishdan toʻxtaydi.',
        },
      ],
    },
    {
      title: 'Tovarni qabul qilish va solishtirish',
      lead: 'Tizim buyurtma, yetkazma va hisob-fakturani oʻzaro solishtiradi — Excelʼdagi qoʻlda tekshiruvlar kerak emas.',
      cards: [
        {
          title: 'Buyurtma qilindi',
          text: 'Nima va qancha miqdorda buyurtma qilingani — narxlari va sanalari bilan buyurtmada qayd etiladi.',
        },
        {
          title: 'Qabul qilindi',
          text: 'Qabul paytida miqdorlar buyurtma bilan solishtiriladi. Kam keltirilgan tovar va braklar shu yerning oʻzida yoziladi.',
        },
        {
          title: 'Toʻlandi',
          text: 'Yetkazib beruvchining hisob-fakturasi haqiqatda kelgan tovar bilan solishtiriladi. Kelmagan tovar uchun hech qachon toʻlamaysiz.',
        },
      ],
      note: 'Natija: farqlar oylar oʻtib emas, qabul qilish paytida koʻrinadi. Har bir dona tovar va har bir soʻm hisobda.',
    },
    {
      title: 'Xaridlar analitikasi',
      lead: 'Boshqaruv ekrani: hajmlar, summalar va xaridlar dinamikasi real vaqtda.',
      cards: [
        {
          title: 'Barcha buyurtmalar va summalar',
          text: 'Nechta buyurtma jarayonda, qancha summaga buyurtma berilgan va nima yetkazilishi kerak — bir qarashda.',
        },
        {
          title: 'Yetkazib beruvchilar bazasi',
          text: 'Oʻnlab yoki yuzlab yetkazib beruvchi — har biri boʻyicha narx, hajm va ishonchlilik tarixi bilan.',
        },
        {
          title: 'Ikki bosishda hisobot',
          text: 'Xaridlar, yetkazib beruvchilar va mahsulotlar boʻyicha hisobotlar — jadvallar bilan bir kunlik ish oʻrniga.',
        },
      ],
    },
  ],
  Preview: PurchasesPreview,
  previewTitle: 'Habibiʼda «Xaridlar» ana shunday koʻrinadi',
  solve: [
    {
      was: 'Yetkazib beruvchilarga buyurtmalar WhatsApp va Excelʼda',
      now: 'Har bir buyurtma — statusi, summasi va yetkazish sanasi bor hujjat',
    },
    {
      was: 'Narxlar solishtirilmaydi — «odat boʻyicha» xarid qilinadi',
      now: 'Yetkazib beruvchilar takliflari yonma-yon solishtiriladi — eng yaxshisi tanlanadi',
    },
    {
      was: 'Qabuldagi farqlar oylar oʻtib chiqadi',
      now: '«Buyurtma qilindi — qabul qilindi — toʻlandi» avtomatik solishtiriladi',
    },
    {
      was: 'Yetkazish kechikishlari eng soʻnggi daqiqada maʼlum boʻladi',
      now: 'Barcha yetkazmalarning sanalari va statuslari oldindan koʻrinadi',
    },
    {
      was: 'Egasi uchun xaridlar — qora quti',
      now: 'Barcha narxlar, yetkazib beruvchilar va summalar hisobotlarda shaffof',
    },
  ],
  money: [
    {
      title: 'Xarid narxlari pasayadi',
      text: 'Takliflarni solishtirish va narx tarixini kuzatish har bir xaridda 5–15% tejaydi — bu sof foyda.',
    },
    {
      title: 'Pul muzlab qolmaydi',
      text: 'Haqiqatan kerak boʻlgan tovar sotib olinadi. Omborda oʻlik qoldiq kamayadi — oʻsish uchun boʻsh pul koʻpayadi.',
    },
    {
      title: 'Qoʻldan ketgan savdo boʻlmaydi',
      text: 'Kerakli tovar oʻz vaqtida buyurtma qilinadi — mavsumda javonlar boʻsh qolmaydi, mijozlar raqobatchiga ketmaydi.',
    },
    {
      title: 'Kam keltirilgan tovarga toʻlamaysiz',
      text: 'Avtomatik solishtirish buyurtma, yetkazma va yetkazib beruvchi hisob-fakturasi orasidagi har bir farqni ushlaydi.',
    },
  ],
  ai: {
    title: 'AI-agentlar xaridchining kundalik ishini oʻz zimmasiga oladi',
    lead: 'Habibiʼda tez orada AI-agentlar paydo boʻladi — soʻrovdan tayyor buyurtmagacha boʻlgan bir xil xarid ishlarini avtomatlashtiradi.',
    flow: ['Ombordagi ehtiyoj', 'Takliflarni soʻrash', 'Narxlarni solishtirish', 'Yetkazib beruvchiga buyurtma'],
    cards: [
      {
        title: '🤖 Nima tugayotganini payqaydi',
        text: 'AI-agent qoldiq va savdoni kuzatadi va tovar tugashidan oldin xarid soʻrovini tayyorlaydi.',
      },
      {
        title: '⚖️ Yetkazib beruvchilarni oʻzi solishtiradi',
        text: 'Agent takliflarni soʻraydi, narx va shartlarni solishtiradi va eng maqbul variantni tavsiya qiladi.',
      },
      {
        title: '📝 Bir necha daqiqada tayyor buyurtma',
        text: 'Xaridchi shunchaki koʻrib chiqib tasdiqlaydi — chatlar va jadvallar bilan soatlab ovoralik oʻrniga.',
      },
    ],
  },
  together: [
    {
      title: 'Xaridlar + Mahsulotlar va qoldiqlar',
      text: 'Minimal qoldiq darajalari avtomatik ravishda xarid soʻroviga aylanadi.',
    },
    {
      title: 'Xaridlar + Pul nazorat ostida',
      text: 'Yetkazib beruvchilarga toʻlovlar va kreditor qarzlar moliyada ikki marta kiritmasdan koʻrinadi.',
    },
    {
      title: 'Xaridlar + Ishlab chiqarish',
      text: 'Materiallar ishlab chiqarish rejasiga qarab buyurtma qilinadi — sexlar xomashyo kutib turmaydi.',
    },
    {
      title: 'Xaridlar + Savdo',
      text: 'Xarid real talabga ergashadi: nima sotilsa, oʻsha buyurtma qilinadi.',
    },
  ],
  industries: {
    list: [
      'Chakana savdo',
      'Ulgurji savdo',
      'Ishlab chiqarish',
      'Qurilish',
      'Restoran va kafelar',
      'Dorixonalar',
      'Avtoservislar',
      'Mehmonxonalar',
      'Logistika',
      'Onlayn savdo',
      'Tibbiyot va klinikalar',
      'Goʻzallik salonlari',
    ],
    note: '«Xaridlar» moduli «Ombor» va «Moliya» bilan birga eng kuchli ishlaydi — ular birgalikda tovar va pulning toʻliq siklini qamrab oladi.',
  },
  tariff: { headline: '«Xaridlar» Habibi Pro tarifiga kiradi', baseIncludes: false },
  cta: {
    title: 'Xaridlarni nazoratga oling',
    text: 'CRM va moliyadan bepul boshlang — yetkazib beruvchilar bilan ishni tartibga solishga tayyor boʻlganingizda «Xaridlar»ni qoʻshing.',
  },
}
