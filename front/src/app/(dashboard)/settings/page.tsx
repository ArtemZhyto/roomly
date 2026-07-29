// Components
import PageHeader from '@components/layout/PageHeader'

const SettingsPage = () => {
  return (
    <div className='flex flex-col gap-8'>
      <PageHeader title='Settings' description='Manage your profile and interface preferences.' />

      <div className='grid gap-6 xl:grid-cols-2'>
        <section className='rounded-card border border-border bg-surface p-6'>
          <h2 className='m-0 text-lg font-semibold text-text-primary'>Profile</h2>

          <div className='mt-5 flex flex-col gap-4'>
            <label className='flex flex-col gap-2'>
              <span className='text-sm font-medium text-text-primary'>Name</span>

              <input
                type='text'
                value='Alex Morgan'
                readOnly
                className='min-h-11 rounded-control border border-border bg-background px-3.5 text-sm text-text-primary outline-none'
              />
            </label>

            <label className='flex flex-col gap-2'>
              <span className='text-sm font-medium text-text-primary'>Email</span>

              <input
                type='email'
                value='alex@roomly.ua'
                readOnly
                className='min-h-11 rounded-control border border-border bg-background px-3.5 text-sm text-text-primary outline-none'
              />
            </label>
          </div>
        </section>

        <section className='rounded-card border border-border bg-surface p-6'>
          <h2 className='m-0 text-lg font-semibold text-text-primary'>Time zone</h2>

          <p className='mt-2 text-sm leading-6 text-text-secondary'>
            Meeting times are shown in your local time zone.
          </p>

          <div className='mt-5 rounded-control border border-border bg-background px-4 py-3'>
            <p className='m-0 text-sm font-semibold text-text-primary'>Browser time zone</p>

            <p className='mt-1 text-sm text-text-muted'>Detected automatically</p>
          </div>

          <div className='mt-4 rounded-control border border-border bg-primary-subtle px-4 py-3'>
            <p className='m-0 text-sm font-semibold text-text-primary'>Office time zone</p>

            <p className='mt-1 text-sm text-text-secondary'>Europe/Kyiv</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SettingsPage
