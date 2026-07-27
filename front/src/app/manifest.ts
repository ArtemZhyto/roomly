// Modules
import { MetadataRoute } from 'next'

// Config
import { siteConfig } from '@config/metadata'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title.default,
    short_name: 'Roomly',
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#171219',
    theme_color: '#171219',
    icons: [
      {
        src: '/icon-192.png',
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
    ],
    shortcuts: [
      {
        name: siteConfig.title.default,
        url: '/',
        icons: [
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
        ],
      },
    ],
  }
}
