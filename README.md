# WorkforceOS

> SaaS Workforce and Project Management Platform

A multi-tenant platform for workforce management, project tracking, attendance, payroll, and more — built for enterprise teams.

---

## Tech Stack

| Layer          | Technology                         |
| -------------- | ---------------------------------- |
| Framework      | Next.js 16 (App Router)            |
| Language       | TypeScript (strict mode)           |
| UI Library     | React 19                           |
| Styling        | Tailwind CSS v4                    |
| Components     | shadcn/ui (base-nova)              |
| Icons          | Lucide React                       |
| Database       | PostgreSQL                         |
| ORM            | Prisma 7                           |
| Validation     | Zod                                |
| Forms          | React Hook Form + @hookform/resolvers |
| Linting        | ESLint 9 + eslint-config-next      |
| Formatting     | Prettier                           |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **PostgreSQL** ≥ 14 (local or remote)

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd workforceos

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your database credentials and secrets

# 4. Generate Prisma client
npm run db:generate

# 5. Push schema to database (or run migrations)
npm run db:push      # for quick sync
# npm run db:migrate # for migration-based workflow

# 6. Start the dev server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable                    | Description                   | Required |
| --------------------------- | ----------------------------- | -------- |
| `DATABASE_URL`              | PostgreSQL connection string  | ✅       |
| `NEXTAUTH_SECRET`           | JWT signing secret            | ✅       |
| `NEXTAUTH_URL`              | Canonical app URL             | ✅       |
| `NEXT_PUBLIC_APP_URL`       | Public app URL (client-side)  | ✅       |

Additional variables for email, storage, billing, etc. will be documented as they are implemented.

---

## Database

This project uses **Prisma ORM** with PostgreSQL.

```bash
npm run db:generate   # Generate Prisma client from schema
npm run db:migrate    # Create and run migrations
npm run db:push       # Push schema changes without migration files
npm run db:seed       # Seed database with initial data
npm run db:studio     # Open Prisma Studio (GUI)
npm run db:reset      # Reset database and re-apply migrations
```

---

## Available Scripts

| Script           | Description                            |
| ---------------- | -------------------------------------- |
| `npm run dev`    | Start dev server (Turbopack)           |
| `npm run build`  | Production build                       |
| `npm run start`  | Start production server                |
| `npm run lint`   | Run ESLint                             |
| `npm run lint:fix` | Run ESLint with auto-fix             |
| `npm run format` | Format code with Prettier              |
| `npm run format:check` | Check formatting without changes |
| `npm run typecheck` | Run TypeScript type checking        |

---

## Architecture

```
Client Request
       ↓
  Next.js Middleware (auth, tenant, RBAC)
       ↓
  App Router (pages & layouts)
       ↓
  Server Actions / Route Handlers
       ↓
  Services (business logic)
       ↓
  Repositories (data access)
       ↓
  Prisma Client
       ↓
  PostgreSQL
```

### Key Principles

- **Separation of concerns** — UI components never contain database logic
- **Server-first** — Business logic runs on the server
- **Type-safe** — Strict TypeScript throughout the stack
- **Multi-tenant** — Data isolation per company

---

## Folder Structure

```
project-root/
│
├── prisma/                    # Database schema, migrations, seed
│   ├── schema.prisma
│   └── seed.ts
│
├── public/                    # Static assets
│   ├── images/
│   ├── icons/
│   └── logos/
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/            # Auth pages (login, register, etc.)
│   │   ├── (dashboard)/       # Dashboard pages (protected)
│   │   ├── admin/             # Super Admin pages
│   │   ├── api/               # API route handlers
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   ├── loading.tsx        # Global loading UI
│   │   ├── error.tsx          # Global error boundary
│   │   └── not-found.tsx      # 404 page
│   │
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui primitives
│   │   ├── layout/            # Layout components (sidebar, header)
│   │   ├── navigation/        # Nav components (breadcrumbs, menus)
│   │   ├── forms/             # Form components
│   │   ├── tables/            # Table components
│   │   ├── feedback/          # Toast, alerts, modals
│   │   └── common/            # Shared / generic components
│   │
│   ├── config/                # Application configuration
│   │   ├── app.ts             # App identity & metadata
│   │   ├── constants.ts       # Roles, statuses, enums
│   │   └── navigation.ts     # Role-based nav config
│   │
│   ├── lib/                   # Shared libraries & utilities
│   │   ├── db/                # Prisma client singleton
│   │   ├── auth/              # Auth helpers (Phase 1)
│   │   ├── permissions/       # RBAC utilities (Phase 1)
│   │   ├── tenant/            # Multi-tenancy logic (Phase 1)
│   │   ├── validation/        # Zod schemas
│   │   ├── utils/             # General utilities
│   │   └── errors/            # Error handling utilities
│   │
│   ├── server/                # Server-side business logic
│   │   ├── services/          # Business logic services
│   │   ├── repositories/      # Data access layer
│   │   ├── actions/           # Server Actions
│   │   └── queries/           # Server-side data fetching
│   │
│   ├── hooks/                 # Custom React hooks
│   │
│   ├── types/                 # Shared TypeScript types
│   │   ├── auth.ts
│   │   ├── user.ts
│   │   └── common.ts
│   │
│   └── middleware.ts          # Route protection middleware
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── .env.example               # Environment variable template
├── .prettierrc                # Prettier configuration
├── components.json            # shadcn/ui configuration
├── eslint.config.mjs          # ESLint configuration
├── next.config.ts             # Next.js configuration
├── prisma.config.ts           # Prisma configuration
├── tsconfig.json              # TypeScript configuration
└── package.json
```

---

## Development Phases

### Phase 1 — Core Workforce & Project Management
- Authentication (NextAuth.js)
- Multi-tenancy
- Role-based access control (RBAC)
- Company management
- Worker management
- Manager management
- Project management
- Task & subtask management

### Phase 2 — Operations
- GPS-based attendance
- Leave management
- Inventory management
- Payroll processing

### Phase 3 — Enterprise & Intelligence
- Real-time communication / chat
- Analytics & reporting
- Subscription & billing (Stripe)
- Mobile applications
- AI-powered features

---

## License

Private — All rights reserved.
