'use client'

// Modules
import { useCallback, useRef } from 'react'

// UI hooks
import { useDialogBodyScrollLock, useDialogFocusTrap } from '@components-ui/Dialog'

// Local hooks
import useCancelDialogPresence from './hooks/useCancelDialogPresence'

interface UseCancelBookingDialogOptions {
  isOpen: boolean
  isLoading: boolean
  onClose: () => void
  onExited: () => void
}

const useCancelBookingDialog = ({
  isOpen,
  isLoading,
  onClose,
  onExited,
}: UseCancelBookingDialogOptions) => {
  const dialogRef = useRef<HTMLElement | null>(null)

  const requestClose = useCallback((): void => {
    if (isLoading) {
      return
    }

    onClose()
  }, [isLoading, onClose])

  const { isVisible } = useCancelDialogPresence({
    isOpen,
    onExited,
  })

  useDialogBodyScrollLock(true)

  useDialogFocusTrap({
    isOpen,
    isReady: isVisible,
    dialogRef,
    onClose: requestClose,
    initialFocus: 'first',
  })

  return {
    dialogRef,
    isVisible,
    requestClose,
  }
}

export default useCancelBookingDialog
