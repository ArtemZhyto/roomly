// Modules
import { Bell, CalendarDays, CalendarRange, DoorOpen, LayoutDashboard } from 'lucide-react'

// Types
import type { LucideIcon } from 'lucide-react'

export interface SidebarNavigationItem {
  href: string
  label: string
  icon: LucideIcon
  badge?: number
}

const navigationItems: SidebarNavigationItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/schedule',
    label: 'Schedule',
    icon: CalendarRange,
  },
  {
    href: '/rooms',
    label: 'Rooms',
    icon: DoorOpen,
  },
  {
    href: '/my-bookings',
    label: 'My bookings',
    icon: CalendarDays,
  },
  {
    href: '/notifications',
    label: 'Notifications',
    icon: Bell,
    // badge: 3,
  },
]

export default navigationItems
