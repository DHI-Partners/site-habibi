import AiChatWidget from '../uz/AiChatWidget'
import type { ConsultingContent } from './types'

/** Habibi Consulting page content — узбекская версия (/uz/consulting). */
export const UZ_CONSULTING: ConsultingContent = {
  lang: 'uz',
  dir: 'ltr',
  home: '/uz',
  docTitle: 'Habibi Consulting — toʻliq joriy etish',
  Chat: AiChatWidget,
  ui: {
    backHome: 'Bosh sahifaga',
    heroTag: 'Habibi Consulting',
    heroTitle: 'Har bir biznes tayyor qolipga sigʻmaydi',
    heroLead:
      'Habibi — koʻpchilik biznes ehtiyojlarini qutidan chiqqan holda qoplaydigan tayyor tizim. Ammo sizda nostandart jarayonlar, bir nechta biznes yoʻnalishi, oʻz ichki qoidalaringiz yoki joriy etish davomida qoʻlma-qoʻl yetaklab borish kerak boʻlgan jamoa boʻlsa — bu endi tarif masalasi emas, balki individual ish masalasi.',
    heroAccent: 'Aynan shuning uchun bizda alohida yoʻnalish bor — Habibi Consulting.',
    heroCta: 'Konsultatsiya soʻrash',
    differenceTag: 'Oddiy Habibiʼdan farqi',
    differenceTitle: 'Ishlashning ikki xil formati',
    audienceTag: 'Kimlar uchun',
    audienceTitle: 'Individual ish qachon kerak boʻladi',
    includedTag: 'Nimalar kiradi',
    includedTitle: 'Biznes tahlilidan doimiy qoʻllab-quvvatlashgacha',
    stepsTag: 'Bu qanday ishlaydi',
    stepsTitle: 'Ishlaydigan tizimgacha besh bosqich',
    tariffTag: 'Tarif',
    tariffName: 'Exclusive',
    tariffNote: 'narx holatingizni koʻrib chiqqandan soʻng',
    tariffText:
      'Individual ish Exclusive tarifi doirasida bajariladi — narx va ish hajmi biznesingiz kattaligi hamda jarayonlaringiz murakkabligiga bogʻliq va vaziyatingizni koʻrib chiqqanimizdan soʻng belgilanadi.',
    teamTag: 'Kim shugʻullanadi',
    teamTitle: 'Ishning orqasida turgan odamlar',
    formTag: 'Soʻrov',
    formTitle: 'Biznesingiz haqida gapirib bering',
    formLead: 'Yechim taklif qilishimiz uchun avval siz haqingizda ozgina bilishimiz kerak.',
    footerText:
      'Habibi Consulting — biznes tahlili, tizimni individual sozlash, toʻliq joriy etish va jamoani oʻqitish.',
    footerReply: '1 ish kuni ichida javob beramiz',
  },
  team: [
    {
      name: 'Ilgiz Yusupov',
      role: 'Habibi asoschisi',
      initials: 'IY',
      photo: '/team/ilgiz.jpg',
      bio: [
        'Biznesda 15 yil, shundan taxminan 10 yili yirik loyihalarda biznes-konsalting — jumladan, arab tili va Qurʼonni oʻrganish uchun taʼlim portali Shakird.com.',
        'Oʻzining birinchi IT-kompaniyasiga asos solgan; ITʼdan koʻchmas mulkkacha turli sohalarda biznesni avtomatlashtirish boʻyicha 10 yildan ortiq tajribaga ega, bundan tashqari koʻchmas mulk sohasining oʻzida ham alohida oʻn yillik tajribasi bor.',
        'Rossiya, Turkiya, Yevropa va Saudiya Arabistoni bozorlarida ishlagan — amaliy xalqaro biznes tajribasi.',
      ],
      facts: ['Biznesda 15 yil', 'Konsaltingda 10 yil', 'Rossiya · Turkiya · Yevropa · Saudiya Arabistoni'],
    },
    {
      name: 'Timur Ashiriatov',
      role: 'Bosh texnik direktor',
      initials: 'TA',
      photo: '/team/timur.jpg',
      bio: [
        'Oracle, maʼlumotlar bazalari va Big Data, shuningdek bulutli texnologiyalar, AI va korporativ infratuzilma boʻyicha 19+ yillik tajribaga ega IT-arxitektor. Murakkab IT-tizimlarni loyihalaydi, biznes uchun kritik yuklamalarni koʻchiradi va bulutli transformatsiyani boshqaradi.',
        'Murakkab texnik masalalarni chuqur oʻrganishni, amaliy yechimlar topishni va chuqur texnik ekspertizani biznesning real ehtiyojlari bilan bogʻlashni yoqtiradi.',
      ],
      facts: [
        'ITʼda 19+ yil',
        'Oracle · Cloud',
        'Database · Big Data',
        'Enterprise Infrastructure',
      ],
    },
  ],
  difference: [
    {
      title: 'Oddiy Habibi',
      text: 'Roʻyxatdan oʻtasiz, kerakli modullarni oʻzingiz sozlaysiz va ishga kirishasiz. Tez, mustaqil, belgilangan tariflar boʻyicha.',
      tone: 'plain',
    },
    {
      title: 'Konsalting',
      text: 'Bu boshqacha format. Biz sizga kelamiz, biznesingiz aslida qanday ishlashini oʻrganamiz va yechimni shuning atrofida quramiz: qaysi modullar kerak, ularni qanday bogʻlash, qaysi jarayonlarni avtomatlashtirishdan keyin emas, undan oldin oʻzgartirgan maʼqul va jamoani qanday oʻqitish kerak — toki tizim ishlatilmaydigan obunaga aylanmasin, balki haqiqatan ishlasin.',
      tone: 'emerald',
    },
  ],
  audience: [
    {
      icon: '🏢',
      text: 'Bir nechta biznes yoʻnalishi yoki filialga ega kompaniyalar — ularning har biri oʻz jarayonlari boʻyicha ishlaydi.',
    },
    {
      icon: '🔁',
      text: 'Avtomatlashtirishni allaqachon sinab koʻrgan, lekin u «oʻrnashmagan» — jamoa yana Excel va WhatsAppʼga qaytgan boʻlsa.',
    },
    {
      icon: '🧩',
      text: 'Standart modullar tavsiflab bera olmaydigan nostandart jarayonlarga ega bizneslar.',
    },
    {
      icon: '👥',
      text: 'Qarorni bir necha kishi qabul qiladigan kompaniyalar — talablarni yigʻib chiqadigan odam kerak, toki muhokama koʻr-koʻrona bormasin.',
    },
    {
      icon: '🎯',
      text: 'Tizimga kirishdan koʻra koʻproq narsani xohlaydiganlar — toʻliq joriy etish va yakunda oʻqitilgan jamoa.',
    },
  ],
  included: [
    {
      title: 'Biznes tahlili',
      text: 'Bugun hamma narsa qanday ishlayotganini oʻrganamiz: savdo, ombor, moliya, jamoa, tor joylar. Katakchalarni belgilab chiqiladigan soʻrovnoma emas — vaqt va pul qayerdan oqib ketayotgani haqida real suhbat.',
    },
    {
      title: 'Sizga moslangan yechim',
      text: 'Habibi konfiguratsiyasini jarayonlaringiz atrofida yigʻamiz: qaysi modullarni yoqish, nimani nostandart sozlash, boshqa xizmatlar bilan qanday integratsiyalar kerak boʻlishi.',
    },
    {
      title: 'Joriy etish',
      text: 'Tizimni sozlaymiz, maʼlumotlaringizni koʻchiramiz va Habibi ichidagi jarayonlarni jamoangiz aslida qanday ishlashiga mos qilib quramiz.',
    },
    {
      title: 'Jamoani oʻqitish',
      text: 'Jamoani tizim boʻylab shaxsan yetaklab oʻtamiz — oddiy xodimdan menejergacha. Faqat «qayerni bosish» kerakligini emas, bu nega muhimligini ham koʻrsatamiz — toki bir oydan keyin hech kim eski odatlariga qaytmasin.',
    },
    {
      title: 'Doimiy qoʻllab-quvvatlash',
      text: 'Ishga tushirilgandan keyin ham aloqada qolamiz: nozik sozlashlar, savollarga javoblar, biznes oʻsib, jarayonlar oʻzgarganda yordam.',
    },
  ],
  steps: [
    'Soʻrov qoldirasiz va biznesingiz haqida qisqacha aytib berasiz.',
    'Qoʻngʻiroqda bogʻlanamiz va maqsadlaringiz hamda joriy jarayonlaringizni koʻrib chiqamiz.',
    'Taklif tayyorlaymiz: nimani sozlaymiz, muddat, narx.',
    'Tizimni joriy etamiz va jamoani oʻqitamiz.',
    'Ishga tushirilgandan keyin qoʻllab-quvvatlaymiz.',
  ],
  footerLinks: [
    { label: 'Imkoniyatlar', href: '/uz#vozmozhnosti' },
    { label: 'Modullar', href: '/uz#moduli' },
    { label: 'Tariflar', href: '/uz#tarify' },
    { label: 'Hamkorlar', href: '/uz/partners' },
    { label: 'Investorlar', href: '/investors' },
  ],
  form: {
    name: 'Ismingiz',
    namePlaceholder: 'Sizga qanday murojaat qilamiz',
    contact: 'Telefon yoki WhatsApp',
    contactPlaceholder: '+998 90 123 45 67',
    email: 'Email',
    emailPlaceholder: 'siz@kompaniya.uz',
    submit: 'Soʻrov yuborish',
    sending: 'Yuborilmoqda…',
    underButton: '1 ish kuni ichida bogʻlanamiz.',
    consent: {
      before: 'Soʻrov yuborish orqali siz maʼlumotlaringiz ',
      privacy: 'Maxfiylik siyosati',
      middle: 'ga muvofiq qayta ishlanishiga rozilik bildirasiz va ',
      terms: 'Foydalanish shartlari',
      after: 'ni qabul qilasiz.',
    },
    privacyHref: '/uz/privacy',
    termsHref: '/uz/terms',
    successTitle: 'Soʻrov yuborildi',
    successText: 'Maqsadlaringizni muhokama qilish uchun 1 ish kuni ichida bogʻlanamiz.',
    error: 'Soʻrovni yuborib boʻlmadi. Qayta urinib koʻring yoki WhatsAppʼda yozing.',
    subject: 'Habibi Consulting soʻrovi',
    fields: [
      { name: 'company', label: 'Kompaniya nomi va faoliyat sohasi', type: 'text', required: true },
      { name: 'staff', label: 'Xodimlar soni', type: 'text', required: true },
      {
        name: 'processes',
        label: 'Qaysi jarayonlarni avtomatlashtirmoqchisiz',
        hint: 'Savdo, ombor, moliya, HR, loyihalar — bir nechtasi ham boʻladi',
        type: 'text',
        required: true,
      },
      {
        name: 'current',
        label: 'Hozir nimadan foydalanasiz',
        hint: 'Boshqa tizim, Excel, WhatsApp, qogʻoz',
        type: 'text',
        required: true,
      },
      {
        name: 'branches',
        label: 'Bir nechta filial yoki biznes yoʻnalishingiz bormi',
        type: 'text',
        required: false,
      },
      {
        name: 'problem',
        label: 'Hozirgi asosiy muammoyingiz',
        hint: 'Avtomatlashtirish haqida oʻylashingizga nima sabab boʻldi',
        type: 'textarea',
        required: true,
      },
      { name: 'timeline', label: 'Qachon joriy etishni rejalashtiryapsiz (muddat)', type: 'text', required: false },
      {
        name: 'comment',
        label: 'Izoh',
        hint: 'Nima kerakligini oʻz soʻzlaringiz bilan yozing',
        type: 'textarea',
        required: false,
      },
    ],
  },
}
