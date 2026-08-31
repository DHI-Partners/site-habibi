import { Users } from 'lucide-react'
import HrPreview from '../../../uz/previews/HrPreview'
import type { ModulePageData } from '../../types'

/* Модуль «Mening jamoam» (HR) — узбекская версия страницы /uz/modules/hr. */

export const HR: ModulePageData = {
  slug: 'hr',
  icon: Users,
  title: 'Mening jamoam',
  lead: 'Xodimlar hisobi, oylik hisoblash va jamoaning tushunarli KPI koʻrsatkichlari.',
  pills: ['Xodimlar bazasi', 'Davomat va taʼtillar', 'Oylik hisoblash', 'Jamoa KPIsi'],
  pains: [
    {
      icon: '🧮',
      title: 'Oylik Excelʼda qoʻlda hisoblanadi',
      text: 'Oyliklar, smenalar, bonuslar va ushlab qolishlar qoʻlda yigʻiladi. Har oy xatolar, qayta hisob-kitoblar va xafagarchilik.',
    },
    {
      icon: '🏖️',
      title: 'Taʼtil soʻrovlari chatlarda',
      text: 'Kim taʼtilda, kim kasallik varaqasida, kim ertaga ishga chiqadi — hammasi yozishmalar orqali hal qilinadi. Baʼzan odam ishga chiqmaganidan keyin.',
    },
    {
      icon: '🕐',
      title: 'Davomat hisobga olinmaydi',
      text: 'Kechikishlar va ishga chiqmaslik hech qayerda qayd etilmaydi. Vijdonlilar ishlaydi, qolganlar «qanday boʻlsa shunday» ishlaydi.',
    },
    {
      icon: '🎲',
      title: 'Bonuslar «koʻngilga qarab»',
      text: 'KPI yoʻq, hech kimning hissasi oʻlchanmaydi. Bonuslar sezgi asosida beriladi — bu eng yaxshi xodimlarni motivatsiyadan mahrum qiladi.',
    },
    {
      icon: '🗂️',
      title: 'HR maʼlumotlari papkalarga sochilgan',
      text: 'Shartnomalar, ishga qabul sanalari, oyliklar va xodim tarixi papkalar va pochta orasida tarqalib ketgan.',
    },
    {
      icon: '🚪',
      title: 'Kadrlar almashuvi — jumboq',
      text: 'Odamlar ketadi, lekin nega va qaysi boʻlimlardan ketayotganini hech kim tahlil qilmaydi. Har bir yangi xodim yana pulga tushadi.',
    },
  ],
  chaos: {
    lead: 'Oylik odatda eng katta xarajat moddasi. Va koʻpincha — eng kam nazorat qilinadigani.',
    stats: [
      { value: '30–40%', text: 'kompaniya xarajatlari oylikka toʻgʻri keladi. Bu yerdagi xatolar eng qimmatga tushadi' },
      { value: '×2', text: 'oylikni qoʻlda hisoblash shuncha koʻp vaqt oladi — va baribir xatolar bilan' },
      { value: '20% gacha', text: 'foydani ortiqcha toʻlovlar, boʻsh turish va motivatsiyasiz jamoa yeb qoʻyadi' },
      { value: '3–6', text: 'oylik — xodimni almashtirish narxi: qidiruv, ishga qabul, oʻqitish' },
    ],
    example: {
      before:
        'Hisoblab koʻring: oyiga 325 mln soʻmlik oylik fondida atigi 3% xato, ortiqcha toʻlov va hisobga olinmagan ishga chiqmaslik ',
      accent: 'yiliga 117 mln soʻmni tashkil qiladi',
      after: ' — eng yaxshi xodimlarni motivatsiyadan mahrum qilish zararini hisobga olmaganda.',
    },
  },
  about: {
    lead: 'Butun jamoa yagona tizimda: xodimlar kartochkalari, davomat, taʼtillar, oylik hisoblash va samaradorlik. Egasi uchun shaffof — xodimlar uchun adolatli.',
    cards: [
      {
        title: '👥 Jamoa bitta ekranda',
        text: 'Kim ishlayapti, kim taʼtilda, kim kasallik varaqasida — har bir xodimning holati bir qarashda.',
      },
      {
        title: '🕐 Davomat qayd etiladi',
        text: 'Ish vaqti, smenalar, kechikishlar va ishga chiqmaslik avtomatik hisobga olinadi.',
      },
      {
        title: '💵 Oylik oʻzi hisoblanadi',
        text: 'Oyliklar, smenalar, bonuslar va ushlab qolishlar — tizim hisob-kitobni qoʻlda jadvalsiz yigʻadi.',
      },
      {
        title: '📊 Sezgi emas, KPI',
        text: 'Xodimlar va boʻlimlar samaradorligi — adolatli bonuslar va qarorlar uchun asos.',
      },
    ],
  },
  capabilities: [
    {
      title: 'Xodimlar bazasi',
      lead: 'Har bir xodimning kartochkasi — uning kompaniyadagi butun tarixi bir joyda.',
      cards: [
        {
          title: 'Profil va shartlar',
          text: 'Lavozim, boʻlim, ishga qabul sanasi, oylik, ish jadvali — toʻliq stavka yoki smenalar. Hammasi hisobda.',
        },
        {
          title: 'Real vaqtdagi statuslar',
          text: 'Ishlayapti, taʼtilda, kasallik varaqasida, ishdan boʻshagan — har bir xodim va butun kompaniya boʻyicha.',
        },
        {
          title: 'Hujjatlar va tarix',
          text: 'Shartnomalar, lavozim koʻtarilishi, boʻlimlar orasida oʻtkazish va oylik oʻzgarishlari — toʻliq tarix qoʻl ostida.',
        },
      ],
      note: 'Natija: xodim haqidagi istalgan savol — oyligi, ish staji, boʻlimi, jadvali — papka titkilash oʻrniga bir necha soniyada hal boʻladi.',
    },
    {
      title: 'Davomat, taʼtillar va kasallik varaqalari',
      lead: 'Kim ishda, kim yoʻq va nega — har kuni koʻrinadi, «mish-mish» orqali emas.',
      flow: ['Tabel', 'Taʼtillar', 'Kasallik varaqalari', 'Smenalar va jadvallar'],
      cards: [
        {
          title: 'Bugun ishda',
          text: 'Nechta xodim ishda va kim yoʻq — sababi bilan: taʼtil, kasallik varaqasi, sababsiz kelmaslik.',
        },
        {
          title: 'Taʼtil rejasi',
          text: 'Taʼtillar oldindan rejalashtiriladi va bitta boʻlim ichida ustma-ust tushmaydi. «Hamma birdaniga ketib qoldi» degan holat tugaydi.',
        },
        {
          title: 'Maʼlumot oylikka oʻtadi',
          text: 'Ishlangan soatlar va smenalar oylik hisobiga avtomatik tushadi — qoʻlda tabel yuritish shart emas.',
        },
      ],
    },
    {
      title: 'Oylik hisoblash',
      lead: 'Tizim hisob-kitobni oyliklar, smenalar, bonuslar va ushlab qolishlardan yigʻadi — tez va xatosiz.',
      cards: [
        {
          title: 'Hammasi avtomatik hisoblanadi',
          text: 'Oyliklar va stavkalar, ishlangan soatlar va qoʻshimcha ish vaqti, bonuslar, ustamalar, ushlab qolishlar, taʼtil va kasallik toʻlovlari.',
        },
        {
          title: 'Xodimlar uchun shaffof',
          text: 'Har kim oʻz oyligi nimalardan tashkil topganini koʻradi. Savollar, xafagarchilik va «nega meniki kamroq?» kamayadi.',
        },
        {
          title: 'Oylik fondi nazoratda',
          text: 'Umumiy fond, shu oyda toʻlangani, oʻrtacha oylik, boʻlimlar boʻyicha oylik — eng katta xarajat moddasi raqamlarda.',
        },
      ],
    },
    {
      title: 'KPI va jamoa analitikasi',
      lead: 'Boshqaruv ekrani: jamoa sezgilarda emas, raqamlarda.',
      cards: [
        {
          title: 'Jamoa va statuslar',
          text: 'Xodimlar soni, kim ishda, davr uchun yangi qabul qilinganlar — boʻlim va jadval boʻyicha.',
        },
        {
          title: 'Boʻlimlar boʻyicha oylik',
          text: 'Oylik fondi, oʻrtacha oylik va dinamika — grafiklarda, har bir boʻlim kesimida.',
        },
        {
          title: 'Samaradorlik koʻrsatkichlari',
          text: 'Davomat, natija va kadrlar almashuvi boʻlimlar boʻyicha — jamoa qayerda kuchli va qayerda aralashish kerakligini koʻrasiz.',
        },
      ],
    },
  ],
  Preview: HrPreview,
  previewTitle: 'Habibiʼda «Mening jamoam» ana shunday koʻrinadi',
  solve: [
    {
      was: 'Oylik qoʻlda, xatolar va qayta hisob-kitoblar bilan hisoblanadi',
      now: 'Hisob-kitob oyliklar, smenalar va bonuslardan avtomatik yigʻiladi',
    },
    {
      was: 'Taʼtillar va kasallik varaqalari chatlarda va ogʻzaki',
      now: 'Har bir xodimning holati va taʼtil rejasi tizimda',
    },
    {
      was: 'Davomatni hech kim qayd qilmaydi',
      now: 'Ish vaqti va ishga chiqmaslik hisobga olinadi va oylikka oʻtadi',
    },
    {
      was: 'Bonuslar «koʻngilga qarab» beriladi',
      now: 'Xodim va boʻlim KPIsi — adolatli qarorlar uchun asos',
    },
    {
      was: 'Oylik — nazoratsiz eng katta xarajat',
      now: 'Oylik fondi boʻlim, oy va xodim kesimida koʻrinadi',
    },
  ],
  money: [
    {
      title: 'Oylik fondi samaraliroq ishlaydi',
      text: 'Eng katta xarajat moddasi shaffof boʻladi: qaysi boʻlim va qaysi odam natija berayotganini koʻrasiz.',
    },
    {
      title: 'Motivatsiya tushumni oshiradi',
      text: 'KPIga asoslangan adolatli bonuslar eng yaxshi xodimlarni ushlab qoladi — eng yaxshilar esa koʻproq sotadi va koʻproq ishlab chiqaradi.',
    },
    {
      title: 'Xatolardan yoʻqotish kamayadi',
      text: 'Avtomatik hisob ortiqcha toʻlov va hisobga olinmagan ishga chiqmaslikni yoʻqotadi — oylik fondining foizlari biznesga qaytadi.',
    },
    {
      title: 'Kadrlar almashuvi kamayadi — ishga qabul arzonlashadi',
      text: 'Shaffof shartlar va halol toʻlov odamlarni ushlab qoladi. Har bir saqlanib qolgan xodim almashtirish uchun 3–6 oylikni tejaydi.',
    },
  ],
  ai: {
    title: 'AI-agentlar HRʼning kundalik ishini oʻz zimmasiga oladi',
    lead: 'Habibiʼda tez orada AI-agentlar paydo boʻladi — tabeldan tayyor oylik hisobigacha boʻlgan bir xil HR ishlarini avtomatlashtiradi.',
    flow: ['Tabel va davomat', 'Hisoblanmalar va bonuslar', 'Oylik varaqalari', 'Xodimlarga javoblar'],
    cards: [
      {
        title: '🤖 Oylikni oʻzi yigʻadi',
        text: 'AI-agent tabel, smenalar, bonuslar va ushlab qolishlarni tayyor hisob-kitobga birlashtiradi — HR faqat koʻrib chiqadi.',
      },
      {
        title: '💬 Jamoaga oʻzi javob beradi',
        text: '«Necha kun taʼtilim qoldi?», «Oyligim nimalardan tashkil topgan?» — agent HRʼni chalgʻitmasdan xodimlarga javob beradi.',
      },
      {
        title: '⚠️ Xavflarni payqaydi',
        text: 'Kechikishlarning oʻsishi, kasallik varaqalarining koʻpayishi, haddan tashqari yuklangan boʻlim — agent odamlar ketishidan oldin ogohlantiradi.',
      },
    ],
  },
  together: [
    {
      title: 'Mening jamoam + Pul nazorat ostida',
      text: 'Hisoblangan oyliklar darhol xarajatlarga tushadi — moliyaviy manzara doim dolzarb.',
    },
    {
      title: 'Mening jamoam + Mijozlar va savdo',
      text: 'Menejerlar KPIsi real bitimlardan hisoblanadi — bonuslar natijaga bogʻlanadi.',
    },
    {
      title: 'Mening jamoam + Ishlab chiqarish',
      text: 'Sex smenalari va ishlab chiqarilgan mahsulot ishchilarning oyligiga avtomatik tushadi.',
    },
    {
      title: 'Mening jamoam + Ishlar va vazifalar',
      text: 'Yuklama va bajarilgan vazifalar har kimning loyihaga real hissasini koʻrsatadi.',
    },
  ],
  industries: {
    list: [
      'Xizmatlar va agentliklar',
      'Chakana savdo tarmoqlari',
      'Ishlab chiqarish',
      'Qurilish',
      'Restoran va kafelar',
      'Tibbiyot va klinikalar',
      'Logistika',
      'Mehmonxonalar',
      'Goʻzallik salonlari',
      'Taʼlim',
      'Tozalash xizmatlari',
      'Qoʻriqlash va xizmat koʻrsatish',
    ],
    note: '«Mening jamoam» moduli «Moliya» bilan birga eng kuchli ishlaydi — oylik avtomatik ravishda xarajatlarga tushadi va foyda halol hisoblanadi.',
  },
  tariff: { headline: '«Mening jamoam» Habibi Pro tarifiga kiradi', baseIncludes: false },
  cta: {
    title: 'Jamoa va oylikni tartibga soling',
    text: 'Bepul boshlang — eng katta xarajat moddangizni raqamlar asosida yuritishga tayyor boʻlganingizda «HR va oylik»ni qoʻshing.',
  },
}
