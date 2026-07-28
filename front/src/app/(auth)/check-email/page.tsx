// Modules
import type { Metadata } from 'next'

// Components
import { CheckEmailContent } from '@features/auth'

export const metadata: Metadata = {
  title: 'Check your email | Roomly',
  description: 'Check your inbox for Roomly password reset instructions',
}

interface CheckEmailPageProps {
  searchParams: Promise<{
    email?: string
  }>
}

const CheckEmailPage = async ({ searchParams }: CheckEmailPageProps) => {
  const { email } = await searchParams

  return <CheckEmailContent email={email} />
}

export default CheckEmailPage
