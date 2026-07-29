// Modules
import Image from 'next/image'
import Link from 'next/link'

// Types
import type { RoomlyLogoProps } from './roomlyLogo.types'

// Styles
import styles from './RoomlyLogo.module.scss'

const RoomlyLogo = ({
  href = '/rooms',
  compact = false,
  light = false,
  className = '',
}: RoomlyLogoProps) => {
  const content = (
    <>
      <Image
        src='/icon.svg'
        alt=''
        width={48}
        height={48}
        priority
        className={`${compact ? 'size-9' : 'size-12'} select-none cursor-default pointer-events-none`}
      />

      {!compact && <span className={`${styles.wordmark} text-xl font-bold`}>Roomly</span>}
    </>
  )

  const logoClassName = [
    styles.logo,
    light ? styles.light : '',
    className,
    'inline-flex w-fit items-center gap-3 no-underline',
  ]
    .filter(Boolean)
    .join(' ')

  if (!href) {
    return <div className={logoClassName}>{content}</div>
  }

  return (
    <Link href={href} className={logoClassName} aria-label='Roomly home'>
      {content}
    </Link>
  )
}

export default RoomlyLogo
