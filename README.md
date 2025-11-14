# Fullstack Monorepo

A production-quality monorepo for AI-driven full-stack web application scaffolding with ~5 year stability goals.

## Tech Stack

- **Language/Runtime**: TypeScript + Node.js 20 LTS
- **Monorepo**: Turborepo + PNPM workspaces
- **Frontend**: Next.js 15 (App Router) + Tailwind CSS + shadcn/ui + TanStack Query + Zod
- **Backend**: NestJS + Prisma + PostgreSQL + OpenAPI 3.1
- **BFF**: NestJS (gateway/aggregation layer)
- **Auth**: Auth.js (NextAuth) with OIDC/OAuth2, optional Clerk integration
- **Database**: PostgreSQL (Neon serverless, compatible with Railway/Render/Fly/Docker)
- **CI/CD**: GitHub Actions, ESLint, Prettier, Vitest/Jest, Playwright
- **Deploy**: Vercel (web) + Fly.io/Render (API) + Neon (DB)

## Project Structure

```
.
├── apps/
│   ├── web/          # Next.js 15 frontend
│   ├── api/          # NestJS backend API
│   └── bff/          # NestJS BFF aggregation layer
├── packages/
│   ├── shared-types/ # Shared TypeScript types and Zod schemas
│   ├── config/       # Shared ESLint/Prettier/TypeScript configs
│   └── ui/           # Shared UI components (shadcn wrapper)
├── agent/            # Code generator CLI
├── specs/            # Example app specifications
├── infra/            # Docker and infrastructure configs
└── docs/             # Architecture Decision Records
```

## Getting Started

### Prerequisites

- Node.js 20.11.0 or later (use `.nvmrc`)
- pnpm 8.15.0 or later
- Docker and Docker Compose (for local PostgreSQL)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd agent_test
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# API
cp apps/api/.env.example apps/api/.env

# Web
cp apps/web/.env.example apps/web/.env

# BFF
cp apps/bff/.env.example apps/bff/.env
```

4. Start PostgreSQL:
```bash
docker-compose -f infra/docker-compose.yml up -d postgres
```

5. Run database migrations:
```bash
cd apps/api
pnpm prisma:migrate
pnpm prisma:generate
cd ../..
```

### Development

Start all services in development mode:

```bash
pnpm dev
```

This will start:
- Web app at http://localhost:3000
- API at http://localhost:3001
- BFF at http://localhost:3002
- OpenAPI docs at http://localhost:3001/api

### Building

Build all apps and packages:

```bash
pnpm build
```

### Testing

Run all tests:

```bash
pnpm test
```

Run linting:

```bash
pnpm lint
```

Run type checking:

```bash
pnpm typecheck
```

## Authentication

### Auth.js (NextAuth) - Default

The default authentication provider is Auth.js (NextAuth) with support for:

- GitHub OAuth
- Google OAuth
- JWT sessions
- CSRF protection

**Setup OAuth providers:**

1. Create OAuth apps on GitHub and Google
2. Add credentials to `apps/web/.env`:

```env
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-secret-key
```

3. Update `NEXTAUTH_SECRET` in `apps/api/.env` to match

### Clerk (Optional)

To use Clerk instead of Auth.js:

1. Set `CLERK_ENABLED=true` in `apps/web/.env`
2. Add Clerk credentials:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

See [docs/CLERK_INTEGRATION.md](docs/CLERK_INTEGRATION.md) for details.

## Code Generator (Agent)

The agent CLI generates full-stack code from YAML specifications.

### Generate code from spec

```bash
pnpm agent:generate --spec specs/todo-app.yaml
```

Options:
- `--dry-run`: Preview changes without writing files
- `--output <path>`: Specify output directory

### Spec file format

See `specs/todo-app.yaml` for an example specification that defines:
- Entities and their fields
- Frontend pages and routes
- API endpoints
- Authentication configuration
- Deployment preferences

The generator creates:
- Prisma schema models
- NestJS modules, services, controllers, DTOs
- Next.js pages and components
- Type definitions

## Database

### Local Development

Use Docker Compose to run PostgreSQL locally:

```bash
docker-compose -f infra/docker-compose.yml up -d postgres
```

Connection string: `postgresql://postgres:postgres@localhost:5432/fullstack_dev`

### Prisma Migrations

Create a migration:
```bash
cd apps/api
pnpm prisma:migrate
```

View database in Prisma Studio:
```bash
cd apps/api
pnpm prisma:studio
```

### Production

**Neon (Recommended)**
1. Create a Neon project at https://neon.tech
2. Copy the connection string to `DATABASE_URL`

**Alternatives**: Railway, Render, Fly.io, or any PostgreSQL provider

## Deployment

### Frontend (Vercel)

1. Connect your repository to Vercel
2. Set environment variables:
   - `NEXT_PUBLIC_API_URL`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - OAuth provider credentials
3. Deploy

Build command: `pnpm build --filter=web`
Output directory: `apps/web/.next`

### Backend (Fly.io)

1. Install Fly CLI: https://fly.io/docs/getting-started/installing-flyctl/
2. Create app:
```bash
fly apps create my-api
```

3. Set secrets:
```bash
fly secrets set DATABASE_URL=postgresql://...
fly secrets set NEXTAUTH_SECRET=...
```

4. Deploy:
```bash
fly deploy --config infra/fly.toml
```

**Alternative**: Render, Railway (see provider docs)

### Database (Neon)

1. Create project at https://neon.tech
2. Copy connection string
3. Set `DATABASE_URL` environment variable in API deployment
4. Run migrations on first deploy

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push:

1. Install dependencies
2. Lint all packages
3. Type check
4. Run tests
5. Build all apps

## Architecture Decisions

See [docs/ADR-0001-stack-choices.md](docs/ADR-0001-stack-choices.md) for rationale behind technology choices optimized for 5-year stability.

## Package Scripts

### Root
- `pnpm dev` - Start all apps in development
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Lint all code
- `pnpm typecheck` - Type check all TypeScript
- `pnpm test` - Run all tests
- `pnpm clean` - Clean all build artifacts

### Web App
- `pnpm dev` - Start Next.js dev server
- `pnpm build` - Build for production
- `pnpm test` - Run Playwright tests

### API App
- `pnpm dev` - Start NestJS with watch mode
- `pnpm build` - Build for production
- `pnpm test` - Run Jest tests
- `pnpm prisma:migrate` - Run database migrations
- `pnpm prisma:studio` - Open Prisma Studio

### BFF App
- `pnpm dev` - Start BFF with watch mode
- `pnpm build` - Build for production

## Contributing

1. Create a feature branch
2. Make changes
3. Run linting, type checking, and tests
4. Submit a pull request

## License

MIT