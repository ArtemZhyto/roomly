// Modules
import type { Metadata } from 'next'

// Components
import { VerifyEmailContent } from '@features/auth'

export const metadata: Metadata = {
  title: 'Verify email | Roomly',
  description: 'Verify the email address connected to your Roomly account',
}

interface VerifyEmailPageProps {
  searchParams: Promise<{
    email?: string
  }>
}

const VerifyEmailPage = async ({ searchParams }: VerifyEmailPageProps) => {
  const { email } = await searchParams

  return <VerifyEmailContent email={email} />
}

export default VerifyEmailPage
