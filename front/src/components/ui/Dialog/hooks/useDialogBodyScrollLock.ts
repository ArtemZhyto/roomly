'use client'

// Modules
import { useEffect, useRef } from 'react'

interface BodyStylesSnapshot {
  position: string
  top: string
  left: string
  right: string
  width: string
  paddingRight: string
}

const getBodyStylesSnapshot = (): BodyStylesSnapshot => {
  return {
    position: document.body.style.position,
    top: document.body.style.top,
    left: document.body.style.left,
    right: document.body.style.right,
    width: document.body.style.width,
    paddingRight: document.body.style.paddingRight,
  }
}

const restoreBodyStyles = (snapshot: BodyStylesSnapshot): void => {
  document.body.style.position = snapshot.position
  document.body.style.top = snapshot.top
  document.body.style.left = snapshot.left
  document.body.style.right = snapshot.right
  document.body.style.width = snapshot.width
  document.body.style.paddingRight = snapshot.paddingRight
}

const useDialogBodyScrollLock = (isLocked: boolean): void => {
  const initialScrollYRef = useRef(0)

  useEffect(() => {
    if (!isLocked) {
      return
    }

    initialScrollYRef.current = window.scrollY

    const previousBodyStyles = getBodyStylesSnapshot()

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

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

    const preventBodyScroll = (event: TouchEvent): void => {
      event.preventDefault()
    }

    document.addEventListener('touchmove', preventBodyScroll, {
      passive: false,
    })

    return () => {
      document.removeEventListener('touchmove', preventBodyScroll)

      restoreBodyStyles(previousBodyStyles)

      window.scrollTo(0, initialScrollYRef.current)
    }
  }, [isLocked])
}

export default useDialogBodyScrollLock
