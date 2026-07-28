// Modules
import type { MetadataRoute } from 'next'

// Config
import { siteConfig } from '@config/metadata'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },

    host: siteConfig.metadataBase.origin,
  }
}
