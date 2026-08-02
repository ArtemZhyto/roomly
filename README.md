# Roomly

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-149ECA)
![Express](https://img.shields.io/badge/Express-4-lightgrey)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1)
![Jest](https://img.shields.io/badge/Jest-30-C21325)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED)

Roomly is a full-stack meeting room booking platform for office teams. Employees can browse meeting rooms, view weekly availability, create one-time or recurring bookings, cancel their own reservations, and receive in-app notifications before adjacent meetings.

The project was developed for the UA-SKILLS junior development tournament and implements the required booking workflow together with several bonus features from the specification.

## Contents

- [Screenshots](#screenshots)
- [Features](#features)
- [Implemented bonus features](#implemented-bonus-features)
- [Technology stack](#technology-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Docker](#docker)
- [Database migrations and seed data](#database-migrations-and-seed-data)
- [Test accounts](#test-accounts)
- [Environment variables](#environment-variables)
- [API overview](#api-overview)
- [Booking conflict protection](#booking-conflict-protection)
- [Time and time zones](#time-and-time-zones)
- [Testing](#testing)
- [Continuous integration](#continuous-integration)
- [Security](#security)
- [Authorship](#authorship)
- [License](#license)

## Screenshots

### Weekly schedule

<table>
  <tr>
    <td align="center">
      <strong>Light theme</strong><br />
      <img src="./docs/screenshots/schedule-light.png" alt="Roomly weekly schedule in the light theme" width="100%" />
    </td>
    <td align="center">
      <strong>Dark theme</strong><br />
      <img src="./docs/screenshots/schedule-dark.png" alt="Roomly weekly schedule in the dark theme" width="100%" />
    </td>
  </tr>
</table>

### Booking flow

<p align="center">
  <img src="./docs/screenshots/booking-form.png" alt="Creating a meeting-room booking in Roomly" width="900" />
</p>

### Personal bookings

<p align="center">
  <img src="./docs/screenshots/my-bookings.png" alt="Upcoming and past Roomly bookings" width="900" />
</p>

### Mobile experience

<p align="center">
  <img src="./docs/screenshots/mobile-view.png" alt="Roomly weekly schedule on a mobile screen" width="420" />
</p>

## Features

### Authentication

- User registration with name, normalized email, and password
- Case-insensitive email handling with surrounding whitespace removed
- Password validation from 8 to 72 characters
- Login, logout, access-token refresh, and persistent sessions
- Cookie-based JWT authentication
- Email verification before booking
- Verification-code resend cooldown
- Forgot-password and password-reset flow
- Protected frontend routes and authenticated API endpoints

### Meeting rooms

- Six seeded meeting rooms with name, floor, and capacity
- Room catalog with loading, empty, and error states
- Capacity filter
- Individual room details and weekly availability

### Weekly schedule

- Custom weekly schedule grid built without a third-party calendar component
- Thirty-minute slots
- Previous, current, and next week navigation
- Booking title and author displayed in the schedule
- Current day and current time highlighting
- Visual distinction between the current user's bookings and other users' bookings
- User-local time display with office time-zone context

### Booking management

- Create bookings with title, room, date, start time, and end time
- Server-side and client-side validation
- Thirty-minute alignment
- Duration from 30 minutes to 4 hours
- Office-hours validation
- Future-time validation
- Adjacent bookings allowed
- Overlapping bookings rejected
- Personal bookings page with upcoming and past sections
- Cancellation confirmation
- Ownership checks that prevent users from cancelling another user's booking

### User experience

- Responsive interface for desktop, tablet, and mobile widths
- Form-level and field-level validation messages
- Disabled controls during requests
- Loading skeletons
- Empty states
- Error states with retry actions
- Accessible labels, status regions, and keyboard-friendly controls
- Terms of Service and Privacy Policy pages

## Implemented bonus features

The project includes the following bonus items from the tournament specification:

- Docker Compose development and production stacks
- Email verification in development mode
- Weekly recurring bookings
- Cancellation of one occurrence or an entire booking series
- Database-level race-condition protection
- In-app booking-end notifications
- Notification read and delete actions
- Socket.IO delivery for real-time notification updates
- Integration tests for the API
- Room filtering by capacity
- Responsive mobile-friendly interface
- Password reset flow

## Technology stack

### Frontend

- Next.js 15
- React 19
- TypeScript
- Sass and Tailwind CSS utilities
- Axios
- Socket.IO Client
- Jest
- Testing Library

### Backend

- Node.js 22
- Express 4
- TypeScript
- Prisma ORM 7
- PostgreSQL 17
- Zod
- JWT
- bcrypt
- Socket.IO
- Jest and Supertest

### Infrastructure

- Docker
- Docker Compose
- GitHub Actions

## Project structure

```text
.
├── .github/
│   ├── workflows/
│   │   ├── back-ci.yml
│   │   └── front-ci.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── back/
│   ├── service/
│   │   ├── prisma/
│   │   │   ├── migrations/
│   │   │   ├── seed/
│   │   │   ├── schema.prisma
│   │   │   └── seed.ts
│   │   ├── src/
│   │   ├── tests/
│   │   └── package.json
│   ├── docker-compose.dev.yml
│   ├── docker-compose.infra.yml
│   ├── docker-compose.prod.yml
│   ├── package.json
│   └── .env.example
├── front/
│   ├── src/
│   ├── tests/
│   ├── docker-compose.dev.yml
│   ├── docker-compose.prod.yml
│   ├── package.json
│   └── .env.example
├── compose.dev.yml
├── compose.prod.yml
├── AUTHORS.md
└── README.md
```

## Getting started

### Prerequisites

Install the following tools:

- Node.js 22 or newer
- npm
- PostgreSQL 17 or Docker
- Docker and Docker Compose for containerized startup

### 1. Clone the repository

```bash
git clone https://github.com/ArtemZhyto/roomly
cd roomly
```

### 2. Configure the backend

```bash
cd back
cp .env.example .env
```

Create `back/.env.prod` for Docker overrides. A local Docker configuration can use:

```env
MODE=dev
FRONTEND_URL=http://localhost:3030

POSTGRES_USER=bookingUser
POSTGRES_PASSWORD=bookingPassword
POSTGRES_DB=bookingDB
POSTGRES_PORT=5001

DATABASE_URL=postgres://bookingUser:bookingPassword@roomly_postgres:5432/bookingDB
```

Replace all example secrets before any real deployment.

### 3. Configure the frontend

```bash
cd ../front
cp .env.example .env
```

Create `front/.env.docker` for Docker development:

```env
MODE=dev
API_URL=http://roomly_service:5000
```

Create `front/.env.prod` for the production container:

```env
MODE=prod
API_URL=http://roomly_service:5000
```

For a real deployment, set public frontend and API URLs in `front/.env` to addresses reachable from the browser.

### 4. Install dependencies

Backend workspace:

```bash
cd ../back
npm ci
cd service
npm ci
```

Frontend:

```bash
cd ../../front
npm ci
```

### 5. Start PostgreSQL for local development

From the repository root:

```bash
docker compose -f back/docker-compose.infra.yml up -d
```

### 6. Apply migrations and generate Prisma Client

```bash
cd back/service
npx prisma generate
npx prisma migrate deploy
```

### 7. Seed the database

```bash
npx prisma db seed
```

### 8. Start the backend

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:5000
```

### 9. Start the frontend

Open another terminal:

```bash
cd front
npm run dev
```

The application will be available at:

```text
http://localhost:3030
```

## Docker

The root Compose files include PostgreSQL, the backend service, and the frontend.

### Development stack

```bash
docker compose -f compose.dev.yml up -d --build
```

The backend container automatically applies pending Prisma migrations before starting. Seed data is applied separately:

```bash
docker compose -f compose.dev.yml exec roomly_service npx prisma db seed
```

Stop the stack:

```bash
docker compose -f compose.dev.yml down
```

Remove containers and the PostgreSQL volume:

```bash
docker compose -f compose.dev.yml down -v
```

### Production-style stack

```bash
docker compose -f compose.prod.yml up -d --build
```

Stop it with:

```bash
docker compose -f compose.prod.yml down
```

> `MODE=prod` enables production cookie behavior and therefore expects HTTPS. For localhost testing over HTTP, keep `MODE=dev` even when using containers.

## Database migrations and seed data

Prisma migrations are stored in:

```text
back/service/prisma/migrations
```

Apply committed migrations:

```bash
cd back/service
npx prisma migrate deploy
```

Create a new development migration after changing the Prisma schema:

```bash
npx prisma migrate dev --name your_migration_name
```

Seed the database:

```bash
npx prisma db seed
```

The seed creates:

- 3 verified users
- 6 rooms
- 6 future demo bookings

Seeded rooms:

| Room | Floor | Capacity |
| --- | ---: | ---: |
| Horizon | 2 | 6 |
| Atlas | 3 | 10 |
| Focus | 2 | 4 |
| Boardroom | 4 | 16 |
| Lighthouse | 1 | 8 |
| Garden | 3 | 5 |

## Test accounts

All seeded accounts use the same password:

```text
Roomly123!
```

| Name | Email |
| --- | --- |
| Olena Koval | `olena.koval@roomly.dev` |
| Maksym Bondar | `maksym.bondar@roomly.dev` |
| Sofia Melnyk | `sofia.melnyk@roomly.dev` |

The seeded users are already email-verified and can create bookings immediately.

## Environment variables

### Backend

Backend variables are documented in `back/.env.example`.

| Variable | Purpose | Example |
| --- | --- | --- |
| `MODE` | Runtime mode: `dev` or `prod` | `dev` |
| `DOMAIN` | Production cookie domain | `roomly.ua` |
| `SERVICE_PORT` | Backend HTTP port | `5000` |
| `FRONTEND_URL` | Frontend origin and generated-link base URL | `http://localhost:3030` |
| `POSTGRES_PORT` | PostgreSQL host port | `5001` |
| `DATABASE_URL` | PostgreSQL connection string | `postgres://...` |
| `COOKIES_SECRET` | Signed-cookie secret | replace in every environment |
| `ACCESS_SECRET` | JWT access-token secret | replace in every environment |
| `REFRESH_SECRET` | JWT refresh-token secret | replace in every environment |
| `ACCESS_AGE` | Access-cookie lifetime in milliseconds | `900000` |
| `REFRESH_AGE` | Refresh-cookie lifetime in milliseconds | `2592000000` |
| `OFFICE_TIME_ZONE` | Office IANA time zone | `Europe/Kyiv` |
| `OFFICE_OPEN_HOUR` | Office opening hour | `9` |
| `OFFICE_CLOSE_HOUR` | Office closing hour | `19` |
| `EMAIL_VERIFICATION_EXPIRES_HOURS` | Verification-code lifetime | `24` |
| `EMAIL_VERIFICATION_RESEND_COOLDOWN_SECONDS` | Verification resend cooldown | `60` |
| `PASSWORD_RESET_TOKEN_TTL_MINUTES` | Reset-token lifetime | `30` |
| `PASSWORD_RESET_RESEND_COOLDOWN_SECONDS` | Reset resend cooldown | `60` |
| `NOTIFY_BEFORE_MINUTES` | Notification lead time | `10` |

### Frontend

Frontend variables are documented in `front/.env.example`.

| Variable | Purpose | Example |
| --- | --- | --- |
| `MODE` | Runtime mode | `dev` |
| `NEXT_PUBLIC_SITE` | Public frontend URL | `http://localhost:3030` |
| `NEXT_PUBLIC_API_URL` | Browser-accessible backend URL | `http://localhost:5000` |
| `API_URL` | Backend URL used by Next.js server code | `http://localhost:5000` |

Never commit real `.env`, `.env.prod`, or `.env.docker` files. Commit only `.env.example`.

## API overview

All room, booking, and notification routes require authentication.

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/auth/register` | Register a user |
| `POST` | `/auth/login` | Start a session |
| `DELETE` | `/auth/logout` | End the current session |
| `POST` | `/auth/refresh` | Refresh access credentials |
| `GET` | `/auth/me` | Return the current user |
| `POST` | `/auth/verify-email` | Verify the current user's email |
| `POST` | `/auth/resend-verification` | Request another verification code |
| `POST` | `/auth/forgot-password` | Request password reset |
| `POST` | `/auth/reset-password` | Set a new password |

### Rooms

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/rooms` | List rooms, optionally filtered by capacity |
| `GET` | `/rooms/:roomId` | Return one room |
| `GET` | `/rooms/:roomId/availability` | Return bookings for a room and date range |

### Bookings

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/bookings` | Return the current user's bookings |
| `POST` | `/bookings` | Create a single or recurring booking |
| `DELETE` | `/bookings/:bookingId` | Cancel one booking occurrence |
| `DELETE` | `/bookings/series/:seriesId` | Cancel an entire recurring series |

### Notifications

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/notifications` | List the current user's notifications |
| `PATCH` | `/notifications/read-all` | Mark every notification as read |
| `PATCH` | `/notifications/:notificationId/read` | Mark one notification as read |
| `DELETE` | `/notifications` | Delete all notifications |
| `DELETE` | `/notifications/:notificationId` | Delete one notification |

## Booking conflict protection

Roomly uses two layers of overlap protection.

First, the service checks existing bookings using half-open intervals: a booking overlaps when its start is before another booking's end and its end is after the other booking's start. Because the end boundary is excluded, adjacent reservations such as `10:00–11:00` and `11:00–12:00` are valid.

Second, PostgreSQL enforces the rule at the database level with a GiST exclusion constraint:

```sql
EXCLUDE USING GIST (
  "roomId" WITH =,
  tstzrange("startTime", "endTime", '[)') WITH &&
)
```

This constraint prevents two concurrent requests from storing overlapping bookings for the same room, even when both requests pass the application-level availability check at nearly the same time. Database conflict errors are converted into an HTTP `409 Conflict` response with a readable message.

Recurring bookings are generated as a complete set of weekly occurrences. If any occurrence conflicts, the operation is rejected rather than partially creating the series.

## Time and time zones

Booking timestamps are stored in PostgreSQL as `timestamptz` values and transferred as UTC timestamps.

The backend validates working hours against the office time zone configured by:

```env
OFFICE_TIME_ZONE=Europe/Kyiv
OFFICE_OPEN_HOUR=9
OFFICE_CLOSE_HOUR=19
```

The frontend displays dates and times in the user's browser time zone. A user outside the office time zone therefore sees the same booking shifted to their local time, while booking eligibility continues to be checked against office hours in `Europe/Kyiv`.

Seed bookings are created from office-local dates and converted to UTC before being stored, which keeps demo data aligned with Kyiv office hours throughout daylight-saving changes.

## Testing

### Frontend

```bash
cd front
npm test -- --runInBand
```

Current frontend result:

```text
62 test suites passed
286 tests passed
```

The frontend test suite covers:

- Authentication validation and form hooks
- Login and registration components
- Password visibility and cooldown logic
- Booking date, time, duration, and recurrence utilities
- Booking form rendering, validation, submission, status, and cancellation
- Room filters and page states
- Schedule week navigation
- Notification mapping and list behavior
- Booking cancellation hooks and services

### Backend unit tests

```bash
cd back/service
npm test
```

### Backend integration tests

Integration tests use an isolated PostgreSQL database named `roomly_test`.

Run the complete integration test flow from `back/service`:

```bash
cd back/service
npm run test:integration
```

The command automatically:

1. Starts the dedicated PostgreSQL test container from `back/docker-compose.test.yml`.
2. Waits until the database becomes healthy.
3. Applies all committed Prisma migrations to `roomly_test`.
4. Runs the Jest and Supertest integration suite.
5. Stops and removes the test container after the run, even if the tests fail.

The PostgreSQL volume is preserved between runs, so repeated executions are faster. Seed data is not required because the integration tests create and clean up their own records.

Current backend result:

```text
95 unit tests passed
24 integration tests passed
119 backend tests passed
```

Combined project result:

```text
405 tests passed
```

Backend integration coverage includes authentication, booking creation, validation failures, cancellation, recurring series, ownership checks, overlap rejection, and concurrent booking race protection.

## Continuous integration

GitHub Actions runs separate frontend and backend workflows.

### Frontend CI

Triggered by changes in `front/**` or `.github/workflows/front-ci.yml`.

It performs:

1. `npm ci`
2. ESLint
3. Next.js production build
4. Jest tests

### Backend CI

Triggered by changes in `back/**` or `.github/workflows/back-ci.yml`.

It performs:

1. Starts PostgreSQL 17
2. Installs workspace and service dependencies
3. Generates Prisma Client
4. Applies migrations
5. Runs unit tests
6. Runs integration tests
7. Builds the backend service

## Security

Roomly includes:

- bcrypt password hashing with 12 rounds for seeded passwords
- Signed cookies
- Short-lived access credentials and refresh credentials
- HTTP-only authentication cookies
- Secure-cookie behavior in production mode
- Server-side Zod validation
- Authentication middleware
- Booking ownership checks
- Email-verification requirement before booking
- PostgreSQL overlap constraint
- Helmet security headers
- Restricted CORS configuration
- JSON and URL-encoded body limits
- Environment-based secrets
- Soft deletion for notifications
- One-time password-reset tokens with expiration

## Authorship

Created and maintained by **Artem Zhytovoz**.

Additional authorship information is available in [`AUTHORS.md`](./AUTHORS.md).

## License

All rights reserved.

This project is proprietary software. No part of this repository may be copied, modified, distributed, or used without prior written permission from the author.

Copyright © 2026 Artem Zhytovoz. All rights reserved.
