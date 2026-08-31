import ChatWidget, { type ChatLabels } from '../chat/ChatWidget'
import { buildWhatsAppLink, useContact } from './ContactProvider'
import { PARTNER_FORM } from '../partner/uz/data'
import type { ChatPage } from '../../lib/chat'

const LABELS: ChatLabels = {
  title: 'Habibi yordamchisi',
  subtitle: 'Tizim haqidagi savollarga javob beradi',
  greeting:
    'Salom! Habibi bilan tanishishga yordam beraman — modullar, tariflar, joriy etish. Nimani bilmoqchisiz?',
  suggestions: ['Narxi qancha?', 'Qanday modullar bor?', 'Joriy etish qanday kechadi?'],
  placeholder: 'Habibi haqida soʻrang…',
  sendLabel: 'Yuborish',
  closeLabel: 'Chatni yopish',
  resetLabel: 'Qaytadan boshlash',
  contactCta: 'Menejer bilan bogʻlanish',
  whatsappLabel: 'WhatsAppʼda yozish',
  disclaimer: 'Javoblarni AI beradi, xatolar boʻlishi mumkin. Aniq shartlarni menejerdan tasdiqlab oling.',
  retryLabel: 'Qayta urinish',
  micLabel: 'Ovoz bilan yozish',
  micStopLabel: 'Yozishni toʻxtatish',
  micListening: 'Eshitilmoqda…',
  micDenied: 'Mikrofonga ruxsat yoʻq. Brauzer sozlamalarida ruxsat bering.',
  micFailed: 'Nutq tanilmadi. Qayta urinib koʻring yoki yozib yuboring.',
  micHint: 'Gapiring — soʻzlaringiz shu yerda paydo boʻladi. Yuborishdan oldin tahrirlash mumkin.',
  micDone: 'Tayyor',
  micCancel: 'Bekor qilish',
  errors: {
    rate_limited: 'Ketma-ket xabarlar juda koʻp. Bir daqiqa kuting.',
    message_too_long: 'Xabar juda uzun — biroz qisqartiring.',
    history_too_long: 'Suhbat uzayib ketdi. Davom etish uchun qaytadan boshlang.',
    upstream_rate_limited: 'Xizmat hozir band. Bir daqiqadan soʻng urinib koʻring.',
    upstream_error: 'Javob olib boʻlmadi.',
    network: 'Server bilan aloqa yoʻq. Internetni tekshiring.',
    refusal: 'Bu savolga javob bera olmayman. Boshqacha soʻrang yoki menejerga yozing.',
    unknown: 'Nimadir xato ketdi.',
  },
}

/** У партнёрской страницы другая цель — и другой вход в диалог. */
const PARTNER_LABELS: ChatLabels = {
  ...LABELS,
  subtitle: 'Hamkorlik dasturi boʻyicha savollarga javob beradi',
  greeting:
    'Salom! Hamkorlik dasturini tushuntirib beraman — stavkalar, toʻlovlar, shartlar. Nimani bilmoqchisiz?',
  suggestions: ['Qancha daromad olsam boʻladi?', 'Stavkalar qanday?', 'Toʻlovlar qanday amalga oshadi?'],
  contactCta: 'Dasturga ariza qoldirish',
}

/** ИИ-чат узбекской версии сайта. */
export default function AiChatWidget({
  moduleSlug,
  page,
  hideLauncherWhile,
}: {
  moduleSlug?: string
  page?: ChatPage
  /** id первого экрана: пока он виден, кнопка в углу не нужна. */
  hideLauncherWhile?: string
}) {
  const { open } = useContact()
  const isPartner = page === 'partner'

  return (
    <ChatWidget
      lang="uz"
      labels={isPartner ? PARTNER_LABELS : LABELS}
      page={page}
      side="right"
      dir="ltr"
      fontClass="font-geist"
      whatsappUrl={buildWhatsAppLink('Assalomu alaykum 👋 Habibi boʻyicha savolim bor.')}
      openLabel="Yordamchi bilan chatni ochish"
      moduleSlug={moduleSlug}
      hideLauncherWhile={hideLauncherWhile}
      onRequestContact={() =>
        isPartner ? open(PARTNER_FORM.label, PARTNER_FORM.options) : open()
      }
    />
  )
}
