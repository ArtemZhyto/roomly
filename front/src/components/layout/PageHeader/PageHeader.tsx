// Types
import type { PageHeaderProps } from './pageHeader.types'

// Styles
import styles from './PageHeader.module.scss'

const PageHeader = ({ title, description, aside }: PageHeaderProps) => {
  return (
    <header
      className={`${styles.header} flex flex-col gap-4 pl-5 sm:flex-row sm:items-start sm:justify-between`}
    >
      <div className='min-w-0'>
        <h1 className='m-0 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl'>
          {title}
        </h1>

        {description && (
          <p className={`${styles.description} mt-2 max-w-170 text-base leading-7`}>
            {description}
          </p>
        )}
      </div>

      {aside && <div className='shrink-0'>{aside}</div>}
    </header>
  )
}

export default PageHeader
