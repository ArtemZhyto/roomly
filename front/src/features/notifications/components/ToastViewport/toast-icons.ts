// Modules
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react'

// Types
import type { LucideIcon } from 'lucide-react'
import type { NotificationType } from '../../types/notification.types'

export const toastIcons: Record<NotificationType, LucideIcon> = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}
