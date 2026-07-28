const title = 'Roomly'
const description = 'A modern meeting room booking platform with an intuitive calendar interface'
const author = {
  name: 'Artem Zhytovoz',
}

const getBaseUrl = (): string => {
  if (process.env.MODE !== 'prod') {
    return 'http://localhost:3030'
  }

  const siteDomain = process.env.NEXT_PUBLIC_SITE

  if (!siteDomain) {
    throw new Error('NEXT_PUBLIC_SITE is not configured')
  }

  return `https://${siteDomain}`
}

const baseUrl = getBaseUrl()

export const siteConfig = {
  name: title,

  title: {
    default: title,
    template: `%s | ${title}`,
  },

  description,

  metadataBase: new URL(baseUrl),

  authors: [author],
  creator: author.name,
  publisher: title,

  applicationName: title,

  openGraph: {
    title,
    description,
    url: baseUrl,
    siteName: title,

    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: `${title} logo`,
      },
    ],

    locale: 'uk_UA',
    type: 'website',
  },

  twitter: {
    title,
    description,
    card: 'summary_large_image',
    images: ['/icon-512.png'],

    /*
     * Add these only when Roomly has real X/Twitter accounts:
     *
     * site: '@roomly',
     * creator: '@artemzhytovoz',
     */
  },

  robots: {
    index: false,
    follow: false,
    nocache: true,

    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      nosnippet: true,
    },
  },
}
