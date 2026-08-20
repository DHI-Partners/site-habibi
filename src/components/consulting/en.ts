import AiChatWidget from '../en/AiChatWidget'
import type { ConsultingContent } from './types'

/** Habibi Consulting page content — English version (/consulting/en). */
export const EN_CONSULTING: ConsultingContent = {
  lang: 'en',
  dir: 'ltr',
  home: '/',
  docTitle: 'Habibi Consulting — end-to-end implementation',
  Chat: AiChatWidget,
  ui: {
    backHome: 'Back to home',
    heroTag: 'Habibi Consulting',
    heroTitle: 'Not every business fits in a box',
    heroLead:
      'Habibi is a ready-made system that covers most business needs out of the box. But if you have non-standard processes, several business lines, your own internal rules, or a team that needs to be walked through the rollout by hand — that is no longer a question of a pricing plan, but of individual work.',
    heroAccent: 'That is exactly why we have a separate offering — Habibi Consulting.',
    heroCta: 'Request a consultation',
    differenceTag: 'How it differs from regular Habibi',
    differenceTitle: 'Two different ways to work',
    audienceTag: 'Who it’s for',
    audienceTitle: 'When you need individual work',
    includedTag: 'What’s included',
    includedTitle: 'From business review to ongoing support',
    stepsTag: 'How it works',
    stepsTitle: 'Five steps to a working system',
    tariffTag: 'Plan',
    tariffName: 'Exclusive',
    tariffNote: 'quoted after reviewing your case',
    tariffText:
      'Individual work is delivered under the Exclusive plan — the cost and scope depend on the size of your business and the complexity of your processes, and are defined after we review your situation.',
    teamTag: 'Who does this',
    teamTitle: 'The people behind it',
    formTag: 'Request',
    formTitle: 'Tell us about your business',
    formLead: 'To propose a solution, we first need to know a little about you.',
    footerText:
      'Habibi Consulting — business review, custom system setup, end-to-end implementation and team training.',
    footerReply: 'We reply within 1 business day',
  },
  team: [
    {
      name: 'Ilgiz Yusupov',
      role: 'Founder of Habibi',
      initials: 'IY',
      photo: '/team/ilgiz.jpg',
      bio: [
        '15 years in business, around 10 of them in business consulting on large projects — including Shakird.com, an educational portal for learning Arabic and the Quran.',
        'Founded his first IT company and has over 10 years of experience automating businesses across industries — from IT to real estate, plus a separate decade of background in real estate itself.',
        'Has worked in the markets of Russia, Turkey, Europe and Saudi Arabia — hands-on international business experience.',
      ],
      facts: ['15 years in business', '10 years in consulting', 'Russia · Turkey · Europe · Saudi Arabia'],
    },
    {
      name: 'Timur Ashiriatov',
      role: 'Chief Technology Officer',
      initials: 'TA',
      photo: '/team/timur.jpg',
      bio: [
        'IT architect with 19+ years of experience in Oracle, Databases and Big Data, as well as cloud technologies, AI and enterprise infrastructure. Designs complex IT systems, migrates business-critical workloads and leads cloud transformation.',
        'Enjoys digging into complex technical problems, finding practical solutions and connecting deep technical expertise with what the business actually needs.',
      ],
      facts: [
        '19+ years in IT',
        'Oracle · Cloud',
        'Database · Big Data',
        'Enterprise Infrastructure',
      ],
    },
  ],
  difference: [
    {
      title: 'Regular Habibi',
      text: 'You sign up, set up the modules you need yourself and get to work. Fast, self-service, on fixed plans.',
      tone: 'plain',
    },
    {
      title: 'Consulting',
      text: 'A different format. We come to you, study how your business actually works, and build the solution around it: which modules you need, how to connect them, which processes are worth changing before automation rather than after, and how to train the team so the system really works instead of becoming an unused subscription.',
      tone: 'emerald',
    },
  ],
  audience: [
    {
      icon: '🏢',
      text: 'Companies with several business lines or branches, where each one runs its own processes.',
    },
    {
      icon: '🔁',
      text: 'Those who have already tried automation, but it “didn’t stick” — the team went back to Excel and WhatsApp.',
    },
    {
      icon: '🧩',
      text: 'Businesses with non-standard processes that standard modules don’t describe.',
    },
    {
      icon: '👥',
      text: 'Companies where several people make the decision, and someone needs to gather the requirements so the debate isn’t held blindly.',
    },
    {
      icon: '🎯',
      text: 'Those who want more than access to a system — an end-to-end rollout and a trained team at the finish line.',
    },
  ],
  included: [
    {
      title: 'Business review',
      text: 'We study how everything works today: sales, inventory, finance, the team, the bottlenecks. Not a tick-box questionnaire — a real conversation about where time and money leak.',
    },
    {
      title: 'A tailored solution',
      text: 'We assemble a Habibi configuration around your processes: which modules to switch on, what to set up in a non-standard way, which integrations with other services you’ll need.',
    },
    {
      title: 'Implementation',
      text: 'We configure the system, migrate your data and build the processes inside Habibi so they match how your team actually works.',
    },
    {
      title: 'Team training',
      text: 'We walk the team through the system in person — from staff to managers. We show not just “where to click”, but why it matters, so nobody slips back into old habits a month later.',
    },
    {
      title: 'Ongoing support',
      text: 'After launch we stay in touch: fine-tuning, answers to questions, help as the business grows and processes change.',
    },
  ],
  steps: [
    'You send a request and tell us briefly about your business.',
    'We get on a call and go through your goals and current processes.',
    'We prepare a proposal: what we set up, timeline, cost.',
    'We implement the system and train the team.',
    'We support you after launch.',
  ],
  footerLinks: [
    { label: 'Features', href: '/#vozmozhnosti' },
    { label: 'Modules', href: '/#moduli' },
    { label: 'Pricing', href: '/#tarify' },
    { label: 'Partners', href: '/partners' },
    { label: 'Investors', href: '/investors' },
  ],
  form: {
    name: 'Your name',
    namePlaceholder: 'How should we address you',
    contact: 'Phone or WhatsApp',
    contactPlaceholder: '+1 000 000 0000',
    email: 'Email',
    emailPlaceholder: 'you@company.com',
    submit: 'Send request',
    sending: 'Sending…',
    underButton: 'We’ll get in touch within 1 business day.',
    consent: {
      before: 'By sending this request you agree to the processing of your data under the ',
      privacy: 'Privacy Policy',
      middle: ' and accept the ',
      terms: 'Terms of Service',
      after: '.',
    },
    privacyHref: '/privacy',
    termsHref: '/terms',
    successTitle: 'Request sent',
    successText: 'We’ll get in touch within 1 business day to discuss your goals.',
    error: 'Could not send the request. Please try again or message us on WhatsApp.',
    subject: 'Habibi Consulting request',
    fields: [
      { name: 'company', label: 'Company name and industry', type: 'text', required: true },
      { name: 'staff', label: 'Number of employees', type: 'text', required: true },
      {
        name: 'processes',
        label: 'Which processes you want to automate',
        hint: 'Sales, inventory, finance, HR, projects — several is fine',
        type: 'text',
        required: true,
      },
      {
        name: 'current',
        label: 'What you use today',
        hint: 'Another system, Excel, WhatsApp, paper',
        type: 'text',
        required: true,
      },
      {
        name: 'branches',
        label: 'Do you have several branches or business lines',
        type: 'text',
        required: false,
      },
      {
        name: 'problem',
        label: 'Your main problem right now',
        hint: 'What made you think about automation',
        type: 'textarea',
        required: true,
      },
      { name: 'timeline', label: 'When you plan to implement (timeline)', type: 'text', required: false },
      {
        name: 'comment',
        label: 'Comment',
        hint: 'Tell us in your own words what you need',
        type: 'textarea',
        required: false,
      },
    ],
  },
}
