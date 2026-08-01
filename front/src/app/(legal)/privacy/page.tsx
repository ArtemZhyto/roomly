// Modules
import type { Metadata } from 'next'

// Components
import { LegalPage, privacySections } from '@features/legal'

export const metadata: Metadata = {
  title: 'Privacy Policy | Roomly',
  description: 'Learn how Roomly collects, uses, and protects personal information',
}

const PrivacyPage = () => {
  return (
    <LegalPage
      eyebrow='Legal'
      title='Privacy Policy'
      description='This policy explains what information Roomly collects and how it is used and protected.'
      updatedAt='August 2026'
      sections={privacySections}
    />
  )
}

export default PrivacyPage
