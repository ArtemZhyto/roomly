// Modules
import { Check } from 'lucide-react'

// Constants
import { CAPACITY_OPTIONS } from '../capacity-filter.constants'

// Types
import type { CapacityOption } from '../capacity-filter.types'

// Styles
import styles from '../CapacityFilter.module.scss'

interface CapacityFilterMenuProps {
  isOpen: boolean
  listboxId: string
  value?: number
  onSelect: (option: CapacityOption) => void
}

const CapacityFilterMenu = ({ isOpen, listboxId, value, onSelect }: CapacityFilterMenuProps) => {
  const menuClassName = [styles.menu, isOpen ? styles.menuOpen : ''].filter(Boolean).join(' ')

  return (
    <div
      id={listboxId}
      className={menuClassName}
      role='listbox'
      aria-label='Minimum room capacity'
      aria-hidden={!isOpen}
    >
      {CAPACITY_OPTIONS.map((option) => {
        const isSelected = option.value === value

        const optionClassName = [styles.option, isSelected ? styles.optionSelected : '']
          .filter(Boolean)
          .join(' ')

        return (
          <button
            key={option.value ?? 'any'}
            type='button'
            className={optionClassName}
            role='option'
            aria-selected={isSelected}
            tabIndex={isOpen ? 0 : -1}
            onClick={() => {
              onSelect(option)
            }}
          >
            <span>{option.label}</span>

            {isSelected && (
              <Check size={16} strokeWidth={2.25} className={styles.check} aria-hidden='true' />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default CapacityFilterMenu
