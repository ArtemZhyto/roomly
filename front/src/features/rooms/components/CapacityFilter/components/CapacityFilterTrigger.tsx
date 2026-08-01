// Modules
import { ChevronDown, UsersRound } from 'lucide-react'

// Types
import type { CapacityOption } from '../capacity-filter.types'

// Styles
import styles from '../CapacityFilter.module.scss'

interface CapacityFilterTriggerProps {
  isOpen: boolean
  listboxId: string
  selectedOption: CapacityOption
  triggerRef: React.RefObject<HTMLButtonElement | null>
  onToggle: () => void
}

const CapacityFilterTrigger = ({
  isOpen,
  listboxId,
  selectedOption,
  triggerRef,
  onToggle,
}: CapacityFilterTriggerProps) => {
  const chevronClassName = [styles.chevron, isOpen ? styles.chevronOpen : '']
    .filter(Boolean)
    .join(' ')

  return (
    <button
      ref={triggerRef}
      type='button'
      className={styles.trigger}
      aria-haspopup='listbox'
      aria-expanded={isOpen}
      aria-controls={listboxId}
      onClick={onToggle}
    >
      <span className={styles.triggerContent}>
        <UsersRound size={17} strokeWidth={2} aria-hidden='true' />

        <span>{selectedOption.label}</span>
      </span>

      <ChevronDown size={17} strokeWidth={2} className={chevronClassName} aria-hidden='true' />
    </button>
  )
}

export default CapacityFilterTrigger
