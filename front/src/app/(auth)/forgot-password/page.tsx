// Modules
import type { Metadata } from 'next'

// Components
import { ForgotPasswordForm } from '@features/auth'

export const metadata: Metadata = {
  title: 'Forgot password | Roomly',
  description: 'Request a password reset link for your Roomly account',
}

const ForgotPasswordPage = () => {
  return <ForgotPasswordForm />
}

export default ForgotPasswordPage
