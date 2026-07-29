// Modules
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

// Styles
import styles from './AuthSubmitButton.module.scss'

interface AuthActionLinkProps {
  href: string
  label: string
  icon?: LucideIcon
}

const AuthActionLink = ({ href, label, icon: Icon }: AuthActionLinkProps) => {
  return (
    <Link
      href={href}
      className={`${styles.button} inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-[10px] border px-5 text-base font-semibold no-underline`}
    >
      {Icon && <Icon size={17} aria-hidden='true' />}

      <span className='select-none'>{label}</span>
    </Link>
  )
}

export default AuthActionLink
