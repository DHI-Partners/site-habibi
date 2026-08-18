import ChatWidget, { type ChatLabels } from '../chat/ChatWidget'
import { buildWhatsAppLink, useContact } from './ContactProvider'

const LABELS: ChatLabels = {
  title: 'Habibi assistant',
  subtitle: 'Answers questions about the system',
  greeting:
    'Hi! I can help you explore Habibi — modules, pricing, rollout. What would you like to know?',
  suggestions: ['How much does it cost?', 'What modules are there?', 'How does rollout work?'],
  placeholder: 'Ask about Habibi…',
  sendLabel: 'Send',
  closeLabel: 'Close chat',
  resetLabel: 'Start over',
  contactCta: 'Talk to a manager',
  whatsappLabel: 'Message us on WhatsApp',
  disclaimer: 'Answers come from AI and may be wrong. Confirm exact terms with a manager.',
  retryLabel: 'Try again',
  micLabel: 'Dictate a message',
  micStopLabel: 'Stop recording',
  micListening: 'Listening…',
  micDenied: 'No microphone access. Allow it in your browser settings.',
  micFailed: "Couldn't recognise speech. Try again or type your message.",
  errors: {
    rate_limited: 'Too many messages in a row. Please wait a minute.',
    message_too_long: 'That message is too long — please shorten it.',
    history_too_long: 'This conversation got long. Start over to continue.',
    upstream_rate_limited: 'The service is busy. Try again in a minute.',
    upstream_error: 'Could not get a response.',
    network: 'No connection to the server. Check your internet.',
    refusal: "I can't answer that one. Try rephrasing, or message a manager.",
    unknown: 'Something went wrong.',
  },
}

/** AI chat for the English version of the site. */
export default function AiChatWidget({ moduleSlug }: { moduleSlug?: string }) {
  const { open } = useContact()

  return (
    <ChatWidget
      lang="en"
      labels={LABELS}
      side="right"
      dir="ltr"
      fontClass="font-geist"
      whatsappUrl={buildWhatsAppLink('Hi 👋 I have a question about Habibi.')}
      openLabel="Open chat with the assistant"
      moduleSlug={moduleSlug}
      onRequestContact={() => open()}
    />
  )
}
