// Components
import PageHeader from '@components/layout/PageHeader'
import TimezoneBadge from '@components-shared/TimezoneBadge'

// Styles
import styles from './rooms-page.module.scss'

const RoomsPage = () => {
  return (
    <div className='flex flex-col gap-8'>
      <PageHeader
        title='Schedule'
        description='View weekly room availability and choose a free 30-minute time slot.'
        aside={<TimezoneBadge />}
      />

      <section
        className={`${styles.placeholder} flex min-h-70 flex-col items-center justify-center rounded-card border border-dashed px-6 py-12 text-center`}
        aria-labelledby='rooms-placeholder-title'
      >
        <div
          className={`${styles.placeholderIcon} mb-5 grid size-14 place-items-center rounded-full text-2xl`}
          aria-hidden='true'
        >
          ▦
        </div>

        <h2 id='rooms-placeholder-title' className='m-0 text-xl font-semibold text-text-primary'>
          Room catalogue is coming next
        </h2>

        <p className='mt-2 max-w-120 text-sm leading-6 text-text-secondary'>
          This area will contain room cards with their floor, capacity and availability status.
        </p>
      </section>
    </div>
  )
}

export default RoomsPage
