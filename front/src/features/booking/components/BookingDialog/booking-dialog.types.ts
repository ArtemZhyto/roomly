// Types
import type { ReactNode } from 'react'

export interface BookingDialogProps {
  isOpen: boolean
  title?: string
  description?: string
  children: ReactNode
  onClose: () => void
}

export interface WithCloseModalProp {
  closeModal?: () => void
}
