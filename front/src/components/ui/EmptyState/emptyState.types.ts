// Types
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: ReactNode
  className?: string
}
