// Types
import type { LegalSection } from '../types/legal.types'

const privacySections: LegalSection[] = [
  {
    id: 'scope-and-controller',
    title: 'Scope and data controller',
    paragraphs: [
      'This Privacy Policy explains how Roomly collects, uses, stores, and protects personal data when you create an account or use the Roomly meeting-room booking service.',
      'For the purposes of applicable data protection law, the organization that operates your Roomly workspace is generally responsible for deciding why and how employee data is processed. Roomly may act as a service provider processing data on that organization’s behalf.',
      'Questions or requests concerning personal data may be sent to the contact address made available by your organization or to the Roomly privacy contact shown on this website.',
    ],
  },
  {
    id: 'information-we-collect',
    title: 'Information we collect',
    paragraphs: [
      'We collect only the information reasonably necessary to provide, secure, and improve the service.',
    ],
    items: [
      'Account information, including your name, email address, verification status, and account creation or update timestamps.',
      'Authentication and security information, including a securely hashed password, session or refresh-token records, email verification codes, and password-reset records.',
      'Booking information, including meeting title, selected room, start and end time, recurrence settings, booking owner, and cancellation status.',
      'Notification information, including in-app notification content, delivery status, read status, and related booking references.',
      'Technical and usage information, such as IP address, browser or device information, request timestamps, error logs, and security events, where collected by the hosting or application infrastructure.',
      'Communications you send to support or to the organization administering your Roomly workspace.',
    ],
  },
  {
    id: 'how-we-use-information',
    title: 'How we use personal data',
    paragraphs: [
      'We use personal data only for legitimate service, security, administrative, and legal purposes.',
    ],
    items: [
      'To create and administer user accounts.',
      'To authenticate users, maintain sessions, verify email addresses, and reset passwords.',
      'To display room availability and create, update, repeat, or cancel bookings.',
      'To show booking owners and meeting information to authorized users of the same workspace.',
      'To send service-related emails and in-app notifications, including booking reminders and security messages.',
      'To prevent overlapping reservations, abuse, unauthorized access, fraud, and other security incidents.',
      'To diagnose errors, maintain service reliability, and improve the user experience.',
      'To comply with applicable law, lawful requests, and the organization’s record-keeping obligations.',
    ],
  },
  {
    id: 'legal-bases',
    title: 'Legal bases for processing',
    paragraphs: [
      'Depending on the context and applicable law, personal data may be processed because it is necessary to provide the service, to perform an agreement with the user or the organization operating the workspace, to comply with a legal obligation, or for legitimate interests such as service security, administration, and prevention of misuse.',
      'Where consent is required by law, it will be requested separately and may be withdrawn at any time without affecting processing that occurred before withdrawal.',
    ],
  },
  {
    id: 'booking-visibility',
    title: 'Visibility within your workspace',
    paragraphs: [
      'Roomly is a shared workplace service. Booking details may be visible to other authorized users of the same workspace so that they can understand room availability and identify the person responsible for a reservation.',
      'Do not include confidential, sensitive, medical, financial, or other unnecessary personal information in meeting titles or booking descriptions.',
    ],
  },
  {
    id: 'cookies-and-sessions',
    title: 'Cookies and session storage',
    paragraphs: [
      'Roomly uses strictly necessary cookies or similar storage to authenticate users, maintain secure sessions, protect requests, and remember essential interface preferences.',
      'These technologies are required for core service functionality. Roomly does not use them to sell personal data or to provide third-party behavioral advertising.',
    ],
  },
  {
    id: 'data-sharing',
    title: 'How data may be shared',
    paragraphs: [
      'We do not sell personal data. Personal data may be disclosed only when reasonably necessary to operate the service or meet legal obligations.',
    ],
    items: [
      'To the organization that owns or administers your Roomly workspace and its authorized administrators.',
      'To infrastructure, hosting, database, email-delivery, monitoring, and security providers acting under appropriate confidentiality and data-protection obligations.',
      'To professional advisers, auditors, insurers, or transaction participants where reasonably necessary and legally permitted.',
      'To public authorities or other parties when disclosure is required by law, court order, or a valid legal process, or when necessary to protect users, the service, or the public.',
      'In connection with a merger, acquisition, reorganization, or transfer of the service, subject to appropriate safeguards.',
    ],
  },
  {
    id: 'international-transfers',
    title: 'International data transfers',
    paragraphs: [
      'Service providers may process data in countries other than the country where you use Roomly. Where required, appropriate safeguards will be used for international transfers, such as contractual protections or another lawful transfer mechanism.',
    ],
  },
  {
    id: 'data-retention',
    title: 'Data retention',
    paragraphs: [
      'Personal data is kept only for as long as reasonably necessary for the purposes described in this Policy, including account administration, booking history, security, dispute resolution, and compliance with legal obligations.',
      'Retention periods may depend on the organization operating the workspace. Authentication codes and temporary session records are generally retained for shorter periods than account and booking records.',
      'When data is no longer required, it will be deleted, anonymized, or securely isolated unless continued retention is required by law or necessary to establish, exercise, or defend legal claims.',
    ],
  },
  {
    id: 'security',
    title: 'Data security',
    paragraphs: [
      'Roomly uses reasonable technical and organizational safeguards designed to protect personal data, including access controls, password hashing, secure session handling, validation, and protections against conflicting or unauthorized booking actions.',
      'No online service can guarantee absolute security. Users must protect their login credentials and promptly report suspected unauthorized access.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your privacy rights',
    paragraphs: [
      'Subject to applicable law, you may have the right to request access to personal data about you, correction of inaccurate data, deletion, restriction of processing, portability of certain data, or objection to particular processing.',
      'You may also have the right to withdraw consent where processing is based on consent and to submit a complaint to the competent data-protection authority.',
      'Some requests may be limited where data must be retained for security, legal compliance, the rights of other users, or the establishment, exercise, or defense of legal claims. We may need to verify your identity before completing a request.',
    ],
  },
  {
    id: 'children',
    title: 'Children’s privacy',
    paragraphs: [
      'Roomly is intended for workplace and organizational use and is not directed to children. Users who are not legally able to enter into an agreement for the service should use Roomly only with authorization from a parent, guardian, school, employer, or other responsible organization where applicable.',
    ],
  },
  {
    id: 'policy-changes',
    title: 'Changes to this Policy',
    paragraphs: [
      'This Privacy Policy may be updated to reflect changes to Roomly, legal requirements, or data-processing practices. The updated version will be posted on this page with a revised effective date. Material changes may also be communicated through the service or by email where appropriate.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact and complaints',
    paragraphs: [
      'To exercise a privacy right or ask a question, contact the administrator of your Roomly workspace or the Roomly support team.',
      'Privacy requests should include enough information to identify your account and understand the request. Additional information may be required to verify your identity and protect your account.',
    ],
  },
]

export default privacySections
