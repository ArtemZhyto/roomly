export interface SidebarUserCardUser {
  name: string
  email: string
}

export interface SidebarUserCardProps {
  user: SidebarUserCardUser
  isLogoutLoading?: boolean
  onLogout: () => void
}
