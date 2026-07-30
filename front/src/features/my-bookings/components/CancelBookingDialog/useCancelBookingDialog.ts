'use client'

// Modules
import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'

// Constants
import { CANCEL_DIALOG_TRANSITION_MS } from './cancel-booking-dialog.constants'

interface UseCancelBookingDialogOptions {
  isOpen: boolean
  isLoading: boolean
  onClose: () => void
  onExited: () => void
}

interface UseCancelBookingDialogResult {
  dialogRef: RefObject<HTMLElement | null>
  isVisible: boolean
  requestClose: () => void
}

const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const selector = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',')

  return Array.from(container.querySelectorAll<HTMLElement>(selector))
}

const useCancelBookingDialog = ({
  isOpen,
  isLoading,
  onClose,
  onExited,
}: UseCancelBookingDialogOptions): UseCancelBookingDialogResult => {
  const dialogRef = useRef<HTMLElement | null>(null)
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null)
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [isVisible, setIsVisible] = useState(false)

  const requestClose = useCallback(() => {
    if (isLoading) {
      return
    }

    onClose()
  }, [isLoading, onClose])

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElementRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null

      const animationFrame = requestAnimationFrame(() => {
        setIsVisible(true)

        requestAnimationFrame(() => {
          const focusableElements = dialogRef.current ? getFocusableElements(dialogRef.current) : []

          focusableElements[0]?.focus()
        })
      })

      return () => {
        cancelAnimationFrame(animationFrame)
      }
    }

    setIsVisible(false)

    exitTimeoutRef.current = setTimeout(() => {
      onExited()

      previouslyFocusedElementRef.current?.focus()
      previouslyFocusedElementRef.current = null
      exitTimeoutRef.current = null
    }, CANCEL_DIALOG_TRANSITION_MS)

    return () => {
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current)
        exitTimeoutRef.current = null
      }
    }
  }, [isOpen, onExited])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        requestClose()

        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return
      }

      const focusableElements = getFocusableElements(dialogRef.current)

      if (focusableElements.length === 0) {
        event.preventDefault()

        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [requestClose])

  return {
    dialogRef,
    isVisible,
    requestClose,
  }
}

export default useCancelBookingDialog
