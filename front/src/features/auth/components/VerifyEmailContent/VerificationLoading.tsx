// Styles
import styles from './VerifyEmailContent.module.scss'

const VerificationLoading = () => {
  return (
    <div className='w-full font-afacad' aria-live='polite' aria-busy='true'>
      <div className={styles.spinner} aria-hidden='true' />

      <header>
        <p className='mb-2 text-sm font-semibold text-primary'>Email verification</p>

        <h1 className='m-0 font-prosto text-[clamp(30px,4vw,38px)] font-normal leading-[1.2] text-text-primary'>
          Verifying your email
        </h1>

        <p className='mt-3 text-[17px] leading-6 text-text-secondary'>
          Please wait while we confirm your email address.
        </p>
      </header>
    </div>
  )
}

export default VerificationLoading
