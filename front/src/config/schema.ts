// Config
import { siteConfig } from './metadata'

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',

  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.metadataBase.origin,

  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Meeting Room Booking Software',

  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript and a modern web browser',

  isAccessibleForFree: true,

  inLanguage: ['en', 'uk'],

  logo: {
    '@type': 'ImageObject',
    url: new URL('/icon-512.png', siteConfig.metadataBase).toString(),
    width: 512,
    height: 512,
  },

  image: new URL('/icon-512.png', siteConfig.metadataBase).toString(),

  author: {
    '@type': 'Person',
    name: 'Artem Zhytovoz',
  },

  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    logo: {
      '@type': 'ImageObject',
      url: new URL('/icon-512.png', siteConfig.metadataBase).toString(),
      width: 512,
      height: 512,
    },
  },

  featureList: [
    'Meeting room availability calendar',
    'One-time room bookings',
    'Recurring room bookings',
    'Room capacity filtering',
    'Booking notifications',
    'Personal booking management',
  ],
} as const
