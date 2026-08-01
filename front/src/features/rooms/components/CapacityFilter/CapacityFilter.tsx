'use client'

// Local components
import CapacityFilterMenu from './components/CapacityFilterMenu'
import CapacityFilterTrigger from './components/CapacityFilterTrigger'

// Hooks
import useCapacityFilter from './hooks/useCapacityFilter'

// Types
import type { CapacityFilterProps } from './capacity-filter.types'

// Styles
import styles from './CapacityFilter.module.scss'

const CapacityFilter = ({ value, onChange }: CapacityFilterProps) => {
  const {
    isOpen,
    listboxId,
    selectedOption,
    containerRef,
    triggerRef,
    toggleDropdown,
    selectOption,
  } = useCapacityFilter({
    value,
    onChange,
  })

  return (
    <div className={styles.field}>
      <span className={styles.label}>Minimum capacity</span>

      <div ref={containerRef} className={styles.container}>
        <CapacityFilterTrigger
          isOpen={isOpen}
          listboxId={listboxId}
          selectedOption={selectedOption}
          triggerRef={triggerRef}
          onToggle={toggleDropdown}
        />

        <CapacityFilterMenu
          isOpen={isOpen}
          listboxId={listboxId}
          value={value}
          onSelect={selectOption}
        />
      </div>

      <p className={styles.hint}>Show rooms that can accommodate at least this many people.</p>
    </div>
  )
}

export default CapacityFilter
