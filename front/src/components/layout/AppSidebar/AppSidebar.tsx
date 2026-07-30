'use client'

// Components
import RoomlyLogo from '@components-shared/RoomlyLogo'
import SidebarNavigation from '../SidebarNavigation'
import SidebarUserCard from '../SidebarUserCard'

// Types
import type { AppSidebarProps } from './appSidebar.types'

// Styles
import styles from './AppSidebar.module.scss'

const AppSidebar = ({ user, isLogoutLoading = false, onLogout }: AppSidebarProps) => {
  const handleLogout = () => {
    onLogout?.()
  }

  return (
    <aside className={`${styles.sidebar} shrink-0`} aria-label='Application sidebar'>
      <div className='flex h-full flex-col'>
        <div className='px-6 py-6'>
          <RoomlyLogo />
        </div>

        <div className={`${styles.navigation} flex-1 px-4 py-2`}>
          <SidebarNavigation />
        </div>

        <div className={`${styles.footer} p-4`}>
          <SidebarUserCard user={user} />
        </div>
      </div>
    </aside>
  )
}

export default AppSidebar
