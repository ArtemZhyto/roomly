'use client'

// Modules
import { useCallback, useMemo } from 'react'

// Hooks
import useDropdown from '@hooks/useDropdown'

// Constants
import { CAPACITY_OPTIONS } from '../capacity-filter.constants'

// Types
import type { CapacityOption } from '../capacity-filter.types'

interface UseCapacityFilterOptions {
  value?: number

  onChange: (value?: number) => void
}

interface UseCapacityFilterResult {
  isOpen: boolean
  listboxId: string
  selectedOption: CapacityOption

  containerRef: React.RefObject<HTMLDivElement | null>
  triggerRef: React.RefObject<HTMLButtonElement | null>

  toggleDropdown: () => void
  selectOption: (option: CapacityOption) => void
}

const useCapacityFilter = ({
  value,
  onChange,
}: UseCapacityFilterOptions): UseCapacityFilterResult => {
  const { isOpen, dropdownId, containerRef, triggerRef, closeDropdown, toggleDropdown } =
    useDropdown()

  const selectedOption = useMemo(() => {
    return (
      CAPACITY_OPTIONS.find((option) => {
        return option.value === value
      }) ?? CAPACITY_OPTIONS[0]
    )
  }, [value])

  const selectOption = useCallback(
    (option: CapacityOption): void => {
      onChange(option.value)
      closeDropdown()
      triggerRef.current?.focus()
    },
    [closeDropdown, onChange, triggerRef],
  )

  return {
    isOpen,
    listboxId: dropdownId,
    selectedOption,
    containerRef,
    triggerRef,
    toggleDropdown,
    selectOption,
  }
}

export default useCapacityFilter
