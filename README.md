# Production-Ready Monorepo with AI Code Generator

A full-stack TypeScript monorepo featuring Next.js 15, NestJS, Prisma, and an AI-driven code generator.

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ (LTS)
- pnpm 8+
- Docker & Docker Compose
- PostgreSQL (via Docker)

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

3. Start the database:
```bash
pnpm docker:up
```

4. Set up environment variables:
```bash
# Create .env files in apps/api and apps/web
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Generate secrets
pnpm gen:secret
```

5. Run database migrations:
```bash
pnpm db:migrate
```

6. Start development servers:
```bash
pnpm dev
```

The applications will be available at:
- Web: http://localhost:3000
- API: http://localhost:3001
- API Docs: http://localhost:3001/api/docs
- BFF: http://localhost:3002

## 📦 Monorepo Structure

```
.
├── apps/
│   ├── web/          # Next.js 15 App Router
│   ├── api/          # NestJS API with Prisma
│   └── bff/          # Backend-for-Frontend (NestJS)
├── packages/
│   ├── shared-types/ # Shared TypeScript types
│   ├── config/       # Shared configurations
│   └── ui/           # Shared UI components
├── agent/            # AI code generator CLI
├── infra/            # Docker and infrastructure
├── specs/            # API specifications
├── docs/             # Documentation
└── scripts/          # Utility scripts
```

## 🛠️ Available Commands

### Root Level
- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Lint all code
- `pnpm typecheck` - Type check all TypeScript
- `pnpm test` - Run all tests
- `pnpm agent:generate --spec <path>` - Generate code from spec
- `pnpm gen:secret` - Generate cryptographic secrets
- `pnpm docker:up` - Start Docker services
- `pnpm docker:down` - Stop Docker services

### Database
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Prisma Studio

## 🤖 AI Code Generator

The monorepo includes an AI-driven code generator CLI:

```bash
# Generate code from a specification
pnpm agent:generate --spec specs/todo-app.yaml

# Dry run (preview without writing files)
pnpm agent:generate --spec specs/todo-app.yaml --dry-run
```

See [specs/todo-app.yaml](specs/todo-app.yaml) for an example specification.

## 🔐 Authentication

The web app supports multiple authentication providers:

- **Auth.js (NextAuth)** - Default with GitHub provider
- **Google OAuth** - Optional
- **Clerk** - Behind environment variable toggle

Configure in `apps/web/.env`:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-with-pnpm-gen-secret>
GITHUB_ID=<your-github-oauth-app-id>
GITHUB_SECRET=<your-github-oauth-app-secret>
```

## 📚 Documentation

- [Setup Guide for Beginners](docs/SETUP_GUIA_INICIANTE.md)
- [Architecture Decision Record](docs/ADR-0001.md)
- [Macro Roadmap](docs/ROADMAP_MACRO.md)
- [Granular Roadmap](docs/ROADMAP_GRANULAR.md)

## 🏗️ Tech Stack

### Frontend
- **Next.js 15** - App Router, Server Components, Server Actions
- **React 18** - UI library
- **TailwindCSS** - Styling
- **TypeScript** - Type safety

### Backend
- **NestJS** - API framework
- **Prisma** - ORM
- **PostgreSQL** - Database
- **OpenAPI 3.1** - API documentation

### Infrastructure
- **Turborepo** - Monorepo build system
- **pnpm** - Package manager
- **Docker** - Containerization
- **GitHub Actions** - CI/CD

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:cov
```

## 🚢 Deployment

Each app includes a Dockerfile for containerized deployment:

```bash
# Build Docker images
docker build -f apps/web/Dockerfile -t monorepo-web .
docker build -f apps/api/Dockerfile -t monorepo-api .
docker build -f apps/bff/Dockerfile -t monorepo-bff .
```

## 📄 License

MIT