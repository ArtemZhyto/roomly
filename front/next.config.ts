// Interfaces
import type { NextConfig } from 'next'

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
          value: `frame-src 'self' https://www.google.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com; connect-src 'self' ${process.env.API_URL || 'http://localhost:5000'};`,
        },
      ],
    },
  ],
}

export default nextConfig
