// Modules
import { MetadataRoute } from 'next'

// Config
import { siteConfig } from '@config/metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.metadataBase.origin,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
