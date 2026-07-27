// Styles
import './global.css'
import './variables.scss'

// Font
import { Prosto_One, Afacad } from 'next/font/google'

// Types
import type { Metadata } from 'next'
import { LayoutT } from '@shared-types/layouts'

// Metadata
import { siteConfig } from '@config/metadata'

export const metadata: Metadata = siteConfig

const prosto = Prosto_One({
  subsets: ['latin', 'cyrillic', 'latin-ext'],
  weight: '400',
  display: 'swap',
  variable: '--font-prosto',
})

const afacad = Afacad({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  display: 'swap',
  variable: '--font-afacad',
})

const RootLayout = async ({ children }: LayoutT) => {
  return (
    <html lang='uk-UA'>
      <body
        className={`${prosto.className} ${afacad.className} ${prosto.variable} ${afacad.variable}`}
      >
        {children}
      </body>
    </html>
  )
}

export default RootLayout
