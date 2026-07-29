// Types
import type { SidebarUserCardUser } from '../SidebarUserCard'

export interface AppSidebarProps {
  user: SidebarUserCardUser
  isLogoutLoading?: boolean
  onLogout?: () => void
}
