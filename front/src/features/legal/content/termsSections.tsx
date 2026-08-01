// Types
import type { LegalSection } from '../types/legal.types'

const termsSections: LegalSection[] = [
  {
    id: 'acceptance',
    title: 'Acceptance of terms',
    paragraphs: [
      'These Terms of Service govern access to and use of Roomly. By creating an account, accessing a workspace, or using the service, you agree to these Terms and to the Privacy Policy.',
      'If you use Roomly on behalf of an employer, school, organization, or other entity, you confirm that you are authorized to follow these Terms and applicable workspace rules.',
      'If you do not agree to these Terms, do not use Roomly.',
    ],
  },
  {
    id: 'service-description',
    title: 'The Roomly service',
    paragraphs: [
      'Roomly provides tools for viewing meeting-room availability, creating and managing reservations, organizing recurring bookings, and receiving service-related notifications.',
      'Roomly does not guarantee that a physical room will be suitable, accessible, equipped, safe, or available beyond the information recorded in the service. Workspace administrators remain responsible for room information and workplace operations.',
    ],
  },
  {
    id: 'eligibility',
    title: 'Eligibility and organizational authorization',
    paragraphs: [
      'You may use Roomly only if you are legally permitted to do so and have permission to access the relevant workspace.',
      'Users who are not legally able to enter into these Terms independently may use Roomly only with appropriate authorization from a parent, guardian, employer, school, or other responsible organization.',
    ],
  },
  {
    id: 'account-responsibility',
    title: 'Account responsibility',
    paragraphs: [
      'You must provide accurate and current account information, use an email address you are authorized to use, and keep your credentials confidential.',
      'You are responsible for activity performed through your account unless the activity resulted from a security failure attributable to the service. Notify the workspace administrator or Roomly operator promptly if you suspect unauthorized access.',
      'Accounts may not be shared, transferred, impersonated, or used to access another person’s data without authorization.',
    ],
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable use',
    paragraphs: [
      'You must use Roomly lawfully, responsibly, and only for legitimate workplace or organizational scheduling purposes.',
    ],
    items: [
      'Do not access or attempt to access another user’s account, bookings, notifications, or restricted areas without authorization.',
      'Do not bypass security, authentication, rate limits, availability rules, ownership checks, or booking-conflict controls.',
      'Do not probe, scan, disrupt, overload, reverse engineer, or interfere with the service or its infrastructure except where expressly permitted by applicable law.',
      'Do not upload or submit malicious code, unlawful content, misleading information, spam, or content that infringes another person’s rights.',
      'Do not use bots, scripts, or automated requests in a way that burdens, scrapes, or abuses the service.',
      'Do not use Roomly to harass others, reserve rooms in bad faith, block availability, or create deceptive or unnecessary bookings.',
      'Do not place passwords, confidential records, sensitive personal data, or inappropriate content in meeting titles or other shared fields.',
    ],
  },
  {
    id: 'bookings',
    title: 'Room bookings',
    paragraphs: [
      'You are responsible for the accuracy and appropriateness of bookings created through your account, including the room, title, date, time, duration, recurrence, and invited participants.',
      'A booking is recorded only after the service confirms successful creation. Displayed availability may change before confirmation because another user may reserve the same time.',
      'Roomly may reject bookings that overlap, fall outside configured office hours, exceed permitted duration, use invalid time intervals, concern unavailable rooms, or otherwise violate workspace rules.',
      'You must cancel bookings you no longer need. Workspace administrators may modify or cancel reservations where reasonably necessary for workplace operations, safety, maintenance, policy enforcement, or correction of errors.',
    ],
  },
  {
    id: 'shared-information',
    title: 'Shared workspace information',
    paragraphs: [
      'Roomly is designed for shared scheduling. Your name and relevant booking details may be visible to authorized users of the same workspace.',
      'You must ensure that meeting titles and other shared information are appropriate for that audience and do not disclose information you are not authorized to share.',
    ],
  },
  {
    id: 'notifications',
    title: 'Service communications and notifications',
    paragraphs: [
      'Roomly may send emails and in-app notifications necessary for account security, email verification, password recovery, booking administration, reminders, and important service updates.',
      'Delivery times are not guaranteed. You remain responsible for checking your bookings and complying with workspace schedules even if a notification is delayed, blocked, or not delivered.',
    ],
  },
  {
    id: 'administrators',
    title: 'Workspace administration',
    paragraphs: [
      'The organization operating a Roomly workspace may set room details, access permissions, office hours, booking limits, retention periods, and other rules.',
      'Workspace administrators may access and manage account or booking information as permitted by their organization’s policies and applicable law. Questions about organizational decisions should be directed to the relevant administrator.',
    ],
  },
  {
    id: 'suspension-and-termination',
    title: 'Suspension and termination',
    paragraphs: [
      'Access may be limited, suspended, or terminated where reasonably necessary to protect the service or other users, investigate suspected misuse, comply with law, enforce these Terms, address non-payment under an organizational agreement, or respond to a workspace administrator’s request.',
      'You may stop using Roomly at any time. Account deletion may be subject to the organization’s retention requirements and applicable law.',
      'Provisions that by their nature should continue after termination, including ownership, disclaimers, limitations of liability, and dispute provisions, will remain in effect.',
    ],
  },
  {
    id: 'service-availability',
    title: 'Availability and changes',
    paragraphs: [
      'We aim to provide a reliable service, but Roomly may be interrupted by maintenance, technical failures, third-party services, network conditions, security events, or circumstances beyond reasonable control.',
      'Features may be added, changed, limited, or discontinued. Where practical, reasonable notice will be provided for material changes that significantly reduce core functionality.',
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual property',
    paragraphs: [
      'Roomly, including its software, design, branding, and original content, is protected by intellectual-property laws and remains the property of its lawful owner or licensors.',
      'These Terms grant you a limited, revocable, non-exclusive, non-transferable right to use Roomly for its intended purpose. They do not transfer ownership or permit copying, resale, sublicensing, or creation of derivative products except where expressly authorized or required by law.',
      'You retain rights in content you submit. You grant the service and the workspace operator permission to host, process, display, and transmit that content only as needed to operate Roomly and administer the workspace.',
    ],
  },
  {
    id: 'third-party-services',
    title: 'Third-party services',
    paragraphs: [
      'Roomly may rely on third-party infrastructure, hosting, email, database, monitoring, or integration services. Their availability and processing practices may affect the service.',
      'Links or integrations do not imply endorsement. Third-party services may be governed by separate terms and privacy notices.',
    ],
  },
  {
    id: 'disclaimers',
    title: 'Disclaimers',
    paragraphs: [
      'To the maximum extent permitted by law, Roomly is provided on an “as is” and “as available” basis. We do not promise uninterrupted or error-free operation, perfect accuracy of room data, or that every defect will be corrected immediately.',
      'Nothing in these Terms excludes warranties or rights that cannot lawfully be excluded, including mandatory consumer or data-protection rights where they apply.',
    ],
  },
  {
    id: 'limitation-of-liability',
    title: 'Limitation of liability',
    paragraphs: [
      'To the maximum extent permitted by law, the Roomly operator will not be liable for indirect, incidental, special, consequential, or punitive loss, or for loss of profits, business, data, goodwill, or opportunities arising from use of or inability to use the service.',
      'Any limitation applies only to the extent allowed by applicable law and does not limit liability that cannot legally be limited, including liability for fraud, intentional misconduct, or other mandatory obligations.',
    ],
  },
  {
    id: 'indemnity',
    title: 'Responsibility for misuse',
    paragraphs: [
      'To the extent permitted by law, you are responsible for losses or claims caused by your unlawful use of Roomly, violation of these Terms, infringement of another person’s rights, or misuse of a workspace, except to the extent caused by the service operator.',
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing law and disputes',
    paragraphs: [
      'These Terms are governed by the laws applicable to the Roomly operator and the organization that provides your workspace, without limiting mandatory rights available to you under applicable law.',
      'Users should first attempt to resolve concerns by contacting the relevant workspace administrator or Roomly support. Any unresolved dispute will be handled by the competent authorities or courts determined under applicable law.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to these Terms',
    paragraphs: [
      'These Terms may be updated to reflect service changes, legal requirements, security needs, or business practices. The latest version will be posted on this page with a revised effective date.',
      'Where required or appropriate, material changes will be communicated through Roomly or by email. Continued use after the effective date of updated Terms constitutes acceptance where permitted by law.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    paragraphs: [
      'Questions about these Terms may be sent to the Roomly support team or to the administrator of your Roomly workspace.',
      'When contacting support, include sufficient information about your account, workspace, and issue so the request can be reviewed.',
    ],
  },
]

export default termsSections
