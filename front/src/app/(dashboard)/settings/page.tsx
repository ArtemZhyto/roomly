// Components
import PageHeader from '@components/layout/PageHeader'
import ThemeSwitcher from '@components/settings/ThemeSwitcher'

const SettingsPage = () => {
  return (
    <div className='flex flex-col gap-8'>
      <PageHeader title='Appearance' description='Choose how Roomly looks on this device.' />

      <section className='rounded-card border border-border bg-surface p-6'>
        <div>
          <h2 className='m-0 text-lg font-semibold text-text-primary'>Theme</h2>

          <p className='mt-2 text-sm leading-6 text-text-secondary'>
            Select a theme or follow your system preference.
          </p>
        </div>

        <div className='mt-6'>
          <ThemeSwitcher />
        </div>
      </section>
    </div>
  )
}

export default SettingsPage
