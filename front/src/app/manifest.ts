// Modules
import type { MetadataRoute } from 'next'

// Config
import { siteConfig } from '@config/metadata'

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: siteConfig.title.default,
    short_name: 'Roomly',
    description: siteConfig.description,

    start_url: '/',
    scope: '/',

    display: 'standalone',
    orientation: 'any',

    background_color: '#F7F9FC',
    theme_color: '#06B6D4',

    categories: ['business', 'productivity', 'utilities'],

    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-maskable-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],

    shortcuts: [
      {
        name: 'Schedule',
        short_name: 'Schedule',
        description: 'Open the meeting room schedule',
        url: '/schedule',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'New booking',
        short_name: 'Book room',
        description: 'Create a new room booking',
        url: '/schedule?booking=new',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'My bookings',
        short_name: 'Bookings',
        description: 'View your room bookings',
        url: '/bookings',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    ],
  }
}
