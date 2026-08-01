'use client'

// Modules
import { useRef } from 'react'

// UI hooks
import { useDialogBodyScrollLock, useDialogFocusTrap } from '@components-ui/Dialog'

// Local hooks
import useDialogAnimation from './hooks/useDialogAnimation'

interface UseBookingDialogOptions {
  isOpen: boolean
  onClose: () => void
}

const useBookingDialog = ({ isOpen, onClose }: UseBookingDialogOptions) => {
  const dialogRef = useRef<HTMLElement | null>(null)

  const { overlayRef, closeDialog } = useDialogAnimation({
    isOpen,
    onClose,
  })

  useDialogBodyScrollLock(isOpen)

  useDialogFocusTrap({
    isOpen,
    dialogRef,
    onClose: closeDialog,
    initialFocus: 'dialog',
    preventScrollKeys: true,
  })

  return {
    dialogRef,
    overlayRef,
    closeDialog,
  }
}

export default useBookingDialog
