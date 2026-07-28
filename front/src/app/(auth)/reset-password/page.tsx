// Modules
import type { Metadata } from 'next'

// Components
import { ResetPasswordForm } from '@features/auth'

export const metadata: Metadata = {
  title: 'Reset password | Roomly',
  description: 'Choose a new password for your Roomly account',
}

interface ResetPasswordPageProps {
  searchParams: Promise<{
    token?: string
  }>
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  const { token } = await searchParams

  return <ResetPasswordForm token={token} />
}

export default ResetPasswordPage
