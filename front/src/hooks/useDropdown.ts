'use client'

// Modules
import { useCallback, useEffect, useId, useRef, useState } from 'react'

interface UseDropdownResult {
  isOpen: boolean
  dropdownId: string

  containerRef: React.RefObject<HTMLDivElement | null>
  triggerRef: React.RefObject<HTMLButtonElement | null>

  openDropdown: () => void
  closeDropdown: () => void
  toggleDropdown: () => void
}

const useDropdown = (): UseDropdownResult => {
  const [isOpen, setIsOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const dropdownId = useId()

  const openDropdown = useCallback((): void => {
    setIsOpen(true)
  }, [])

  const closeDropdown = useCallback((): void => {
    setIsOpen(false)
  }, [])

  const toggleDropdown = useCallback((): void => {
    setIsOpen((currentValue) => {
      return !currentValue
    })
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePointerDown = (event: PointerEvent): void => {
      const target = event.target

      if (target instanceof Node && !containerRef.current?.contains(target)) {
        closeDropdown()
      }
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Escape') {
        return
      }

      event.preventDefault()

      closeDropdown()
      triggerRef.current?.focus()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeDropdown, isOpen])

  return {
    isOpen,
    dropdownId,
    containerRef,
    triggerRef,
    openDropdown,
    closeDropdown,
    toggleDropdown,
  }
}

export default useDropdown
