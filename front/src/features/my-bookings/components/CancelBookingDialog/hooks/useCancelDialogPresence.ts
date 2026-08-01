'use client'

// Modules
import { useEffect, useRef, useState } from 'react'

// Constants
import { CANCEL_DIALOG_TRANSITION_MS } from '../cancel-booking-dialog.constants'

interface UseCancelDialogPresenceOptions {
  isOpen: boolean
  onExited: () => void
}

const useCancelDialogPresence = ({ isOpen, onExited }: UseCancelDialogPresenceOptions) => {
  const [isVisible, setIsVisible] = useState(false)

  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElementRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null

      const frameId = window.requestAnimationFrame(() => {
        setIsVisible(true)
      })

      return () => {
        window.cancelAnimationFrame(frameId)
      }
    }

    setIsVisible(false)

    const timeoutId = window.setTimeout(() => {
      onExited()

      previouslyFocusedElementRef.current?.focus()
      previouslyFocusedElementRef.current = null
    }, CANCEL_DIALOG_TRANSITION_MS)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isOpen, onExited])

  return {
    isVisible,
  }
}

export default useCancelDialogPresence
