// Modules
import Link from 'next/link'

// Types
import type { LegalPageProps } from '../../types/legal.types'

// Styles
import styles from './LegalPage.module.scss'

const LegalPage = ({ eyebrow, title, description, updatedAt, sections }: LegalPageProps) => {
  return (
    <article className={`${styles.page} font-afacad`}>
      <header className={styles.header}>
        <p className='mb-2 text-sm font-semibold text-primary'>{eyebrow}</p>

        <h1 className='m-0 font-prosto text-[clamp(34px,5vw,52px)] font-normal leading-[1.15] text-text-primary'>
          {title}
        </h1>

        <p className='mt-4 max-w-180 text-[18px] leading-7 text-text-secondary'>{description}</p>

        <p className={`${styles.updatedAt} mt-5`}>Last updated: {updatedAt}</p>
      </header>

      <div className={styles.content}>
        {sections.map((section) => (
          <section key={section.id} id={section.id} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>

            <div className={styles.paragraphs}>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>

            {section.items && section.items.length > 0 && (
              <ul className={styles.list}>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <Link href='/' className={styles.backLink}>
        <span aria-hidden='true'>←</span>
        Back to Roomly
      </Link>
    </article>
  )
}

export default LegalPage
