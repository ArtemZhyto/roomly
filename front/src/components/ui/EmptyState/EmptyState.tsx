// Types
import type { EmptyStateProps } from './emptyState.types'

// Styles
import styles from './EmptyState.module.scss'

const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) => {
  const containerClassName = [
    styles.container,
    className,
    'flex min-h-72 flex-col items-center justify-center rounded-card border border-dashed px-6 py-12 text-center',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={containerClassName}>
      <div
        className={`${styles.iconWrapper} mb-5 grid size-14 place-items-center rounded-full`}
        aria-hidden='true'
      >
        <Icon className='size-6' strokeWidth={1.8} />
      </div>

      <h2 className='m-0 text-xl font-semibold text-text-primary'>{title}</h2>

      <p className={`${styles.description} mt-2 max-w-120 text-sm leading-6`}>{description}</p>

      {action && <div className='mt-6'>{action}</div>}
    </section>
  )
}

export default EmptyState
