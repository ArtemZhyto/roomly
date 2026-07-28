// Modules
import type { Metadata } from 'next'

// Components
import { LoginForm } from '@features/auth'

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your Roomly account and manage your room bookings',
}

const LoginPage = () => {
  return <LoginForm />
}

export default LoginPage
