import AiChatWidget from '../en/AiChatWidget'
import type { LegalContent } from './types'

/** Privacy policy — English version (/privacy). */
export const EN_PRIVACY: LegalContent = {
  lang: 'en',
  dir: 'ltr',
  home: '/',
  docTitle: 'Privacy Policy — Habibi',
  backHome: 'Back to home',
  title: 'Privacy Policy',
  updatedLabel: 'Last updated',
  updated: '20 August 2026',
  intro:
    'This policy explains what data the habibi-erp.com website and the Habibi service collect, why we need it, who it is shared with and how you can control it. We describe what actually happens — no boilerplate.',
  Chat: AiChatWidget,
  sections: [
    {
      title: '1. Who processes your data',
      body: [
        'The data controller is NAVO MOTORS BULGARIA EOOD (“НАВО МОТЪРС БЪЛГАРИЯ” ЕООД), a single-member limited liability company registered in the Republic of Bulgaria, UIC 200117125. Registered address: 39 Bregova Street, Byala, Bulgaria. The company owns the habibi-erp.com website and the Habibi business management service (“we”, “Habibi”).',
        'As the company is registered in the European Union, we process data in accordance with the EU General Data Protection Regulation (GDPR, Regulation (EU) 2016/679) and the Bulgarian Personal Data Protection Act.',
        'For any question about data processing, or to exercise your rights, write to privacy@habibi-erp.com. We respond within 30 calendar days.',
      ],
    },
    {
      title: '2. What data we collect',
      body: [
        'We do not collect data “just in case”. Every item below maps to a specific feature of the site — if you do not use it, that data never appears.',
      ],
      table: {
        head: ['Data', 'When it appears', 'Why'],
        rows: [
          [
            'Name, phone or messenger, email',
            'You submit a contact form, a consulting request or a financial-model request',
            'To get back to you and answer your enquiry',
          ],
          [
            'Company details: name, industry, headcount, processes, timeline',
            'You fill in the questionnaire on the Consulting page',
            'To prepare a proposal that fits your goals',
          ],
          [
            'Email, password (encrypted), payout details',
            'You register in the partner cabinet',
            'Access to your account and payment of your commission',
          ],
          [
            'The text of your messages to the AI assistant',
            'You write in the chat widget on the site',
            'To generate an answer to your question',
          ],
          [
            'Partner link identifier (stored in your browser)',
            'You arrived through a partner’s referral link',
            'To credit the partner for the customer they referred',
          ],
          [
            'Technical data: page language, section address, button clicks',
            'You simply browse the site',
            'To understand which sections help and to fix errors',
          ],
        ],
      },
      note: 'We do not collect special categories of data (health, religious or political views, biometrics) and never ask for payment card details on the website.',
    },
    {
      title: '3. The legal basis for processing',
      bullets: [
        'Your consent — when you voluntarily submit a form or write in the chat. Consent can be withdrawn at any time.',
        'Performance of a contract — when you become a partner or a customer and we must keep records and make payments.',
        'Legitimate interest — basic analytics and protecting the site from abuse, to an extent that does not override your rights.',
        'Legal obligation — where retention is required by law, for example for accounting records.',
      ],
    },
    {
      title: '4. Who we share data with',
      body: [
        'We never sell your data or hand it to third parties for their own marketing. Data only reaches the services the site cannot run without:',
      ],
      bullets: [
        'Vercel Inc. — hosting of the website and its server functions (USA, EU).',
        'Web3Forms — delivery of form submissions to our working inbox.',
        'Supabase — database and authentication for the partner cabinet.',
        'Anthropic (Claude) — processing of AI assistant messages. Your messages are sent to the model to produce an answer and are not used to train it.',
        'Google Fonts — loading the site’s typefaces; your browser therefore contacts Google servers.',
        'WhatsApp and Telegram — only if you choose to message us there yourself.',
      ],
      note: 'Some of these services are located outside your country, so data may be transferred across borders. We only work with providers that maintain a recognised level of data protection.',
    },
    {
      title: '5. Cookies and browser storage',
      body: [
        'There are no advertising or tracking cookies on this site. We use browser storage only where it is strictly needed:',
      ],
      bullets: [
        '“habibi_ref” — remembers which partner link brought you here, so the partner is credited correctly.',
        '“ar-theme” — remembers the theme you chose for the Arabic version of the site.',
        'Authentication cookies — only inside the partner cabinet, so you are not logged out on every page.',
      ],
      note: 'You can delete these entries at any time by clearing site data in your browser settings. It will not affect access to the site.',
    },
    {
      title: '6. How long we keep data',
      bullets: [
        'Enquiries and related correspondence — up to 3 years from your last contact, so we remember the history of our conversation.',
        'Partner cabinet data — for as long as the partnership lasts, and afterwards for the periods required by law for financial records.',
        'AI assistant messages — within the current conversation; we keep no permanent archive of chats.',
        'Technical records of clicks and page language — in hosting logs, normally no longer than 30 days.',
      ],
      note: 'Once the purpose is fulfilled and the law does not require otherwise, data is deleted or anonymised.',
    },
    {
      title: '7. Your rights',
      body: ['In relation to your data, you can:'],
      bullets: [
        'Find out what data we hold about you and receive a copy of it.',
        'Correct inaccurate or incomplete data.',
        'Delete your data (the “right to be forgotten”), where no lawful ground to keep it remains.',
        'Restrict processing or object to it.',
        'Withdraw consent — this does not affect the lawfulness of processing before the withdrawal.',
        'Receive your data in a machine-readable format to transfer it to another controller.',
        'Lodge a complaint with a supervisory authority: in Bulgaria this is the Commission for Personal Data Protection (CPDP, cpdp.bg), or the authority in your country of residence.',
      ],
      note: 'To exercise any of these rights, write to privacy@habibi-erp.com from the email address you gave us — that way we can confirm the request comes from you.',
    },
    {
      title: '8. How we protect data',
      bullets: [
        'All site traffic is transmitted over the secure HTTPS protocol.',
        'Partner cabinet passwords are stored only as irreversible hashes — we never see your password.',
        'Access to the database and the working inbox is limited to a small number of people, strictly for their tasks.',
        'We regularly update dependencies and infrastructure to close known vulnerabilities.',
      ],
      note: 'No method of transmitting data over the internet is completely secure. If a breach nonetheless occurs and creates a risk to your rights, we will notify you and the supervisory authority within the required timeframe.',
    },
    {
      title: '9. Children',
      body: [
        'The site and the service are intended for businesses and are not addressed to children under 16. We do not knowingly collect their data. If you believe a child has given us their data, write to us and we will delete it.',
      ],
    },
    {
      title: '10. Changes to this policy',
      body: [
        'If we change what data we collect or connect new services, we update this page and the date at the top of the document. For significant changes we also notify by email those whose data we hold.',
      ],
    },
  ],
  footerLinks: [
    { label: 'Features', href: '/#vozmozhnosti' },
    { label: 'Modules', href: '/#moduli' },
    { label: 'Pricing', href: '/#tarify' },
    { label: 'Consulting', href: '/consulting' },
    { label: 'Partners', href: '/partners' },
  ],
  footerText: 'Data questions: privacy@habibi-erp.com',
}
