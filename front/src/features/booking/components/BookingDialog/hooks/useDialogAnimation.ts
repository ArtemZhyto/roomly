'use client'

// Modules
import { useCallback, useEffect, useRef, type RefObject } from 'react'

// Styles
import styles from '../BookingDialog.module.scss'

interface UseDialogAnimationOptions {
  isOpen: boolean
  onClose: () => void
}

interface UseDialogAnimationResult {
  overlayRef: RefObject<HTMLDivElement | null>
  closeDialog: () => void
}

const useDialogAnimation = ({
  isOpen,
  onClose,
}: UseDialogAnimationOptions): UseDialogAnimationResult => {
  const overlayRef = useRef<HTMLDivElement | null>(null)

  const isClosingRef = useRef(false)

  const closeDialog = useCallback((): void => {
    const overlay = overlayRef.current

    if (!overlay || isClosingRef.current) {
      return
    }

    isClosingRef.current = true

    overlay.classList.remove(styles.overlayOpen)
    overlay.classList.add(styles.overlayClosing)

    const handleAnimationEnd = (event: AnimationEvent): void => {
      if (event.target !== overlay) {
        return
      }

      overlay.removeEventListener('animationend', handleAnimationEnd)

      onClose()
    }

    overlay.addEventListener('animationend', handleAnimationEnd)
  }, [onClose])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const overlay = overlayRef.current

    if (!overlay) {
      return
    }

    isClosingRef.current = false

    const frameId = window.requestAnimationFrame(() => {
      overlay.classList.remove(styles.overlayClosing)
      overlay.classList.add(styles.overlayOpen)
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [isOpen])

  return {
    overlayRef,
    closeDialog,
  }
}

export default useDialogAnimation
