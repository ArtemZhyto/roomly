// Types
import type { AuthUser } from '@features/auth'

export interface SidebarUserCardProps {
  user: AuthUser
}

export interface SidebarUserCardUser {
  name: string
  email: string
}
