import ChatWidget, { type ChatLabels } from './chat/ChatWidget'
import { useContact } from './ContactProvider'

const WHATSAPP_URL = 'https://wa.me/359885282094'

const LABELS: ChatLabels = {
  title: 'Консультант Habibi',
  subtitle: 'Отвечает на вопросы о системе',
  greeting:
    'Здравствуйте! Я помогу разобраться в Habibi — модули, тарифы, внедрение. Что вас интересует?',
  suggestions: ['Сколько стоит?', 'Какие есть модули?', 'Как проходит внедрение?'],
  placeholder: 'Спросите о Habibi…',
  sendLabel: 'Отправить',
  closeLabel: 'Закрыть чат',
  resetLabel: 'Начать заново',
  contactCta: 'Обсудить с менеджером',
  whatsappLabel: 'Написать в WhatsApp',
  disclaimer: 'Отвечает ИИ и может ошибаться. Точные условия уточняйте у менеджера.',
  retryLabel: 'Повторить',
  micLabel: 'Надиктовать сообщение',
  micStopLabel: 'Остановить запись',
  micListening: 'Говорите…',
  micDenied: 'Нет доступа к микрофону. Разрешите его в настройках браузера.',
  micFailed: 'Не удалось распознать речь. Попробуйте ещё раз или напишите текстом.',
  errors: {
    rate_limited: 'Слишком много сообщений подряд. Подождите минуту.',
    message_too_long: 'Сообщение слишком длинное — сократите его.',
    history_too_long: 'Диалог получился длинным. Начните заново, чтобы продолжить.',
    upstream_rate_limited: 'Сервис перегружен. Попробуйте через минуту.',
    upstream_error: 'Не удалось получить ответ.',
    network: 'Нет связи с сервером. Проверьте интернет.',
    refusal: 'На этот вопрос я ответить не могу. Спросите иначе или напишите менеджеру.',
    unknown: 'Что-то пошло не так.',
  },
}

/** ИИ-чат русской версии сайта. */
export default function AiChatWidget({ moduleSlug }: { moduleSlug?: string }) {
  const { open } = useContact()

  return (
    <ChatWidget
      lang="ru"
      labels={LABELS}
      side="right"
      dir="ltr"
      fontClass="font-geist"
      whatsappUrl={WHATSAPP_URL}
      openLabel="Открыть чат с консультантом"
      moduleSlug={moduleSlug}
      onRequestContact={() => open()}
    />
  )
}
