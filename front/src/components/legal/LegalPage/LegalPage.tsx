// Modules
import type { ReactNode } from 'react'

interface LegalSection {
  id: string
  title: string
  content: ReactNode
}

interface LegalPageProps {
  eyebrow: string
  title: string
  description: string
  updatedAt: string
  sections: LegalSection[]
}

const LegalPage = ({ eyebrow, title, description, updatedAt, sections }: LegalPageProps) => {
  return (
    <article>
      <header className='mb-12 border-b border-border-primary pb-10'>
        <p className='mb-3 text-sm font-semibold text-primary'>{eyebrow}</p>

        <h1 className='max-w-180 font-prosto text-[clamp(36px,6vw,58px)] font-normal leading-[1.12] text-text-primary'>
          {title}
        </h1>

        <p className='mt-5 max-w-170 text-[18px] leading-7 text-text-secondary'>{description}</p>

        <p className='mt-5 text-sm text-text-muted'>Last updated: {updatedAt}</p>
      </header>

      <div className='grid grid-cols-[220px_minmax(0,1fr)] items-start gap-12 max-[820px]:grid-cols-1 max-[820px]:gap-8'>
        <aside className='sticky top-24 rounded-input border border-border-primary bg-white p-5 shadow-[0_1px_2px_rgb(33_39_50_/_4%)] max-[820px]:static'>
          <p className='mb-4 text-sm font-semibold text-text-primary'>On this page</p>

          <nav aria-label={`${title} sections`}>
            <ol className='m-0 flex list-none flex-col gap-2 p-0'>
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className='flex gap-2 rounded-control px-2 py-1.5 text-sm leading-5 text-text-secondary no-underline transition-colors duration-150 hover:bg-primary-subtle hover:text-primary'
                  >
                    <span className='shrink-0 text-text-muted' aria-hidden='true'>
                      {index + 1}.
                    </span>

                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className='min-w-0'>
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className='scroll-mt-28 border-b border-border-primary py-9 first:pt-0 last:border-b-0 last:pb-0'
            >
              <div className='mb-4 flex items-baseline gap-3'>
                <span className='text-sm font-semibold text-primary' aria-hidden='true'>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h2 className='font-prosto text-[clamp(23px,3vw,30px)] font-normal leading-[1.3] text-text-primary'>
                  {section.title}
                </h2>
              </div>

              <div className='space-y-4 text-[17px] leading-7 text-text-secondary [&_a]:font-semibold [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-text-primary [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2'>
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}

export default LegalPage
