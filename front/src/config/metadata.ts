const baseUrl =
  process.env.MODE === 'prod' ? `https://${process.env.NEXT_PUBLIC_SITE}` : 'http://localhost:3000'

const title = 'Roomly'
const description =
  'A full-stack meeting room booking platform with an intuitive calendar interface'

export const siteConfig = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description: description,
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: title,
    description: description,
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: `${title} logo`,
      },
    ],
    url: new URL(baseUrl),
    siteName: title,
    locale: 'uk-UA',
    type: 'website',
  },
  twitter: {
    title: title,
    description: description,
    card: 'summary_large_image',
    images: ['/icon-512.png'],
    site: title,
    creator: 'Artem Zhytovoz',
  },
  robots: {
    index: true,
    follow: true,
  },
}
