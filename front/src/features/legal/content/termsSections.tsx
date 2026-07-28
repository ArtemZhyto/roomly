// Types
import type { LegalSection } from '../types/legal.types'

const termsSections: LegalSection[] = [
  {
    id: 'acceptance',
    title: 'Acceptance of terms',
    paragraphs: [
      'By creating an account or using Roomly, you agree to follow these Terms of Service.',
    ],
  },
  {
    id: 'account-responsibility',
    title: 'Account responsibility',
    paragraphs: [
      'You are responsible for providing accurate account information and keeping access to your account secure.',
    ],
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable use',
    paragraphs: [
      'You must use Roomly responsibly and only for lawful room booking and meeting management purposes.',
    ],
    items: [
      'Do not attempt to access another user’s account.',
      'Do not interfere with the operation or security of the service.',
      'Do not submit harmful, misleading, or unlawful content.',
      'Do not use automated tools to overload or abuse the service.',
    ],
  },
  {
    id: 'bookings',
    title: 'Room bookings',
    paragraphs: [
      'Users are responsible for the room bookings they create. Bookings should contain accurate times, room selections, and meeting information.',
    ],
  },
  {
    id: 'service-availability',
    title: 'Service availability',
    paragraphs: [
      'We work to keep Roomly available and reliable, but uninterrupted access cannot be guaranteed at all times.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    paragraphs: [
      'These Terms may be updated when the service or applicable requirements change. The latest version will be available on this page.',
    ],
  },
]

export default termsSections
