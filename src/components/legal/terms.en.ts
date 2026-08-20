import AiChatWidget from '../en/AiChatWidget'
import type { LegalContent } from './types'

/** Terms of Service — English version (/terms). */
export const EN_TERMS: LegalContent = {
  lang: 'en',
  dir: 'ltr',
  home: '/',
  docTitle: 'Terms of Service — Habibi',
  backHome: 'Back to home',
  title: 'Terms of Service',
  updatedLabel: 'Last updated',
  updated: '20 August 2026',
  intro:
    'This document sets out the terms on which you use the Habibi service and the habibi-erp.com website. By starting to use the service — registering, subscribing or sending a request — you accept these terms.',
  Chat: AiChatWidget,
  sections: [
    {
      title: '1. The parties',
      body: [
        'The service is provided by NAVO MOTORS BULGARIA EOOD, a single-member limited liability company registered in the Republic of Bulgaria, UIC 200117125, registered address: 39 Bregova Street, Byala, Bulgaria (“we”, “Habibi”).',
        'A User is any individual or legal entity that registers for the service, subscribes to it or otherwise uses Habibi (“you”, “User”).',
        'You can reach us at hello@habibi-erp.com.',
      ],
    },
    {
      title: '2. What Habibi is',
      body: [
        'Habibi is a cloud business management service (SaaS). It brings together modules for customers and sales, purchasing, inventory, manufacturing, finance, people, projects, service, retail and website leads.',
        'The service is provided on an “as is” and “as available” basis: you get access to the features that exist at the time of payment. We keep developing the product and may add, change or retire individual capabilities without reducing the overall value of the plan you paid for.',
      ],
    },
    {
      title: '3. Registration and your account',
      bullets: [
        'An account is required to use the service. The details you provide at registration must be accurate and up to date.',
        'You are responsible for keeping your password safe and for all activity carried out under your account.',
        'If you register on behalf of a company, you confirm that you are authorised to accept these terms for it.',
        'If you notice unauthorised access to your account, tell us immediately and we will help you regain control.',
      ],
    },
    {
      title: '4. Plans, payment and the trial period',
      body: [
        'Current plans and what they include are published on the Pricing section of the website. Prices are exclusive of taxes unless stated otherwise.',
      ],
      bullets: [
        'Trial period — the first 14 days are free, with access to the plan’s features and no card required.',
        'Subscriptions are paid in advance for the chosen period — monthly, semi-annually or annually. Annual payment comes at a reduced rate.',
        'Payment extends access for the next period. If payment is not received, access to paid features is suspended.',
        'The Habibi Exclusive plan (individual rollout and consulting) is quoted after a review of your business and covered by a separate agreement.',
        'We may change prices with at least 30 days’ notice. A change never affects a period you have already paid for.',
      ],
      note: 'A refund for an unused period can be requested — we review each case individually and in line with consumer protection law.',
    },
    {
      title: '5. Acceptable use',
      body: ['When using Habibi, you agree not to:'],
      bullets: [
        'Break the law, infringe third-party rights, or use the service for fraudulent purposes.',
        'Attempt to gain unauthorised access to the system, to other accounts or to other users’ data.',
        'Interfere with the service: overload the infrastructure, bypass plan limits, or probe for vulnerabilities without our written permission.',
        'Copy, decompile or reproduce the software behind the service, or resell access to third parties without written consent.',
        'Upload malicious code or content whose distribution is prohibited by law.',
      ],
      note: 'In case of a serious or repeated breach we may restrict or terminate access. Where a breach can be remedied, we will warn you first and allow a reasonable time to fix it.',
    },
    {
      title: '6. Your data inside the service',
      bullets: [
        'All data you enter into Habibi (customers, deals, products, documents) belongs to you. We claim no rights over it.',
        'We process that data only to make the service work and to support you when you ask.',
        'How personal data is handled is described in the Privacy Policy, which forms an integral part of these terms.',
        'On request we export your data in a machine-readable format. After termination, data is kept for a limited period and then deleted.',
      ],
    },
    {
      title: '7. Intellectual property',
      body: [
        'The service itself — its code, interface, design, texts, the Habibi trademark and logo — belongs to us and is protected by law.',
        'By paying for a subscription you receive a limited, non-transferable and non-exclusive right to use the service within your plan. This is not a transfer of ownership in the product.',
      ],
    },
    {
      title: '8. Service availability',
      bullets: [
        'We aim to keep the service running continuously, but we do not guarantee entirely uninterrupted operation.',
        'We try to schedule planned maintenance for low-traffic hours and to announce it in advance.',
        'We are not liable for outages caused by circumstances beyond our control: provider failures, equipment failures on your side, telecom operators, or force majeure.',
      ],
    },
    {
      title: '9. Limitation of liability',
      body: [
        'Habibi is a record-keeping and management tool. Decisions you make based on data from the service remain your decisions.',
        'We are not liable for lost profits, indirect or consequential damages, or reputational harm.',
        'Our aggregate liability for any claim is limited to the amount you actually paid us over the preceding 12 months.',
      ],
      note: 'Nothing in this section limits liability where the law does not allow it to be limited — for example in cases of intent or gross negligence.',
    },
    {
      title: '10. Term and termination',
      bullets: [
        'These terms apply for as long as you use the service.',
        'You may cancel your subscription at any time — access remains until the end of the period you paid for.',
        'We may terminate the agreement if you breach these terms, or if we discontinue the service — in the latter case with at least 30 days’ notice and a refund for the unused period.',
      ],
    },
    {
      title: '11. Changes to these terms',
      body: [
        'We may update these terms — for instance when new features appear or the law changes. The current version is always published on this page with its update date.',
        'We announce significant changes in advance by email or inside the service. By continuing to use Habibi after the changes take effect, you accept the new version.',
      ],
    },
    {
      title: '12. Governing law and disputes',
      body: [
        'These terms are governed by the law of the Republic of Bulgaria, together with applicable European Union law, including consumer protection rules.',
        'We prefer to resolve disagreements by talking: write to us and we will try to find a solution. If no agreement is reached, the dispute goes to the competent court at the company’s place of registration — except where the law gives a consumer the right to bring proceedings at their own place of residence.',
      ],
    },
  ],
  footerLinks: [
    { label: 'Pricing', href: '/#tarify' },
    { label: 'Modules', href: '/#moduli' },
    { label: 'Consulting', href: '/consulting' },
    { label: 'Partners', href: '/partners' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
  footerText: 'Contract questions: hello@habibi-erp.com',
}
