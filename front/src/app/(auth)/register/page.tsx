// Modules
import type { Metadata } from 'next'

// Components
import { AuthBrandPanel, RegisterForm } from '@components/auth'
import FadeUpMotion from '@components-shared/FadeUpMotion'

export const metadata: Metadata = {
  title: 'Create account',
  description: 'Create a Roomly account to manage rooms and bookings',
  robots: {
    index: false,
    follow: false,
  },
}

const RegisterPage = () => {
  return (
    <div className='grid min-h-dvh grid-cols-[minmax(460px,44%)_minmax(0,1fr)] bg-background max-[1000px]:grid-cols-[minmax(360px,40%)_minmax(0,1fr)] max-[900px]:grid-cols-1'>
      <AuthBrandPanel />

      <section className='grid min-h-dvh min-w-0 grid-rows-[1fr_auto_1fr] px-8 py-6 max-[900px]:min-h-auto max-[900px]:grid-rows-[auto] max-[900px]:place-items-center max-[900px]:px-5 max-[900px]:py-12'>
        <div aria-hidden='true' />

        <FadeUpMotion y={22} duration={0.5} className='flex w-full justify-center'>
          <RegisterForm />
        </FadeUpMotion>

        <FadeUpMotion
          y={8}
          delay={0.15}
          duration={0.4}
          className='self-end text-center text-sm text-[#94a3b8] max-[900px]:mt-10'
        >
          <footer>© 2026 Roomly</footer>
        </FadeUpMotion>
      </section>
    </div>
  )
}

export default RegisterPage
