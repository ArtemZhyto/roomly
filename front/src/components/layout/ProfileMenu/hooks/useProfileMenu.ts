'use client'

// Hooks
import useDropdown from '@hooks/useDropdown'

interface UseProfileMenuResult {
  isOpen: boolean
  menuId: string

  containerRef: React.RefObject<HTMLDivElement | null>
  triggerRef: React.RefObject<HTMLButtonElement | null>

  closeMenu: () => void
  toggleMenu: () => void
}

const useProfileMenu = (): UseProfileMenuResult => {
  const { isOpen, dropdownId, containerRef, triggerRef, closeDropdown, toggleDropdown } =
    useDropdown()

  return {
    isOpen,
    menuId: dropdownId,
    containerRef,
    triggerRef,
    closeMenu: closeDropdown,
    toggleMenu: toggleDropdown,
  }
}

export default useProfileMenu
