'use client'

// Modules
import { useEffect, useRef, type RefObject } from 'react'

// Constants
import { DIALOG_PREVENTED_SCROLL_KEYS } from '../dialog.constants'

// Utils
import {
  focusDialog,
  focusFirstDialogElement,
  getDialogFocusableElements,
  isDialogTextControl,
} from '../dialog-focus.utils'

type DialogInitialFocus = 'dialog' | 'first'

interface UseDialogFocusTrapOptions {
  isOpen: boolean
  isReady?: boolean
  dialogRef: RefObject<HTMLElement | null>
  onClose: () => void
  initialFocus?: DialogInitialFocus
  preventScrollKeys?: boolean
}

const useDialogFocusTrap = ({
  isOpen,
  isReady = isOpen,
  dialogRef,
  onClose,
  initialFocus = 'dialog',
  preventScrollKeys = false,
}: UseDialogFocusTrapOptions): void => {
  const firstTabOnDialogRef = useRef(true)

  useEffect(() => {
    if (!isOpen || !isReady) {
      return
    }

    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    firstTabOnDialogRef.current = true

    const frameId = window.requestAnimationFrame(() => {
      if (initialFocus === 'first') {
        focusFirstDialogElement(dialog)

        firstTabOnDialogRef.current = false

        return
      }

      focusDialog(dialog)
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [dialogRef, initialFocus, isOpen, isReady])

  useEffect(() => {
    if (!isOpen || !isReady) {
      return
    }

    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    const handleTabKey = (event: KeyboardEvent): void => {
      const focusableElements = getDialogFocusableElements(dialog)

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
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

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()

        return
      }

      if (event.key === 'Tab') {
        handleTabKey(event)

        return
      }

      if (
        preventScrollKeys &&
        DIALOG_PREVENTED_SCROLL_KEYS.includes(event.key) &&
        !isDialogTextControl(document.activeElement)
      ) {
        event.preventDefault()
      }
    }

    const handleFocusIn = (event: FocusEvent): void => {
      const target = event.target

      if (!(target instanceof Node) || dialog.contains(target)) {
        return
      }

      const focusableElements = getDialogFocusableElements(dialog)

      const lastElement = focusableElements[focusableElements.length - 1]

      ;(lastElement ?? dialog).focus()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', handleFocusIn)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', handleFocusIn)
    }
  }, [dialogRef, isOpen, isReady, onClose, preventScrollKeys])
}

export default useDialogFocusTrap
