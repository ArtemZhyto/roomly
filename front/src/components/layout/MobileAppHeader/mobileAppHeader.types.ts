// Types
import type { SidebarUserCardUser } from '../SidebarUserCard'

export interface MobileAppHeaderProps {
  user: SidebarUserCardUser
  isLogoutLoading?: boolean
  onLogout?: () => void
}
