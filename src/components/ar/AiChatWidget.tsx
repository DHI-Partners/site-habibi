import ChatWidget, { type ChatLabels } from '../chat/ChatWidget'
import { buildWhatsAppLink, useContact } from './ContactProvider'

const LABELS: ChatLabels = {
  title: 'مستشار Habibi',
  subtitle: 'يجيب عن أسئلتك حول النظام',
  greeting:
    'مرحبًا! سأساعدك على التعرّف على Habibi — الوحدات والباقات والتنفيذ. ما الذي يهمّك؟',
  suggestions: ['كم التكلفة؟', 'ما هي الوحدات المتاحة؟', 'كيف يتم التنفيذ؟'],
  placeholder: 'اسأل عن Habibi…',
  sendLabel: 'إرسال',
  closeLabel: 'إغلاق المحادثة',
  resetLabel: 'البدء من جديد',
  contactCta: 'التحدّث إلى مختص',
  whatsappLabel: 'راسلنا عبر واتساب',
  disclaimer: 'الإجابات من الذكاء الاصطناعي وقد تحتوي على أخطاء. تأكّد من الشروط الدقيقة مع المختص.',
  retryLabel: 'إعادة المحاولة',
  micLabel: 'إملاء رسالة صوتيًا',
  micStopLabel: 'إيقاف التسجيل',
  micListening: 'تكلّم الآن…',
  micDenied: 'لا يوجد إذن للميكروفون. فعّله من إعدادات المتصفّح.',
  micFailed: 'تعذّر التعرّف على الكلام. حاول مجددًا أو اكتب رسالتك.',
  errors: {
    rate_limited: 'رسائل كثيرة متتالية. انتظر دقيقة من فضلك.',
    message_too_long: 'الرسالة طويلة جدًا — اختصرها من فضلك.',
    history_too_long: 'أصبحت المحادثة طويلة. ابدأ من جديد للمتابعة.',
    upstream_rate_limited: 'الخدمة مزدحمة حاليًا. حاول بعد دقيقة.',
    upstream_error: 'تعذّر الحصول على إجابة.',
    network: 'لا يوجد اتصال بالخادم. تحقّق من الإنترنت.',
    refusal: 'لا أستطيع الإجابة عن هذا السؤال. أعد صياغته أو راسل المختص.',
    unknown: 'حدث خطأ ما.',
  },
}

/** المحادثة الذكية للنسخة العربية من الموقع. */
export default function AiChatWidget({ moduleSlug }: { moduleSlug?: string }) {
  const { open } = useContact()

  return (
    <ChatWidget
      lang="ar"
      labels={LABELS}
      // الزاوية معكوسة يدويًا في هذا المشروع، لذلك تُمرَّر الجهة صراحةً
      side="left"
      dir="rtl"
      fontClass="font-arabic"
      whatsappUrl={buildWhatsAppLink('مرحبًا 👋 لديّ سؤال عن Habibi.')}
      openLabel="افتح المحادثة مع المستشار"
      moduleSlug={moduleSlug}
      onRequestContact={() => open()}
    />
  )
}
