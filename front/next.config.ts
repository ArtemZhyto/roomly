// Interfaces
import type { NextConfig } from 'next'

const publicApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
const publicSocketUrl = publicApiUrl.replace(/^http/, 'ws')

const nextConfig: NextConfig = {
  output: 'standalone',

  experimental: {
    optimizeCss: true,
    externalDir: true,
  },

  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: [
            `default-src 'self'`,
            `frame-src 'self' https://www.google.com`,
            `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com`,
            `style-src 'self' 'unsafe-inline'`,
            `font-src 'self' data:`,
            `img-src 'self' data: blob:`,
            `connect-src 'self' ${publicApiUrl} ${publicSocketUrl}`,
          ].join('; '),
        },
      ],
    },
  ],
}

export default nextConfig
