// Styles
import './global.css'

// Fonts
import { Afacad, Prosto_One } from 'next/font/google'

// Features
import { NotificationsProvider } from '@features/notifications'

// Components
import ThemeProvider from '@providers/ThemeProvider'
import ThemeScript from '@components-shared/ThemeScript'
import AuthProvider from '@providers/AuthProvider'

// Types
import type { Metadata } from 'next'
import type { LayoutT } from '@shared-types/layout'

// Metadata
import { siteConfig } from '@config/metadata'

export const metadata: Metadata = siteConfig

const prosto = Prosto_One({
  subsets: ['latin', 'cyrillic', 'latin-ext'],
  weight: '400',
  display: 'swap',
  variable: '--font-prosto-one-source',
})

const afacad = Afacad({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-afacad-source',
})

const RootLayout = ({ children }: LayoutT) => {
  return (
    <html lang='uk' className={`${prosto.variable} ${afacad.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <NotificationsProvider>{children}</NotificationsProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
