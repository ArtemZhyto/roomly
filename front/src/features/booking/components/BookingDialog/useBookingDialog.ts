'use client'

// Modules
import { useCallback, useEffect, useRef } from 'react'

// Constants
import { FOCUSABLE_SELECTOR, PREVENTED_SCROLL_KEYS } from './booking-dialog.constants'

// Styles
import styles from './BookingDialog.module.scss'

interface UseBookingDialogOptions {
  isOpen: boolean
  onClose: () => void
}

const useBookingDialog = ({ isOpen, onClose }: UseBookingDialogOptions) => {
  const dialogRef = useRef<HTMLElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)

  const initialScrollYRef = useRef(0)
  const isClosingRef = useRef(false)
  const firstTabOnDialogRef = useRef(true)

  const closeModal = useCallback(() => {
    const overlay = overlayRef.current

    if (!overlay || isClosingRef.current) {
      return
    }

    isClosingRef.current = true

    overlay.classList.remove(styles.overlayOpen)
    overlay.classList.add(styles.overlayClosing)

    const handleAnimationEnd = (event: AnimationEvent) => {
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
    const dialog = dialogRef.current

    if (!overlay || !dialog) {
      return
    }

    isClosingRef.current = false
    firstTabOnDialogRef.current = true

    initialScrollYRef.current = window.scrollY

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    const previousBodyStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      paddingRight: document.body.style.paddingRight,
    }

    document.body.style.position = 'fixed'
    document.body.style.top = `-${initialScrollYRef.current}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'

    if (scrollbarWidth > 0) {
      const currentPaddingRight =
        Number.parseFloat(window.getComputedStyle(document.body).paddingRight) || 0

      document.body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`
    }

    const frameId = window.requestAnimationFrame(() => {
      overlay.classList.remove(styles.overlayClosing)
      overlay.classList.add(styles.overlayOpen)
      dialog.focus()
    })

    const preventBodyScroll = (event: TouchEvent) => {
      event.preventDefault()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const focusableElements = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.key === 'Escape') {
        event.preventDefault()
        closeModal()

        return
      }

      if (event.key === 'Tab') {
        const activeElement = document.activeElement

        if (firstTabOnDialogRef.current && activeElement === dialog && !event.shiftKey) {
          event.preventDefault()

          ;(firstElement ?? dialog).focus()

          firstTabOnDialogRef.current = false

          return
        }

        if (event.shiftKey && (activeElement === firstElement || activeElement === dialog)) {
          event.preventDefault()

          ;(lastElement ?? dialog).focus()

          return
        }

        if (!event.shiftKey && activeElement === lastElement) {
          event.preventDefault()

          ;(firstElement ?? dialog).focus()
        }
      }

      if (PREVENTED_SCROLL_KEYS.includes(event.key)) {
        const activeElement = document.activeElement

        const isTextControl =
          activeElement instanceof HTMLElement &&
          (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement.tagName) ||
            activeElement.isContentEditable)

        if (!isTextControl) {
          event.preventDefault()
        }
      }
    }

    const handleFocusIn = (event: FocusEvent) => {
      if (!(event.target instanceof Node) || dialog.contains(event.target)) {
        return
      }

      event.preventDefault()

      const focusableElements = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      const lastElement = focusableElements[focusableElements.length - 1]

      ;(lastElement ?? dialog).focus()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', handleFocusIn)
    document.addEventListener('touchmove', preventBodyScroll, {
      passive: false,
    })

    return () => {
      window.cancelAnimationFrame(frameId)

      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('touchmove', preventBodyScroll)

      document.body.style.position = previousBodyStyles.position
      document.body.style.top = previousBodyStyles.top
      document.body.style.left = previousBodyStyles.left
      document.body.style.right = previousBodyStyles.right
      document.body.style.width = previousBodyStyles.width
      document.body.style.paddingRight = previousBodyStyles.paddingRight

      window.scrollTo({
        top: initialScrollYRef.current,
        left: 0,
        behavior: 'instant',
      })
    }
  }, [closeModal, isOpen])

  return {
    dialogRef,
    overlayRef,
    closeModal,
  }
}

export default useBookingDialog
