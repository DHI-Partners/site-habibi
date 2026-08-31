import AiChatWidget from '../uz/AiChatWidget'
import type { LegalContent } from './types'

/** Privacy policy — Uzbek version (/uz/privacy). */
export const UZ_PRIVACY: LegalContent = {
  lang: 'uz',
  dir: 'ltr',
  home: '/uz',
  docTitle: 'Maxfiylik siyosati — Habibi',
  backHome: 'Bosh sahifaga qaytish',
  title: 'Maxfiylik siyosati',
  updatedLabel: 'Oxirgi yangilanish',
  updated: '2026-yil 20-avgust',
  intro:
    'Ushbu siyosat habibi-erp.com sayti va Habibi xizmati qanday maʼlumotlarni toʻplashini, ular bizga nima uchun kerakligini, kimlar bilan ulashilishini va siz ularni qanday nazorat qila olishingizni tushuntiradi. Biz aslida nima sodir boʻlishini yozamiz — quruq shablon emas.',
  Chat: AiChatWidget,
  sections: [
    {
      title: '1. Maʼlumotlaringizni kim qayta ishlaydi',
      body: [
        'Maʼlumotlar nazoratchisi — NAVO MOTORS BULGARIA EOOD («НАВО МОТЪРС БЪЛГАРИЯ» ЕООД), Bolgariya Respublikasida roʻyxatdan oʻtgan yakka aʼzoli masʼuliyati cheklangan jamiyat, UIC 200117125. Roʻyxatdan oʻtgan manzil: 39 Bregova Street, Byala, Bulgaria. Kompaniya habibi-erp.com saytiga va Habibi biznes boshqaruv xizmatiga egalik qiladi («biz», «Habibi»).',
        'Kompaniya Yevropa Ittifoqida roʻyxatdan oʻtgani sababli biz maʼlumotlarni Yevropa Ittifoqining maʼlumotlarni himoya qilish boʻyicha umumiy reglamentiga (GDPR, Regulation (EU) 2016/679) va Bulgarian Personal Data Protection Act qonuniga muvofiq qayta ishlaymiz.',
        'Maʼlumotlarni qayta ishlash boʻyicha har qanday savol uchun yoki huquqlaringizni amalga oshirish uchun privacy@habibi-erp.com manziliga yozing. Biz 30 kalendar kun ichida javob beramiz.',
      ],
    },
    {
      title: '2. Qanday maʼlumotlarni toʻplaymiz',
      body: [
        'Biz maʼlumotlarni «har ehtimolga qarshi» toʻplamaymiz. Quyidagi har bir band saytning aniq bir funksiyasiga bogʻliq — agar undan foydalanmasangiz, u maʼlumot umuman paydo boʻlmaydi.',
      ],
      table: {
        head: ['Maʼlumot', 'Qachon paydo boʻladi', 'Nima uchun'],
        rows: [
          [
            'Ism, telefon yoki messenjer, email',
            'Siz aloqa formasini, konsalting soʻrovini yoki moliyaviy model soʻrovini yuborasiz',
            'Siz bilan bogʻlanish va soʻrovingizga javob berish uchun',
          ],
          [
            'Kompaniya maʼlumotlari: nomi, soha, xodimlar soni, jarayonlar, muddatlar',
            'Siz Konsalting sahifasidagi soʻrovnomani toʻldirasiz',
            'Maqsadlaringizga mos keladigan taklif tayyorlash uchun',
          ],
          [
            'Email, parol (shifrlangan), toʻlov rekvizitlari',
            'Siz hamkor kabinetida roʻyxatdan oʻtasiz',
            'Hisobingizga kirish va komissiyangizni toʻlash uchun',
          ],
          [
            'AI-yordamchiga yozgan xabarlaringiz matni',
            'Siz saytdagi chat-vidjetda yozasiz',
            'Savolingizga javob shakllantirish uchun',
          ],
          [
            'Hamkor havolasining identifikatori (brauzeringizda saqlanadi)',
            'Siz hamkorning referal havolasi orqali kelgansiz',
            'Hamkorga u jalb qilgan mijoz uchun hisob yozilishi uchun',
          ],
          [
            'Texnik maʼlumotlar: sahifa tili, boʻlim manzili, tugma bosishlari',
            'Siz shunchaki saytni koʻrib chiqasiz',
            'Qaysi boʻlimlar foyda berayotganini tushunish va xatolarni tuzatish uchun',
          ],
        ],
      },
      note: 'Biz maxsus toifadagi maʼlumotlarni (sogʻliq, diniy yoki siyosiy qarashlar, biometrika) toʻplamaymiz va saytda hech qachon toʻlov kartasi maʼlumotlarini soʻramaymiz.',
    },
    {
      title: '3. Qayta ishlashning qonuniy asosi',
      bullets: [
        'Sizning roziligingiz — formani ixtiyoriy ravishda yuborganingizda yoki chatda yozganingizda. Rozilikni istalgan vaqtda qaytarib olish mumkin.',
        'Shartnomani bajarish — siz hamkor yoki mijoz boʻlganingizda va biz hisob yuritishimiz hamda toʻlovlarni amalga oshirishimiz kerak boʻlganda.',
        'Qonuniy manfaat — asosiy analitika va saytni suiisteʼmoldan himoya qilish, sizning huquqlaringizdan ustun kelmaydigan darajada.',
        'Qonuniy majburiyat — saqlash qonun talab qiladigan hollarda, masalan buxgalteriya hujjatlari uchun.',
      ],
    },
    {
      title: '4. Maʼlumotlarni kimlar bilan ulashamiz',
      body: [
        'Biz hech qachon maʼlumotlaringizni sotmaymiz va uchinchi shaxslarga ularning oʻz marketingi uchun bermaymiz. Maʼlumotlar faqat saytning ularsiz ishlay olmaydigan xizmatlariga yetib boradi:',
      ],
      bullets: [
        'Vercel Inc. — sayt va uning server funksiyalari hostingi (AQSh, Yevropa Ittifoqi).',
        'Web3Forms — formalar orqali yuborilgan xabarlarni bizning ishchi pochtamizga yetkazish.',
        'Supabase — hamkor kabineti uchun maʼlumotlar bazasi va autentifikatsiya.',
        'Anthropic (Claude) — AI-yordamchi xabarlarini qayta ishlash. Xabarlaringiz javob shakllantirish uchun modelga yuboriladi va uni oʻqitish uchun ishlatilmaydi.',
        'Google Fonts — sayt shriftlarini yuklash; shu sababli brauzeringiz Google serverlariga murojaat qiladi.',
        'WhatsApp va Telegram — faqat siz oʻzingiz u yerda bizga yozishni tanlasangiz.',
      ],
      note: 'Bu xizmatlarning ayrimlari sizning mamlakatingizdan tashqarida joylashgan, shuning uchun maʼlumotlar chegaralar orqali uzatilishi mumkin. Biz faqat maʼlumotlarni himoya qilishning tan olingan darajasini saqlaydigan provayderlar bilan ishlaymiz.',
    },
    {
      title: '5. Cookie fayllari va brauzer xotirasi',
      body: [
        'Bu saytda reklama yoki kuzatuv cookie fayllari yoʻq. Biz brauzer xotirasidan faqat qatʼiy zarur boʻlgan joyda foydalanamiz:',
      ],
      bullets: [
        '«habibi_ref» — sizni qaysi hamkor havolasi olib kelganini eslab qoladi, shunda hamkorga toʻgʻri hisob yoziladi.',
        '«ar-theme» — saytning arabcha versiyasi uchun tanlagan mavzuingizni eslab qoladi.',
        'Autentifikatsiya cookie fayllari — faqat hamkor kabineti ichida, har bir sahifada tizimdan chiqib ketmasligingiz uchun.',
      ],
      note: 'Bu yozuvlarni istalgan vaqtda brauzer sozlamalarida sayt maʼlumotlarini tozalash orqali oʻchirishingiz mumkin. Bu saytga kirishga taʼsir qilmaydi.',
    },
    {
      title: '6. Maʼlumotlarni qancha vaqt saqlaymiz',
      bullets: [
        'Soʻrovlar va ular bilan bogʻliq yozishmalar — oxirgi murojaatingizdan keyin 3 yilgacha, suhbatimiz tarixini eslab qolishimiz uchun.',
        'Hamkor kabineti maʼlumotlari — hamkorlik davom etgunicha, keyin esa moliyaviy hujjatlar uchun qonunda talab qilingan muddatlar davomida.',
        'AI-yordamchi xabarlari — joriy suhbat doirasida; biz chatlarning doimiy arxivini saqlamaymiz.',
        'Bosishlar va sahifa tili haqidagi texnik yozuvlar — hosting loglarida, odatda 30 kundan koʻp emas.',
      ],
      note: 'Maqsad bajarilgach va qonun boshqacha talab qilmasa, maʼlumotlar oʻchiriladi yoki anonimlashtiriladi.',
    },
    {
      title: '7. Sizning huquqlaringiz',
      body: ['Maʼlumotlaringizga nisbatan siz quyidagilarni qila olasiz:'],
      bullets: [
        'Siz haqingizda qanday maʼlumotlar saqlanayotganini bilish va ularning nusxasini olish.',
        'Notoʻgʻri yoki toʻliq boʻlmagan maʼlumotlarni tuzatish.',
        'Maʼlumotlaringizni oʻchirish («unutilish huquqi»), agar ularni saqlash uchun qonuniy asos qolmagan boʻlsa.',
        'Qayta ishlashni cheklash yoki unga eʼtiroz bildirish.',
        'Rozilikni qaytarib olish — bu qaytarib olishgacha boʻlgan qayta ishlashning qonuniyligiga taʼsir qilmaydi.',
        'Maʼlumotlaringizni boshqa nazoratchiga koʻchirish uchun mashina oʻqiy oladigan formatda olish.',
        'Nazorat organiga shikoyat qilish: Bolgariyada bu Commission for Personal Data Protection (CPDP, cpdp.bg) yoki siz yashaydigan mamlakatdagi organ.',
      ],
      note: 'Bu huquqlarning birortasini amalga oshirish uchun bizga bergan email manzilingizdan privacy@habibi-erp.com ga yozing — shunda soʻrov aynan sizdan kelganini tasdiqlay olamiz.',
    },
    {
      title: '8. Maʼlumotlarni qanday himoya qilamiz',
      bullets: [
        'Saytning barcha trafigi xavfsiz HTTPS protokoli orqali uzatiladi.',
        'Hamkor kabineti parollari faqat qaytarib boʻlmaydigan xesh koʻrinishida saqlanadi — biz parolingizni hech qachon koʻrmaymiz.',
        'Maʼlumotlar bazasi va ishchi pochtaga kirish kichik doiradagi odamlar bilan, qatʼiy ravishda ularning vazifalari doirasida cheklangan.',
        'Biz maʼlum zaifliklarni yopish uchun bogʻliqliklar va infratuzilmani muntazam yangilab boramiz.',
      ],
      note: 'Internet orqali maʼlumot uzatishning hech bir usuli toʻliq xavfsiz emas. Agar shunga qaramay buzilish yuz bersa va u huquqlaringizga xavf tugʻdirsa, biz sizni va nazorat organini talab qilingan muddat ichida xabardor qilamiz.',
    },
    {
      title: '9. Bolalar',
      body: [
        'Sayt va xizmat biznes uchun moʻljallangan va 16 yoshga toʻlmagan bolalarga qaratilmagan. Biz ularning maʼlumotlarini bila turib toʻplamaymiz. Agar bola bizga oʻz maʼlumotlarini bergan deb hisoblasangiz, bizga yozing — biz ularni oʻchiramiz.',
      ],
    },
    {
      title: '10. Ushbu siyosatga oʻzgartirishlar',
      body: [
        'Agar biz qanday maʼlumot toʻplashimizni oʻzgartirsak yoki yangi xizmatlarni ulasak, ushbu sahifani va hujjat yuqorisidagi sanani yangilaymiz. Muhim oʻzgarishlar boʻlganda maʼlumotlari bizda saqlanayotgan shaxslarni email orqali ham xabardor qilamiz.',
      ],
    },
  ],
  footerLinks: [
    { label: 'Imkoniyatlar', href: '/uz#vozmozhnosti' },
    { label: 'Modullar', href: '/uz#moduli' },
    { label: 'Tariflar', href: '/uz#tarify' },
    { label: 'Konsalting', href: '/uz/consulting' },
    { label: 'Hamkorlar', href: '/partners' },
  ],
  footerText: 'Maʼlumotlar boʻyicha savollar: privacy@habibi-erp.com',
}
