// Modules
import Link from 'next/link'
import type { Metadata } from 'next'

// Components
import { LegalPage } from '@components/legal'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms governing the use of the Roomly workspace booking platform.',
}

const TermsPage = () => {
  return (
    <LegalPage
      eyebrow='Legal'
      title='Terms of Service'
      description='These terms describe the rules and responsibilities that apply when using the Roomly workspace booking platform.'
      updatedAt='July 28, 2026'
      sections={[
        {
          id: 'acceptance',
          title: 'Acceptance of terms',
          content: (
            <>
              <p>
                By creating an account or using Roomly, you agree to these Terms of Service and our{' '}
                <Link href='/privacy'>Privacy Policy</Link>.
              </p>

              <p>Do not use Roomly if you do not agree to these terms.</p>
            </>
          ),
        },
        {
          id: 'accounts',
          title: 'Accounts',
          content: (
            <>
              <p>
                You are responsible for providing accurate account information and keeping your
                login credentials secure.
              </p>

              <ul>
                <li>Do not share access to your account.</li>
                <li>Notify the workspace administrator if you suspect unauthorized access.</li>
                <li>Keep your email address and profile information current.</li>
              </ul>
            </>
          ),
        },
        {
          id: 'acceptable-use',
          title: 'Acceptable use',
          content: (
            <>
              <p>Roomly may only be used for lawful workspace and room-booking activities.</p>

              <p>You must not:</p>

              <ul>
                <li>interfere with the service or its security;</li>
                <li>attempt to access another user’s account;</li>
                <li>create misleading, fraudulent, or abusive bookings;</li>
                <li>use automated tools in a way that overloads the service.</li>
              </ul>
            </>
          ),
        },
        {
          id: 'bookings',
          title: 'Bookings and cancellations',
          content: (
            <>
              <p>
                Users are responsible for the bookings they create and should release rooms they no
                longer intend to use.
              </p>

              <p>
                Workspace administrators may establish additional booking limits, cancellation
                rules, or room access policies.
              </p>
            </>
          ),
        },
        {
          id: 'availability',
          title: 'Service availability',
          content: (
            <>
              <p>
                We aim to keep Roomly available and reliable, but uninterrupted access cannot be
                guaranteed.
              </p>

              <p>
                The service may occasionally be unavailable because of maintenance, updates,
                security incidents, or circumstances outside our control.
              </p>
            </>
          ),
        },
        {
          id: 'termination',
          title: 'Suspension and termination',
          content: (
            <>
              <p>
                Access may be suspended or terminated when an account violates these terms,
                threatens the service, or is disabled by the relevant workspace administrator.
              </p>
            </>
          ),
        },
        {
          id: 'changes',
          title: 'Changes to these terms',
          content: (
            <>
              <p>
                We may update these terms when the service, legal requirements, or our operating
                practices change.
              </p>

              <p>
                The updated date at the top of this page indicates when the latest revision took
                effect.
              </p>
            </>
          ),
        },
        {
          id: 'contact',
          title: 'Contact',
          content: (
            <p>
              Questions about these terms can be sent to{' '}
              <a href='mailto:legal@roomly.ua'>legal@roomly.ua</a>.
            </p>
          ),
        },
      ]}
    />
  )
}

export default TermsPage
