// Modules
import type { Metadata } from 'next'

// Components
import { RegisterForm } from '@features/auth'

export const metadata: Metadata = {
  title: 'Create account | Roomly',
  description: 'Create your Roomly account and start booking meeting rooms',
}

const RegisterPage = () => {
  return <RegisterForm />
}

export default RegisterPage
