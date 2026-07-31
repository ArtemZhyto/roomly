'use client'

// Modules
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Features
import { useNotifications } from '@features/notifications'

// Data
import navigationItems from './navigationItems'

// Styles
import styles from './SidebarNavigation.module.scss'

interface SidebarNavigationProps {
  onNavigate?: () => void
}

const SidebarNavigation = ({ onNavigate }: SidebarNavigationProps) => {
  const pathname = usePathname()

  const { unreadCount } = useNotifications()

  const isActiveRoute = (href: string): boolean => {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <nav aria-label='Workspace navigation'>
      <ul className='m-0 flex list-none flex-col gap-1 p-0'>
        {navigationItems.map((item) => {
          const isActive = isActiveRoute(item.href)

          const Icon = item.icon

          const badge = item.href === '/notifications' ? unreadCount : item.badge

          const linkClassName = [
            styles.link,
            isActive ? styles.active : '',
            'flex min-h-12 items-center gap-3 rounded-control px-4 text-sm font-semibold no-underline',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={linkClassName}
                aria-current={isActive ? 'page' : undefined}
                onClick={onNavigate}
              >
                <Icon
                  className={`${styles.icon} size-5 shrink-0`}
                  strokeWidth={1.9}
                  aria-hidden='true'
                />

                <span className='min-w-0 flex-1 truncate'>{item.label}</span>

                {badge !== undefined && badge > 0 && (
                  <span
                    className={`${styles.badge} grid min-w-5 place-items-center rounded-full px-1.5 py-0.5 text-xs font-bold`}
                    aria-label={`${badge} unread notifications`}
                  >
                    {badge > 99 ? '99+' : badge}
                  </span>
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default SidebarNavigation
