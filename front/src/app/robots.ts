// Modules
import { MetadataRoute } from 'next'

// Config
import { siteConfig } from '@config/metadata'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/_next/'],
    },
    sitemap: `${siteConfig.metadataBase.origin}/sitemap.xml`,
  }
}
