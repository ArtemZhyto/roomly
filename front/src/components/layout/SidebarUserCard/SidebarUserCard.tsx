// Components
import UserAvatar from '@components-shared/UserAvatar'
import { ConnectedProfileMenu } from '@features/auth'

// Types
import type { SidebarUserCardProps } from './sidebarUserCard.types'

// Styles
import styles from './SidebarUserCard.module.scss'

const SidebarUserCard = ({ user }: SidebarUserCardProps) => {
  return (
    <div className={styles.card}>
      <UserAvatar name={user.name} className={styles.avatar} />

      <div className={styles.content}>
        <p className={styles.name}>{user.name}</p>

        <p className={styles.email}>{user.email}</p>
      </div>

      <ConnectedProfileMenu />
    </div>
  )
}

export default SidebarUserCard
