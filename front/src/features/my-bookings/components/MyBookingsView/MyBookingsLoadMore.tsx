// Modules
import { ChevronDown } from 'lucide-react'

// Styles
import styles from './MyBookingsView.module.scss'

interface MyBookingsLoadMoreProps {
  onLoadMore: () => void
}

const MyBookingsLoadMore = ({ onLoadMore }: MyBookingsLoadMoreProps) => {
  return (
    <div className={styles.loadMoreWrapper}>
      <button type='button' className={styles.loadMoreButton} onClick={onLoadMore}>
        Load more
        <ChevronDown size={17} strokeWidth={2} aria-hidden='true' />
      </button>
    </div>
  )
}

export default MyBookingsLoadMore
