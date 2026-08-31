import { ShoppingCart } from 'lucide-react'
import PosPreview from '../../../uz/previews/PosPreview'
import type { ModulePageData } from '../../types'

/* Модуль «Chakana savdo (POS)» — узбекская версия страницы /uz/modules/pos. */

export const POS: ModulePageData = {
  slug: 'pos',
  icon: ShoppingCart,
  title: 'Chakana savdo (POS)',
  lead: 'Kassa, ombor va moliya yaxlit bir butun sifatida ishlaydi.',
  pills: ['Kassa va cheklar', 'Kassa smenalari', 'Bir nechta doʻkon', 'Savdo analitikasi'],
  pains: [
    {
      icon: '🧾',
      title: 'Kassa ombordan alohida yashaydi',
      text: 'Savdo kassada oʻtkaziladi, lekin qoldiq oʻzgarmaydi. Doʻkonda aslida nima borligini hech kim bilmaydi.',
    },
    {
      icon: '🌙',
      title: 'Tushum kechqurun sanaladi',
      text: 'Qancha sotilgani doʻkon yopilgandan keyin maʼlum boʻladi — qoʻlda, kalkulyator va xatolar bilan.',
    },
    {
      icon: '💸',
      title: 'Kassadagi kamomad',
      text: 'Naqd pul cheklarga toʻgʻri kelmaydi, aybdor esa yoʻq. Har bir inventarizatsiya — koʻngilsiz kutilmagan xabar.',
    },
    {
      icon: '↩️',
      title: 'Nazoratsiz qaytarishlar',
      text: 'Qaytarishlar va bekor qilingan cheklar hisobga olinmaydi — bu halol boʻlmagan kassirlarning eng sevimli «kulrang zonasi».',
    },
    {
      icon: '🏪',
      title: 'Doʻkonlar — alohida olamlar',
      text: 'Har bir nuqta oʻz jadvalini va oʻz haqiqatini yuritadi. Doʻkonlarni solishtirish imkonsiz.',
    },
    {
      icon: '📉',
      title: 'Nima sotilayotgani nomaʼlum',
      text: 'Eng oʻtadigan tovar tugab qoladi, sotilmaydigani javonni band qiladi. Xaridlar sezgi asosida qilinadi.',
    },
  ],
  chaos: {
    lead: 'Chakana savdoda pul jimgina oqib ketadi — kassada ham, javonda ham, orqa xonada ham.',
    stats: [
      { value: '15% gacha', text: 'tovar tartibli hisob boʻlmasa, kamomad va chalkashliklar tufayli yoʻqoladi' },
      { value: '20% gacha', text: 'foydani boʻsh javonlar, oʻlik qoldiq va «kulrang» qaytarishlar yeb qoʻyadi' },
      { value: '2–3', text: 'soat har kuni tushum va qoldiqni qoʻlda sanashga ketadi' },
      { value: '×2', text: 'kassa kassirga yordam bermasa, navbat shuncha uzayadi — mijozlar chiqib ketadi' },
    ],
    example: {
      before:
        'Hisoblab koʻring: oyiga 390 mln soʻmlik aylanmada atigi 5% kamomad va chalkashlik ',
      accent: 'yiliga 234 mln soʻm',
      after: ' — bu pul shunchaki havoga uchadi.',
    },
  },
  about: {
    lead: 'Ombor va moliyaga ulangan toʻliq huquqli savdo nuqtasi. Har bir chek tovarni ombordan hisobdan chiqaradi va tushumga tushadi — darhol, qoʻlda sanashsiz.',
    cards: [
      {
        title: '🛒 Tez kassa',
        text: 'Savdo bir necha soniya oladi: mahsulotni qidirish, chegirmalar, istalgan toʻlov usuli.',
      },
      {
        title: '📦 Qoldiq oʻzi yangilanadi',
        text: 'Chek oʻtkazildi — tovar hisobdan chiqdi. Doʻkon javonlarda nima borligini doim biladi.',
      },
      {
        title: '💰 Tushum darhol moliyada',
        text: 'Har bir kassaning savdosi real vaqtda moliyaviy hisobotlarga tushadi.',
      },
      {
        title: '🏬 Barcha doʻkonlar yagona tizimda',
        text: 'Nuqtalar, kassalar va kassirlar yagona nazorat ostida, yonma-yon solishtirish bilan.',
      },
    ],
  },
  capabilities: [
    {
      title: 'Kassa va cheklar',
      lead: 'Har bir chek — bir vaqtning oʻzida ombor va moliyani yangilaydigan hujjat.',
      flow: ['Chekdagi mahsulot', 'Toʻlov: karta / naqd', 'Ombordan hisobdan chiqarish', 'Moliyadagi tushum'],
      cards: [
        {
          title: 'Istalgan toʻlov usuli',
          text: 'Karta, naqd, Click va Payme, aralash toʻlov — har bir chekda qayd etiladi va smena oxirida solishtiriladi.',
        },
        {
          title: 'Qaytarishlar nazorat ostida',
          text: 'Har bir qaytarish — sababi va kassiri koʻrsatilgan hujjat. Kassadagi «kulrang» sxemalar ishlamay qoladi.',
        },
        {
          title: 'Chegirma va aksiyalar',
          text: 'Chegirmalar «koʻzga qarab» emas, qoidalar boʻyicha qoʻllanadi — va ularning tushumga taʼsirini koʻrasiz.',
        },
      ],
    },
    {
      title: 'Kassa smenalari va kassirlar',
      lead: 'Har bir smena naqd pulni sanash bilan ochiladi va yopiladi — farqlar darhol koʻrinadi.',
      cards: [
        {
          title: 'Smena nazorati',
          text: 'Boshlangʻich qoldiq bilan ochilish, har bir chek kassirga bogʻlangan, sanash bilan yopilish — farqlar yopilish paytida koʻrinadi.',
        },
        {
          title: 'Kassirlar kesimida savdo',
          text: 'Har bir kassir boʻyicha tushum, oʻrtacha chek va qaytarishlar — motivatsiya va nazorat uchun asos.',
        },
        {
          title: 'Barcha kassalar koʻz oldida',
          text: 'Hozir nechta kassa ochiq va har birida qancha tushum bor — ofisdan turib koʻrinadi.',
        },
      ],
    },
    {
      title: 'Bir nechta doʻkon — bitta tizim',
      lead: 'Tarmoq bir-biriga bogʻlanmagan nuqtalar toʻplami emas, yaxlit tizim sifatida boshqariladi.',
      cards: [
        {
          title: 'Doʻkonlar kesimida savdo',
          text: 'Har bir nuqta boʻyicha tushum, cheklar va foyda yonma-yon. Qaysi doʻkon tarmoqni tortayotganini va qaysi biri orqada qolayotganini darhol koʻrasiz.',
        },
        {
          title: 'Nuqtalar boʻyicha qoldiqlar',
          text: 'Tovar bitta doʻkonda bor, boshqasida tugaganmi? Nuqtalar orasida koʻchirish — bitta hujjat.',
        },
        {
          title: 'Yagona narxlar va katalog',
          text: 'Mahsulotlar va narxlar markazlashgan holda boshqariladi — «bizning filialda boshqacha» degan gap tugaydi.',
        },
      ],
      note: 'Natija: yangi nuqta ochish — hisobni noldan qurish emas, tayyor tizimga ulanish demakdir.',
    },
    {
      title: 'Chakana savdo analitikasi',
      lead: 'Boshqaruv ekrani: butun tarmoq raqamlarda, har bir chek bilan yangilanadi.',
      cards: [
        {
          title: 'Savdo va oʻrtacha chek',
          text: 'Aylanma, cheklar soni va oʻrtacha chek — butun tarmoq va har bir doʻkon boʻyicha, dinamikasi bilan.',
        },
        {
          title: 'Yalpi foyda',
          text: 'Faqat tushum emas, marja ham — tarmoq aslida qancha ishlab topayotganini koʻrasiz.',
        },
        {
          title: 'Eng oʻtadigan tovarlar va tirband soatlar',
          text: 'Nima yaxshi sotiladi va qaysi soatlarda — javonga nima qoʻyishni va qachon smenani kuchaytirishni bilasiz.',
        },
      ],
    },
  ],
  Preview: PosPreview,
  previewTitle: 'Habibiʼda «Chakana savdo» ana shunday koʻrinadi',
  solve: [
    {
      was: 'Kassa, ombor va moliya alohida yashaydi',
      now: 'Chek tovarni darhol hisobdan chiqaradi va tushumga tushadi',
    },
    {
      was: 'Tushum kechqurun qoʻlda sanaladi',
      now: 'Har bir kassaning savdosi ofisdan real vaqtda koʻrinadi',
    },
    {
      was: 'Kamomad va «kulrang» qaytarishlar kech maʼlum boʻladi',
      now: 'Smenalar sanash bilan yopiladi, qaytarishlar — sababi bor hujjatlar',
    },
    {
      was: 'Har bir doʻkon — alohida olam',
      now: 'Tarmoq markazlashgan holda boshqariladi, nuqtalar yonma-yon solishtiriladi',
    },
    {
      was: 'Xaridlar sezgi asosida qilinadi',
      now: 'Eng oʻtadigan tovarlar va qoldiqlar nima sotib olishni belgilaydi',
    },
  ],
  money: [
    {
      title: 'Eng oʻtadigan tovar doim javonda',
      text: 'Savdo analitikasi va ombor bilan bogʻlanish top mahsulotlarni zaxirada saqlaydi — boʻsh javon hech narsa sotmaydi.',
    },
    {
      title: 'Kamomad kamayadi',
      text: 'Har smenada sanash va qaytarish hujjatlari «kulrang zonalar»ni yopadi — aylanmaning foizlari kassaga qaytadi.',
    },
    {
      title: 'Oʻrtacha chek oʻsadi',
      text: 'Top mahsulotlar, aksiyalar va soatlik maʼlumot nima taklif qilishni va qachon smenani kuchaytirishni aytib turadi.',
    },
    {
      title: 'Tarmoq tartibsizliksiz oʻsadi',
      text: 'Yangi nuqtalar tayyor tizimga ulanadi — masshtablash tartibsizlikni koʻpaytirmaydi.',
    },
  ],
  ai: {
    title: 'AI-agentlar chakana savdodagi kundalik ishni oʻz zimmasiga oladi',
    lead: 'Habibiʼda tez orada AI-agentlar paydo boʻladi — savdo tahlilidan javonni toʻldirish soʻrovlarigacha boʻlgan doʻkon menejerining bir xil ishlarini avtomatlashtiradi.',
    flow: ['Cheklar boʻyicha savdo', 'Talab prognozi', 'Javonni toʻldirish', 'Anomaliyalar nazorati'],
    cards: [
      {
        title: '🤖 Javonlarni oʻzi kuzatadi',
        text: 'AI-agent har bir nuqta boʻyicha talabni bashorat qiladi va toʻldirish soʻrovlarini tayyorlaydi — mavsumiylik va aksiyalarni hisobga olib.',
      },
      {
        title: '📈 Nima sotishni aytib turadi',
        text: 'Agent qaysi mahsulotga talab oʻsayotganini yoki tushayotganini payqaydi va aksiya hamda javonni qayta joylashni taklif qiladi.',
      },
      {
        title: '🚨 Kassadagi anomaliyalarni ushlaydi',
        text: 'Shubhali qaytarishlar, bekor qilingan cheklar va farqlar — agent bular haqida rahbarga darhol xabar beradi.',
      },
    ],
  },
  together: [
    {
      title: 'POS + Mahsulotlar va qoldiqlar',
      text: 'Har bir chek tovarni real vaqtda hisobdan chiqaradi — doʻkondagi qoldiq doim aniq.',
    },
    {
      title: 'POS + Xaridlar',
      text: 'Savdo va qoldiqlar yetkazib beruvchiga soʻrovga aylanadi — javonlar oʻz vaqtida toʻldiriladi.',
    },
    {
      title: 'POS + Pul nazorat ostida',
      text: 'Har bir kassaning tushumi darhol moliyaviy hisobotlarga tushadi — kechki sanoq kerak emas.',
    },
    {
      title: 'POS + Mijozlar va savdo',
      text: 'Xaridorlar va ularning tarixi sodiqlik dasturlari va takroriy savdolarni ishga tushiradi.',
    },
  ],
  industries: {
    list: [
      'Oziq-ovqat doʻkonlari',
      'Chakana savdo tarmoqlari',
      'Dorixonalar',
      'Kafe va nonvoyxonalar',
      'Kiyim doʻkonlari',
      'Kosmetika',
      'Uy hayvonlari uchun doʻkonlar',
      'Qurilish materiallari',
      'Elektronika',
      'Gul doʻkonlari',
    ],
    note: '«Chakana savdo (POS)» moduli «Ombor» va «Xaridlar» bilan birga eng kuchli ishlaydi — ular birgalikda toʻliq siklni qamrab oladi: yetkazib beruvchi → javon → mijoz.',
  },
  tariff: { headline: '«Chakana savdo (POS)» Habibi Pro tarifiga kiradi', baseIncludes: false },
  cta: {
    title: 'Kassa, ombor va moliyani bogʻlang',
    text: 'Bepul boshlang — har bir kassa va har bir chekni ofisdan koʻrishga tayyor boʻlganingizda «Chakana savdo (POS)»ni qoʻshing.',
  },
}
