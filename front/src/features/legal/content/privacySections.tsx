// Types
import type { LegalSection } from '../types/legal.types'

const privacySections: LegalSection[] = [
  {
    id: 'information-we-collect',
    title: 'Information we collect',
    paragraphs: [
      'Roomly collects the information required to create and manage your account, provide room booking functionality, and keep the service secure.',
    ],
    items: [
      'Your name and email address.',
      'Account authentication information.',
      'Room bookings and meeting details you create.',
      'Technical information needed to operate and protect the service.',
    ],
  },
  {
    id: 'how-we-use-information',
    title: 'How we use your information',
    paragraphs: [
      'We use your information to provide the Roomly service, manage your account, process room bookings, and communicate important service-related updates.',
    ],
  },
  {
    id: 'data-sharing',
    title: 'Data sharing',
    paragraphs: [
      'We do not sell your personal information. Information may be shared only when required to provide the service, comply with legal obligations, or protect the security of Roomly and its users.',
    ],
  },
  {
    id: 'data-retention',
    title: 'Data retention',
    paragraphs: [
      'We keep account and booking information only for as long as it is reasonably needed to provide the service and meet legal or security requirements.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    paragraphs: [
      'You may request access to, correction of, or deletion of personal information associated with your Roomly account, subject to applicable legal requirements.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    paragraphs: ['Questions about this Privacy Policy may be sent to the Roomly support team.'],
  },
]

export default privacySections
