// Modules
import { ChevronDown, LoaderCircle } from 'lucide-react'

// Styles
import styles from './MyBookingsView.module.scss'

interface MyBookingsLoadMoreProps {
  isLoading: boolean
  onLoadMore: () => void
}

const MyBookingsLoadMore = ({ isLoading, onLoadMore }: MyBookingsLoadMoreProps) => {
  return (
    <div className={styles.loadMoreWrapper}>
      <button
        type='button'
        className={styles.loadMoreButton}
        disabled={isLoading}
        onClick={onLoadMore}
      >
        {isLoading && (
          <LoaderCircle className={styles.spinner} size={17} strokeWidth={2} aria-hidden='true' />
        )}

        {isLoading ? 'Loading...' : 'Load more'}

        {!isLoading && <ChevronDown size={17} strokeWidth={2} aria-hidden='true' />}
      </button>
    </div>
  )
}

export default MyBookingsLoadMore
