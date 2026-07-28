// Styles
import styles from './CheckEmailContent.module.scss'

interface CheckEmailNoticeProps {
  error?: string
  isResent: boolean
}

const CheckEmailNotice = ({ error, isResent }: CheckEmailNoticeProps) => {
  return (
    <>
      <div className={`${styles.notice} px-4 py-4 text-[15px] leading-6`}>
        The email may take a minute to arrive. Check your spam folder if you do not see it.
      </div>

      {error && (
        <div className={`${styles.errorMessage} mt-5 px-4 py-3.5 text-[15px]`} role='alert'>
          <span className={styles.errorIcon} aria-hidden='true'>
            !
          </span>

          <span>{error}</span>
        </div>
      )}

      {isResent && (
        <div
          className={`${styles.successMessage} mt-5 px-4 py-3.5 text-[15px] font-medium`}
          role='status'
        >
          A new reset link has been sent.
        </div>
      )}
    </>
  )
}

export default CheckEmailNotice
