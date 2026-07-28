// Modules
import Link from 'next/link'
import type { Metadata } from 'next'

// Components
import { LegalPage } from '@components/legal'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Roomly collects, uses, and protects account and workspace information.',
}

const PrivacyPage = () => {
  return (
    <LegalPage
      eyebrow='Legal'
      title='Privacy Policy'
      description='This policy explains what information Roomly processes and how that information is used to provide the workspace booking service.'
      updatedAt='July 28, 2026'
      sections={[
        {
          id: 'information',
          title: 'Information we process',
          content: (
            <>
              <p>Roomly may process information provided by users and workspace administrators.</p>

              <ul>
                <li>name and email address;</li>
                <li>account and workspace membership data;</li>
                <li>room bookings and cancellation records;</li>
                <li>basic technical and security logs;</li>
                <li>information submitted when contacting support.</li>
              </ul>
            </>
          ),
        },
        {
          id: 'use',
          title: 'How information is used',
          content: (
            <>
              <p>Information is used to:</p>

              <ul>
                <li>create and manage user accounts;</li>
                <li>process room bookings;</li>
                <li>prevent scheduling conflicts;</li>
                <li>send service and account notifications;</li>
                <li>protect the platform from misuse;</li>
                <li>improve reliability and usability.</li>
              </ul>
            </>
          ),
        },
        {
          id: 'sharing',
          title: 'Information sharing',
          content: (
            <>
              <p>
                Booking and profile information may be visible to authorized members and
                administrators of the same workspace.
              </p>

              <p>
                Information may also be processed by service providers that support hosting, email
                delivery, monitoring, or security.
              </p>
            </>
          ),
        },
        {
          id: 'retention',
          title: 'Data retention',
          content: (
            <>
              <p>
                Information is retained for as long as it is needed to provide the service, satisfy
                legitimate workspace requirements, resolve disputes, or comply with legal
                obligations.
              </p>
            </>
          ),
        },
        {
          id: 'security',
          title: 'Security',
          content: (
            <>
              <p>
                Roomly uses reasonable technical and organizational safeguards intended to protect
                account and booking information.
              </p>

              <p>
                No online service can guarantee complete security, so users should also protect
                their passwords and devices.
              </p>
            </>
          ),
        },
        {
          id: 'choices',
          title: 'Your choices',
          content: (
            <>
              <p>
                Depending on your workspace and applicable requirements, you may be able to request
                access, correction, or deletion of your personal information.
              </p>

              <p>Some account information may be managed by your workspace administrator.</p>
            </>
          ),
        },
        {
          id: 'cookies',
          title: 'Cookies and local storage',
          content: (
            <>
              <p>
                Roomly may use cookies or similar browser storage for authentication, security,
                preferences, and essential service functionality.
              </p>
            </>
          ),
        },
        {
          id: 'changes',
          title: 'Changes to this policy',
          content: (
            <>
              <p>
                This policy may be updated when Roomly’s features, data practices, or legal
                responsibilities change.
              </p>

              <p>Material changes may also be communicated through the service or by email.</p>
            </>
          ),
        },
        {
          id: 'contact',
          title: 'Contact',
          content: (
            <>
              <p>
                Privacy questions can be sent to{' '}
                <a href='mailto:privacy@roomly.ua'>privacy@roomly.ua</a>.
              </p>

              <p>
                Use of Roomly is also subject to our <Link href='/terms'>Terms of Service</Link>.
              </p>
            </>
          ),
        },
      ]}
    />
  )
}

export default PrivacyPage
