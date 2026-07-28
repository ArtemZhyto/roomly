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
    token?: string
    email?: string
  }>
}

const VerifyEmailPage = async ({ searchParams }: VerifyEmailPageProps) => {
  const { token, email } = await searchParams

  return <VerifyEmailContent token={token} email={email} />
}

export default VerifyEmailPage
