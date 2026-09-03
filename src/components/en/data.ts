import type { TeamMember } from '../consulting/types'

/**
 * The Habibi team — "About us" page (/about).
 * Ilgiz and Timur reuse the exact copy from the Habibi Consulting page
 * (src/components/consulting/en.ts) so the bio never drifts between pages.
 * Add new members here as their details come in; use `placeholder: true`
 * for a reserved spot.
 */
export const EN_TEAM: TeamMember[] = [
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
      'IT architect with 19+ years of experience in Oracle, Databases and Big Data, as well as cloud technologies and enterprise infrastructure. Designs and grows complex IT systems, leads cloud transformation and migrates business-critical workloads.',
      'Connects deep technical expertise with what the business actually needs — from untangling hard technical problems to practical solutions.',
    ],
    facts: ['19+ years in IT', 'Oracle · Cloud', 'Database · Big Data', 'Enterprise Infrastructure'],
  },
  {
    name: 'Egor Kirsanov',
    role: 'Senior Fullstack/Mobile Developer',
    initials: 'EK',
    photo: '/team/egor.jpg',
    bio: [
      'Designs architecture and product logic from scratch, and builds mobile and web platforms end-to-end. 9+ years in development.',
      'Logistics / Cargo.tech (Marshal.tech) — the last 2 years: built a "digital freight forwarder" platform, full cycle — backend, frontend and mobile app.',
      'EdTech (arabic.best) — 4 years: built an educational cross-platform ecosystem from scratch (Web, iOS, Android, in-house CMS, AI integrations).',
      'E-commerce / Marketplaces (HorsSmart): built the mobile app and web dashboards (React Native, Expo).',
      'Other projects: a project for the Accounts Chamber of Russia, premium-segment promo websites.',
    ],
    facts: ['9+ years in development', 'Fullstack · Mobile', 'React Native · Web · AI integrations'],
  },
  // Placeholder card — more team members will be added here as their data arrives.
  { placeholder: true, name: 'Coming soon', role: 'A spot for the next team member' },
]
