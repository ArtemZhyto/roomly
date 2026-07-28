// Modules
import Image from 'next/image'
import Link from 'next/link'

// Components
import FadeUpMotion from '@components-shared/FadeUpMotion'

// Types
import { LayoutT } from '@shared-types/layouts'

const LegalLayout = ({ children }: LayoutT) => {
  return (
    <div className='min-h-dvh bg-background font-afacad text-text-primary flex flex-col justify-between'>
      <header className='sticky top-0 z-20 border-b border-border-primary bg-background/90 backdrop-blur-xl'>
        <div className='mx-auto flex min-h-18 w-full max-w-300 items-center justify-between gap-6 px-6 max-[640px]:px-4'>
          <Link
            href='/'
            className='inline-flex items-center gap-3 text-text-primary no-underline'
            aria-label='Roomly home'
          >
            <Image
              src='/icon.svg'
              alt=''
              width={38}
              height={38}
              priority
              className='size-9.5 shrink-0 object-contain select-none cursor-default'
            />

            <span className='font-prosto text-xl leading-none'>Roomly</span>
          </Link>

          <nav
            className='flex min-w-0 items-center gap-3 text-sm font-semibold'
            aria-label='Legal navigation'
          >
            <Link
              href='/terms'
              className='text-text-secondary no-underline transition-colors duration-150 hover:text-primary max-[520px]:hidden'
            >
              Terms
            </Link>

            <Link
              href='/privacy'
              className='text-text-secondary no-underline transition-colors duration-150 hover:text-primary max-[520px]:hidden'
            >
              Privacy
            </Link>

            <Link
              href='/login'
              className='inline-flex min-h-10 shrink-0 items-center justify-center rounded-control border border-border-primary bg-white px-4 text-text-primary no-underline transition-[border-color,background-color,color] duration-150 hover:border-primary hover:bg-primary-subtle hover:text-primary max-[380px]:min-h-9 max-[380px]:px-3 max-[380px]:text-xs'
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>

      <main className='mx-auto w-full max-w-300 px-6 py-16 max-[640px]:px-4 max-[640px]:py-10'>
        <FadeUpMotion y={18} duration={0.45} className='mx-auto w-full max-w-210'>
          {children}
        </FadeUpMotion>
      </main>

      <footer className='border-t border-border-primary'>
        <div className='mx-auto flex min-h-20 w-full max-w-300 items-center justify-between gap-5 px-6 text-sm text-text-muted max-[640px]:flex-col max-[640px]:justify-center max-[640px]:px-4 max-[640px]:py-5'>
          <span>© 2026 Roomly</span>

          <div className='flex items-center gap-5'>
            <Link href='/terms' className='text-text-muted no-underline hover:text-primary'>
              Terms
            </Link>

            <Link href='/privacy' className='text-text-muted no-underline hover:text-primary'>
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LegalLayout
