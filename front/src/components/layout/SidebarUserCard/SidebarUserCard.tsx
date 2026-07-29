// Components
import UserAvatar from '@components-shared/UserAvatar'
import ProfileMenu from '../ProfileMenu'

// Types
import type { SidebarUserCardProps } from './sidebarUserCard.types'

// Styles
import styles from './SidebarUserCard.module.scss'

const SidebarUserCard = ({ user, isLogoutLoading = false, onLogout }: SidebarUserCardProps) => {
  return (
    <div className={styles.card}>
      <UserAvatar name={user.name} className={styles.avatar} />

      <div className={styles.content}>
        <p className={styles.name}>{user.name}</p>

        <p className={styles.email}>{user.email}</p>
      </div>

      <ProfileMenu isLogoutLoading={isLogoutLoading} onLogout={onLogout} />
    </div>
  )
}

export default SidebarUserCard
