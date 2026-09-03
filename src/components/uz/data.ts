import type { TeamMember } from '../consulting/types'

/**
 * Habibi jamoasi — "Biz haqimizda" sahifasi (/uz/about).
 * Ilgiz va Timur maʼlumotlari Habibi Consulting sahifasidagi (src/components/consulting/uz.ts)
 * matn bilan bir xil — bio sahifalar orasida farqlanmasligi uchun. Yangi
 * ishtirokchilar maʼlumoti kelganda shu yerga qoʻshiladi; band joy uchun
 * `placeholder: true` ishlatiladi.
 */
export const UZ_TEAM: TeamMember[] = [
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
      'Oracle, maʼlumotlar bazalari va Big Data, shuningdek bulutli texnologiyalar va korporativ infratuzilma boʻyicha 19+ yillik tajribaga ega IT-arxitektor. Murakkab IT-tizimlarni loyihalaydi va rivojlantiradi, bulutli transformatsiyani boshqaradi va biznes uchun kritik yuklamalarni koʻchiradi.',
      'Chuqur texnik ekspertizani biznesning real ehtiyojlari bilan bogʻlaydi — murakkab texnik masalalarni yechishdan amaliy natijalargacha.',
    ],
    facts: ['ITʼda 19+ yil', 'Oracle · Cloud', 'Database · Big Data', 'Enterprise Infrastructure'],
  },
  {
    name: 'Egor Kirsanov',
    role: 'Senior Fullstack/Mobile dasturchi',
    initials: 'EK',
    photo: '/team/egor.jpg',
    bio: [
      'Arxitektura va mahsulot logikasini noldan loyihalash, mobil va veb-platformalarni toʻliq siklda quradi. Dasturlashda 9+ yil.',
      'Logistika / Cargo.tech (Marshal.tech) — soʻnggi 2 yil: «raqamli ekspeditor» platformasini ishlab chiqish, toʻliq sikl — backend, frontend va mobil ilova.',
      'EdTech (arabic.best) — 4 yil: taʼlim kросsplatforma ekotizimini noldan yaratish (Web, iOS, Android, oʻz CMSʼi, AI-integratsiyalar).',
      'E-commerce / Marketpleyslar (HorsSmart): mobil ilova va veb-panellarni ishlab chiqish (React Native, Expo).',
      'Boshqa loyihalar: Rossiya Hisob palatasi loyihasi, premium segment promo-saytlar.',
    ],
    facts: ['Dasturlashda 9+ yil', 'Fullstack · Mobile', 'React Native · Web · AI-integratsiyalar'],
  },
  {
    name: 'Dos Muhammad',
    role: 'Habibi hammuassisi, Software Developer',
    initials: 'DM',
    photo: '/team/dos.jpg',
    bio: [
      'Veb-ilovalar, server yechimlari, API va avtomatlashtirish tizimlarini yaratishda 7+ yillik tajribaga ega dasturchi. Ishonchli, kengaytiriladigan va qoʻllab-quvvatlash oson boʻlgan dasturiy yechimlar yaratishga ixtisoslashgan.',
    ],
    facts: ['Dasturlashda 7+ yil', 'Veb-ilovalar', 'API · avtomatlashtirish'],
  },
]
