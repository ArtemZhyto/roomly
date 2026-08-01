// Modules
import type { Metadata } from 'next'

// Components
import { LegalPage, termsSections } from '@features/legal'

export const metadata: Metadata = {
  title: 'Terms of Service | Roomly',
  description: 'Read the terms that apply when using Roomly',
}

const TermsPage = () => {
  return (
    <LegalPage
      eyebrow='Legal'
      title='Terms of Service'
      description='These terms describe the rules and responsibilities that apply when using Roomly.'
      updatedAt='August 2026'
      sections={termsSections}
    />
  )
}

export default TermsPage
